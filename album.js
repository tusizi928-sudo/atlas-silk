'use strict';
(()=>{
 let stage=null,items=[],phase=0,last=0,raf=0,hovered=null,focused=null,drag=null,dx=0,dy=0,speed=.8,velocity=0;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)'),mod=(x,n)=>(x%n+n)%n;
 try{const saved=localStorage.getItem('atlas-album-speed');if(saved!==null&&Number.isFinite(Number(saved)))speed=Math.max(0,Math.min(2,Number(saved)))}catch{}
 function size(){return {w:stage.clientWidth||900,h:stage.clientHeight||280}}
 function draw(dt=16){if(!stage)return;const {w,h}=size(),n=items.length,spacing=Math.min(172,Math.max(132,w*.15))*1.13;items.forEach((card,i)=>{const d=mod(i-phase+n/2,n)-n/2,active=card===hovered||card===focused,base=Math.min(172,Math.max(132,w*.15)),wanted=active?1.055:1,old=Number(card.dataset.zoom)||1,zoom=reduce.matches?wanted:old+(wanted-old)*(1-Math.exp(-dt/180));card.dataset.zoom=String(zoom);const positionScale=.64+.46*Math.exp(-d*d/4.5),x=w*.5+d*spacing,y=h*.48+12*(1-Math.exp(-d*d/4)),turn=0;card.style.width=base+'px';card.style.height=base*1.42+'px';card.style.transform=`translate(${(x-base/2).toFixed(2)}px,${(y-base*1.42/2).toFixed(2)}px) rotate(${turn.toFixed(2)}deg) scale(${(positionScale*zoom).toFixed(4)})`;});}
 function tick(t){if(!stage?.isConnected){stage=null;raf=0;return}const dt=last?Math.min(50,t-last):0;last=t;const dialog=document.getElementById('patternDialog');const blocked=reduce.matches||window.AtlasMotion?.paused||document.hidden||dialog?.open||hovered||focused||drag||speed===0;if(blocked)velocity=0;else{velocity+=(speed*.00018-velocity)*(1-Math.exp(-dt/430));phase=mod(phase+dt*velocity,items.length);}draw(dt||16);raf=requestAnimationFrame(tick)}
 function cardAt(e){return e.target.closest?.('.concept-item')||null}
 function mount(){const next=document.querySelector('.concept-stage');if(!next||next===stage)return;if(raf)cancelAnimationFrame(raf);stage=next;items=Array.from(stage.querySelectorAll('.concept-item'));items.forEach((card,i)=>card.style.zIndex=String(20+i));phase=Math.floor(items.length/2);last=0;velocity=0;hovered=focused=drag=null;dx=dy=0;const slider=document.getElementById('album-speed'),output=document.getElementById('album-speed-value');const show=()=>{if(output)output.textContent=speed.toFixed(1)+'×';if(slider)slider.value=String(speed)};show();if(slider)slider.oninput=()=>{speed=Math.max(0,Math.min(2,Number(slider.value)));show();try{localStorage.setItem('atlas-album-speed',String(speed))}catch{}};
  stage.addEventListener('pointerover',e=>{if(e.pointerType==='touch'||drag)return;const card=cardAt(e);if(card&&items.includes(card)){hovered=card;dx=dy=0}});
  stage.addEventListener('pointerout',e=>{if(hovered&&!hovered.contains(e.relatedTarget)){hovered=null;dx=dy=0}});
  stage.addEventListener('pointerleave',()=>{hovered=null;dx=dy=0});
  stage.addEventListener('pointermove',e=>{if(!hovered||drag||reduce.matches)return;const b=hovered.getBoundingClientRect();dx=Math.max(-7,Math.min(7,(e.clientX-b.left-b.width/2)*.08));dy=Math.max(-5,Math.min(5,(e.clientY-b.top-b.height/2)*.08));});
  stage.addEventListener('focusin',e=>{focused=cardAt(e);dx=dy=0});stage.addEventListener('focusout',()=>{focused=null;dx=dy=0});
  stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,phase,moved:false};});
  stage.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();phase=mod(phase+(e.key==='ArrowRight'?1:-1),items.length);hovered=null;draw()});
  draw();raf=requestAnimationFrame(tick);
 }
 document.addEventListener('pointermove',e=>{if(!drag||!stage)return;const delta=e.clientX-drag.x;if(Math.abs(delta)>5){drag.moved=true;hovered=null;stage.setPointerCapture?.(e.pointerId)}if(drag.moved){const {w}=size(),spacing=Math.min(172,Math.max(132,w*.15))*1.13;phase=mod(drag.phase-delta/spacing,items.length);draw()}},{passive:true});
 const up=()=>{if(drag?.moved&&stage){const node=stage;node.dataset.suppressClick='true';setTimeout(()=>delete node.dataset.suppressClick,180)}drag=null};document.addEventListener('pointerup',up);document.addEventListener('pointercancel',up);
 document.addEventListener('click',e=>{if(e.target.closest?.('.concept-stage')?.dataset.suppressClick){e.preventDefault();e.stopImmediatePropagation()}},{capture:true});
 window.addEventListener('resize',()=>draw(),{passive:true});const main=document.getElementById('main');if(main)new MutationObserver(mount).observe(main,{childList:true,subtree:true});window.AtlasAlbum={mount};mount();
})();
