'use strict';
function bookPage(){return `<section class="book-module" aria-label="${t('Blurred Edges interactive book','模糊的边电子书')}"><iframe id="atlasBookFrame" src="atlas-book.html?lang=${lang}" title="${t('Blurred Edges interactive book','模糊的边电子书')}" allow="fullscreen" allowfullscreen></iframe></section>`}
window.AtlasBook=(()=>{
 let frame=null;
 function resize(){const box=document.querySelector('.book-module');if(box)box.style.setProperty('--site-header-height',Math.round(document.querySelector('#header').getBoundingClientRect().height)+'px')}
 function send(language){if(frame?.contentWindow)frame.contentWindow.postMessage({type:'atlas:language',language},location.origin)}
 function mount(language){const next=document.getElementById('atlasBookFrame');if(!next)return;if(frame!==next){frame=next;frame.addEventListener('load',()=>send(typeof lang==='string'?lang:language))}frame.title=language==='zh'?'模糊的边电子书':'Blurred Edges interactive book';send(language);resize()}
 window.addEventListener('resize',resize,{passive:true});return{mount};
})();
