/* Join the two interrupted lower Badam scrolls. */
(()=>{'use strict';
const single='YSAEYVwEYiAEYlwEYyIEY1oEZR0BZSwDZVEDZWIBZiwEZlAEZy8BZ1ABaC8DaE4DazYBa0kBbDcBbEgB',four='AkICArwCCEMBCLwBCUABCUIDCbsDCb8BCj8FCrwFCz4FC70FDEEBDL4BDzQBD8sBEC8BEDMDEMoDENABES8CETIFEckFEc8CEjABEjMDEsoDEs8BEzQBE8sBLxACL+4CMBECMO0CMhEBMu4BMxADM+0DNA8FNOwFNRADNe0DNhEBNu4BPgsBPvQBPwoCP/QCQAkDQPQDQQoDQfMDQgIBQgkDQvQDQv0BQwIBQwgDQ/UDQ/0BRAkBRPYBuwkBu/YBvAIBvAgDvPUDvP0BvQIBvQkDvfQDvf0BvgoDvvMDvwkDv/QDwAoCwPQCwQsBwfQByREBye4ByhADyu0Dyw8Fy+wFzBADzO0DzREBze4BzxECz+0C0BAC0O4C7DQB7MsB7TAB7TMD7coD7c8B7i8C7jIF7skF7s8C7y8B7zMD78oD79AB8DQB8MsB80EB874B9D4F9L0F9T8F9bwF9kAB9kID9rsD9r8B90MB97wB/UIC/bwC';
function repair(uri,packed){
 if(!uri||!uri.startsWith('data:image/svg+xml;base64,'))return uri;
 const doc=new DOMParser().parseFromString(atob(uri.split(',')[1]),'image/svg+xml');
 if(doc.querySelector('parsererror'))return uri;
 const raw=atob(packed);let d='';
 for(let j=0;j<raw.length;j+=3){const y=raw.charCodeAt(j),x=raw.charCodeAt(j+1),w=raw.charCodeAt(j+2);d+='M'+x+' '+y+'h'+w+'v1H'+x+'Z';}
 const path=doc.createElementNS('http://www.w3.org/2000/svg','path');
 path.setAttribute('fill','#25B88E');path.setAttribute('d',d);
 doc.documentElement.setAttribute('shape-rendering','crispEdges');doc.documentElement.appendChild(path);
 return 'data:image/svg+xml;base64,'+btoa(new XMLSerializer().serializeToString(doc.documentElement));
}
const assets=window.ATLAS_ASSETS;if(!assets)return;
for(const name of ['PS010_design.svg','PS010_unit.svg'])assets[name]=repair(assets[name],single);
for(const name of ['PS010_four.svg','PS010_repeat4.svg'])assets[name]=repair(assets[name],four);
assets['PS010.svg']=assets['PS010_design.svg'];
})();
