/* Storage and settings, kept in localStorage so every page shares them */
const Store={
  get(k,d){try{const v=localStorage.getItem('bb_'+k);return v?JSON.parse(v):d}catch(e){return d}},
  set(k,v){try{localStorage.setItem('bb_'+k,JSON.stringify(v))}catch(e){}}
};
const DEFAULTS={theme:'neon',speed:1,captions:true,autoGap:3,autoHold:5,map:{buffer:'sloth',offline:'offline',slow:'slow',error:'error'}};
function settings(){const s=Object.assign({},DEFAULTS,Store.get('settings',{}));s.map=Object.assign({},DEFAULTS.map,s.map);return s}
function saveSettings(s){Store.set('settings',s)}
function logEvent(r){const l=Store.get('log',[]);l.push(r);Store.set('log',l.slice(-500))}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1400)}
