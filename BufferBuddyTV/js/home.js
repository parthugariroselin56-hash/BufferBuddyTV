/* Home page: a looping live demo */
const pl=createPlayer($('#tv'));
const keys=Object.keys(EVENTS);let i=0;
function cycle(){pl.start(keys[i++%keys.length]);setTimeout(pl.stop,4200)}
setTimeout(cycle,800);setInterval(cycle,6500);
