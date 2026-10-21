/* BufferBuddy TV: Fire TV remote style arrow-key navigation */
/* 7. Remote-style navigation: arrows move to the nearest button in that direction */
document.addEventListener("keydown", e => {
  if (e.key === "Escape" || e.key === "Backspace") { if (window.onBack) window.onBack(); return; }
  const dir = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
  if (!dir) return;
  e.preventDefault();
  const all = $$("button"), cur = document.activeElement;
  if (!all.includes(cur)) { all[0].focus(); return; }
  const c = cur.getBoundingClientRect(), cx = c.left + c.width / 2, cy = c.top + c.height / 2;
  let best = null, bs = 1e9;
  for (const b of all) {
    if (b === cur) continue;
    const r = b.getBoundingClientRect(), dx = r.left + r.width / 2 - cx, dy = r.top + r.height / 2 - cy;
    const along = dx * dir[0] + dy * dir[1];
    if (along <= 4) continue;
    const across = Math.abs(dx * dir[1]) + Math.abs(dy * dir[0]);
    const score = along + across * 2;
    if (score < bs) { bs = score; best = b; }
  }
  if (best) best.focus();
});
