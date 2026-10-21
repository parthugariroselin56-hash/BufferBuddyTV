/* Analytics page: reads the session log written by the player */
const COLORS={buffer:'#6c7cff',offline:'#33e0ff',slow:'#ff4fd8',error:'#ffb347'};
function bars(el,log,keyFn,labelFn,colorFn){
  const m={};log.forEach(r=>{const k=keyFn(r);m[k]=m[k]||{n:0};m[k].n++});
  const max=Math.max(1,...Object.values(m).map(x=>x.n));
  el.innerHTML=Object.keys(m).length?Object.entries(m).map(([k,x])=>`<div class="bar-row"><span>${labelFn(k)}</span><div class="track"><i style="width:${x.n/max*100}%;background:${colorFn(k)}"></i></div><b>${x.n}</b></div>`).join(''):'<p class="mut">No data yet. Run the player, or load sample data.</p>';
}
function render(){
  const log=Store.get('log',[]),n=log.length,tot=log.reduce((a,r)=>a+r.secs,0);
  $('#kpis').innerHTML=[[n,'interruptions entertained'],[tot+'s','total wait time'],[n?(tot/n).toFixed(1)+'s':'0s','average wait'],[n?Math.max(...log.map(r=>r.secs))+'s':'0s','longest wait']].map(([v,l])=>`<div class="card kpi"><strong>${v}</strong>${l}</div>`).join('');
  bars($('#byType'),log,r=>r.type,k=>EVENTS[k].tag,k=>COLORS[k]);
  bars($('#byChar'),log,r=>r.art,k=>CHARS[k].name,()=>'var(--acc)');
  const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-6+i);return d});
  const counts=days.map(d=>log.filter(r=>r.t>=d.getTime()&&r.t<d.getTime()+864e5).length),mx=Math.max(1,...counts);
  $('#days').innerHTML=days.map((d,i)=>`<div class="col"><b>${counts[i]}</b><i style="height:${counts[i]/mx*100}%"></i><span>${d.toLocaleDateString(undefined,{weekday:'short'})}</span></div>`).join('');
  $('#recent').innerHTML=log.slice(-8).reverse().map(r=>`<tr><td>${new Date(r.t).toLocaleString()}</td><td>${EVENTS[r.type].tag}</td><td>${CHARS[r.art].name}</td><td>${r.secs}s</td></tr>`).join('');
}
$('#sample').onclick=()=>{
  const keys=Object.keys(EVENTS),log=Store.get('log',[]);
  for(let i=0;i<40;i++){const type=keys[Math.floor(Math.random()*4)];log.push({t:Date.now()-Math.random()*6*864e5,type,art:EVENTS[type].art,secs:2+Math.floor(Math.random()*12)})}
  Store.set('log',log.sort((a,b)=>a.t-b.t));render();toast('40 sample interruptions added');
};
$('#csv').onclick=()=>{
  const rows=['time,event,character,seconds',...Store.get('log',[]).map(r=>[new Date(r.t).toISOString(),r.type,r.art,r.secs].join(','))];
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv'}));a.download='bufferbuddy-log.csv';a.click();
};
$('#clear').onclick=()=>{if(confirm('Delete all logged interruptions?')){Store.set('log',[]);render()}};
render();
