/* Settings page: saved to localStorage and read by the engine on every start */
const tv=$('#tv'),pl=createPlayer(tv);
function out(){$('#speedV').textContent=$('#speed').value+'x';$('#gapV').textContent=$('#gap').value+'s';$('#holdV').textContent=$('#hold').value+'s'}
function load(){const s=settings();$$('[data-t]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===s.theme));$('#speed').value=s.speed;$('#caps').checked=s.captions;$('#gap').value=s.autoGap;$('#hold').value=s.autoHold;tv.dataset.th=s.theme;out()}
function save(patch){saveSettings(Object.assign(settings(),patch))}
$$('[data-t]').forEach(b=>b.onclick=()=>{save({theme:b.dataset.t});load();toast('Theme saved')});
$('#speed').oninput=e=>{save({speed:+e.target.value});out()};
$('#caps').onchange=e=>{save({captions:e.target.checked});toast('Saved')};
$('#gap').oninput=e=>{save({autoGap:+e.target.value});out()};
$('#hold').oninput=e=>{save({autoHold:+e.target.value});out()};
$('#reset').onclick=()=>{saveSettings({});load();toast('Defaults restored')};
$('#try').onclick=()=>{pl.start('buffer');setTimeout(()=>pl.stop(),3500)};
load();
