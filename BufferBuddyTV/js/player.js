/* Player page: manual triggers, auto-demo, real offline detection, session feed */
const pl=createPlayer($('#tv'),{log:true,watch:true});
$('#evs').innerHTML=Object.entries(EVENTS).map(([k,e])=>`<button class="btn" data-ev="${k}">${e.tag}</button>`).join('');
$$('[data-ev]').forEach(b=>b.onclick=()=>pl.start(b.dataset.ev));
$('#resume').onclick=()=>pl.stop();
window.onBack=()=>pl.stop();
const auto=autoDemo(pl);
$('#auto').onclick=e=>{const on=auto.toggle();e.currentTarget.setAttribute('aria-pressed',on);e.currentTarget.textContent='Auto-demo: '+(on?'on':'off')};
$('#bg').onclick=()=>pl.setPaused(!pl.S.paused);
pl.on((n,d)=>{
  if(n==='stop'){const li=document.createElement('li');li.textContent=`${EVENTS[d.type].tag} with ${CHARS[d.art].name}, ${d.secs}s`;$('#feed').prepend(li)}
  if(n==='pause')$('#bg').setAttribute('aria-pressed',d);
});
