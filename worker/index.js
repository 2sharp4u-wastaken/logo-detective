/* Logo Detective (בלש הסמלים): API for the family board + static site.
   Everything outside /api/ is served from ./public by the assets binding.

   Families are identified only by an 8-character random code. A family holds up to 12 players.
   A player is { n: name, c: colour, p: progress, e: epoch, w: write id, at: time } as the game sends it.
   Storage: D1 (binding DB). Tables are created on first use, so a fresh database needs no migration step. */

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1
const CODE_RE = /^[A-HJ-NP-Z2-9]{8}$/;
const PID_RE = /^[A-Za-z0-9]{3,40}$/;
const MAX_PLAYERS = 12;
const MAX_DOC_BYTES = 24000;
const FIELDS = ["n", "c", "p", "e", "w", "at"];
const HOUR = 3600e3;

let schemaReady = null;
function ensureSchema(db) {
  if (!schemaReady) {
    schemaReady = db.batch([
      db.prepare("CREATE TABLE IF NOT EXISTS families (code TEXT PRIMARY KEY, created INTEGER NOT NULL, seen INTEGER NOT NULL)"),
      db.prepare("CREATE TABLE IF NOT EXISTS players (code TEXT NOT NULL, id TEXT NOT NULL, data TEXT NOT NULL, updated INTEGER NOT NULL, PRIMARY KEY (code, id))"),
      db.prepare("CREATE TABLE IF NOT EXISTS limits (k TEXT PRIMARY KEY, n INTEGER NOT NULL, t INTEGER NOT NULL)"),
    ]).catch((e) => { schemaReady = null; throw e; });
  }
  return schemaReady;
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
const fail = (status, error) => json({ error }, status);

/* Fixed-window counter in D1. Returns true while the key is under its limit. */
async function allow(db, key, max, windowMs) {
  const now = Date.now();
  const row = await db
    .prepare(
      "INSERT INTO limits (k, n, t) VALUES (?1, 1, ?2) ON CONFLICT(k) DO UPDATE SET " +
        "n = CASE WHEN limits.t < ?3 THEN 1 ELSE limits.n + 1 END, " +
        "t = CASE WHEN limits.t < ?3 THEN ?2 ELSE limits.t END RETURNING n"
    )
    .bind(key, now, now - windowMs)
    .first();
  if (Math.random() < 0.01) await db.prepare("DELETE FROM limits WHERE t < ?1").bind(now - 2 * 24 * HOUR).run();
  return !row || row.n <= max;
}

function newCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

async function readBody(request) {
  const text = await request.text();
  if (text.length > MAX_DOC_BYTES) return { error: 413 };
  let data;
  try { data = JSON.parse(text); } catch { return { error: 400 }; }
  if (!data || typeof data !== "object" || Array.isArray(data)) return { error: 400 };
  const out = {};
  for (const k of FIELDS) if (k in data) out[k] = data[k];
  if ("n" in out && (typeof out.n !== "string" || out.n.length > 40)) return { error: 400 };
  if ("p" in out && (typeof out.p !== "object" || out.p === null || Array.isArray(out.p))) return { error: 400 };
  return { data: out };
}

async function familyExists(db, code) {
  const row = await db.prepare("SELECT seen FROM families WHERE code = ?1").bind(code).first();
  if (!row) return false;
  if (Date.now() - row.seen > 6 * HOUR) await db.prepare("UPDATE families SET seen = ?2 WHERE code = ?1").bind(code, Date.now()).run();
  return true;
}

async function api(request, env, url) {
  const db = env.DB;
  if (!db) return fail(503, "storage not configured");
  await ensureSchema(db);
  const ip = request.headers.get("cf-connecting-ip") || "local";
  const parts = url.pathname.split("/").filter(Boolean); // ["api", ...]

  // POST /api/families -> { code }
  if (parts.length === 2 && parts[1] === "families") {
    if (request.method !== "POST") return fail(405, "method");
    if (!(await allow(db, "new:" + ip, 10, HOUR))) return fail(429, "too many new families");
    for (let i = 0; i < 5; i++) {
      const code = newCode();
      const r = await db.prepare("INSERT OR IGNORE INTO families (code, created, seen) VALUES (?1, ?2, ?2)").bind(code, Date.now()).run();
      if (r.meta && r.meta.changes === 1) return json({ code }, 201);
    }
    return fail(500, "could not create a code");
  }

  // /api/f/:code/players[/:id]
  if (parts[1] !== "f" || parts[3] !== "players" || parts.length > 5) return fail(404, "not found");
  const code = String(parts[2] || "").toUpperCase();
  if (!CODE_RE.test(code)) return fail(404, "no such family");
  if (!(await familyExists(db, code))) return fail(404, "no such family");

  if (parts.length === 4) {
    if (request.method !== "GET") return fail(405, "method");
    const { results } = await db.prepare("SELECT id, data FROM players WHERE code = ?1 ORDER BY id").bind(code).all();
    return json({ players: results.map((r) => ({ id: r.id, data: JSON.parse(r.data) })) });
  }

  const id = parts[4];
  if (!PID_RE.test(id)) return fail(400, "bad player id");
  if (request.method !== "DELETE" && !(await allow(db, "wr:" + code, 240, 15 * 60e3))) return fail(429, "slow down");

  if (request.method === "PUT") {
    const body = await readBody(request);
    if (body.error) return fail(body.error, "bad player");
    const exists = await db.prepare("SELECT 1 FROM players WHERE code = ?1 AND id = ?2").bind(code, id).first();
    if (!exists) {
      const { n } = await db.prepare("SELECT COUNT(*) AS n FROM players WHERE code = ?1").bind(code).first();
      if (n >= MAX_PLAYERS) return fail(409, "board is full");
    }
    await db
      .prepare("INSERT INTO players (code, id, data, updated) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(code, id) DO UPDATE SET data = ?3, updated = ?4")
      .bind(code, id, JSON.stringify(body.data), Date.now())
      .run();
    return json({ ok: true });
  }

  if (request.method === "PATCH") {
    const body = await readBody(request);
    if (body.error) return fail(body.error, "bad player");
    const row = await db.prepare("SELECT data FROM players WHERE code = ?1 AND id = ?2").bind(code, id).first();
    if (!row) return fail(404, "no such player");
    const merged = JSON.stringify(Object.assign(JSON.parse(row.data), body.data));
    if (merged.length > MAX_DOC_BYTES) return fail(413, "too large");
    await db.prepare("UPDATE players SET data = ?3, updated = ?4 WHERE code = ?1 AND id = ?2").bind(code, id, merged, Date.now()).run();
    return json({ ok: true });
  }

  if (request.method === "DELETE") {
    await db.prepare("DELETE FROM players WHERE code = ?1 AND id = ?2").bind(code, id).run();
    return json({ ok: true });
  }

  return fail(405, "method");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try {
        return await api(request, env, url);
      } catch (e) {
        console.error(e);
        return fail(500, "server error");
      }
    }
    return env.ASSETS.fetch(request);
  },
};
