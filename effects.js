'use strict';
(()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)'),fine=window.matchMedia('(hover: hover) and (pointer: fine)');
 const seed=1931;
 const saved=new Map(),palette=window.ATLAS_HEADING_INKS||['#496ADC','#148C5C','#F6317D'];
 const hash=s=>{let h=seed;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
 const motion={paused:reduce.matches};window.AtlasMotion=motion;
 let reveal=null,queue=false,active=null;
 const cursor=document.createElement('div');cursor.className='pointer-halo';cursor.setAttribute('aria-hidden','true');document.body.append(cursor);
 function resetMagnet(){if(active){active.style.removeProperty('--magnet-x');active.style.removeProperty('--magnet-y');active.classList.remove('is-magnetic');active=null}cursor.classList.remove('is-over-control')}
 function updateMotion(){document.documentElement.classList.toggle('motion-paused',motion.paused||reduce.matches);document.querySelectorAll('[data-motion-toggle]').forEach(b=>{const zh=document.documentElement.lang.startsWith('zh');b.setAttribute('aria-pressed',String(motion.paused||reduce.matches));const label=motion.paused||reduce.matches?(zh?'播放滚动':'Play motion'):(zh?'暂停滚动':'Pause motion');if(b.textContent!==label)b.textContent=label;b.disabled=reduce.matches});if(reduce.matches)resetMagnet()}
 function apply(){
  window.AtlasTypography?.apply();
  if(reveal&&!reduce.matches)document.querySelectorAll('.quiet-paths>a,.quiet-field,.visual-story,.field-editorial-grid figure,.making-list').forEach(el=>{if(!el.classList.contains('reveal-ready')){el.classList.add('reveal-ready');reveal.observe(el)}});
  updateMotion();
 }
 if('IntersectionObserver' in window)reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');reveal.unobserve(entry.target)}})},{threshold:.06,rootMargin:'0px 0px 25px 0px'});
 const schedule=()=>{if(queue)return;queue=true;requestAnimationFrame(()=>{queue=false;apply()})};
 const watcher=new MutationObserver(schedule);['main','header','footer','dialogContent'].forEach(id=>{const node=document.getElementById(id);if(node)watcher.observe(node,{childList:true,subtree:true})});
 document.addEventListener('click',e=>{if(e.target.closest?.('[data-motion-toggle]')){motion.paused=!motion.paused;updateMotion()}});
 document.addEventListener('pointermove',e=>{
  if(!fine.matches||reduce.matches)return;
  const el=e.target.closest?.('.btn,.language,.cover-secondary,.text-link,.dialog-close');
  if(!el||el.disabled){resetMagnet();return}
  if(active!==el){resetMagnet();active=el;active.classList.add('is-magnetic')}
  const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
  el.style.setProperty('--magnet-x',Math.max(-4,Math.min(4,x*.07))+'px');el.style.setProperty('--magnet-y',Math.max(-3,Math.min(3,y*.09))+'px');
  cursor.style.setProperty('--pointer-x',e.clientX+'px');cursor.style.setProperty('--pointer-y',e.clientY+'px');cursor.classList.add('is-over-control');
 },{passive:true});
 document.addEventListener('pointerout',e=>{if(active&&!active.contains(e.relatedTarget))resetMagnet()});
 document.addEventListener('keydown',()=>{resetMagnet()},{passive:true});document.addEventListener('scroll',resetMagnet,{passive:true,capture:true});
 document.addEventListener('visibilitychange',()=>{document.documentElement.classList.toggle('tab-inactive',document.hidden);resetMagnet()});
 reduce.addEventListener('change',()=>{if(reduce.matches){document.querySelectorAll('.reveal-ready').forEach(el=>el.classList.add('is-revealed'));motion.paused=true}apply()});fine.addEventListener('change',resetMagnet);
 window.AtlasEffects={apply,motion,headingColours:saved};apply();
})();
