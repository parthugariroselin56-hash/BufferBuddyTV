/* Shared top navigation, injected on every page */
(function(){
  const pages=[['index.html','Home'],['player.html','Player'],['characters.html','Buddies'],['analytics.html','Analytics'],['settings.html','Settings'],['about.html','About']];
  const cur=location.pathname.split('/').pop()||'index.html';
  document.body.insertAdjacentHTML('afterbegin',`<header class="top"><a class="brand" href="index.html"><span class="logo"></span>BufferBuddy TV</a><nav>${pages.map(([h,t])=>`<a href="${h}"${h===cur?' aria-current="page"':''}>${t}</a>`).join('')}</nav></header>`);
})();
