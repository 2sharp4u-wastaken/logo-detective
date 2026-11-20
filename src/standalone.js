/* Standalone runtime for the public site.
   The game was first built as a Claude artifact, where window.claude.use("db") gave it a shared database.
   This file provides the same small interface on top of this site's own API (worker/index.js):
   - players: the family board, shared by every device that joined with the same family code
   - eras: the logo timeline, a static file (eras.json)
   It also maps image ids to files in img/. */
(function(){
"use strict";
const WEBP=new Set(__WEBP__);
window.IMG=id=>"img/"+id+(WEBP.has(id)?".webp":".png");

const ls={
 get(k){try{return localStorage.getItem(k);}catch(e){return null;}},
 set(k,v){try{localStorage.setItem(k,v);}catch(e){}},
 del(k){try{localStorage.removeItem(k);}catch(e){}}
};
const FKEY="ld.family";
const CODE_RE=/^[A-HJ-NP-Z2-9]{8}$/;
const norm=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
const pretty=c=>c?c.slice(0,4)+"-"+c.slice(4):"";
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* A family link (?family=CODE) joins that family on this device. */
(function joinFromUrl(){
 try{
  const u=new URL(location.href);const c=norm(u.searchParams.get("family"));
  if(c&&CODE_RE.test(c)){
   if(ls.get(FKEY)!==c){ls.set(FKEY,c);ls.del("bs.player");}
   u.searchParams.delete("family");history.replaceState(null,"",u.pathname+u.search+u.hash);
  }
 }catch(e){}
})();

const FAMILY=window.FAMILY={
 code:(c=>CODE_RE.test(c||"")?c:null)(ls.get(FKEY)),
 note:"",
 link(){return location.origin+"/detective?family="+this.code;},
 html(){
  return `<div class="pl-head"><div><h3>לוח הבלשים המשפחתי</h3><div class="muted" style="font-size:14px">לוח משותף לכל המכשירים בבית: כל ילד בוחר את השם שלו, והנקודות מופיעות בכל מכשיר. אפשר גם לשחק בלי לוח, וההתקדמות תישמר במכשיר הזה.</div></div></div>
  <div class="fam">
   <div class="fam-opt"><b>פעם ראשונה?</b><button type="button" class="btn sm" id="fam-new">יצירת לוח משפחתי</button></div>
   <div class="fam-opt"><b>כבר יש לוח במכשיר אחר?</b><label class="fam-join"><span class="sr">קוד משפחה</span><input type="text" id="fam-code" maxlength="12" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="קוד משפחה, למשל ABCD-2345" dir="ltr"></label><button type="button" class="btn sm ghost" id="fam-join">הצטרפות</button></div>
   <p class="arch-msg" id="fam-msg" role="status">${esc(this.note)}</p>
  </div>`;
 },
 badge(){
  if(!this.code)return "";
  return `<div class="fam-badge"><span>קוד המשפחה: <b dir="ltr">${pretty(this.code)}</b></span><button type="button" class="btn sm ghost" id="fam-share">הוספת מכשיר</button><button type="button" class="btn sm ghost" id="fam-leave">יציאה מהלוח</button></div>`;
 },
 set(c){ls.set(FKEY,c);ls.del("bs.player");location.reload();},
 leave(){ls.del(FKEY);ls.del("bs.player");location.reload();}
};

function say(t){const m=document.getElementById("fam-msg");if(m)m.textContent=t;}
document.addEventListener("click",async e=>{
 const t=e.target.closest("button");if(!t)return;
 if(t.id==="fam-new"){
  t.disabled=true;say("יוצר לוח…");
  try{
   const r=await fetch("/api/families",{method:"POST"});
   if(r.status===429){say("נוצרו הרבה לוחות מהרשת הזאת. נסו שוב בעוד שעה.");t.disabled=false;return;}
   const j=r.ok?await r.json():null;
   if(!j||!CODE_RE.test(j.code||""))throw new Error("bad");
   FAMILY.set(j.code);
  }catch(err){say("לא הצלחנו ליצור לוח. בדקו את החיבור ונסו שוב.");t.disabled=false;}
 }else if(t.id==="fam-join"){
  const c=norm((document.getElementById("fam-code")||{}).value);
  if(!CODE_RE.test(c)){say("הקוד צריך להיות 8 תווים: אותיות באנגלית ומספרים");return;}
  t.disabled=true;say("בודק…");
  try{
   const r=await fetch("/api/f/"+c+"/players");
   if(r.status===404){say("לא מצאנו לוח עם הקוד הזה");t.disabled=false;return;}
   if(!r.ok)throw new Error("bad");
   FAMILY.set(c);
  }catch(err){say("לא הצלחנו לבדוק את הקוד. נסו שוב.");t.disabled=false;}
 }else if(t.id==="fam-share"){
  const text=`לוח הבלשים של המשפחה. פותחים את הקישור במכשיר השני, או מקלידים את הקוד ${pretty(FAMILY.code)}`;
  try{
   if(navigator.share){await navigator.share({title:"בלש הסמלים",text,url:FAMILY.link()});return;}
  }catch(err){if(err&&err.name==="AbortError")return;}
  try{await navigator.clipboard.writeText(FAMILY.link());t.textContent="הקישור הועתק";}
  catch(err){t.textContent=pretty(FAMILY.code);}
  setTimeout(()=>{t.textContent="הוספת מכשיר";},2500);
 }else if(t.id==="fam-leave"){
  if(t.dataset.sure){FAMILY.leave();}
  else{t.dataset.sure="1";t.textContent="בטוחים? ההתקדמות נשארת בלוח. לחצו שוב";}
 }
});
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target&&e.target.id==="fam-code"){const b=document.getElementById("fam-join");if(b)b.click();}});

/* ---------- API client ---------- */
function failure(status){
 const e=new Error("http "+status);e.status=status;
 e.code=status===400||status===413?"invalid_argument":status===403?"not_granted":status===404?"not_found":status===409?"quota_exceeded":status===429?"rate_limited":"unavailable";
 return e;
}
async function call(method,path,body){
 if(!FAMILY.code)throw failure(404);
 let r;
 try{r=await fetch("/api/f/"+FAMILY.code+path,{method,headers:body?{"content-type":"application/json"}:undefined,body:body?JSON.stringify(body):undefined,cache:"no-store"});}
 catch(err){throw failure(0);}
 if(!r.ok)throw failure(r.status);
 return r.status===204?null:r.json();
}

/* ---------- players: poll while the page is visible ---------- */
const CKEY=()=>"ld.cache."+FAMILY.code;
const subs=[];let timer=0,last=null,inflight=false,lastSig=null;
const snap=(list,fromCache)=>({docs:list.map(p=>({id:p.id,exists:true,data:()=>p.data})),metadata:{fromCache}});
/* Only changes reach the game, like a live database would send them, so the board does not redraw every few seconds. */
function emit(list,fromCache){
 const s=(fromCache?"c":"n")+JSON.stringify(list);
 if(s===lastSig)return;lastSig=s;
 subs.forEach(f=>{try{f(snap(list,fromCache));}catch(e){}});
}
async function poll(){
 clearTimeout(timer);timer=0;
 if(!FAMILY.code){emit([],false);return;}
 if(inflight)return;inflight=true;
 try{
  const j=await call("GET","/players");
  last=Array.isArray(j&&j.players)?j.players:[];
  ls.set(CKEY(),JSON.stringify(last));
  emit(last,false);
 }catch(e){
  if(e.status===404){ls.del(CKEY());ls.del(FKEY);ls.del("bs.player");FAMILY.code=null;FAMILY.note="הלוח המשפחתי כבר לא קיים. אפשר ליצור לוח חדש.";emit([],false);return;}
  let c=last;if(!c){try{c=JSON.parse(ls.get(CKEY())||"null");}catch(err){c=null;}}
  emit(Array.isArray(c)?c:[],true);
 }finally{
  inflight=false;
  if(FAMILY.code&&!document.hidden)timer=setTimeout(poll,6000);
 }
}
document.addEventListener("visibilitychange",()=>{if(!document.hidden)poll();else{clearTimeout(timer);timer=0;}});
const soon=()=>{clearTimeout(timer);timer=setTimeout(poll,400);};

function collection(name){
 const q={
  limit(){return q;},
  onSnapshot(cb,onErr){
   if(name==="players"){subs.push(cb);lastSig=null;poll();return ()=>{const i=subs.indexOf(cb);if(i>=0)subs.splice(i,1);};}
   if(name==="eras"){
    fetch("eras.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw failure(r.status);return r.json();})
     .then(list=>cb({docs:list.map(e=>({id:e.id,exists:true,data:()=>e})),metadata:{fromCache:false}}))
     .catch(err=>{if(onErr)onErr(err);});
    return ()=>{};
   }
   if(onErr)setTimeout(()=>onErr(failure(404)),0);
   return ()=>{};
  },
  async add(){throw failure(403);}
 };
 return q;
}
function doc(path){
 const [col,id]=String(path).split("/");
 const ok=col==="players"&&/^[A-Za-z0-9]{3,40}$/.test(id||"");
 const run=async(method,body)=>{if(!ok)throw failure(403);const r=await call(method,"/players/"+id,body);soon();return r;};
 return {set:d=>run("PUT",d),update:d=>run("PATCH",d),delete:()=>run("DELETE")};
}
const db={collection,doc};
window.claude={use:async cap=>{if(cap==="db")return db;throw new Error(cap+" is not available on this site");}};
})();
