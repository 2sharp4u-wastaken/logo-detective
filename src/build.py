"""Builds the site from src/:
  public/index.html      מסע המותגים, the main page (src/journey.html, the same file as the Claude artifact)
  public/detective.html  בלש הסמלים, served at /detective
  public/credits.html

Run from the repository root:  python3 src/build.py
The published site is the public/ folder; commit the built files after running this.
"""
import html
import json
import os
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")
PUB = os.path.join(ROOT, "public")
REPO = "https://github.com/2sharp4u-wastaken/logo-detective"


def read(name):
    with open(os.path.join(SRC, name), encoding="utf-8") as f:
        return f.read()


def write(name, text):
    with open(os.path.join(PUB, name), "w", encoding="utf-8") as f:
        f.write(text)


def webp_ids():
    return sorted(f[:-5] for f in os.listdir(os.path.join(PUB, "img")) if f.endswith(".webp"))


def check_images(logo_map, webp, what):
    missing = [b for b, i in logo_map.items()
               if not os.path.exists(os.path.join(PUB, "img", i + (".webp" if i in webp else ".png")))]
    if missing:
        raise SystemExit(what + ": logo images missing for: " + ", ".join(missing))


def brand_data():
    """The brands, countries and families are written once, in journey.html; the detective game uses the same block."""
    src = read("journey.html")
    a = src.index("/* ===================== countries & flags ===================== */")
    b = src.index("/* ===================== derived data & helpers ===================== */")
    return src[a:b]


def build_detective():
    webp = webp_ids()
    logo_map = json.loads(read("logo_map.json"))
    check_images(logo_map, webp, "detective")

    head = read("head.html")
    head = head.replace(
        "<title>בלש הסמלים</title>",
        "<title>בלש הסמלים</title>\n"
        '<meta name="description" content="משחק חינמי בעברית לילדים שאוהבים מכוניות: מזהים סמלים של מותגי רכב, פותרים תיקים ומגלים איך הסמלים השתנו לאורך השנים.">\n'
        '<meta name="theme-color" content="#1B1F2B">\n'
        '<meta property="og:title" content="בלש הסמלים">\n'
        '<meta property="og:description" content="מי עומד מאחורי הסמל? משחק חינמי בעברית על סמלים של מותגי רכב.">\n'
        '<meta property="og:type" content="website">\n'
        '<link rel="icon" href="favicon.svg" type="image/svg+xml">',
        1,
    )
    extra_css = read("standalone.css")
    head = head.replace("</style>", extra_css + "\n</style>", 1)

    shim = read("standalone.js").replace("__WEBP__", json.dumps(webp, separators=(",", ":")))
    game = (
        brand_data()
        + "\n"
        + read("data_new.js").replace("__LOGO_MAP__", json.dumps(logo_map, separators=(",", ":")))
        + "\n"
        + read("app.js")
    )
    page = (
        head
        + read("body.html")
        + "<script>\n" + shim + "\n</script>\n"
        + '<script>\n(function(){\n"use strict";\n' + game + "\n})();\n</script>\n</body>\n</html>\n"
    )
    write("detective.html", page)
    return len(page), len(logo_map)


JOURNEY_META = (
    '<meta name="description" content="משחק חינמי בעברית לילדים שאוהבים מכוניות: מאיפה הגיע כל מותג רכב, למי הוא שייך היום, ואיך נראה הסמל שלו.">\n'
    '<meta name="theme-color" content="#1452A0">\n'
    '<meta property="og:title" content="מסע המותגים">\n'
    '<meta property="og:description" content="מאיפה הגיעה כל מכונית, ולאיזו משפחה היא שייכת? משחק חינמי בעברית על מותגי רכב.">\n'
    '<meta property="og:type" content="website">\n'
    '<link rel="icon" href="favicon.svg" type="image/svg+xml">\n'
)
# Old family-board links were /?family=CODE, when the detective game was the main page: send them on.
JOURNEY_REDIRECT = (
    '<script>(function(){try{var u=new URL(location.href);'
    'if(u.searchParams.get("family"))location.replace("/detective"+u.search+u.hash);}catch(e){}})();</script>\n'
)
# What the claude.ai viewer adds around an artifact page
JOURNEY_RESET = (
    "<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}"
    "body{margin:0;font:14px system-ui,-apple-system,\"Segoe UI\",sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>\n"
)


def build_journey():
    webp = webp_ids()
    logo_map = json.loads(read("logo_map.json"))
    logo_map.update(json.loads(read("journey_logo_map.json")))  # the newer logos win
    check_images(logo_map, webp, "journey")
    logos = {b: "img/" + i + (".webp" if i in webp else ".png") for b, i in sorted(logo_map.items())}
    src = read("journey.html")
    cut = src.index("</style>") + len("</style>")
    site = "<script>window.PUBLIC_SITE=" + json.dumps({"detective": "/detective", "logos": logos}, separators=(",", ":")) + ";</script>\n"
    page = (
        '<!DOCTYPE html>\n<html lang="he" dir="rtl">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        + JOURNEY_REDIRECT + JOURNEY_RESET
        + src[:cut].replace("<title>מסע המותגים</title>", "<title>מסע המותגים</title>\n" + JOURNEY_META, 1)
        + "\n</head>\n<body>\n" + site + src[cut:].strip() + "\n</body>\n</html>\n"
    )
    write("index.html", page)
    return len(page), len(logos)


def build_credits():
    rows = json.loads(read("commons_files.json"))
    licensed = [
        ("Toyoda ja.svg", "טויוטה, 1936", "יוצר לא ידוע", "GFDL", "https://www.gnu.org/licenses/fdl-1.3.html"),
        ("Toyota ja.svg", "טויוטה, 1937", "AQ", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/"),
        ("Peugeot Logo 2010-2021.jpg", "פיג׳ו, 2010–2021", "Shimogasa", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/"),
        ("Smart (1998).svg", "סמארט, 1998–2002", "TheCrimsonBoat", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/"),
    ]

    def file_link(name):
        url = "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(name.replace(" ", "_"))
        return '<a href="%s">%s</a>' % (html.escape(url), html.escape(name))

    lic = "\n".join(
        '<li>%s · %s · יוצר: %s · רישיון: <a href="%s">%s</a></li>' % (h, file_link(n), html.escape(a), u, l)
        for n, h, a, l, u in licensed
    )
    tr = "\n".join(
        '<tr><td>%s</td><td>%s</td><td class="f">%s</td></tr>' % (html.escape(b), html.escape(p), file_link(f))
        for b, p, f in rows
    )
    page = (
        read("credits_template.html")
        .replace("__LICENSED__", lic)
        .replace("__ROWS__", tr)
        .replace("__ISSUES__", REPO + "/issues")
        .replace("__REPO__", REPO)
    )
    write("credits.html", page)
    return len(rows)


if __name__ == "__main__":
    jsize, jlogos = build_journey()
    dsize, dlogos = build_detective()
    files = build_credits()
    print("index.html (מסע המותגים): %d bytes, %d logos · detective.html (בלש הסמלים): %d bytes, %d logos · credits.html: %d Commons files"
          % (jsize, jlogos, dsize, dlogos, files))
