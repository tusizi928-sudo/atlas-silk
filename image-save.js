'use strict';
(()=>{
 const zh=()=>document.documentElement.lang.startsWith('zh'),t=(a,b)=>zh()?b:a;
 const phone=()=>matchMedia('(pointer:coarse)').matches||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
 let active=null;
 function preview(href,name){
  active?.close();
  const origin=document.activeElement,dialog=document.createElement('dialog');dialog.className='image-save-dialog';dialog.setAttribute('aria-labelledby','image-save-title');
  const close=document.createElement('button');close.className='image-save-close';close.textContent='×';close.setAttribute('aria-label',t('Close image preview','关闭图片预览'));
  const title=document.createElement('h2');title.id='image-save-title';title.textContent=t('Save this pattern','保存这张纹样');
  const status=document.createElement('p');status.className='image-save-status';status.setAttribute('role','status');status.textContent=t('Preparing a high-resolution PNG…','正在准备高清 PNG 图片…');
  const image=document.createElement('img');image.className='image-save-preview';image.alt=t('Pattern image — touch and hold to save','纹样图片，可长按保存');image.hidden=true;
  const actions=document.createElement('div');actions.className='image-save-actions';
  const share=document.createElement('button');share.type='button';share.className='btn';share.hidden=true;share.textContent=t('Save / share image','保存／分享图片');
  const png=document.createElement('a');png.className='text-link';png.hidden=true;png.textContent=t('Download PNG','下载 PNG');
  const original=document.createElement('a');original.className='text-link';original.href=href;original.download=name;original.dataset.imageSaveBypass='true';original.textContent=t('Original file','原始文件');
  actions.append(share,png,original);dialog.append(close,title,status,image,actions);document.body.append(dialog);active=dialog;
  let disposed=false;const release=()=>{if(disposed)return;disposed=true;if(active===dialog)active=null;dialog.remove();origin?.focus?.()};close.onclick=()=>dialog.close();dialog.addEventListener('close',release,{once:true});dialog.showModal();
  const im=new Image();im.onload=()=>{if(disposed)return;try{const w=im.naturalWidth,h=im.naturalHeight;if(!w||!h)throw Error('size');const factor=1800/Math.max(w,h),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(w*factor));canvas.height=Math.max(1,Math.round(h*factor));const ctx=canvas.getContext('2d');ctx.drawImage(im,0,0,canvas.width,canvas.height);const data=canvas.toDataURL('image/png');image.src=data;image.hidden=false;const filename=name.replace(/\.[^.]+$/,'')+'.png';png.href=data;png.download=filename;png.dataset.imageSaveBypass='true';png.hidden=false;status.textContent=t('Touch and hold the image to save it. If this in-app browser hides Save Image, open this page in Safari or Chrome.','长按下方图片，选择“保存图片”。如果微信没有显示保存选项，请在 Safari 或 Chrome 中打开本页。');canvas.toBlob(blob=>{if(disposed||!blob)return;try{const file=new File([blob],filename,{type:'image/png'});if(navigator.share&&navigator.canShare?.({files:[file]})){share.hidden=false;share.onclick=async()=>{try{await navigator.share({files:[file],title:t('Atlas Silk pattern','艾德莱斯绸纹样')})}catch(error){if(error.name!=='AbortError')status.textContent=t('Sharing is unavailable here. Touch and hold the preview, or open this page in Safari / Chrome.','当前浏览器无法调起分享。请长按预览图片，或在 Safari／Chrome 中打开本页。')}}}}catch{}},'image/png')}catch{failed()}};
  const failed=()=>{if(!disposed)status.textContent=t('Could not prepare the PNG. Open this page in Safari / Chrome and try again, or download the original file.','暂时无法生成 PNG。请在 Safari／Chrome 打开本页后重试，或下载原始文件。')};im.onerror=failed;im.src=href;
 }
 document.addEventListener('click',e=>{const a=e.target.closest?.('a[download]');if(!a||a.dataset.imageSaveBypass||!phone())return;const href=a.href,name=a.download||'atlas-pattern.svg';if(!/\.(svg|png|jpe?g|webp)$/i.test(name))return;e.preventDefault();e.stopImmediatePropagation();preview(href,name)},true);
})();
