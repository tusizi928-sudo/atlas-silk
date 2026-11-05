'use strict';
(()=>{
 const palette=['#F66130','#FC4352','#FA318B','#ED2D78','#8B7BDD','#496ADC','#3F68D5','#229EC4','#1FA3BE'];
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function plain(node){if(node.nodeType===3)return node.textContent;if(node.nodeName==='BR')return '\n';return Array.from(node.childNodes||[]).map(plain).join('')}
 function format(text,zh){const visible=Array.from(text).filter(c=>/\S/u.test(c)),n=visible.length;let index=0;const part=c=>{if(!/\S/u.test(c))return escape(c);const color=palette[Math.round(index++/Math.max(1,n-1)*(palette.length-1))],path=zh?window.ATLAS_KNIT_GLYPHS?.[c]:null;if(path)return `<span class="knit-char" style="--letter-ink:${color}"><span class="knit-source">${escape(c)}</span><svg viewBox="0 0 26 28" aria-hidden="true" focusable="false"><path d="${path}" fill="none" stroke="currentColor" stroke-width=".36" stroke-linecap="round"/></svg></span>`;return `<span class="colored-letter" style="--letter-ink:${color}">${escape(zh?c:c.toUpperCase())}</span>`};
  return text.split(/(\n|[\t ]+)/).map(token=>token==='\n'?'<br>':/^[\t ]+$/.test(token)?' ':zh?Array.from(token).map(part).join(''):`<span class="colored-word">${Array.from(token).map(part).join('')}</span>`).join('');
 }
 function apply(){const lang=document.documentElement.lang,zh=lang.startsWith('zh');document.querySelectorAll('h1,h2,h3,.footer-wordmark').forEach(el=>{if(el.dataset.knitLanguage===lang)return;const text=(el.matches('.cover-copy h1')?el.getAttribute('aria-label'):null)||plain(el).trim()||el.getAttribute('aria-label')||'';if(!text)return;el.dataset.knitLanguage=lang;el.classList.remove('heading-ink');el.classList.add('knit-title');el.setAttribute('aria-label',text.replace(/\n/g,' '));el.innerHTML='<span class="knit-content" aria-hidden="true">'+format(text,zh)+'</span>';});}
 window.AtlasTypography={apply,format,palette};apply();
})();
