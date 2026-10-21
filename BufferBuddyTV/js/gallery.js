/* Buddies page: character gallery and per-event assignment */
const st=settings();
$('#gallery').innerHTML=Object.entries(CHARS).map(([id,c])=>`<article class="card"><div class="pv" data-th="${st.theme}"><div class="stage">${ART[id]()}</div></div><h3>${c.name}</h3><p class="mut">${c.desc}</p></article>`).join('');
$('#map').innerHTML=Object.entries(EVENTS).map(([k,e])=>`<label class="row2"><span>${e.tag}</span><select data-ev="${k}">${Object.entries(CHARS).map(([id,c])=>`<option value="${id}"${st.map[k]===id?' selected':''}>${c.name}</option>`).join('')}</select></label>`).join('');
$$('#map select').forEach(s=>s.onchange=()=>{const x=settings();x.map[s.dataset.ev]=s.value;saveSettings(x);toast('Assignment saved')});
