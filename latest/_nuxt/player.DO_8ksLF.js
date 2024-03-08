import{u as G}from"./vue.f36acd1f.fPLB0xGu.js";import{u as Q,d as O,e as X,_ as b,V as K,n as S}from"./index.CGpMKhBv.js";import{P as ee,c as te,Y as oe}from"./index.BqKVCXR6.js";import{P}from"./prismeditor.min.CDw03TBV.js";import{r as L,c as ne,W as A,o as re,Y as ie,F as R,A as z,G as N,H as Y,t as k,z as D,x as J,M as U,Z as se}from"./entry.DTIvWivT.js";import{V as le}from"./VContainer.D2yxw9E8.js";import"./tag.CG-DjV1o.js";import"./VAlert.Cg8srvwG.js";import"./index.CXbSpQjk.js";import"./VBtn._4JRzG-w.js";import"./resizeObserver.B6wrahc7.js";import"./VList.Cflr0k1r.js";import"./ssrBoot.CzIkhk8Z.js";/* empty css              */import"./VSpacer.Bh7leN4z.js";import"./en.C2aea8f9.js";function V(){}V.prototype={diff:function(e,t){var r,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=s.callback;typeof s=="function"&&(n=s,s={}),this.options=s;var f=this;function u(m){return n?(setTimeout(function(){n(void 0,m)},0),!0):m}e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e)),t=this.removeEmpty(this.tokenize(t));var l=t.length,v=e.length,y=1,c=l+v;s.maxEditLength&&(c=Math.min(c,s.maxEditLength));var g=(r=s.timeout)!==null&&r!==void 0?r:1/0,w=Date.now()+g,d=[{oldPos:-1,lastComponent:void 0}],x=this.extractCommon(d[0],t,e,0);if(d[0].oldPos+1>=v&&x+1>=l)return u([{value:this.join(t),count:t.length}]);var i=-1/0,a=1/0;function p(){for(var m=Math.max(i,-y);m<=Math.min(a,y);m+=2){var C=void 0,E=d[m-1],T=d[m+1];E&&(d[m-1]=void 0);var $=!1;if(T){var _=T.oldPos-m;$=T&&0<=_&&_<l}var q=E&&E.oldPos+1<v;if(!$&&!q){d[m]=void 0;continue}if(!q||$&&E.oldPos+1<T.oldPos?C=f.addToPath(T,!0,void 0,0):C=f.addToPath(E,void 0,!0,1),x=f.extractCommon(C,t,e,m),C.oldPos+1>=v&&x+1>=l)return u(ae(f,C.lastComponent,t,e,f.useLongestToken));d[m]=C,C.oldPos+1>=v&&(a=Math.min(a,m-1)),x+1>=l&&(i=Math.max(i,m+1))}y++}if(n)(function m(){setTimeout(function(){if(y>c||Date.now()>w)return n();p()||m()},0)})();else for(;y<=c&&Date.now()<=w;){var h=p();if(h)return h}},addToPath:function(e,t,r,s){var n=e.lastComponent;return n&&n.added===t&&n.removed===r?{oldPos:e.oldPos+s,lastComponent:{count:n.count+1,added:t,removed:r,previousComponent:n.previousComponent}}:{oldPos:e.oldPos+s,lastComponent:{count:1,added:t,removed:r,previousComponent:n}}},extractCommon:function(e,t,r,s){for(var n=t.length,f=r.length,u=e.oldPos,l=u-s,v=0;l+1<n&&u+1<f&&this.equals(t[l+1],r[u+1]);)l++,u++,v++;return v&&(e.lastComponent={count:v,previousComponent:e.lastComponent}),e.oldPos=u,l},equals:function(e,t){return this.options.comparator?this.options.comparator(e,t):e===t||this.options.ignoreCase&&e.toLowerCase()===t.toLowerCase()},removeEmpty:function(e){for(var t=[],r=0;r<e.length;r++)e[r]&&t.push(e[r]);return t},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};function ae(o,e,t,r,s){for(var n=[],f;e;)n.push(e),f=e.previousComponent,delete e.previousComponent,e=f;n.reverse();for(var u=0,l=n.length,v=0,y=0;u<l;u++){var c=n[u];if(c.removed){if(c.value=o.join(r.slice(y,y+c.count)),y+=c.count,u&&n[u-1].added){var w=n[u-1];n[u-1]=n[u],n[u]=w}}else{if(!c.added&&s){var g=t.slice(v,v+c.count);g=g.map(function(x,i){var a=r[y+i];return a.length>x.length?a:x}),c.value=o.join(g)}else c.value=o.join(t.slice(v,v+c.count));v+=c.count,c.added||(y+=c.count)}}var d=n[l-1];return l>1&&typeof d.value=="string"&&(d.added||d.removed)&&o.equals("",d.value)&&(n[l-2].value+=d.value,n.pop()),n}var H=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,j=/\S/,W=new V;W.equals=function(o,e){return this.options.ignoreCase&&(o=o.toLowerCase(),e=e.toLowerCase()),o===e||this.options.ignoreWhitespace&&!j.test(o)&&!j.test(e)};W.tokenize=function(o){for(var e=o.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<e.length-1;t++)!e[t+1]&&e[t+2]&&H.test(e[t])&&H.test(e[t+2])&&(e[t]+=e[t+2],e.splice(t+1,2),t--);return e};function ue(o,e,t){return W.diff(o,e,t)}var Z=new V;Z.tokenize=function(o){this.options.stripTrailingCr&&(o=o.replace(/\r\n/g,`
`));var e=[],t=o.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var r=0;r<t.length;r++){var s=t[r];r%2&&!this.options.newlineIsToken?e[e.length-1]+=s:(this.options.ignoreWhitespace&&(s=s.trim()),e.push(s))}return e};var fe=new V;fe.tokenize=function(o){return o.split(/(\S.+?[.!?])(?=\s+|$)/)};var pe=new V;pe.tokenize=function(o){return o.split(/([{}:;,]|\s+)/)};function I(o){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?I=function(e){return typeof e}:I=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I(o)}var me=Object.prototype.toString,F=new V;F.useLongestToken=!0;F.tokenize=Z.tokenize;F.castInput=function(o){var e=this.options,t=e.undefinedReplacement,r=e.stringifyReplacer,s=r===void 0?function(n,f){return typeof f>"u"?t:f}:r;return typeof o=="string"?o:JSON.stringify(B(o,null,null,s),s,"  ")};F.equals=function(o,e){return V.prototype.equals.call(F,o.replace(/,([\r\n])/g,"$1"),e.replace(/,([\r\n])/g,"$1"))};function B(o,e,t,r,s){e=e||[],t=t||[],r&&(o=r(s,o));var n;for(n=0;n<e.length;n+=1)if(e[n]===o)return t[n];var f;if(me.call(o)==="[object Array]"){for(e.push(o),f=new Array(o.length),t.push(f),n=0;n<o.length;n+=1)f[n]=B(o[n],e,t,r,s);return e.pop(),t.pop(),f}if(o&&o.toJSON&&(o=o.toJSON()),I(o)==="object"&&o!==null){e.push(o),f={},t.push(f);var u=[],l;for(l in o)o.hasOwnProperty(l)&&u.push(l);for(u.sort(),n=0;n<u.length;n+=1)l=u[n],f[l]=B(o[l],e,t,r,l);e.pop(),t.pop()}else f=o;return f}var M=new V;M.tokenize=function(o){return o.slice()};M.join=M.removeEmpty=function(o){return o};const ce=[`
type: object
`,`
type: object
properties:
  firstName:
    type: string
    title: First name
`,`
type: object
properties:
  firstName:
    type: string
    title: First name
  lastName:
    type: string
    title: Last name
`,`
type: object
properties:
  firstName:
    type: string
    title: First name
    layout:
      cols: 6
  lastName:
    type: string
    title: Last name
    layout:
      cols: 6
`,`
type: object
required:
  - firstName
  - lastName
properties:
  firstName:
    type: string
    title: First name
    layout:
      cols: 6
  lastName:
    type: string
    title: Last name
    layout:
      cols: 6
`,`
type: object
properties:
  firstName:
    type: string
    title: First name
    layout:
      cols: 6
  lastName:
    type: string
    title: Last name
    layout:
      cols: 6
  bio:
    type: string
    title: Bio
    layout: markdown
`],Ie={__name:"player",setup(o){const e=L(""),t=L(null),r=L({}),s=L({}),n=i=>P.highlight(i,P.languages.yaml,"yaml"),{height:f}=Q(),u=ne(()=>f.value),l=L({}),v=L(null);A([t,r],()=>{if(!r.value||!t.value)return;let i;try{i=te(t.value,{defaultOptions:S,...r.value}),l.value=i.validationErrors}catch(a){l.value={"":[a.message]}}Object.keys(l.value).length||(v.value={precompiledLayout:i,options:r.value,schema:t.value})},{immediate:!0});const y=L(null),c=L(null),g=async([i,a])=>{const p=Math.random()*(a-i)+i;return new Promise(h=>setTimeout(h,p))},w={lineBreak:[100,200],addChar:[40,120],removeChar:[20,60]},d=async(i,a)=>{if(console.log("apply patch",i),i.added){let p=0;i.value.endsWith(`
`)&&(e.value=e.value.slice(0,a)+`
`+e.value.slice(a),await g(w.lineBreak),i.value=i.value.slice(0,-1),p++);for(let h=0;h<i.value.length;h++){const m=i.value[h],C=a+h;e.value=e.value.slice(0,C)+m+e.value.slice(C),m===`
`?await g(w.lineBreak):await g(w.addChar),p++}return p}else if(i.removed){for(let p=a+i.value.length;p>a;p--)e.value=e.value.slice(0,p-1)+e.value.slice(p),await g(w.removeChar);return-i.value.length}else return i.value.length},x=async()=>{for(const i of ce.map(a=>a.trim())){console.log("apply step",i);const a=ue(e.value,i);let p=0;for(const h of a){const m=await d(h,p);console.log("index",m),p+=m}e.value=i}};return A(e,()=>{try{t.value=oe.parse(e.value)}catch{}}),x(),G({title:"VJSF - Player"}),re(()=>{document.getElementsByTagName("html")[0].style.overflowY="hidden"}),ie(()=>{document.getElementsByTagName("html")[0].style.overflowY=""}),(i,a)=>t.value?(k(),R(N(le),{key:0,fluid:"",class:"pa-0"},{default:z(()=>[D(N(K),{dense:""},{default:z(()=>[D(N(O),{class:"ma-0"},{default:z(()=>[J("div",{style:U(`max-height: ${u.value}px;overflow-y: auto;`)},[D(N(ee),{modelValue:e.value,"onUpdate:modelValue":a[0]||(a[0]=p=>e.value=p),class:"vjsf-code-editor py-2",style:{"min-height":"200px"},highlight:n,"line-numbers":"",readonly:!0},null,8,["modelValue"])],4)]),_:1}),D(N(O),null,{default:z(()=>[J("div",{style:U(`max-height: ${u.value}px;overflow-y: auto;`),class:"pt-2 pr-2"},[v.value?(k(),R(N(X),{key:0,ref_key:"form",ref:y,modelValue:c.value,"onUpdate:modelValue":a[2]||(a[2]=p=>c.value=p)},{default:z(()=>[D(N(b),se({modelValue:s.value,"onUpdate:modelValue":a[1]||(a[1]=p=>s.value=p)},v.value),null,16,["modelValue"])]),_:1},8,["modelValue"])):Y("",!0)],4)]),_:1})]),_:1})]),_:1})):Y("",!0)}};export{Ie as default};
