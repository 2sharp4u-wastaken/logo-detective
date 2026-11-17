/* ===================== Nov 2026 corrections to the shared brand data ===================== */
(function(){
 const bg=B.find(b=>b.id==="bugatti");
 if(bg){bg.j[bg.j.length-1]=["hr",2021,"בוגאטי-רימאץ מקרואטיה. פורשה הייתה שותפה בה עד 2026"];}
 const vw=GROUPS.find(g=>g.id==="vw");
 if(vw){vw.partners=(vw.partners||[]).filter(p=>p[0]!=="bugatti");vw.past=(vw.past||[]).concat([["bugatti","בוגאטי הייתה של פולקסווגן בין 1998 ל-2021. אחר כך פורשה החזיקה 45% מבוגאטי-רימאץ, ומכרה אותם ב-2026"]]);}
})();

/* ===================== helpers ===================== */
const BM={};B.forEach(b=>{BM[b.id]=b;});
const VM={};VAULT.forEach(v=>{VM[v.id]=v;});
const GR={};GROUPS.forEach(g=>{GR[g.id]=g;g.members=B.filter(b=>b.g===g.id).map(b=>b.id);});
INDEP.members=B.filter(b=>!b.g).map(b=>b.id);
const any=id=>BM[id]||VM[id]||null;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[׳'"״.\-\s]/g,"").toLowerCase();
const $=(s,el)=>(el||document).querySelector(s);
const $$=(s,el)=>[...(el||document).querySelectorAll(s)];
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(a,n)=>shuffle(a).slice(0,n);
const pre=(p,w)=>/^[A-Za-z0-9]/.test(w)?p+"-"+w:p+w;
const andList=a=>a.length<2?a.join(""):a.slice(0,-1).join(", ")+" ו"+a[a.length-1];
const ownerCodes=b=>b.own||(b.g?[GR[b.g].hq]:[b.o]);
const ownerName=b=>b.ownName||(b.g?GR[b.g].he:"חברה עצמאית");
const famOf=b=>b&&b.g?GR[b.g]:null;
const canGuess=b=>!!(b&&LOGO[b.id]&&!NAMEDLOGO.has(b.id)&&!BADLOGO.has(b.id));
const reduceMotion=(()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}})();
const caseNo=id=>{const i=B.findIndex(b=>b.id===id);return "תיק "+String(i+1).padStart(3,"0");};

const IC={
 x:`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
 speaker:`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
 mute:`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="m16 9 5 6m0-6-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
 lock:`<svg class="lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="15.5" r="1.6" fill="#1B2433"/></svg>`,
 key:`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M13 12h9m-3 0v4m-3-4v3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
 glass:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="m14.5 14.5 6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
 boxes:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="13" width="6" height="7" rx="1" fill="currentColor"/><rect x="9" y="13" width="6" height="7" rx="1" fill="currentColor"/><rect x="16" y="13" width="6" height="7" rx="1" fill="currentColor"/><path d="M12 2v7m-3-3 3 3 3-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 odd:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="7" r="3" fill="currentColor"/><circle cx="18" cy="7" r="3" fill="currentColor"/><circle cx="6" cy="17" r="3" fill="currentColor"/><rect x="15" y="14" width="6" height="6" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
 news:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 9h10M7 13h10M7 17h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
 clock:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 7v5l3.5 2.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
 duel:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6.5" cy="15" r="4.5" fill="currentColor"/><circle cx="17.5" cy="15" r="4.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M6.5 3v5M17.5 3v5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
 tunnel:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M9.5 19h5L12 15.5z" fill="currentColor"/></svg>`,
 medal:(on)=>`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M13 2h6l-3 12h-6zM27 2h-6l3 12h6z" fill="${on?"#C3322F":"#9AA0AE"}"/><circle cx="20" cy="25" r="12" fill="${on?"#E0A93B":"#B9BDC6"}"/><circle cx="20" cy="25" r="8" fill="none" stroke="${on?"#8A6420":"#8E939E"}" stroke-width="2"/><path d="M20 19.5l1.7 3.5 3.8.5-2.8 2.6.7 3.8L20 28l-3.4 1.9.7-3.8-2.8-2.6 3.8-.5z" fill="${on?"#8A6420":"#8E939E"}"/></svg>`
};

/* ===================== storage ===================== */
const store={
 get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},
 set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(e){return false;}},
 del(k){try{localStorage.removeItem(k);}catch(e){}}
};
const KEY="bs.v1";
function freshState(){return {pts:0,keys:1,solved:[],vault:[],badges:[],daily:null,streak:0,lastWin:"",st:{},sound:true,names:["כחול","אדום"],best:{}};}
const S=(function(){const d=freshState();const s=store.get(KEY,null);if(s&&typeof s==="object")Object.keys(d).forEach(k=>{if(s[k]!==undefined&&s[k]!==null)d[k]=s[k];});if(typeof d.st!=="object")d.st={};if(typeof d.best!=="object")d.best={};return d;})();
const SOLVED=new Set((Array.isArray(S.solved)?S.solved:[]).filter(id=>BM[id]));
const OPENED=new Set((Array.isArray(S.vault)?S.vault:[]).filter(id=>VM[id]||id==="autocars"));
const HAVE=new Set(Array.isArray(S.badges)?S.badges:[]);
const PROG=["pts","keys","solved","vault","badges","daily","streak","lastWin","st","best"];
let ANON=JSON.parse(JSON.stringify(S)),PID=null,SYNC=null;
function save(){S.solved=[...SOLVED];S.vault=[...OPENED];S.badges=[...HAVE];
 if(PID&&SYNC){ANON.sound=S.sound;ANON.names=S.names;store.set(KEY,ANON);SYNC.dirty=true;cacheSave();schedulePush();}
 else store.set(KEY,S);}
const st=k=>+(S.st[k]||0);
const stAdd=(k,n)=>{S.st[k]=st(k)+(n||1);};
const stMax=(k,n)=>{if(n>st(k))S.st[k]=n;};

/* ===================== sound ===================== */
let AC=null;
function beep(kind){
 if(!S.sound)return;
 try{
  AC=AC||new (window.AudioContext||window.webkitAudioContext)();
  if(AC.state==="suspended")AC.resume();
  const seq={ok:[[660,.08],[990,.14]],no:[[190,.2]],win:[[523,.1],[659,.1],[784,.1],[1047,.22]],buzz:[[440,.07]],tick:[[1200,.03]]}[kind]||[];
  let t=AC.currentTime;
  seq.forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=kind==="no"?"square":"triangle";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+.03);t+=d;});
 }catch(e){}
}
function renderSound(){const b=$("#sound");b.innerHTML=S.sound?IC.speaker:IC.mute;b.setAttribute("aria-pressed",S.sound?"true":"false");b.setAttribute("aria-label",S.sound?"צלילים פועלים":"צלילים כבויים");}

/* ===================== logos & small renderers ===================== */
function plain(b,cls){const ab=(b.en.length<=3?b.en:b.en[0]).toUpperCase();return `<span class="lg plain ${cls||""}" style="--b:${b.col||"#444"};--bi:${b.ink||"#FFFFFF"}" aria-hidden="true"><b>${esc(ab)}</b></span>`;}
function logo(b,cls){const id=LOGO[b.id];return id?`<span class="lg ${cls||""}" data-b="${b.id}"><img src="${IMG(id)}" alt="" draggable="false" decoding="async"></span>`:plain(b,cls);}
document.addEventListener("error",e=>{const im=e.target;if(!im||im.tagName!=="IMG")return;const w=im.closest(".lg[data-b]");if(w){const b=any(w.dataset.b);if(b){const cls=[...w.classList].filter(c=>c!=="lg").join(" ");w.outerHTML=plain(b,cls);}}},true);
const nm=b=>`<span class="nm"><b>${b.he}</b><i dir="ltr">${esc(b.en)}</i></span>`;
let toastT=0;
function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;t.style.animation="none";void t.offsetWidth;t.style.animation="";clearTimeout(toastT);toastT=setTimeout(()=>{t.hidden=true;},2800);}

/* ===================== ranks, points, badges ===================== */
const RANKS=[[0,"בלש טירון"],[150,"בלש"],[400,"בלש בכיר"],[800,"מפקח"],[1500,"ראש הבולשת"]];
function rank(p){let i=0;RANKS.forEach((r,k)=>{if(p>=r[0])i=k;});return {i,name:RANKS[i][1],base:RANKS[i][0],next:RANKS[i+1]||null};}
function hud(what){
 $("#h-pts").textContent=S.pts;$("#h-keys").textContent=S.keys;$("#h-rank").textContent=rank(S.pts).name;
 if(what){const el=$("#h-"+what+"-wrap");if(el){el.classList.remove("bump");void el.offsetWidth;el.classList.add("bump");}}
}
function addPts(n){if(!n)return;const before=rank(S.pts).i;S.pts+=n;save();hud("pts");const r=rank(S.pts);if(r.i>before)later0(()=>toast("עלית בדרגה: "+r.name+"!"),900);}
function addKeys(n){S.keys+=n;save();hud("keys");}
function later0(fn,ms){setTimeout(fn,ms);}
function solve(id){if(BM[id]&&!SOLVED.has(id)){SOLVED.add(id);save();return true;}return false;}
const FAMS=GROUPS.filter(g=>g.members.length>=3);
const BADGES=[
 {id:"eye",he:"עין חדה",d:"זיהית 10 סמלים במשימה ״מי מסתתר?״",t:()=>st("revealOK")>=10},
 {id:"fast",he:"מהיר כמו ברק",d:"זיהית סמל בפחות משתי שניות",t:()=>st("fast")>=1},
 {id:"sorter",he:"מסדר משפחות",d:"מיינת 12 מותגים נכון בסיבוב אחד",t:()=>st("sortBest")>=12},
 {id:"hist",he:"היסטוריון",d:"7 תשובות נכונות ב״חקירת עבר״",t:()=>st("histBest")>=7},
 {id:"truth",he:"גלאי אמת",d:"10 תשובות נכונות ברצף ב״אמת או בדותה״",t:()=>st("tfStreak")>=10},
 {id:"odd",he:"מוצא את המוזר",d:"8 מתוך 8 ב״היוצא דופן״",t:()=>st("oddBest")>=8},
 {id:"daily3",he:"חוקר מתמיד",d:"פתרת את החקירה היומית 3 ימים ברצף",t:()=>S.streak>=3},
 {id:"first",he:"ברמז הראשון",d:"פתרת חקירה יומית כבר ברמז הראשון",t:()=>st("daily1")>=1},
 {id:"vault",he:"פותח כספות",d:"פתחת 5 תיקים בכספת",t:()=>OPENED.size>=5},
 {id:"family",he:"כל המשפחה",d:"פיענחת את כל המותגים של משפחה אחת",t:()=>FAMS.some(g=>g.members.every(id=>SOLVED.has(id)))},
 {id:"duel",he:"אלוף הדו-קרב",d:"ניצחת בדו-קרב",t:()=>st("duelWins")>=1},
 {id:"half",he:"חצי מהתיקים",d:"פיענחת 41 מותגים",t:()=>SOLVED.size>=41},
 {id:"time",he:"נוסע בזמן",d:"6 תשובות נכונות ב״מנהרת הזמן״",t:()=>st("tunnelBest")>=6}
];
function checkBadges(){const got=[];BADGES.forEach(b=>{if(!HAVE.has(b.id)&&b.t()){HAVE.add(b.id);got.push(b);}});if(got.length){save();setTimeout(()=>{toast("תג חדש: "+got.map(b=>b.he).join(", "));beep("win");},600);}}

/* ===================== routing ===================== */
const VIEWS=["hq","files","board","games"];
let VIEW="";
function go(v){
 if(!VIEWS.includes(v))v="hq";
 if(VIEW==="games"&&v!=="games"&&G)quitGame(true);
 VIEW=v;
 VIEWS.forEach(x=>{$("#v-"+x).hidden=x!==v;const t=$(`.dock [data-go="${x}"]`);if(t)t.setAttribute("aria-current",x===v?"page":"false");});
 if(v==="hq")renderHQ();
 if(v==="files")renderFiles();
 if(v==="board")renderBoard(false);
 if(v==="games"&&!G)renderMissions();
 if(location.hash.slice(1)!==v){try{history.replaceState(null,"","#"+v);}catch(e){}}
 window.scrollTo(0,0);
}
window.addEventListener("hashchange",()=>{const h=location.hash.slice(1);if(VIEWS.includes(h)&&h!==VIEW)go(h);});

/* ===================== HQ ===================== */
function todayStr(d){d=d||new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function yesterdayStr(){const d=new Date();d.setDate(d.getDate()-1);return todayStr(d);}
function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
const DAILY_POOL=B.filter(b=>EASY.has(b.id)).map(b=>b.id).sort();
function dailyState(){const ds=todayStr();if(!S.daily||S.daily.date!==ds||!BM[S.daily.id]){S.daily={date:ds,id:DAILY_POOL[hashStr("bs-"+ds)%DAILY_POOL.length],clue:1,guesses:[],done:false,won:false};save();}return S.daily;}
function clues(b){
 const g=famOf(b),lead=g&&g.lead===b.id,dec=Math.floor(b.y/10)*10;
 return [
  {t:"ארץ המוצא",h:`${flag(b.o,"md")}<span>${C[b.o]}</span>`},
  {t:"מתי נוסדה",h:`<span>בין ${dec} ל-${dec+9}</span>`},
  {t:"המשפחה היום",h:lead?`<span>היא המותג הראשי של קבוצה גדולה מ${C[g.hq]}</span>`:`<span>${esc(g?g.he:ownerName(b))}</span>`},
  {t:"עדות בגוף ראשון",h:`<span>״${esc(b.q)}״</span>`},
  canGuess(b)?{t:"הסמל",h:logo(b,"md")}:{t:"האות הראשונה באנגלית",h:`<span dir="ltr" class="mono">${esc(b.en[0])} ${"_ ".repeat(Math.max(0,b.en.length-1))}</span>`}
 ];
}
const DAILY_PTS=[60,45,30,20,10];
function dailyHTML(){
 const d=dailyState(),b=BM[d.id],cl=clues(b),[yy,mm,dd]=d.date.split("-");
 const list=cl.map((c,i)=>{const on=i<d.clue||d.done;return `<li class="clue ${on?"on":"off"}"><span class="n">${i+1}</span><div><span class="t">${c.t}</span><div class="v">${on?c.h:"נפתח אחרי ניחוש לא נכון"}</div></div></li>`;}).join("");
 let tail="";
 if(!d.done){
  tail=`<div class="guess"><div class="guess-row"><label class="field"><span class="sr">ניחוש</span><input id="d-in" type="search" autocomplete="off" placeholder="מי החשוד? הקלידו שם של מותג"></label><button type="button" class="btn sm ghost" id="d-skip">רמז הבא</button></div><ul class="sugg" id="d-sugg"></ul>
   ${d.guesses.length?`<div class="tried">${d.guesses.map(id=>`<span>${BM[id]?BM[id].he:""}</span>`).join("")}</div>`:""}</div>`;
 }else{
  const sq=[0,1,2,3,4].map(i=>d.won&&i===d.clue-1?"🟩":i<d.clue-(d.won?1:0)?"🟥":"⬜").join("");
  tail=`<div class="result ${d.won?"ok":"no"}"><div class="result-top">${logo(b,"md")}<div><b style="font-size:20px">${d.won?`פוענח ברמז ${d.clue}!`:"הפעם החשוד ברח"}</b><div>התשובה: ${b.he} <span class="mono" dir="ltr">${esc(b.en)}</span></div><div class="squares" aria-hidden="true">${sq}</div></div></div>
   <div class="row"><button type="button" class="btn sm" data-open="${b.id}">לתיק המלא</button><button type="button" class="btn sm ghost" id="d-copy">העתקת התוצאה</button>${S.streak>1&&d.won?`<span class="muted" style="font-weight:700">רצף: ${S.streak} ימים</span>`:""}</div>
   <p class="muted" style="margin:0;font-size:14px">חקירה חדשה מחר. אותה חקירה מחכה לכל מי שמשחק היום, אז אפשר להשוות.</p></div>`;
 }
 return `<article class="paper card span2" id="daily"><div class="daily-top"><div><h3>החקירה היומית</h3><span class="daily-date">${dd}.${mm}.${yy} · חמישה רמזים, חשוד אחד</span></div><span class="stamp">${d.done?(d.won?"נסגר":"לא נפתר"):"דחוף"}</span></div><ol class="clues">${list}</ol>${tail}</article>`;
}
function dailyGuess(id){
 const d=dailyState();if(d.done)return;const b=BM[d.id];
 if(id===d.id){
  d.done=true;d.won=true;const p=DAILY_PTS[d.clue-1]||10;
  S.streak=S.lastWin===yesterdayStr()?S.streak+1:(S.lastWin===d.date?S.streak:1);S.lastWin=d.date;
  if(d.clue===1)stAdd("daily1");
  solve(id);save();addPts(p);addKeys(2);beep("win");toast(`פוענח! +${p} נקודות ושני מפתחות`);
 }else{
  if(id)d.guesses.push(id);
  beep(id?"no":"tick");
  if(d.clue<5)d.clue++;else{d.done=true;d.won=false;S.streak=0;}
  save();
 }
 checkBadges();renderHQ(true);
}
function bindDaily(){
 const inp=$("#d-in");if(!inp)return;
 const sug=$("#d-sugg");
 inp.addEventListener("input",()=>{const q=norm(inp.value);if(!q){sug.innerHTML="";return;}const d=dailyState();const m=B.filter(b=>!d.guesses.includes(b.id)&&(norm(b.he).includes(q)||norm(b.en).includes(q))).slice(0,6);sug.innerHTML=m.length?m.map(b=>`<li><button type="button" data-guess="${b.id}">${logo(b,"xs")}${b.he}</button></li>`).join(""):`<li class="muted" style="font-size:14px">אין מותג כזה במשחק</li>`;});
 inp.addEventListener("keydown",e=>{if(e.key==="Enter"){const f=$("[data-guess]",sug);if(f){e.preventDefault();dailyGuess(f.dataset.guess);}}});
 $("#d-skip").addEventListener("click",()=>dailyGuess(null));
}
function shareText(){const d=dailyState(),b=BM[d.id],[y,m,dd]=d.date.split("-");const sq=[0,1,2,3,4].map(i=>d.won&&i===d.clue-1?"🟩":i<d.clue-(d.won?1:0)?"🟥":"⬜").join("");return `בלש הסמלים · חקירה יומית ${dd}.${m}\n${d.won?`פוענח ברמז ${d.clue} מתוך 5`:"לא פוענח"}\n${sq}`;}

function renderHQ(keepDailyFocus){
 const wasOpen=!!($("#v-hq details.parents")||{}).open;
 const me=PID?(PLAYERS[PID]?PLAYERS[PID].n:SYNC&&SYNC.n):"";
 const r=rank(S.pts),pct=r.next?Math.round(100*(S.pts-r.base)/(r.next[0]-r.base)):100;
 const vaultTotal=VAULT.length+1;
 $("#v-hq").innerHTML=`<div class="hq">
  <article class="paper card span2 pl-card" id="pl-card"${DBSTATE==="off"?" hidden":""}>${DBSTATE==="off"?"":playersInner()}</article>
  ${dailyHTML()}
  <article class="paper card rank-card"><div class="rank-row">${IC.medal(true).replace("<svg","<svg class=\"medal\"")}<div><h3>${me?esc(me)+" · ":""}${r.name}</h3><div class="muted">${S.pts} נקודות חקירה${r.next?` · עוד ${r.next[0]-S.pts} עד ״${r.next[1]}״`:" · הדרגה הגבוהה ביותר"}</div></div></div><div class="bar" role="img" aria-label="${pct}% עד הדרגה הבאה"><i style="width:${pct}%"></i></div>
   <div class="stats"><div class="stat"><b>${SOLVED.size}/${B.length}</b><span>תיקים פוענחו</span></div><div class="stat"><b>${S.keys}</b><span>מפתחות לכספת</span></div><div class="stat"><b>${OPENED.size}/${vaultTotal}</b><span>תיקים סגורים נפתחו</span></div></div>
   <div class="row"><button type="button" class="btn sm" data-go="games">למשימות</button><button type="button" class="btn sm ghost" data-go="files" data-seg-open="vault">לכספת</button></div></article>
  <article class="paper card"><h3>תגי בלש</h3><div class="muted" style="font-size:14px">${HAVE.size} מתוך ${BADGES.length}</div><div class="medals">${BADGES.map(b=>`<div class="medal-i ${HAVE.has(b.id)?"on":""}">${IC.medal(HAVE.has(b.id))}<div><b>${b.he}</b><small>${b.d}</small></div></div>`).join("")}</div></article>
  <details class="paper parents span2"><summary>להורים: על המשחק</summary>
   <p>בלש הסמלים הוא משחק חינמי בעברית לילדים שאוהבים מכוניות. יש בו ${B.length} מותגים, סיפור על כל מותג ומשימות: זיהוי סמל מוסתר, מיון למשפחות, היוצא דופן, אמת או בדותה, חקירת עבר, דו-קרב לשני שחקנים על אותו מכשיר, מנהרת הזמן של הסמלים, וחקירה יומית אחת שזהה לכולם.</p>
   <p>במשימות שבהן מנחשים מותג לפי הסמל לא מופיעים סמלים שכתוב בהם שם המותג (למשל פיג׳ו, לנד רובר, BMW). לוח החקירה מראה בעלות בחמש נקודות זמן, כי בעלות על מותג משתנה עם השנים. ״הכספת״ מכילה מותגים שכבר לא בונים מכוניות. מידע הבעלות מעודכן לנובמבר 2026.</p>
   <h4 class="sub-h">לוח הבלשים המשפחתי</h4>
   <p>הלוח משותף רק למכשירים שנכנסו עם אותו קוד משפחה. כל ילד בוחר את השם שלו במטה, בכל מכשיר שהוא משחק בו, והנקודות, התיקים, התגים והחקירה היומית מופיעים בכל המכשירים. נשמרים רק השם, הצבע וההתקדמות במשחק: אין הרשמה ואין כתובת מייל, ולכן כדאי לבחור כינוי ולא שם מלא. אם אין חיבור, ההתקדמות נשמרת במכשיר ונשלחת כשהחיבור חוזר. כאן אפשר לשנות שם של שחקן או למחוק אותו.</p>
   <div id="pl-admin">${plAdminHTML()}</div>
   <h4 class="sub-h">ציר הזמן של הסמלים</h4>
   <p>סמלים קודמים של 32 מותגים, עם השנים שבהן השתמשו בכל אחד. הם מופיעים בתיק של המותג ובמשימה ״מנהרת הזמן של הסמלים״.</p>
   <div id="arch">${archHTML()}</div>
   <div class="row" style="margin-top:14px"><button type="button" class="btn sm ghost" id="reset">${me?`איפוס ההתקדמות של ${esc(me)}`:"איפוס ההתקדמות בדפדפן הזה"}</button></div>
  </details>
 </div>`;
 if(wasOpen){const dt=$("#v-hq details.parents");if(dt)dt.open=true;}
 bindDaily();
 if(keepDailyFocus){const i=$("#d-in");if(i)i.focus({preventScroll:true});}
 const rs=$("#reset");if(rs)rs.addEventListener("click",()=>{if(rs.dataset.sure){const keep={sound:S.sound,names:S.names};Object.assign(S,freshState(),keep);SOLVED.clear();OPENED.clear();HAVE.clear();if(PID&&SYNC){SYNC.e=(SYNC.e||1)+1;SYNC.needSet=true;}save();hud();renderHQ();toast("ההתקדמות אופסה");}else{rs.dataset.sure="1";rs.textContent="בטוחים? לחצו שוב לאיפוס";}});
}

/* ===================== case files ===================== */
let FSEG="open";
function famOptions(){return `<option value="all">כל המשפחות</option>`+GROUPS.map(g=>`<option value="${g.id}">${g.he}</option>`).join("")+`<option value="indep">בלי חברת אם</option>`;}
function folderHTML(b){
 const o=ownerCodes(b);
 return `<button type="button" class="folder" data-open="${b.id}" aria-label="${b.he}, ${esc(b.en)}${SOLVED.has(b.id)?", פוענח":""}"><span class="tab">${caseNo(b.id)}</span><span class="body">${logo(b,"md")}<span class="he">${b.he}</span><span class="en" dir="ltr">${esc(b.en)}</span><span class="fl">${flag(b.o,"sm")}${o.some(c=>c!==b.o)?`<span aria-hidden="true">←</span>${o.map(c=>flag(c,"sm")).join("")}`:""}</span></span>${SOLVED.has(b.id)?`<span class="stamp ok">פוענח</span>`:""}</button>`;
}
function renderFiles(){
 $$("[data-seg]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.seg===FSEG?"true":"false"));
 $("#files-open").hidden=FSEG!=="open";$("#files-vault").hidden=FSEG!=="vault";
 if(FSEG==="open"){
  const sel=$("#f-fam");if(!sel.options.length)sel.innerHTML=famOptions();
  const q=norm($("#f-q").value),fam=sel.value,un=$("#f-unsolved").checked;
  const list=B.filter(b=>(!q||norm(b.he).includes(q)||norm(b.en).includes(q))&&(fam==="all"||(fam==="indep"?!b.g:b.g===fam))&&(!un||!SOLVED.has(b.id)));
  $("#f-count").textContent=`${list.length} תיקים · ${SOLVED.size} מתוך ${B.length} פוענחו`;
  $("#folders").innerHTML=list.length?list.map(folderHTML).join(""):`<div class="empty">אין תיקים שמתאימים לחיפוש.</div>`;
 }else{
  const items=[BM.autocars,...VAULT];
  $("#vault-lead").innerHTML=`כאן שמורים תיקים של מותגים שכבר לא בונים מכוניות. כל תיק נפתח במפתח אחד. יש לכם ${S.keys} ${S.keys===1?"מפתח":"מפתחות"}, ומקבלים עוד בכל משימה שמסתיימת בהצלחה.`;
  $("#vault").innerHTML=items.map(v=>{const op=OPENED.has(v.id);const yrs=v.id==="autocars"?"1957–1980":`${v.y}–${v.end}`;
   return `<button type="button" class="folder vfile ${op?"open":""}" data-vault="${v.id}" aria-label="${op?v.he:"תיק נעול"}"><span class="tab">${op?"פתוח":"סודי"}</span><span class="body">${op?`${logo(v,"md")}<span class="he">${v.he}</span><span class="yrs" dir="ltr">${yrs}</span>`:`${IC.lock}<span class="yrs" dir="ltr">${yrs}</span><span style="font-size:14px;font-weight:700">${flag(v.c||v.o,"sm")} ${C[v.c||v.o]}</span>`}</span></button>`;}).join("");
 }
}

/* ===================== sheets ===================== */
let lastFocus=null;
function openSheet(html,label){lastFocus=document.activeElement;const ov=$("#overlay"),sh=$("#sheet");sh.innerHTML=html;sh.setAttribute("aria-label",label||"");ov.hidden=false;document.documentElement.style.overflow="hidden";sh.scrollTop=0;sh.focus({preventScroll:true});}
function closeSheet(){stopSpeak();$("#overlay").hidden=true;document.documentElement.style.overflow="";if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});}
const canSpeak=(()=>{try{return "speechSynthesis" in window&&typeof SpeechSynthesisUtterance!=="undefined";}catch(e){return false;}})();
function stopSpeak(){if(canSpeak){try{speechSynthesis.cancel();}catch(e){}}}
function speak(text,btn){if(!canSpeak)return;try{if(btn.getAttribute("aria-pressed")==="true"){stopSpeak();btn.setAttribute("aria-pressed","false");return;}stopSpeak();const u=new SpeechSynthesisUtterance(text);u.lang="he-IL";u.rate=.92;const v=speechSynthesis.getVoices().find(v=>/^he|^iw/i.test(v.lang));if(v)u.voice=v;u.onend=u.onerror=()=>btn.setAttribute("aria-pressed","false");btn.setAttribute("aria-pressed","true");speechSynthesis.speak(u);}catch(e){}}
function openBrand(id){
 const b=BM[id];if(!b)return;
 const g=famOf(b),o=ownerCodes(b);
 const sibs=g?g.members.filter(x=>x!==id):[];
 const solved=SOLVED.has(id);
 const html=`<div class="sheet-bar"><span class="caseno">${caseNo(id)} · ${esc(b.en.toUpperCase())}</span><button type="button" class="x" data-close aria-label="סגירה">${IC.x}</button></div>
  <div class="file-hero"><div class="polaroid">${logo(b,"lg2")}</div><div><h2 id="sheet-title">${b.he}</h2><div class="en" dir="ltr">${esc(b.en)}</div></div></div>
  <div class="facts"><div><small>נוסדה</small><b class="mono">${b.y}</b></div><div><small>ארץ המוצא</small><b>${flag(b.o,"sm")} ${C[b.o]}</b>${b.oNote?`<small>${b.oNote}</small>`:""}</div><div><small>הבעלים היום</small><b>${o.map(c=>flag(c,"sm")).join("")} ${esc(ownerName(b))}</b></div></div>
  ${b.gone?`<p class="note" style="transform:none"><b>התיק נסגר</b>${esc(b.gone)}</p>`:""}
  <div class="blk"><h3>שרשרת הבעלות</h3><ol class="chain">${b.j.map(s=>`<li><span class="yr">${s[1]}</span>${flag(s[0],"sm")}<span>${esc(s[2])}</span></li>`).join("")}</ol></div>
  ${erasBlock(b)}
  <div class="blk"><div class="row" style="justify-content:space-between"><h3>הסיפור</h3>${canSpeak?`<button type="button" class="say" data-say aria-pressed="false">${IC.speaker}<span>הקראה</span></button>`:""}</div><p class="story">${esc(b.s)}</p><div class="note"><b>ממצא מעניין</b>${esc(b.f)}</div>
   <button type="button" class="secret" data-secret aria-expanded="false">עדות סודית: לחצו כדי לקרוא מה ${b.he} אומרת על עצמה</button></div>
  ${g?`<div class="blk"><h3>${g.he}</h3><p class="muted" style="margin:0 0 10px;max-width:62ch">${esc(g.about)}</p><div class="sibs">${sibs.map(x=>`<button type="button" class="sib" data-open="${x}">${logo(BM[x],"xs")}${BM[x].he}</button>`).join("")}</div></div>`:""}
  <div class="status-line">${solved?`<span class="stamp ok">פוענח</span><span class="muted">זיהיתם את המותג הזה באחת המשימות.</span>`:`<span class="stamp">פתוח</span><span class="muted">כדי לסגור את התיק, זהו את המותג באחת המשימות או בחקירה היומית.</span>`}</div>`;
 openSheet(html,b.he);
 const sec=$("[data-secret]");sec.addEventListener("click",()=>{sec.setAttribute("aria-expanded","true");sec.textContent="״"+b.q+"״";});
 const say=$("[data-say]");if(say)say.addEventListener("click",()=>speak(b.he+". "+b.s+" "+b.f,say));
}
function openVault(id){
 const v=id==="autocars"?BM.autocars:VM[id];if(!v)return;
 if(!OPENED.has(id)){
  if(S.keys<1){toast("צריך מפתח. מקבלים מפתח בכל משימה שמסתיימת בהצלחה.");return;}
  S.keys--;OPENED.add(id);save();hud("keys");beep("ok");checkBadges();renderFiles();
 }
 if(id==="autocars"){openBrand("autocars");return;}
 const html=`<div class="sheet-bar"><span class="caseno">תיק סגור · ${esc(v.en.toUpperCase())}</span><button type="button" class="x" data-close aria-label="סגירה">${IC.x}</button></div>
  <div class="file-hero"><div class="polaroid">${logo(v,"lg2")}</div><div><h2 id="sheet-title">${v.he}</h2><div class="en" dir="ltr">${esc(v.en)} · ${v.y}–${v.end}</div></div></div>
  <div class="facts"><div><small>שנה ראשונה</small><b class="mono">${v.y}</b></div><div><small>ארץ</small><b>${flag(v.c,"sm")} ${v.cNote||C[v.c]}</b>${v.cNote&&v.c!=="de"?`<small>החברה מ${C[v.c]}</small>`:""}</div><div><small>נסגרה</small><b class="mono">${v.end}</b></div></div>
  <div class="blk"><div class="row" style="justify-content:space-between"><h3>מה היה שם</h3>${canSpeak?`<button type="button" class="say" data-say aria-pressed="false">${IC.speaker}<span>הקראה</span></button>`:""}</div><p class="story">${esc(v.s)}</p></div>
  <div class="blk"><h3>למה התיק נסגר</h3><p class="story">${esc(v.why)}</p><div class="note"><b>ממצא מעניין</b>${esc(v.f)}</div></div>
  ${TRAV[id]?`<div class="row" style="margin-top:16px"><button type="button" class="btn sm" data-route="${id}">לראות את המסע על לוח החקירה</button></div>`:""}`;
 openSheet(html,v.he);
 const say=$("[data-say]");if(say)say.addEventListener("click",()=>speak(v.he+". "+v.s+" "+v.why,say));
}

/* ===================== investigation board ===================== */
let YI=YEARS.length-1,SEL="jaguar",PLAY=0;
const ownLabel=(o,b)=>{const w=OWN[o];if(o==="indep")return "עצמאית";if(o==="sleep")return "לא בנתה מכוניות";if(b&&w.he===b.he)return "עצמאית";return w.he;};
function ownFlags(o){const w=OWN[o];return w.c?flag(w.c,"sm")+(w.c2?flag(w.c2,"sm"):""):"";}
function renderBoard(animate,prevYi){
 $("#years").innerHTML=YEARS.map((y,i)=>`<button type="button" class="yrbtn" data-yi="${i}" aria-pressed="${i===YI}">${y}</button>`).join("")+`<button type="button" class="btn sm" id="play">${PLAY?"עצירה":"נסיעה בזמן"}</button>`;
 $("#yrnote").textContent=YEAR_NOTE[YEARS[YI]];
 const cork=$("#cork"),before={};
 if(animate&&!reduceMotion)$$(".pol",cork).forEach(p=>{before[p.dataset.id]=p.getBoundingClientRect();});
 const by={};Object.keys(TRAV).forEach(id=>{if(!any(id))return;const o=TRAV[id][YI];(by[o]=by[o]||[]).push(id);});
 cork.innerHTML=OWN_ORDER.filter(o=>by[o]).map(o=>{const w=OWN[o];return `<div class="pin ${o==="indep"?"indep":o==="sleep"?"sleep":""}"><div class="pin-head">${ownFlags(o)}<div><b>${w.he}</b>${w.note?`<small>${w.note}</small>`:""}</div></div><div class="pols">${by[o].map(id=>{const b=any(id),mv=prevYi!=null&&TRAV[id][prevYi]!==TRAV[id][YI];const note=TRAV[id][5]&&TRAV[id][5][YI];return `<button type="button" class="pol ${mv?"moved":""}" data-id="${id}" aria-pressed="${id===SEL}" title="${note?esc(note):""}">${logo(b,"sm")}<span>${b.he}</span></button>`;}).join("")}</div></div>`;}).join("");
 if(animate&&!reduceMotion){
  $$(".pol",cork).forEach(p=>{const a=before[p.dataset.id];if(!a)return;const r=p.getBoundingClientRect();const dx=a.left-r.left,dy=a.top-r.top;if(Math.abs(dx)+Math.abs(dy)<2)return;p.style.transition="none";p.style.transform=`translate(${dx}px,${dy}px)`;p.style.zIndex="5";requestAnimationFrame(()=>requestAnimationFrame(()=>{p.style.transition="transform .75s cubic-bezier(.2,.8,.2,1)";p.style.transform="";setTimeout(()=>{p.style.zIndex="";},800);}));});
 }
 renderRoute();
}
function renderRoute(){
 const b=any(SEL),row=TRAV[SEL];if(!b||!row){$("#route").innerHTML="";return;}
 const notes=row[5]||{};
 $("#route").innerHTML=`<div class="route-head">${logo(b,"sm")}<h3>המסע של ${b.he}</h3>${BM[SEL]?`<button type="button" class="btn sm ghost" data-open="${SEL}">לתיק המלא</button>`:""}</div>
  <div class="route-in">${YEARS.map((y,i)=>{const o=row[i],chg=i>0&&row[i-1]!==o;return `<div class="stop ${chg?"chg":""}" ${i===YI?'style="outline:3px solid var(--brass);outline-offset:2px"':""}><span class="y">${y}</span><b>${ownFlags(o)} ${ownLabel(o,b)}</b>${notes[i]?`<small>${esc(notes[i])}</small>`:chg?`<small>בעלים חדשים</small>`:""}</div>`;}).join("")}</div>`;
}
function setYear(i,anim){const prev=YI;YI=i;renderBoard(anim,prev);}
function togglePlay(){
 if(PLAY){clearInterval(PLAY);PLAY=0;renderBoard(false);return;}
 if(YI===YEARS.length-1)setYear(0,true);
 PLAY=setInterval(()=>{if(YI>=YEARS.length-1||VIEW!=="board"){clearInterval(PLAY);PLAY=0;renderBoard(false);return;}setYear(YI+1,true);},2300);
 renderBoard(false);
}

/* ===================== missions ===================== */
const MISSIONS=[
 {id:"reveal",ic:"glass",he:"מי מסתתר מאחורי הסמל?",d:"הסמל מופיע לאט: מזכוכית מגדלת, מצל או מאחורי פתקים. כמה שמזהים מהר יותר, מקבלים יותר נקודות."},
 {id:"sort",ic:"boxes",he:"מי שייך למי?",d:"45 שניות. כל מותג נכנס לארגז של המשפחה שלו."},
 {id:"odd",ic:"odd",he:"היוצא דופן",d:"שלושה מותגים מאותה משפחה או מאותה מדינה, ואחד לא. מי?"},
 {id:"tf",ic:"news",he:"אמת או בדותה",d:"קטעי עיתון על מותגים. חלק אמיתיים וחלק מומצאים."},
 {id:"hist",ic:"clock",he:"חקירת עבר",d:"למי היה שייך מותג בשנה מסוימת, מי קנה את מי, ובאיזה סדר החליפו בעלים."},
 {id:"duel",ic:"duel",he:"דו-קרב",d:"שני שחקנים על אותו מכשיר. מי שלוחץ ראשון עונה."},
 {id:"tunnel",ic:"tunnel",he:"מנהרת הזמן של הסמלים",d:"איך נראו הסמלים פעם? סדרו אותם מהישן לחדש, וגלו באיזה סמל משתמשים היום."}
];
function renderMissions(){
 const tp=tunnelPool().length;
 $("#missions").innerHTML=MISSIONS.map((m,i)=>{
  const off=m.id==="tunnel"&&tp<3;
  const line=m.id==="duel"?(st("duelWins")?`ניצחונות: ${st("duelWins")}`:"צריך שני שחקנים"):off?(ERASTATE==="wait"?"טוען את ציר הזמן…":ERASTATE==="off"?"ציר הזמן לא זמין כרגע":"מחכה לסמלים: ההורים מוסיפים אותם במטה"):(S.best[m.id]?`השיא שלך: ${S.best[m.id]} נקודות`:"עוד לא שוחקה");
  return `<button type="button" class="paper mission"${off?" disabled":` data-start="${m.id}"`}><span class="mi">${IC[m.ic]}</span><span><span class="no">משימה ${i+1}</span><h3>${m.he}</h3><p>${m.d}</p><span class="best">${line}</span></span></button>`;}).join("");
}
let G=null;
function startGame(id){
 stopTimers();
 G={id,tok:{},timers:[],iv:0,pts:0,ok:0,n:0,res:[]};
 $("#games-grid").hidden=true;const box=$("#gamebox");box.hidden=false;
 const m=MISSIONS.find(x=>x.id===id);
 box.innerHTML=`<div class="g-top"><button type="button" class="btn sm ghost" data-quit>יציאה</button><div class="g-title"><b>${m.he}</b><span id="g-sub"></span></div><div class="g-score"><b id="g-pts">0</b><span id="g-prog"></span></div></div><div id="g-body"></div>`;
 ({reveal:revealSetup,sort:sortStart,odd:oddStart,tf:tfStart,hist:histStart,duel:duelSetup,tunnel:tunnelStart})[id]();
 window.scrollTo(0,0);
}
function stopTimers(){if(G){G.timers.forEach(t=>clearTimeout(t));G.timers=[];clearInterval(G.iv);G.iv=0;G.tok=null;}}
function quitGame(silent){stopTimers();G=null;$("#gamebox").hidden=true;$("#gamebox").innerHTML="";$("#games-grid").hidden=false;if(!silent)renderMissions();}
function later(fn,ms){if(!G)return;const tok=G.tok;const t=setTimeout(()=>{if(G&&G.tok===tok)fn();},ms);G.timers.push(t);return t;}
function setScore(){const p=$("#g-pts");if(p)p.textContent=G.pts;}
function setProg(t){const p=$("#g-prog");if(p)p.textContent=t;}
function body(){return $("#g-body");}
function optHTML(opts,cls){return `<div class="opts ${cls||""}" id="opts">${opts.map((o,i)=>`<button type="button" class="opt" data-i="${i}">${o}</button>`).join("")}</div>`;}
function markOpts(ans,chosen){$$("#opts .opt").forEach(x=>{const i=+x.dataset.i;x.disabled=true;if(i===ans)x.classList.add("ok");else if(i===chosen)x.classList.add("no");else x.classList.add("dim");});}
function feedback(ok,title,text,extra){return `<div class="fb-msg ${ok?"ok":"no"}"><b>${title}</b>${text||""}</div><div class="fb-act">${extra||""}<button type="button" class="btn" data-next>${G&&G.n+1>=G.total?"לסיכום":"הבא"}</button></div>`;}
function endGame(opts){
 const id=G.id,total=G.total||G.n,ok=G.ok,pts=G.pts;
 stopTimers();
 const best=S.best[id]||0,isBest=pts>best;
 if(isBest)S.best[id]=pts;
 const earned=opts&&opts.key!=null?opts.key:(ok*2>=total&&total>0);
 if(earned)S.keys++;
 save();addPts(pts);hud("keys");checkBadges();
 beep(earned?"win":"tick");
 body().innerHTML=`<div class="paper summary"><span class="stamp ${earned?"ok":""}">${earned?"המשימה הושלמה":"כמעט"}</span><div class="big">${pts}</div><div class="muted">נקודות${opts&&opts.line?` · ${opts.line}`:` · ${ok} נכונות מתוך ${total}`}</div>
  ${G.res.length?`<div class="dots" aria-hidden="true">${G.res.map(r=>`<i class="${r?"ok":""}"></i>`).join("")}</div>`:""}
  ${isBest&&pts>0?`<b>שיא חדש!</b>`:best?`<span class="muted">השיא שלך: ${best}</span>`:""}
  ${earned?`<div class="row" style="justify-content:center">${IC.key}<b>קיבלתם מפתח לכספת</b></div>`:`<span class="muted">עם חצי תשובות נכונות מקבלים מפתח לכספת.</span>`}
  <div class="row" style="justify-content:center"><button type="button" class="btn" data-again="${id}">שוב</button><button type="button" class="btn ghost" data-quit>למשימות</button></div></div>`;
 G.over=true;
}

/* ---------- 1. who hides behind the logo ---------- */
const ALPHA={};
function checkAlpha(id){return new Promise(res=>{if(id in ALPHA)return res(ALPHA[id]);const im=new Image();const done=v=>{ALPHA[id]=v;res(v);};im.onload=()=>{try{const w=48,h=48,c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data;let n=0;[[0,0],[w-1,0],[0,h-1],[w-1,h-1],[w>>1,0],[0,h>>1]].forEach(([px,py])=>{if(d[(py*w+px)*4+3]<24)n++;});done(n>=5);}catch(e){done(false);}};im.onerror=()=>done(false);im.src=IMG(LOGO[id]);setTimeout(()=>{if(!(id in ALPHA))done(false);},2500);});}
function revealSetup(){
 const easyN=B.filter(b=>canGuess(b)&&EASY.has(b.id)).length,allN=B.filter(canGuess).length;
 $("#g-sub").textContent="10 סמלים בכל סיבוב";
 if(allN<4){body().innerHTML=`<div class="paper gcard"><p>כדי לשחק צריך סמלים, והם לא נטענו. נסו לרענן את הדף.</p></div>`;return;}
 body().innerHTML=`<div class="paper gcard"><p class="q-text">באיזו רמה?</p><div class="lvl"><button type="button" data-lvl="easy"><b>חוקר מתחיל</b><span>${easyN} סמלים מוכרים מהכביש</span></button><button type="button" data-lvl="pro"><b>בלש מומחה</b><span>כל ${allN} הסמלים, עם אפשרויות מבלבלות</span></button></div></div>`;
}
async function revealStart(level){
 G.level=level;G.total=10;
 const pool=B.filter(b=>canGuess(b)&&(level==="pro"||EASY.has(b.id)));
 G.pool=shuffle(pool).slice(0,Math.min(10,pool.length));G.total=G.pool.length;
 body().innerHTML=`<div class="paper gcard"><p class="q-text">מכינים את הזכוכית המגדלת…</p></div>`;
 const tok=G.tok;
 await Promise.all(G.pool.map(b=>checkAlpha(b.id)));
 if(!G||G.tok!==tok)return;
 revealRound();
}
function revealOptions(b){
 const pool=B.filter(x=>x.id!==b.id);let d;
 if(G.level==="pro"){const near=shuffle(pool.filter(x=>x.o===b.o||(b.g&&x.g===b.g))).slice(0,2);d=near.concat(sample(pool.filter(x=>!near.includes(x)),3-near.length));}
 else d=sample(pool.filter(x=>EASY.has(x.id)),3);
 return shuffle([b,...d]);
}
function revealRound(){
 const b=G.pool[G.n];G.cur=b;G.answered=false;
 const kinds=["zoom",ALPHA[b.id]?"shadow":"tiles","tiles"];const kind=kinds[G.n%3];G.kind=kind;
 const opts=revealOptions(b);G.opts=opts;G.ans=opts.indexOf(b);
 setProg(`${G.n+1}/${G.total}`);$("#g-sub").textContent={zoom:"זכוכית מגדלת",shadow:"צל",tiles:"מאחורי הפתקים"}[kind];
 const ox=30+rnd(41),oy=30+rnd(41);
 body().innerHTML=`<div class="paper gcard"><div class="stage-wrap"><div class="stage s-${kind}" id="stage"><img id="st-img" alt="סמל מוסתר" draggable="false" style="transform-origin:${ox}% ${oy}%;${kind==="zoom"?"transform:scale(4.6)":""}">${kind==="tiles"?`<div class="tiles" id="tiles">${"<i></i>".repeat(16)}</div>`:""}</div><div class="timer"><i id="tbar" style="--dur:8s"></i></div></div>
  <p class="q-text" style="margin-top:14px">מי מסתתר מאחורי הסמל?</p>${optHTML(opts.map(o=>nm(o)))}<div class="fb" id="fb"></div></div>`;
 const img=$("#st-img");let started=false;
 const begin=()=>{if(started||!G||G.answered)return;started=true;G.t0=performance.now();$("#tbar").classList.add("run");
  if(kind==="zoom"){requestAnimationFrame(()=>requestAnimationFrame(()=>{img.style.transition="transform 7.5s linear";img.style.transform="scale(1)";}));}
  if(kind==="shadow"){later(()=>$("#stage")&&$("#stage").classList.add("lit"),4500);}
  if(kind==="tiles"){const order=shuffle([...Array(16).keys()]);order.forEach((k,i)=>later(()=>{const t=$$("#tiles i")[k];if(t)t.classList.add("off");},350+i*420));}
 };
 img.onload=begin;img.onerror=begin;
 img.src=IMG(LOGO[b.id]);
 if(img.complete&&img.naturalWidth)begin();
}
function revealAnswer(i){
 if(G.answered)return;G.answered=true;
 const b=G.cur,ok=i===G.ans,el=G.t0?(performance.now()-G.t0)/1000:9;
 const img=$("#st-img");if(img){img.style.transition="none";img.style.transform="none";}$("#stage").classList.add("lit");$$("#tiles i").forEach(t=>t.classList.add("off"));$("#tbar").style.animationPlayState="paused";
 markOpts(G.ans,i);G.res.push(ok);
 let p=0;
 if(ok){p=Math.max(10,Math.round(100-el*11));G.pts+=p;G.ok++;solve(b.id);stAdd("revealOK");if(el<2)stAdd("fast");beep("ok");}else beep("no");
 setScore();save();
 $("#fb").innerHTML=feedback(ok,ok?`נכון! +${p}`:`זו ${b.he}`,`${ok?`זיהיתם אחרי ${el.toFixed(1)} שניות. `:""}${esc(b.f)}`,`<button type="button" class="btn ghost" data-open="${b.id}">לתיק</button>`);
}

/* ---------- 2. sort into families ---------- */
function sortStart(){
 const fams=sample(FAMS,3);G.fams=fams;G.queue=shuffle(fams.flatMap(g=>g.members));G.time=45;G.combo=0;G.total=0;
 $("#g-sub").textContent="45 שניות";
 body().innerHTML=`<div class="paper gcard"><div class="sort-top"><span class="clock" id="clock">0:45</span><span class="combo" id="combo"></span></div><div class="suspect" id="suspect"></div>
  <div class="bins">${fams.map(g=>`<button type="button" class="bin" data-bin="${g.id}">${flag(g.hq,"sm")}<span>${g.he}</span><i dir="ltr">${esc(g.en)}</i></button>`).join("")}</div><p class="fbline" id="fbline"></p></div>`;
 sortNext();
 G.iv=setInterval(()=>{if(!G||G.id!=="sort"||G.over)return;G.time--;const c=$("#clock");if(c){c.textContent="0:"+String(Math.max(0,G.time)).padStart(2,"0");c.classList.toggle("low",G.time<=10);}if(G.time<=0)sortEnd();},1000);
}
function sortNext(){
 if(!G.queue.length){sortEnd();return;}
 const id=G.queue.shift();G.cur=BM[id];G.lock=false;
 const s=$("#suspect");s.classList.remove("in");void s.offsetWidth;s.classList.add("in");
 s.innerHTML=`${logo(G.cur,"md")}${nm(G.cur)}`;setProg(`${G.ok} נכונות`);
}
function sortTap(gid){
 if(G.lock||G.over)return;G.lock=true;G.total++;
 const b=G.cur,ok=b.g===gid,bin=$(`[data-bin="${gid}"]`);
 if(ok){G.combo++;const p=10+Math.min(G.combo-1,5)*2;G.pts+=p;G.ok++;G.res.push(true);solve(b.id);beep("ok");bin.classList.add("hit");$("#fbline").textContent=G.combo>1?`רצף ${G.combo}! +${p}`:`+${p}`;}
 else{G.combo=0;G.res.push(false);beep("no");bin.classList.add("miss");$("#fbline").textContent=`${b.he} שייכת ל${GR[b.g].he}`;}
 $("#combo").textContent=G.combo>1?`רצף ×${G.combo}`:"";setScore();
 later(()=>{$$(".bin").forEach(x=>x.classList.remove("hit","miss"));sortNext();},ok?320:1100);
}
function sortEnd(){if(G.over)return;clearInterval(G.iv);stMax("sortBest",G.ok);endGame({key:G.ok>=6,line:`${G.ok} מותגים במקום הנכון`});}

/* ---------- 3. odd one out ---------- */
const COUNTRY_POOL=Object.entries(B.reduce((m,b)=>{m[b.o]=(m[b.o]||0)+1;return m;},{})).filter(e=>e[1]>=4).map(e=>e[0]);
function oddQ(){
 if(Math.random()<.6){
  const g=pick(FAMS),three=sample(g.members,3).map(id=>BM[id]);
  const others=B.filter(b=>b.g!==g.id),same=others.filter(b=>b.o===g.hq);
  const odd=pick(same.length&&Math.random()<.7?same:others);
  return {items:shuffle([...three,odd]),odd,q:"שלושה מהם באותה משפחה. מי לא?",exp:`${andList(three.map(b=>b.he))} שייכות ל${g.he}. ${!odd.g?`${odd.he} לא שייכת לאף אחת מהקבוצות במשחק`:GR[odd.g].lead===odd.id?`${odd.he} עומדת בראש קבוצה משלה`:`${odd.he} ${pre("שייכת ל",GR[odd.g].he)}`}.`};
 }
 const c=pick(COUNTRY_POOL),three=sample(B.filter(b=>b.o===c),3),odd=pick(B.filter(b=>b.o!==c));
 return {items:shuffle([...three,odd]),odd,q:"שלושה מהם נולדו באותה מדינה. מי לא?",exp:`${andList(three.map(b=>b.he))} נולדו ב${C[c]}. ${odd.he} נולדה ב${C[odd.o]}.`};
}
function oddStart(){G.total=8;$("#g-sub").textContent="8 חשודים";oddRound();}
function oddRound(){
 const q=oddQ();G.q=q;G.ans=q.items.indexOf(q.odd);G.answered=false;setProg(`${G.n+1}/${G.total}`);
 body().innerHTML=`<div class="paper gcard"><p class="q-text">${q.q}</p><div class="four" id="opts">${q.items.map((b,i)=>`<button type="button" class="opt" data-i="${i}">${logo(b,"md")}${nm(b)}</button>`).join("")}</div><div class="fb" id="fb"></div></div>`;
}
function oddAnswer(i){
 if(G.answered)return;G.answered=true;const ok=i===G.ans;markOpts(G.ans,i);G.res.push(ok);
 if(ok){G.pts+=20;G.ok++;G.q.items.forEach(b=>solve(b.id));beep("ok");}else beep("no");setScore();save();
 $("#fb").innerHTML=feedback(ok,ok?"נכון! +20":"לא הפעם",esc(G.q.exp));
}

/* ---------- 4. true or made up ---------- */
function tfStart(){G.total=12;G.list=sample(TF,12);G.streak=0;$("#g-sub").textContent="12 קטעי עיתון";tfRound();}
function tfRound(){
 const s=G.list[G.n];G.answered=false;setProg(`${G.n+1}/${G.total}`);
 body().innerHTML=`<div class="paper gcard"><div class="clip">${esc(s[0])}</div><div class="tf opts" id="opts"><button type="button" class="opt" data-i="1">אמת</button><button type="button" class="opt" data-i="0">בדותה</button></div><div class="fb" id="fb"></div></div>`;
}
function tfAnswer(i){
 if(G.answered)return;G.answered=true;const s=G.list[G.n],ok=i===s[1];
 $$("#opts .opt").forEach(x=>{const v=+x.dataset.i;x.disabled=true;x.classList.add(v===s[1]?"ok":v===i?"no":"dim");});
 G.res.push(ok);
 if(ok){G.ok++;G.streak++;G.pts+=10+Math.min(G.streak-1,5)*2;stMax("tfStreak",G.streak);beep("ok");}else{G.streak=0;beep("no");}
 setScore();save();
 $("#fb").innerHTML=feedback(ok,ok?(s[1]?"נכון, זו אמת":"נכון, זו בדותה"):(s[1]?"דווקא אמת":"זו בדותה"),esc(s[2]));
}

/* ---------- 5. history ---------- */
function travIds(){return Object.keys(TRAV).filter(id=>any(id));}
function seqOf(id){const r=TRAV[id].slice(0,5),out=[];r.forEach((o,i)=>{if(o==="sleep")return;if(!out.length||out[out.length-1].o!==o)out.push({o,y:YEARS[i]});});return out;}
const ORDERABLE=travIds().filter(id=>{const s=seqOf(id);return s.length>=3&&new Set(s.map(x=>x.o)).size===s.length;});
function qOwner(){
 let id,yi,o,guard=0;do{id=pick(travIds());yi=rnd(5);o=TRAV[id][yi];guard++;}while((o==="sleep")&&guard<50);
 const b=any(id),year=YEARS[yi];
 const others=[...new Set(Object.values(TRAV).map(r=>r[yi]))].filter(x=>x!==o&&x!=="sleep"&&ownLabel(x,b)!==ownLabel(o,b));
 const opts=shuffle([o,...sample(others,3)]);
 const note=TRAV[id][5]&&TRAV[id][5][yi];
 const today=yi===YEARS.length-1,indep=o==="indep"||ownLabel(o,b)==="עצמאית";
 const who=today?(indep?`היום ${b.he} עצמאית.`:`היום ${b.he} שייכת ל${pre("",OWN[o].he)}.`):(indep?`ב-${year} ${b.he} הייתה עצמאית.`:`ב-${year} ${b.he} הייתה שייכת ל${pre("",OWN[o].he)}.`);
 const now=TRAV[id][4];
 return {kind:"choice",head:logo(b,"md"),q:today?`היום, למי שייכת ${b.he}?`:`בשנת ${year}, למי הייתה שייכת ${b.he}?`,opts:opts.map(x=>`<span class="row">${ownFlags(x)}<span>${ownLabel(x,b)}</span></span>`),ans:opts.indexOf(o),exp:`${who}${note?" "+note+".":""} ${yi<4&&now!==o&&now!=="sleep"?`היום: ${ownLabel(now,b)}.`:""}`,brands:[id]};
}
function evName(e,k){return e[k]?(BM[e[k]]?BM[e[k]].he:(e[k+"n"]||e[k])):e[k+"n"];}
function qEvent(){
 const e=pick(EVENTS);const A=evName(e,"a"),Bn=evName(e,"b");
 const swap=Math.random()<.5;const P=swap?Bn:A,Q=swap?A:Bn;
 const opts=shuffle([{k:"ab",h:`${A} קנתה את ${Bn}`},{k:"ba",h:`${Bn} קנתה את ${A}`},{k:"merge",h:"הן התאחדו לחברה אחת חדשה"},{k:"part",h:"הן נעשו שותפות, בלי שאחת קנתה את כולה"}]);
 const want=e.t==="buy"?"ab":e.t;
 const head=[e.a&&BM[e.a],e.b&&BM[e.b]].filter(Boolean).map(b=>logo(b,"sm")).join("");
 return {kind:"choice",head:head?`<div class="row" style="justify-content:center">${head}</div>`:"",q:`מה קרה ב-${e.y} בין ${P} ל${pre("",Q)}?`,opts:opts.map(o=>o.h),ans:opts.findIndex(o=>o.k===want),exp:e.x,brands:[e.a,e.b].filter(x=>BM[x])};
}
function qOrder(){
 const id=pick(ORDERABLE),b=any(id),s=seqOf(id);
 return {kind:"order",head:logo(b,"md"),q:`באיזה סדר החליפה ${b.he} בעלים?`,sub:"לחצו מהראשון לאחרון",items:shuffle(s.map((x,i)=>({i,h:`${ownFlags(x.o)} ${ownLabel(x.o,b)}`,y:x.y}))),n:s.length,exp:s.map(x=>`${x.y}: ${ownLabel(x.o,b)}`).join(" ← "),brands:[id]};
}
function histStart(){G.total=8;G.qs=shuffle([qOwner(),qOwner(),qOwner(),qEvent(),qEvent(),qEvent(),qOrder(),qOrder()]);$("#g-sub").textContent="8 שאלות על העבר";histRound();}
function histRound(){
 const q=G.qs[G.n];G.q=q;G.answered=false;G.pickSeq=[];setProg(`${G.n+1}/${G.total}`);
 if(q.kind==="choice"){body().innerHTML=`<div class="paper gcard">${q.head?`<div class="stage-wrap">${q.head}</div>`:""}<p class="q-text">${q.q}</p>${optHTML(q.opts,q.cls)}<div class="fb" id="fb"></div></div>`;}
 else{body().innerHTML=`<div class="paper gcard"><div class="stage-wrap">${q.head}</div><p class="q-text">${q.q}<span class="q-sub">${q.sub}</span></p><div class="order ${q.cls||""}" id="opts">${q.items.map((it,k)=>`<button type="button" class="opt" data-k="${k}"><span class="num"></span><span>${it.h}</span></button>`).join("")}</div><div class="fb" id="fb"></div></div>`;}
}
function histChoice(i){if(G.answered)return;G.answered=true;const q=G.q,ok=i===q.ans;markOpts(q.ans,i);histDone(ok);}
function histPick(k){
 if(G.answered)return;const q=G.q;if(G.pickSeq.includes(k))return;G.pickSeq.push(k);
 const btn=$(`#opts [data-k="${k}"]`);btn.classList.add("picked");$(".num",btn).textContent=G.pickSeq.length;beep("tick");
 if(G.pickSeq.length===q.n){G.answered=true;const ok=G.pickSeq.every((kk,pos)=>q.items[kk].i===pos);
  $$("#opts .opt").forEach(x=>{x.disabled=true;const it=q.items[+x.dataset.k];x.classList.add(ok?"ok":"dim");$(".num",x).textContent=it.i+1;});
  histDone(ok);}
}
function histDone(ok){
 const q=G.q;G.res.push(ok);if(ok){G.ok++;G.pts+=q.kind==="order"?30:20;(q.brands||[]).forEach(solve);beep("ok");}else beep("no");
 setScore();save();
 $("#fb").innerHTML=feedback(ok,ok?`נכון! +${q.kind==="order"?30:20}`:"לא בדיוק",esc(q.exp));
}
function histEnd(){stMax("histBest",G.ok);}

/* ---------- 6. duel for two players ---------- */
function duelQ(){
 const logoPool=B.filter(x=>canGuess(x)&&EASY.has(x.id));
 let t=pick(["logo","logo","family","country","older","tf","event","owner"]);
 if(t==="logo"&&logoPool.length<4)t="family";
 if(t==="logo"){const b=pick(logoPool);const opts=shuffle([b,...sample(B.filter(x=>x.id!==b.id&&EASY.has(x.id)),3)]);const ox=30+rnd(41),oy=30+rnd(41);
  return {head:`<div class="stage-wrap"><div class="stage" id="dstage"><img src="${IMG(LOGO[b.id])}" alt="סמל מוסתר" style="transform-origin:${ox}% ${oy}%;transform:scale(2.6)" id="dimg"></div></div>`,q:"של מי הסמל?",opts:opts.map(nm),ans:opts.indexOf(b),exp:`זה הסמל של ${b.he}.`,reveal:()=>{const i=$("#dimg");if(i){i.style.transition="transform .5s";i.style.transform="none";}},brands:[b.id]};}
 if(t==="family"){const b=pick(B.filter(x=>x.g&&GR[x.g].lead!==x.id&&GR[x.g].members.length>=2));const g=GR[b.g];const opts=shuffle([g,...sample(GROUPS.filter(x=>x.id!==g.id),3)]);
  return {head:`<div class="stage-wrap">${logo(b,"md")}</div>`,q:`לאיזו משפחה שייכת ${b.he}?`,opts:opts.map(x=>`<span class="row">${flag(x.hq,"sm")}<span>${x.he}</span></span>`),ans:opts.indexOf(g),exp:`${b.he} שייכת ל${pre("",g.he)}.`,brands:[b.id]};}
 if(t==="country"){const b=pick(B.filter(x=>x.id!=="autocars"));const cs=shuffle([b.o,...sample([...new Set(B.map(x=>x.o))].filter(c=>c!==b.o),3)]);
  return {head:`<div class="stage-wrap">${logo(b,"md")}</div>`,q:`מאיזו מדינה ${b.he} במקור?`,opts:cs.map(c=>`<span class="row">${flag(c,"sm")}<span>${C[c]}</span></span>`),ans:cs.indexOf(b.o),exp:`${b.he} נוסדה ב${C[b.o]} ב-${b.y}.`,brands:[b.id]};}
 if(t==="older"){let a,b,g=0;do{[a,b]=sample(B.filter(x=>x.id!=="autocars"),2);g++;}while(Math.abs(a.y-b.y)<8&&g<40);const o=[a,b];const old=a.y<b.y?0:1;
  return {head:"",q:"מי נוסדה קודם?",opts:o.map(x=>`${logo(x,"sm")}${nm(x)}`),ans:old,exp:`${a.he} נוסדה ב-${a.y}, ו${b.he} ב-${b.y}.`,cls:"",brands:[]};}
 if(t==="tf"){const s=pick(TF);return {head:`<div class="clip">${esc(s[0])}</div>`,q:"אמת או בדותה?",opts:["אמת","בדותה"],ans:s[1]?0:1,exp:s[2],brands:[]};}
 if(t==="event"){const q=qEvent();return {head:q.head,q:q.q,opts:q.opts,ans:q.ans,exp:q.exp,brands:q.brands};}
 const q=qOwner();return {head:`<div class="stage-wrap">${q.head}</div>`,q:q.q,opts:q.opts,ans:q.ans,exp:q.exp,brands:q.brands};
}
function duelSetup(){
 $("#g-sub").textContent="שני שחקנים, מכשיר אחד";
 body().innerHTML=`<div class="paper gcard setup"><p class="q-text" style="margin:0">מי משחק?</p><div class="pair"><label for="p1">שחקן כחול<input id="p1" maxlength="14" value="${esc(S.names[0]||"")}"></label><label for="p2">שחקן אדום<input id="p2" maxlength="14" value="${esc(S.names[1]||"")}"></label></div>
  <div><b>עד כמה נקודות?</b><div class="seg" role="group" aria-label="יעד" id="target" style="margin-top:6px;background:var(--paper-2);border-color:var(--line)">${[5,7,10].map(n=>`<button type="button" data-t="${n}" aria-pressed="${n===7}" style="color:var(--ink)">${n}</button>`).join("")}</div></div>
  <p class="muted" style="margin:0">שואלים שאלה, ומי שלוחץ ראשון על הכפתור שלו עונה. טעות? התור עובר לשני. כדאי לשבת זה ליד זה, עם הטאבלט על השולחן.</p>
  <button type="button" class="btn big" id="duel-go">להתחיל</button></div>`;
 G.target=7;
}
function duelStart(){
 const n1=($("#p1").value||"").trim()||"כחול",n2=($("#p2").value||"").trim()||"אדום";S.names=[n1,n2];save();
 G.p=[{n:n1,s:0},{n:n2,s:0}];G.n=0;G.total=99;duelNext();
}
function duelNext(){
 const q=duelQ();G.q=q;G.state="buzz";G.tried=[false,false];G.act=-1;G.n++;
 setProg(`שאלה ${G.n}`);
 body().innerHTML=`<div class="duel-score"><div class="ps p1" id="ps0"><span>${esc(G.p[0].n)}</span><b>${G.p[0].s}</b></div><span class="vs">נגד</span><div class="ps p2" id="ps1"><span>${esc(G.p[1].n)}</span><b>${G.p[1].s}</b></div></div>
  <div class="paper gcard">${q.head||""}<p class="q-text">${q.q}</p>${optHTML(q.opts,q.opts.length===2?"":"")}<p class="duel-msg" id="dmsg">מי יודע? לוחצים על הכפתור!</p><div class="fb" id="fb"></div></div>
  <div class="buzzers"><button type="button" class="buzz p1" data-buzz="0">אני!<small>${esc(G.p[0].n)}</small></button><button type="button" class="buzz p2" data-buzz="1">אני!<small>${esc(G.p[1].n)}</small></button></div>`;
 $$("#opts .opt").forEach(x=>x.disabled=true);
}
function duelBuzz(pi){
 if(!G||G.state!=="buzz"||G.tried[pi])return;
 G.state="answer";G.act=pi;beep("buzz");
 $$("[data-buzz]").forEach(x=>x.disabled=true);$(`#ps${pi}`).classList.add("act");
 const o=$("#opts");o.classList.remove("p1","p2");o.classList.add("p"+(pi+1));
 $$("#opts .opt").forEach(x=>{if(!x.classList.contains("no"))x.disabled=false;});
 let left=7;$("#dmsg").textContent=`${G.p[pi].n} עונה… ${left}`;
 clearInterval(G.iv);G.iv=setInterval(()=>{if(!G||G.state!=="answer"){clearInterval(G&&G.iv);return;}left--;const m=$("#dmsg");if(m)m.textContent=`${G.p[pi].n} עונה… ${left}`;if(left<=0){clearInterval(G.iv);duelAnswer(-1);}},1000);
}
function duelAnswer(i){
 if(!G||G.state!=="answer")return;clearInterval(G.iv);
 const pi=G.act,q=G.q;$(`#ps${pi}`).classList.remove("act");
 if(i===q.ans){
  G.p[pi].s++;G.state="done";beep("ok");markOpts(q.ans,-1);if(q.reveal)q.reveal();(q.brands||[]).forEach(solve);save();
  $(`#ps${pi} b`).textContent=G.p[pi].s;
  if(G.p[pi].s>=G.target){duelWin(pi);return;}
  $("#dmsg").textContent=`נקודה ל${pre("",G.p[pi].n)}!`;
  $("#fb").innerHTML=`<div class="fb-msg ok">${esc(q.exp)}</div><div class="fb-act"><button type="button" class="btn" data-dnext>שאלה הבאה</button></div>`;
 }else{
  beep("no");G.tried[pi]=true;
  if(i>=0){const b=$(`#opts [data-i="${i}"]`);b.classList.add("no");b.disabled=true;}
  $$("#opts .opt").forEach(x=>x.disabled=true);
  const other=1-pi;
  if(G.tried[other]){G.state="done";markOpts(q.ans,-1);if(q.reveal)q.reveal();$("#dmsg").textContent="אף אחד לא צדק הפעם.";$("#fb").innerHTML=`<div class="fb-msg no">${esc(q.exp)}</div><div class="fb-act"><button type="button" class="btn" data-dnext>שאלה הבאה</button></div>`;}
  else{G.state="buzz";$(`[data-buzz="${other}"]`).disabled=false;$("#dmsg").textContent=i<0?`נגמר הזמן. ${G.p[other].n}, רוצה לנסות?`:`לא נכון. ${G.p[other].n}, רוצה לנסות?`;}
 }
}
function duelWin(pi){
 G.state="over";G.over=true;stAdd("duelWins");S.keys++;save();hud("keys");checkBadges();beep("win");
 const w=G.p[pi],l=G.p[1-pi];
 body().innerHTML=`<div class="paper summary"><span class="stamp ok">ניצחון</span><div class="big" style="color:${pi?"var(--p2)":"var(--p1)"}">${esc(w.n)}</div><div class="muted">${w.s} נגד ${l.s}. ${esc(l.n)}, בפעם הבאה!</div><div class="row" style="justify-content:center">${IC.key}<b>מפתח לכספת למכשיר הזה</b></div><div class="row" style="justify-content:center"><button type="button" class="btn" data-again="duel">דו-קרב חדש</button><button type="button" class="btn ghost" data-quit>למשימות</button></div></div>`;
}

/* ===================== shared players board (db) ===================== */
/* Each device picks who is playing. A player's progress lives in players/<pid> and in a local cache,
   so a device keeps working offline. Merges keep the higher value or the union, so two iPads do not
   wipe each other's progress. A reset raises the epoch "e", and the newer epoch wins outright. */
const COLORS=["#2F6FDB","#D23B3B","#2C8A57","#C98A12","#8E5BD6","#E0712B"];
const MAXPLAYERS=12;
let DB=null,ASSETS=null,DBSTATE="wait",PUSHT=0;
const PLAYERS={};
const rid=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4);
const initial=n=>[...String(n||"?").trim()][0]||"?";
const sortObj=o=>{const r={};Object.keys(o).sort().forEach(k=>{r[k]=o[k];});return r;};
const arr=a=>Array.isArray(a)?a:[];
const sig=p=>JSON.stringify(cleanProg(p));
function cleanProg(p){
 p=p&&typeof p==="object"?p:{};
 const int=(v,lo,hi,d)=>{v=Math.floor(+v);return isFinite(v)?Math.min(hi,Math.max(lo,v)):d;};
 const o={};
 o.pts=int(p.pts,0,1e7,0);
 o.keys=int(p.keys,0,1e4,1);
 o.solved=[...new Set(arr(p.solved).filter(id=>typeof id==="string"&&BM[id]))].sort();
 o.vault=[...new Set(arr(p.vault).filter(id=>typeof id==="string"&&(VM[id]||id==="autocars")))].sort();
 o.badges=[...new Set(arr(p.badges).filter(id=>typeof id==="string"&&BADGES.some(b=>b.id===id)))].sort();
 const d=p.daily;
 o.daily=d&&typeof d==="object"&&typeof d.date==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(d.date)&&BM[d.id]?{date:d.date,id:d.id,clue:int(d.clue,1,5,1),guesses:arr(d.guesses).filter(id=>typeof id==="string"&&BM[id]).slice(0,12),done:!!d.done,won:!!d.won}:null;
 o.streak=int(p.streak,0,1e4,0);
 o.lastWin=typeof p.lastWin==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(p.lastWin)?p.lastWin:"";
 o.st={};if(p.st&&typeof p.st==="object")Object.keys(p.st).slice(0,40).forEach(k=>{const v=+p.st[k];if(/^[A-Za-z0-9]{1,24}$/.test(k)&&isFinite(v)&&v>=0)o.st[k]=Math.floor(v);});o.st=sortObj(o.st);
 o.best={};if(p.best&&typeof p.best==="object")Object.keys(p.best).forEach(k=>{const v=+p.best[k];if(MISSIONS.some(m=>m.id===k)&&isFinite(v)&&v>=0)o.best[k]=Math.floor(v);});o.best=sortObj(o.best);
 return o;
}
function progOf(){S.solved=[...SOLVED];S.vault=[...OPENED];S.badges=[...HAVE];const o={};PROG.forEach(k=>{o[k]=S[k];});return cleanProg(JSON.parse(JSON.stringify(o)));}
function loadProg(p){p=cleanProg(p);PROG.forEach(k=>{S[k]=p[k];});SOLVED.clear();p.solved.forEach(x=>SOLVED.add(x));OPENED.clear();p.vault.forEach(x=>OPENED.add(x));HAVE.clear();p.badges.forEach(x=>HAVE.add(x));}
function pickDaily(a,b){
 if(!a)return b;if(!b)return a;
 if(a.date!==b.date)return a.date>b.date?a:b;
 if(a.done!==b.done)return a.done?a:b;
 if(a.done)return b.won&&!a.won?b:a;
 return b.clue>a.clue?b:a;
}
function mergeProg(base,loc,rem){
 base=cleanProg(base);loc=cleanProg(loc);rem=cleanProg(rem);
 const u=(a,b)=>[...new Set([...a,...b])];
 const mx=(a,b)=>{const r=Object.assign({},a);Object.keys(b).forEach(k=>{r[k]=Math.max(r[k]||0,b[k]);});return r;};
 const later=loc.lastWin>rem.lastWin||(loc.lastWin===rem.lastWin&&loc.streak>rem.streak);
 return cleanProg({
  pts:Math.max(rem.pts+Math.max(0,loc.pts-base.pts),loc.pts),
  keys:Math.max(0,rem.keys+(loc.keys-base.keys)),
  solved:u(rem.solved,loc.solved),vault:u(rem.vault,loc.vault),badges:u(rem.badges,loc.badges),
  daily:pickDaily(loc.daily,rem.daily),
  streak:later?loc.streak:rem.streak,lastWin:later?loc.lastWin:rem.lastWin,
  st:mx(rem.st,loc.st),best:mx(rem.best,loc.best)
 });
}
function cleanPlayer(id,d){
 if(!d||typeof d!=="object"||!/^[A-Za-z0-9]{3,40}$/.test(id))return null;
 const n=String(d.n||"").replace(/\s+/g," ").trim().slice(0,16)||"שחקן";
 const c=Math.floor(+d.c);
 return {id,n,c:c>=0&&c<COLORS.length?c:0,p:cleanProg(d.p),e:Math.max(1,Math.floor(+d.e)||1),w:typeof d.w==="string"?d.w.slice(0,40):"",at:+d.at||0};
}
function cacheSave(){if(!PID||!SYNC)return;store.set("bs.p."+PID,{e:SYNC.e,w:SYNC.w,b:SYNC.base,p:progOf(),d:SYNC.dirty?1:0,n:SYNC.n,c:SYNC.c,ns:SYNC.needSet?1:0});}
function schedulePush(){if(!DB||!PID||!SYNC||SYNC.denied)return;clearTimeout(PUSHT);PUSHT=setTimeout(push,1200);}
async function push(){
 clearTimeout(PUSHT);PUSHT=0;
 const sy=SYNC,pid=PID;
 if(!DB||!pid||!sy||sy.denied)return;
 if(sy.busy){sy.again=true;return;}
 const pl=PLAYERS[pid];
 if(!pl&&DBSTATE==="on")return;
 const p=progOf();
 if(!sy.needSet&&sy.base&&sig(p)===sig(sy.base)){sy.dirty=false;cacheSave();return;}
 const w=rid(),prev={base:sy.base,w:sy.w},full=sy.needSet;
 sy.busy=true;sy.again=false;sy.dirty=false;sy.needSet=false;sy.base=p;sy.w=w;cacheSave();
 const ref=DB.doc("players/"+pid);
 try{
  if(full)await ref.set({n:pl?pl.n:sy.n,c:pl?pl.c:sy.c,p,e:sy.e,w,at:Date.now()});
  else await ref.update({p,e:sy.e,w,at:Date.now()});
  sy.retried=false;
 }catch(err){
  if(sy.w===w){sy.base=prev.base;sy.w=prev.w;}
  sy.dirty=true;if(full)sy.needSet=true;
  const code=err&&err.code;
  if(code==="invalid_argument"||code==="not_granted"||code==="revoked"){if(PLAYERS[pid]){sy.denied=true;toast("אין הרשאה לשמור בלוח המשותף. ההתקדמות נשמרת במכשיר הזה.");}}
  else if(!sy.retried){sy.retried=true;setTimeout(()=>{if(SYNC===sy)push();},2500+rnd(2500));}
  if(SYNC===sy)cacheSave();
 }finally{
  sy.busy=false;
  if(sy.again&&SYNC===sy)schedulePush();
 }
}
function reconcile(r){
 const sy=SYNC;if(!sy||!r)return;
 sy.n=r.n;sy.c=r.c;
 if(r.w&&r.w===sy.w){if(sy.dirty)schedulePush();return;}
 const before=sig(progOf());
 if(sy.e==null||r.e>sy.e){
  loadProg(r.p);sy.e=r.e;sy.base=r.p;sy.w=r.w;sy.dirty=false;sy.needSet=false;
 }else if(r.e<sy.e){
  sy.needSet=true;sy.dirty=true;schedulePush();
 }else{
  const m=mergeProg(sy.base||r.p,progOf(),r.p);
  sy.base=r.p;sy.w=r.w;loadProg(m);
  if(sig(m)!==sig(r.p)){sy.dirty=true;schedulePush();}else sy.dirty=false;
 }
 cacheSave();
 if(sig(progOf())!==before)refreshAfterRemote();
}
function refreshAfterRemote(){
 hud();renderWho();
 if(G)return;
 const a=document.activeElement;
 if(VIEW==="hq"&&!(a&&/INPUT|SELECT|TEXTAREA/.test(a.tagName||"")))renderHQ();
 else if(VIEW==="files")renderFiles();
 else if(VIEW==="games")renderMissions();
}
function attach(pid){
 const c=store.get("bs.p."+pid,null),r=PLAYERS[pid];
 PID=pid;
 SYNC={e:null,w:null,base:null,dirty:false,busy:false,again:false,denied:false,needSet:false,retried:false,n:r?r.n:"",c:r?r.c:0};
 if(c&&typeof c==="object"&&c.p){SYNC.e=+c.e||null;SYNC.w=typeof c.w==="string"?c.w:null;SYNC.base=c.b?cleanProg(c.b):null;SYNC.dirty=!!c.d;SYNC.needSet=!!c.ns;if(!r){SYNC.n=String(c.n||"").slice(0,16);SYNC.c=Math.floor(+c.c)||0;}loadProg(c.p);}
 else if(r){loadProg(r.p);SYNC.e=r.e;SYNC.w=r.w;SYNC.base=r.p;}
 else loadProg({keys:1});
}
function restorePlayer(){const pid=store.get("bs.player",null);if(typeof pid==="string"&&/^[A-Za-z0-9]{3,40}$/.test(pid))attach(pid);}
function bindPlayer(pid){
 if(PID===pid||!pid)return;
 if(PID&&SYNC&&SYNC.dirty)push();
 if(!PID){ANON=Object.assign({},ANON,progOf(),{sound:S.sound,names:S.names});store.set(KEY,ANON);}
 attach(pid);store.set("bs.player",pid);
 const r=PLAYERS[pid];
 if(r&&DBSTATE==="on")reconcile(r);
 if(SYNC.dirty)schedulePush();
 cacheSave();hud();renderWho();renderFoot();
 if(VIEW==="hq")renderHQ();
}
function unbindPlayer(){
 if(!PID)return;
 if(SYNC&&SYNC.dirty)push();
 PID=null;SYNC=null;store.del("bs.player");
 loadProg(ANON);save();hud();renderWho();renderFoot();
 if(VIEW==="hq")renderHQ();
}
async function createPlayer(){
 const msg=$("#pl-msg");const say=t=>{if(msg)msg.textContent=t;};
 const name=($("#pl-name").value||"").replace(/\s+/g," ").trim().slice(0,16);
 if(!name){say("כתבו שם");$("#pl-name").focus();return;}
 if(Object.values(PLAYERS).some(p=>p.n===name)){say("כבר יש שחקן בשם הזה");return;}
 if(Object.keys(PLAYERS).length>=MAXPLAYERS){say(`אפשר עד ${MAXPLAYERS} שחקנים`);return;}
 const carry=!!($("#pl-carry")&&$("#pl-carry").checked);
 const pid="p"+rid(),p=carry&&!PID?progOf():cleanProg({keys:1});
 const doc={n:name,c:NEWCOL,p,e:1,w:rid(),at:Date.now()};
 const btn=$("#pl-create");btn.disabled=true;
 try{await DB.doc("players/"+pid).set(doc);}
 catch(err){btn.disabled=false;say(err&&err.code==="quota_exceeded"?"הלוח המשותף מלא":err&&err.code==="invalid_argument"?"אין הרשאה להוסיף שחקנים":"השמירה לא הצליחה. נסו שוב.");return;}
 PLAYERS[pid]=cleanPlayer(pid,doc);PLNEW=false;
 store.set("bs.p."+pid,{e:1,w:doc.w,b:p,p,d:0,n:name,c:NEWCOL});
 bindPlayer(pid);toast(`שלום ${name}! מעכשיו הנקודות נשמרות בלוח המשותף`);
}
let PLNEW=false,NEWCOL=0;
const dailyLine=p=>{const d=p.daily;if(!d||d.date!==todayStr())return "חקירה יומית: עוד לא היום";if(!d.done)return `חקירה יומית: באמצע, רמז ${d.clue}`;return d.won?`חקירה יומית: פוענח ברמז ${d.clue}`:"חקירה יומית: לא פוענח";};
function playersInner(){
 if(window.FAMILY&&!FAMILY.code)return FAMILY.html();
 const list=Object.values(PLAYERS).sort((a,b)=>b.p.pts-a.p.pts||a.n.localeCompare(b.n,"he"));
 const me=PID&&PLAYERS[PID];
 let head=`<div class="pl-head"><div><h3>לוח הבלשים</h3><div class="muted" style="font-size:14px">${DBSTATE==="slow"?"אין חיבור ללוח המשותף כרגע. ההתקדמות נשמרת במכשיר הזה.":me?`במכשיר הזה משחק/ת: <b>${esc(me.n)}</b>`:"בחרו מי משחק במכשיר הזה, והנקודות יופיעו גם במכשיר השני."}</div>${window.FAMILY?FAMILY.badge():""}</div></div>`;
 if(DBSTATE==="wait")return head+`<p class="muted" style="margin:10px 0 0">טוען את הלוח…</p>`;
 const rows=list.map((p,i)=>`<li class="${p.id===PID?"me":""}"><span class="pos">${i+1}</span><span class="pl-dot" style="--c:${COLORS[p.c]}" aria-hidden="true">${esc(initial(p.n))}</span><span class="who"><b>${esc(p.n)}</b><small>${rank(p.p.pts).name} · ${p.p.solved.length}/${B.length} תיקים</small></span><span class="sc">${p.p.pts}<small>נקודות</small></span><span class="day"><span>${dailyLine(p.p)}</span>${p.id===PID?`<span class="stamp ok" style="font-size:12px">אני</span>`:`<button type="button" class="btn sm ghost" data-player="${p.id}">זה אני</button>`}</span></li>`).join("");
 const form=PLNEW?`<div class="pl-new"><label>שם<input type="text" id="pl-name" maxlength="16" autocomplete="off" placeholder="למשל: זוהר"></label>
   <div><b>צבע</b><div class="colors" role="group" aria-label="צבע">${COLORS.map((c,i)=>`<button type="button" data-col="${i}" style="--c:${c}" aria-pressed="${i===NEWCOL}" aria-label="צבע ${i+1}"></button>`).join("")}</div></div>
   ${!PID&&S.pts>0?`<label class="tgl"><input type="checkbox" id="pl-carry" checked>להעביר לשחקן את ההתקדמות שכבר יש במכשיר הזה (${S.pts} נקודות)</label>`:""}
   <p class="arch-msg" id="pl-msg" role="status"></p>
   <div class="row"><button type="button" class="btn sm" id="pl-create">יצירה</button><button type="button" class="btn sm ghost" id="pl-cancel">ביטול</button></div></div>`:"";
 const acts=DBSTATE==="on"?`<div class="pl-acts">${!PLNEW&&list.length<MAXPLAYERS?`<button type="button" class="btn sm" id="pl-new-open">שחקן חדש</button>`:""}${PID?`<button type="button" class="btn sm ghost" id="pl-anon">לשחק בלי שם (רק במכשיר הזה)</button>`:""}</div>`:"";
 return head+(list.length?`<ol class="lb">${rows}</ol>`:`<p class="muted" style="margin:10px 0 0">עוד אין שחקנים בלוח. צרו שחקן לכל ילד, ובחרו אותו בכל מכשיר שהוא משחק בו.</p>`)+form+acts;
}
function renderPlayers(){const el=$("#pl-card");if(!el)return;el.hidden=DBSTATE==="off";if(DBSTATE==="off")return;const keepFocus=document.activeElement&&document.activeElement.id==="pl-name";if(keepFocus)return;el.innerHTML=playersInner();}
function renderWho(){
 const el=$("#h-who");if(!el)return;
 const n=PID?(PLAYERS[PID]?PLAYERS[PID].n:SYNC&&SYNC.n):"",c=PID?(PLAYERS[PID]?PLAYERS[PID].c:SYNC&&SYNC.c):0;
 el.hidden=!n;if(n)el.innerHTML=`<span class="pl-dot xs" style="--c:${COLORS[c||0]}" aria-hidden="true">${esc(initial(n))}</span><span>${esc(n)}</span>`;
}
function renderFoot(){const el=$("#foot-save");if(!el)return;el.textContent=PID?"ההתקדמות נשמרת בלוח המשותף ומופיעה בכל מכשיר שבוחרים בו את אותו שחקן.":"ההתקדמות נשמרת בדפדפן הזה. בוחרים שחקן במטה כדי לשמור אותה גם בלוח המשותף.";}
function plAdminHTML(){
 if(DBSTATE!=="on")return `<p class="muted">הלוח המשותף לא זמין כרגע.</p>`;
 const list=Object.values(PLAYERS).sort((a,b)=>a.n.localeCompare(b.n,"he"));
 if(!list.length)return `<p class="muted">אין שחקנים עדיין.</p>`;
 return `<ul class="pl-admin">${list.map(p=>`<li data-pl="${p.id}"><span class="pl-dot xs" style="--c:${COLORS[p.c]}" aria-hidden="true">${esc(initial(p.n))}</span>${PLREN===p.id?`<input type="text" id="pl-ren-in" maxlength="16" value="${esc(p.n)}" aria-label="שם חדש"><button type="button" class="btn sm" data-pl-save="${p.id}">שמירה</button>`:`<b>${esc(p.n)}</b><button type="button" class="btn sm ghost" data-pl-ren="${p.id}">שינוי שם</button>`}<button type="button" class="btn sm ghost" data-pl-del="${p.id}">מחיקה</button></li>`).join("")}</ul>`;
}
let PLREN=null;
function renderPlAdmin(){const el=$("#pl-admin");if(el&&!(document.activeElement&&document.activeElement.id==="pl-ren-in"))el.innerHTML=plAdminHTML();}
async function renamePlayer(pid){
 const inp=$("#pl-ren-in");const n=(inp&&inp.value||"").replace(/\s+/g," ").trim().slice(0,16);
 if(!n){toast("כתבו שם");return;}
 if(Object.values(PLAYERS).some(p=>p.n===n&&p.id!==pid)){toast("כבר יש שחקן בשם הזה");return;}
 PLREN=null;
 try{await DB.doc("players/"+pid).update({n});toast("השם עודכן");}catch(e){toast("לא הצלחנו לשמור את השם");}
 if(document.activeElement&&document.activeElement.id==="pl-ren-in")document.activeElement.blur();
 renderPlAdmin();
}
async function deletePlayer(pid,btn){
 if(!btn.dataset.sure){btn.dataset.sure="1";btn.textContent="בטוחים? לחצו שוב";return;}
 try{await DB.doc("players/"+pid).delete();store.del("bs.p."+pid);if(PID===pid)unbindPlayer();toast("השחקן נמחק");}catch(e){toast("המחיקה לא הצליחה");}
}

/* ===================== logo eras: the logo through the years ===================== */
const ERAS={};let ERASTATE="wait",ABRAND="bmw";
function cleanEra(id,d){
 if(!d||typeof d!=="object"||typeof d.b!=="string"||!BM[d.b])return null;
 const from=Math.floor(+d.from);if(!(from>=1850&&from<=2100))return null;
 let to=d.to==null||d.to===""?null:Math.floor(+d.to);if(to!=null&&!(to>=from&&to<=2100))to=null;
 const first=to==null&&d.first===true;
 const asset=String(d.asset||"");if(!/^[0-9a-f]{16,64}$/i.test(asset))return null;
 return {id,b:d.b,from,to,first,asset,note:String(d.note||"").slice(0,140),src:String(d.src||"").slice(0,200)};
}
const erasOf=id=>ERAS[id]||[];
const isNow=e=>e.to==null&&!e.first;
const eraYears=e=>e.first?`הופיע ב-<span dir="ltr">${e.from}</span>`:e.to==null?`<span dir="ltr">${e.from}</span>–היום`:`<span dir="ltr">${e.from}–${e.to}</span>`;
const eraText=e=>e.first?`החל מ-${e.from}`:e.to==null?`מ-${e.from} ועד היום`:`בין ${e.from} ל-${e.to}`;
const eraShort=e=>e.first?`${e.from}`:e.to==null?`מ-${e.from}`:`${e.from}–${e.to}`;
const eraImg=(e,cls,alt)=>`<span class="lg ${cls||"md"}"><img src="${IMG(e.asset)}" alt="${esc(alt||"")}" draggable="false" decoding="async"></span>`;
function erasBlock(b){
 const L=erasOf(b.id);if(!L.length)return "";
 return `<div class="blk"><h3>הסמל לאורך השנים</h3><div class="eras">${L.map(e=>`<figure class="era">${eraImg(e,"md",`הסמל של ${b.he} ${eraText(e)}`)}<figcaption><b>${eraYears(e)}</b>${e.note?`<small>${esc(e.note)}</small>`:""}</figcaption></figure>`).join(`<span class="era-arrow" aria-hidden="true">←</span>`)}</div></div>`;
}
function brandOptions(sel){
 return B.slice().sort((a,b)=>a.he.localeCompare(b.he,"he")).map(b=>{const n=erasOf(b.id).length;return `<option value="${b.id}"${b.id===sel?" selected":""}>${b.he}${n?` · ${n} סמלים`:""}</option>`;}).join("");
}
function archListHTML(){
 const b=BM[ABRAND];if(!b)return "";const L=erasOf(ABRAND);
 if(ERASTATE==="wait")return `<p class="muted">טוען…</p>`;
 if(!L.length)return `<p class="muted" style="margin:0">ל${pre("",b.he)} אין עדיין סמלים בציר הזמן.</p>`;
 return `<ul class="arch-list">${L.map(e=>`<li>${eraImg(e,"sm")}<div><b>${eraYears(e)}</b>${e.note?`<small>${esc(e.note)}</small>`:""}${e.src?`<small>מקור: ${esc(e.src)}</small>`:""}</div>${ASSETS?`<button type="button" class="btn sm ghost" data-era-del="${e.id}">מחיקה</button>`:""}</li>`).join("")}</ul>`;
}
function archHTML(){
 if(DBSTATE==="off"||ERASTATE==="off")return `<p class="muted">הארכיון לא זמין כרגע.</p>`;
 const yr=new Date().getFullYear();
 return `<div class="arch"><label>מותג<select id="a-brand">${brandOptions(ABRAND)}</select></label><div id="arch-list">${archListHTML()}</div>
  ${ASSETS?`<div class="arch-form"><fieldset class="wide"><legend>תמונה</legend><label class="tgl"><input type="radio" name="a-src" value="cur" checked>הסמל שיש במשחק עכשיו</label><label class="tgl"><input type="radio" name="a-src" value="file">קובץ חדש</label><input type="file" id="a-file" accept="image/png,image/jpeg,image/webp,image/svg+xml" aria-label="קובץ תמונה"></fieldset>
   <label>משנה<input type="number" id="a-from" inputmode="numeric" min="1850" max="${yr}" placeholder="1963"></label>
   <label>עד שנה<input type="number" id="a-to" inputmode="numeric" min="1850" max="${yr}" placeholder="ריק = עד היום"></label>
   <label class="tgl wide"><input type="checkbox" id="a-first">ידועה רק השנה שבה הסמל הופיע (לא מתי הפסיקו להשתמש בו)</label>
   <label class="wide">הערה שהילדים יראו (לא חובה)<input type="text" id="a-note" maxlength="120" placeholder="למשל: בגרסה הזאת העיגול נעשה שטוח"></label>
   <label class="wide">מקור (לא חובה, רק כאן)<input type="text" id="a-srcnote" maxlength="200" placeholder="למשל: אתר ההיסטוריה של החברה"></label>
   <p class="arch-msg wide" id="a-msg" role="status"></p>
   <div class="wide"><button type="button" class="btn sm" id="a-add">הוספה לציר הזמן</button></div></div>`:`<p class="muted" style="margin:0">המקור של כל תמונה מופיע ליד השנים. פרטים ורישיונות בעמוד <a href="credits.html">הקרדיטים</a>.</p>`}</div>`;
}
function renderArch(){const el=$("#arch");if(!el)return;const l=$("#arch-list");const sel=$("#a-brand");if(l&&sel){sel.innerHTML=brandOptions(ABRAND);l.innerHTML=archListHTML();}else el.innerHTML=archHTML();}
function shrink(file){
 return new Promise(res=>{
  if(/svg/i.test(file.type)){res(file);return;}
  let url;try{url=URL.createObjectURL(file);}catch(e){res(file);return;}
  const im=new Image();
  im.onload=()=>{try{const m=Math.max(im.naturalWidth,im.naturalHeight),k=Math.min(1,480/m);if(k>=1&&file.size<400000){URL.revokeObjectURL(url);res(file);return;}const c=document.createElement("canvas");c.width=Math.max(1,Math.round(im.naturalWidth*k));c.height=Math.max(1,Math.round(im.naturalHeight*k));c.getContext("2d").drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(url);c.toBlob(b=>res(b||file),"image/png");}catch(e){res(file);}};
  im.onerror=()=>{URL.revokeObjectURL(url);res(file);};im.src=url;
 });
}
async function addEra(){
 const say=t=>{const m=$("#a-msg");if(m)m.textContent=t;};
 const btn=$("#a-add"),b=$("#a-brand").value,from=parseInt($("#a-from").value,10),toRaw=$("#a-to").value.trim(),to=toRaw?parseInt(toRaw,10):null,yr=new Date().getFullYear();
 if(!BM[b]){say("בחרו מותג");return;}
 if(!(from>=1850&&from<=yr)){say(`שנת ההתחלה צריכה להיות בין 1850 ל-${yr}`);return;}
 if(to!=null&&!(to>=from&&to<=yr)){say(`שנת הסיום צריכה להיות בין ${from} ל-${yr}, או ריקה אם הסמל עדיין בשימוש`);return;}
 const first=to==null&&!!($("#a-first")&&$("#a-first").checked);
 if(to==null&&!first&&erasOf(b).some(isNow)&&btn.dataset.twoNow!==b+from){btn.dataset.twoNow=b+from;say("כבר יש למותג סמל שמסומן ״עד היום״. אם שני הסמלים באמת בשימוש היום, לחצו שוב על ״הוספה״. אחרת מלאו שנת סיום.");return;}
 if(erasOf(b).some(e=>e.from===from)){say(`כבר יש סמל שמתחיל ב-${from}`);return;}
 const src=($('input[name="a-src"]:checked')||{}).value;
 const note=$("#a-note").value.trim().slice(0,120),srcnote=$("#a-srcnote").value.trim().slice(0,200);
 let asset;
 btn.disabled=true;say("");
 try{
  if(src==="file"){
   const f=$("#a-file").files&&$("#a-file").files[0];
   if(!f){say("בחרו קובץ תמונה");return;}
   if(f.size>12e6){say("הקובץ גדול מדי");return;}
   btn.textContent="מעלה…";
   try{const up=await ASSETS.upload(await shrink(f));asset=up&&up.id;}catch(e){say("ההעלאה לא הצליחה. נסו קובץ PNG או JPG.");return;}
   if(!asset){say("ההעלאה לא הצליחה");return;}
  }else{asset=LOGO[b];if(!asset){say("למותג הזה אין סמל במשחק. בחרו ״קובץ חדש״.");return;}}
  btn.textContent="שומר…";
  try{await DB.collection("eras").add({b,from,to,first,asset,note,src:srcnote,at:Date.now()});}
  catch(e){say(e&&e.code==="invalid_argument"?"אין הרשאה להוסיף לארכיון":e&&e.code==="quota_exceeded"?"הארכיון מלא":"השמירה לא הצליחה. נסו שוב.");return;}
  ["a-from","a-to","a-note","a-srcnote","a-file"].forEach(id=>{const x=$("#"+id);if(x)x.value="";});const fc=$("#a-first");if(fc)fc.checked=false;
  delete btn.dataset.twoNow;toast(`נוסף לציר הזמן של ${BM[b].he}`);
 }finally{btn.disabled=false;btn.textContent="הוספה לציר הזמן";}
}
async function deleteEra(id,btn){
 let e=null;Object.values(ERAS).forEach(L=>L.forEach(x=>{if(x.id===id)e=x;}));if(!e)return;
 if(!btn.dataset.sure){btn.dataset.sure="1";btn.textContent="בטוחים?";return;}
 try{await DB.doc("eras/"+id).delete();}catch(err){toast("המחיקה לא הצליחה");return;}
 const used=Object.values(LOGO).includes(e.asset)||Object.values(ERAS).some(L=>L.some(x=>x.id!==id&&x.asset===e.asset));
 if(!used&&ASSETS){try{await ASSETS.delete(e.asset);}catch(err){}}
 toast("הסמל הוסר מציר הזמן");
}

/* ---------- 7. time tunnel: logos through the years ---------- */
function tunnelPool(){
 const qs=[];
 Object.keys(ERAS).forEach(id=>{
  const L=erasOf(id);if(!BM[id]||L.length<2)return;
  if(L.length>=3)qs.push({t:"order",id});
  if(L.filter(isNow).length===1)qs.push({t:"now",id});
  if(L.length>=3&&new Set(L.map(e=>eraYears(e))).size===L.length)sample(L,Math.min(2,L.length)).forEach(e=>qs.push({t:"when",id,era:e.id}));
  qs.push({t:"older",id});
 });
 return qs;
}
function tunnelQ(x){
 const b=BM[x.id],L=erasOf(x.id);
 if(x.t==="order"){
  const pick5=L.length>5?sample(L,5).sort((a,c)=>a.from-c.from):L;
  return {kind:"order",cls:"logos",head:"",q:`סדרו את הסמלים של ${b.he} מהישן לחדש`,sub:"לחצו קודם על הישן ביותר",items:shuffle(pick5.map((e,i)=>({i,h:eraImg(e,"md")}))),n:pick5.length,exp:pick5.map(eraShort).join(" ← "),brands:[x.id]};
 }
 if(x.t==="now"){
  const cur=L.find(isNow),opts=shuffle([cur,...sample(L.filter(e=>e!==cur),3)]);
  return {kind:"choice",cls:"logos",head:"",q:`באיזה סמל ${b.he} משתמשת היום?`,opts:opts.map(e=>eraImg(e,"md")),ans:opts.indexOf(cur),exp:`${b.he} משתמשת בסמל הזה מ-${cur.from}.${cur.note?" "+cur.note:""}`,brands:[x.id]};
 }
 if(x.t==="when"){
  const e=L.find(z=>z.id===x.era),opts=shuffle([e,...sample(L.filter(z=>z!==e),3)]);
  return {kind:"choice",cls:"one",head:eraImg(e,"lg2"),q:`מתי ${b.he} השתמשה בסמל הזה?`,opts:opts.map(z=>eraYears(z)),ans:opts.indexOf(e),exp:`${b.he} השתמשה בו ${eraText(e)}.${e.note?" "+e.note:""}`,brands:[x.id]};
 }
 const two=sample(L,2),old=two[0].from<two[1].from?two[0]:two[1],nw=old===two[0]?two[1]:two[0];
 return {kind:"choice",cls:"logos",head:"",q:`איזה סמל של ${b.he} ישן יותר?`,opts:two.map(e=>eraImg(e,"md")),ans:two.indexOf(old),exp:`הסמל הישן היה בשימוש ${eraText(old)}, והחדש ${eraText(nw)}.`,brands:[x.id]};
}
function tunnelStart(){
 const pool=shuffle(tunnelPool());
 G.total=Math.min(8,pool.length);
 if(G.total<3){body().innerHTML=`<div class="paper gcard"><p class="q-text">עוד אין מספיק סמלים בציר הזמן.</p><div class="row" style="justify-content:center"><button type="button" class="btn" data-quit>למשימות</button></div></div>`;return;}
 G.qs=pool.slice(0,G.total).map(tunnelQ);
 $("#g-sub").textContent=`${G.total} שאלות על סמלים לאורך השנים`;
 histRound();
}

/* ---------- connect ---------- */
async function initShared(){
 let db=null;
 try{if(window.claude&&typeof window.claude.use==="function")db=await window.claude.use("db");}catch(e){db=null;}
 if(!db){DBSTATE="off";ERASTATE="off";renderPlayers();renderArch();renderPlAdmin();renderFoot();if(VIEW==="games"&&!G)renderMissions();return;}
 DB=db;
 const tP=setTimeout(()=>{if(DBSTATE==="wait"){DBSTATE="slow";renderPlayers();}},10000);
 const tE=setTimeout(()=>{if(ERASTATE==="wait"){ERASTATE="slow";renderArch();if(VIEW==="games"&&!G)renderMissions();}},10000);
 try{
  db.collection("players").limit(60).onSnapshot(snap=>{
   Object.keys(PLAYERS).forEach(k=>delete PLAYERS[k]);
   snap.docs.forEach(d=>{if(d.exists){const p=cleanPlayer(d.id,d.data());if(p)PLAYERS[p.id]=p;}});
   if(!snap.metadata.fromCache){clearTimeout(tP);DBSTATE="on";}else if(DBSTATE!=="on")DBSTATE="slow";
   if(PID&&SYNC&&!snap.metadata.fromCache){
    if(PLAYERS[PID])reconcile(PLAYERS[PID]);
    else{const gone=SYNC.n;store.del("bs.p."+PID);unbindPlayer();toast(`השחקן ${gone||""} כבר לא בלוח המשותף`);}
   }
   renderPlayers();renderPlAdmin();renderWho();
  },err=>{clearTimeout(tP);DBSTATE="off";renderPlayers();renderPlAdmin();});
 }catch(e){DBSTATE="off";}
 try{
  db.collection("eras").limit(400).onSnapshot(snap=>{
   Object.keys(ERAS).forEach(k=>delete ERAS[k]);
   snap.docs.forEach(d=>{if(d.exists){const e=cleanEra(d.id,d.data());if(e)(ERAS[e.b]=ERAS[e.b]||[]).push(e);}});
   Object.values(ERAS).forEach(L=>L.sort((a,b)=>a.from-b.from||((a.to==null?1e9:a.to)-(b.to==null?1e9:b.to))));
   if(!snap.metadata.fromCache)clearTimeout(tE);
   ERASTATE="on";renderArch();if(VIEW==="games"&&!G)renderMissions();
  },err=>{clearTimeout(tE);ERASTATE="off";renderArch();});
 }catch(e){ERASTATE="off";}
 try{ASSETS=await window.claude.use("assets");}catch(e){ASSETS=null;}
 renderArch();
}

/* ===================== events ===================== */
document.addEventListener("click",e=>{
 const t=e.target.closest("button,[data-close]");if(!t)return;
 if(t.matches("[data-close]")){closeSheet();return;}
 if(t.dataset.go){if(t.dataset.segOpen){FSEG=t.dataset.segOpen;}go(t.dataset.go);return;}
 if(t.dataset.player){bindPlayer(t.dataset.player);return;}
 if(t.id==="pl-new-open"){PLNEW=true;const used=new Set(Object.values(PLAYERS).map(p=>p.c));NEWCOL=COLORS.findIndex((c,i)=>!used.has(i));if(NEWCOL<0)NEWCOL=0;renderPlayers();const n=$("#pl-name");if(n)n.focus();return;}
 if(t.id==="pl-cancel"){PLNEW=false;renderPlayers();return;}
 if(t.dataset.col!=null){NEWCOL=+t.dataset.col;$$(".colors [data-col]").forEach(x=>x.setAttribute("aria-pressed",x===t?"true":"false"));return;}
 if(t.id==="pl-create"){createPlayer();return;}
 if(t.id==="pl-anon"){unbindPlayer();return;}
 if(t.id==="a-add"){addEra();return;}
 if(t.dataset.eraDel){deleteEra(t.dataset.eraDel,t);return;}
 if(t.dataset.plRen){PLREN=t.dataset.plRen;const el=$("#pl-admin");if(el)el.innerHTML=plAdminHTML();const i=$("#pl-ren-in");if(i)i.focus();return;}
 if(t.dataset.plSave){renamePlayer(t.dataset.plSave);return;}
 if(t.dataset.plDel){deletePlayer(t.dataset.plDel,t);return;}
 if(t.dataset.open){if(!$("#overlay").hidden&&$("#sheet").contains(t)){openBrand(t.dataset.open);return;}openBrand(t.dataset.open);return;}
 if(t.dataset.vault){openVault(t.dataset.vault);return;}
 if(t.dataset.route){closeSheet();SEL=t.dataset.route;go("board");document.getElementById("route").scrollIntoView({behavior:reduceMotion?"auto":"smooth"});return;}
 if(t.dataset.seg){FSEG=t.dataset.seg;renderFiles();return;}
 if(t.dataset.guess){dailyGuess(t.dataset.guess);return;}
 if(t.id==="d-copy"){try{navigator.clipboard.writeText(shareText()).then(()=>toast("התוצאה הועתקה"),()=>toast("לא הצלחנו להעתיק"));}catch(err){toast("לא הצלחנו להעתיק");}return;}
 if(t.id==="sound"){S.sound=!S.sound;save();renderSound();if(S.sound)beep("ok");return;}
 if(t.dataset.yi!=null){if(PLAY){clearInterval(PLAY);PLAY=0;}setYear(+t.dataset.yi,true);return;}
 if(t.id==="play"){togglePlay();return;}
 if(t.classList.contains("pol")){SEL=t.dataset.id;$$(".pol").forEach(p=>p.setAttribute("aria-pressed",p.dataset.id===SEL?"true":"false"));renderRoute();if(innerWidth<760)document.getElementById("route").scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"nearest"});return;}
 if(t.dataset.start){startGame(t.dataset.start);return;}
 if(t.hasAttribute("data-quit")){quitGame();return;}
 if(t.dataset.again){startGame(t.dataset.again);return;}
 if(!G)return;
 if(t.dataset.lvl){revealStart(t.dataset.lvl);return;}
 if(t.dataset.bin){sortTap(t.dataset.bin);return;}
 if(t.dataset.t){G.target=+t.dataset.t;$$("#target button").forEach(x=>x.setAttribute("aria-pressed",x===t?"true":"false"));return;}
 if(t.id==="duel-go"){duelStart();return;}
 if(t.hasAttribute("data-dnext")){duelNext();return;}
 if(t.dataset.k!=null&&(G.id==="hist"||G.id==="tunnel")){histPick(+t.dataset.k);return;}
 if(t.classList.contains("opt")&&t.dataset.i!=null){const i=+t.dataset.i;
  if(G.id==="reveal")revealAnswer(i);else if(G.id==="odd")oddAnswer(i);else if(G.id==="tf")tfAnswer(i);else if(G.id==="hist"||G.id==="tunnel")histChoice(i);else if(G.id==="duel")duelAnswer(i);return;}
 if(t.hasAttribute("data-next")){
  G.n++;
  if(G.n>=G.total){if(G.id==="hist")histEnd();if(G.id==="tunnel")stMax("tunnelBest",G.ok);if(G.id==="odd")stMax("oddBest",G.ok);endGame();return;}
  if(G.id==="reveal")revealRound();else if(G.id==="odd")oddRound();else if(G.id==="tf")tfRound();else if(G.id==="hist"||G.id==="tunnel")histRound();
  window.scrollTo({top:0,behavior:reduceMotion?"auto":"smooth"});return;}
});
document.addEventListener("pointerdown",e=>{const b=e.target.closest("[data-buzz]");if(b&&!b.disabled){e.preventDefault();duelBuzz(+b.dataset.buzz);}});
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"&&!$("#overlay").hidden){closeSheet();return;}
 if(e.key==="Enter"&&e.target&&e.target.id==="pl-name"){e.preventDefault();createPlayer();return;}
 if(e.key==="Enter"&&e.target&&e.target.id==="pl-ren-in"){e.preventDefault();const li=e.target.closest("[data-pl]");if(li)renamePlayer(li.dataset.pl);return;}
 if(G&&G.id==="duel"&&G.state==="buzz"&&!e.repeat&&!/INPUT/.test((e.target.tagName||""))){if(e.key==="a"||e.key==="ש")duelBuzz(1);if(e.key==="l"||e.key==="ך")duelBuzz(0);}
});
$("#overlay").addEventListener("click",e=>{if(e.target.id==="overlay")closeSheet();});
document.addEventListener("change",e=>{const t=e.target;if(!t)return;
 if(t.id==="a-brand"){ABRAND=t.value;const l=$("#arch-list");if(l)l.innerHTML=archListHTML();const m=$("#a-msg");if(m)m.textContent="";return;}
 if(t.id==="a-file"&&t.files&&t.files.length){const r=$('input[name="a-src"][value="file"]');if(r)r.checked=true;}
});
["input","change"].forEach(ev=>{$("#f-q").addEventListener(ev,renderFiles);$("#f-fam").addEventListener(ev,renderFiles);$("#f-unsolved").addEventListener(ev,renderFiles);});

/* ===================== start ===================== */
restorePlayer();renderSound();hud();renderWho();renderFoot();checkBadges();
go((location.hash||"").slice(1)||"hq");
initShared();
