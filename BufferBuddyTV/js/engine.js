/* Engine: state machine (PLAYING or INTERRUPTED) and renderer. One player per .tv element. */
const CHARS={
  sloth:{name:'Sleepy Sloth',desc:'Slow, calm and unbothered. Suits short buffering waits where nothing is wrong.'},
  offline:{name:'Wi-Fi Chaser',desc:'A determined robot hunting a runaway signal. Suits lost connections.'},
  slow:{name:'Dancing Blob',desc:'Keeps the mood up while data trickles in. Suits slow connections.'},
  error:{name:'Popcorn Panic',desc:'Quick and chaotic. Gives the viewer a reason to stay during errors.'}
};
function createPlayer(tv,opts={}){
  const q=s=>tv.querySelector(s);
  const ov=q('.ov'),stage=q('.stage'),cap=q('.cap'),tag=q('.tag'),hs=q('.hud span'),ht=q('.hud b'),prog=q('.bar i');
  const S={state:'PLAYING',ev:null,since:0,paused:false,art:null};
  let capT,hudT,p=0,capI=0;const subs=[];
  const emit=(n,d)=>subs.forEach(f=>f(n,d));
  const tick=()=>{ht.textContent=Math.round((Date.now()-S.since)/1000)+'s'};
  function showCap(){const c=EVENTS[S.ev].caps;cap.textContent=settings().captions?c[capI%c.length]:''}
  function start(type){
    if(S.paused||S.state==='INTERRUPTED'||!EVENTS[type])return;
    const st=settings(),art=st.map[type]||EVENTS[type].art;
    tv.dataset.th=st.theme;
    Object.assign(S,{state:'INTERRUPTED',ev:type,since:Date.now(),art});
    tag.textContent=EVENTS[type].tag;stage.innerHTML=ART[art]();
    requestAnimationFrame(()=>stage.getAnimations({subtree:true}).forEach(a=>a.playbackRate=st.speed));
    capI=Math.floor(Math.random()*3);showCap();
    ov.classList.add('on');hs.textContent=EVENTS[type].tag;
    clearInterval(capT);capT=setInterval(()=>{capI++;showCap()},2800);
    clearInterval(hudT);hudT=setInterval(tick,250);tick();emit('start',type);
  }
  function stop(){
    if(S.state!=='INTERRUPTED')return;
    const rec={t:Date.now(),type:S.ev,art:S.art,secs:Math.max(1,Math.round((Date.now()-S.since)/1000))};
    if(opts.log)logEvent(rec);
    S.state='PLAYING';S.ev=null;clearInterval(capT);clearInterval(hudT);
    ov.classList.remove('on');stage.innerHTML='';hs.textContent='Playing';emit('stop',rec);
  }
  function setPaused(v){S.paused=v;tv.classList.toggle('paused',v);hs.textContent=v?'App inactive, animations stopped':(S.ev?EVENTS[S.ev].tag:'Playing');emit('pause',v)}
  setInterval(()=>{if(S.state==='PLAYING'&&!S.paused){p=(p+.5)%100;prog.style.width=p+'%'}},250);
  if(opts.watch){ // real signals the browser can give us
    document.addEventListener('visibilitychange',()=>setPaused(document.hidden));
    addEventListener('offline',()=>start('offline'));addEventListener('online',stop);
  }
  tv.dataset.th=settings().theme;
  return{S,start,stop,setPaused,on:f=>subs.push(f)};
}
function autoDemo(pl){
  let on=false,t;const keys=Object.keys(EVENTS);
  const loop=()=>{t=setTimeout(()=>{if(!on)return;pl.start(keys[Math.floor(Math.random()*keys.length)]);
    t=setTimeout(()=>{pl.stop();if(on)loop()},settings().autoHold*1000)},settings().autoGap*1000)};
  return{toggle(){on=!on;clearTimeout(t);if(on)loop();else pl.stop();return on}};
}
