import{u as U}from"./vue.f36acd1f.-IvtMOSS.js";import{u as H,d as T,e as j,_ as P,V as Z,m as G}from"./index.Al5tLyym.js";import{P as Q,c as X,Y as K}from"./index.KSfMu3QS.js";import{P as W}from"./prism.gi14KCl2.js";import{r as C,c as b,W as q,o as S,Y as ee,F as O,A as z,G as x,H as A,t as R,z as E,x as Y,K as _,Z as te}from"./entry.fxzHD1Px.js";import{V as ne}from"./VContainer.MjyRRpHI.js";import"./tag.JOC0f8Ok.js";import"./VAlert.EFt1PGWf.js";import"./index._y1APrdy.js";import"./VBtn.A__WKVv2.js";import"./resizeObserver.yy7fxAlh.js";import"./VList.HfiMABS_.js";import"./ssrBoot.p-FimYAB.js";/* empty css              */import"./VSpacer.r4Lrysbl.js";import"./en.L36rSQv4.js";function L(){}L.prototype={diff:function(e,t){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=o.callback;typeof o=="function"&&(i=o,o={}),this.options=o;var s=this;function p(c){return i?(setTimeout(function(){i(void 0,c)},0),!0):c}e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e)),t=this.removeEmpty(this.tokenize(t));var m=t.length,u=e.length,l=1,h=m+u;o.maxEditLength&&(h=Math.min(h,o.maxEditLength));var d=[{newPos:-1,components:[]}],y=this.extractCommon(d[0],t,e,0);if(d[0].newPos+1>=m&&y+1>=u)return p([{value:this.join(t),count:t.length}]);function g(){for(var c=-1*l;c<=l;c+=2){var r=void 0,a=d[c-1],f=d[c+1],v=(f?f.newPos:0)-c;a&&(d[c-1]=void 0);var w=a&&a.newPos+1<m,N=f&&0<=v&&v<u;if(!w&&!N){d[c]=void 0;continue}if(!w||N&&a.newPos<f.newPos?(r=re(f),s.pushComponent(r.components,void 0,!0)):(r=a,r.newPos++,s.pushComponent(r.components,!0,void 0)),v=s.extractCommon(r,t,e,c),r.newPos+1>=m&&v+1>=u)return p(oe(s,r.components,t,e,s.useLongestToken));d[c]=r}l++}if(i)(function c(){setTimeout(function(){if(l>h)return i();g()||c()},0)})();else for(;l<=h;){var V=g();if(V)return V}},pushComponent:function(e,t,o){var i=e[e.length-1];i&&i.added===t&&i.removed===o?e[e.length-1]={count:i.count+1,added:t,removed:o}:e.push({count:1,added:t,removed:o})},extractCommon:function(e,t,o,i){for(var s=t.length,p=o.length,m=e.newPos,u=m-i,l=0;m+1<s&&u+1<p&&this.equals(t[m+1],o[u+1]);)m++,u++,l++;return l&&e.components.push({count:l}),e.newPos=m,u},equals:function(e,t){return this.options.comparator?this.options.comparator(e,t):e===t||this.options.ignoreCase&&e.toLowerCase()===t.toLowerCase()},removeEmpty:function(e){for(var t=[],o=0;o<e.length;o++)e[o]&&t.push(e[o]);return t},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};function oe(n,e,t,o,i){for(var s=0,p=e.length,m=0,u=0;s<p;s++){var l=e[s];if(l.removed){if(l.value=n.join(o.slice(u,u+l.count)),u+=l.count,s&&e[s-1].added){var d=e[s-1];e[s-1]=e[s],e[s]=d}}else{if(!l.added&&i){var h=t.slice(m,m+l.count);h=h.map(function(g,V){var c=o[u+V];return c.length>g.length?c:g}),l.value=n.join(h)}else l.value=n.join(t.slice(m,m+l.count));m+=l.count,l.added||(u+=l.count)}}var y=e[p-1];return p>1&&typeof y.value=="string"&&(y.added||y.removed)&&n.equals("",y.value)&&(e[p-2].value+=y.value,e.pop()),e}function re(n){return{newPos:n.newPos,components:n.components.slice(0)}}var k=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,J=/\S/,I=new L;I.equals=function(n,e){return this.options.ignoreCase&&(n=n.toLowerCase(),e=e.toLowerCase()),n===e||this.options.ignoreWhitespace&&!J.test(n)&&!J.test(e)};I.tokenize=function(n){for(var e=n.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<e.length-1;t++)!e[t+1]&&e[t+2]&&k.test(e[t])&&k.test(e[t+2])&&(e[t]+=e[t+2],e.splice(t+1,2),t--);return e};function se(n,e,t){return I.diff(n,e,t)}var M=new L;M.tokenize=function(n){var e=[],t=n.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var o=0;o<t.length;o++){var i=t[o];o%2&&!this.options.newlineIsToken?e[e.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),e.push(i))}return e};var ie=new L;ie.tokenize=function(n){return n.split(/(\S.+?[.!?])(?=\s+|$)/)};var ue=new L;ue.tokenize=function(n){return n.split(/([{}:;,]|\s+)/)};function D(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?D=function(e){return typeof e}:D=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(n)}var le=Object.prototype.toString,F=new L;F.useLongestToken=!0;F.tokenize=M.tokenize;F.castInput=function(n){var e=this.options,t=e.undefinedReplacement,o=e.stringifyReplacer,i=o===void 0?function(s,p){return typeof p>"u"?t:p}:o;return typeof n=="string"?n:JSON.stringify($(n,null,null,i),i,"  ")};F.equals=function(n,e){return L.prototype.equals.call(F,n.replace(/,([\r\n])/g,"$1"),e.replace(/,([\r\n])/g,"$1"))};function $(n,e,t,o,i){e=e||[],t=t||[],o&&(n=o(i,n));var s;for(s=0;s<e.length;s+=1)if(e[s]===n)return t[s];var p;if(le.call(n)==="[object Array]"){for(e.push(n),p=new Array(n.length),t.push(p),s=0;s<n.length;s+=1)p[s]=$(n[s],e,t,o,i);return e.pop(),t.pop(),p}if(n&&n.toJSON&&(n=n.toJSON()),D(n)==="object"&&n!==null){e.push(n),p={},t.push(p);var m=[],u;for(u in n)n.hasOwnProperty(u)&&m.push(u);for(m.sort(),s=0;s<m.length;s+=1)u=m[s],p[u]=$(n[u],e,t,o,u);e.pop(),t.pop()}else p=n;return p}var B=new L;B.tokenize=function(n){return n.slice()};B.join=B.removeEmpty=function(n){return n};const ae=[`
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
`],Ee={__name:"player",setup(n){const e=C(""),t=C(null),o=C({}),i=C({}),s=r=>W.highlight(r,W.languages.yaml,"yaml"),{height:p}=H(),m=b(()=>p.value),u=C({}),l=C(null);q([t,o],()=>{if(!o.value||!t.value)return;let r;try{r=X(t.value,{defaultOptions:G,...o.value}),u.value=r.validationErrors}catch(a){u.value={"":[a.message]}}Object.keys(u.value).length||(l.value={precompiledLayout:r,options:o.value,schema:t.value})},{immediate:!0});const h=C(null),d=C(null),y=async([r,a])=>{const f=Math.random()*(a-r)+r;return new Promise(v=>setTimeout(v,f))},g={lineBreak:[100,200],addChar:[40,120],removeChar:[20,60]},V=async(r,a)=>{if(console.log("apply patch",r),r.added){let f=0;r.value.endsWith(`
`)&&(e.value=e.value.slice(0,a)+`
`+e.value.slice(a),await y(g.lineBreak),r.value=r.value.slice(0,-1),f++);for(let v=0;v<r.value.length;v++){const w=r.value[v],N=a+v;e.value=e.value.slice(0,N)+w+e.value.slice(N),w===`
`?await y(g.lineBreak):await y(g.addChar),f++}return f}else if(r.removed){for(let f=a+r.value.length;f>a;f--)e.value=e.value.slice(0,f-1)+e.value.slice(f),await y(g.removeChar);return-r.value.length}else return r.value.length},c=async()=>{for(const r of ae.map(a=>a.trim())){console.log("apply step",r);const a=se(e.value,r);let f=0;for(const v of a){const w=await V(v,f);console.log("index",w),f+=w}e.value=r}};return q(e,()=>{try{t.value=K.parse(e.value)}catch{}}),c(),U({title:"VJSF - Player"}),S(()=>{document.getElementsByTagName("html")[0].style.overflowY="hidden"}),ee(()=>{document.getElementsByTagName("html")[0].style.overflowY=""}),(r,a)=>t.value?(R(),O(x(ne),{key:0,fluid:"",class:"pa-0"},{default:z(()=>[E(x(Z),{dense:""},{default:z(()=>[E(x(T),{class:"ma-0"},{default:z(()=>[Y("div",{style:_(`max-height: ${m.value}px;overflow-y: auto;`)},[E(x(Q),{modelValue:e.value,"onUpdate:modelValue":a[0]||(a[0]=f=>e.value=f),class:"vjsf-code-editor py-2",style:{"min-height":"200px"},highlight:s,"line-numbers":"",readonly:!0},null,8,["modelValue"])],4)]),_:1}),E(x(T),null,{default:z(()=>[Y("div",{style:_(`max-height: ${m.value}px;overflow-y: auto;`),class:"pt-2 pr-2"},[l.value?(R(),O(x(j),{key:0,ref_key:"form",ref:h,modelValue:d.value,"onUpdate:modelValue":a[2]||(a[2]=f=>d.value=f)},{default:z(()=>[E(x(P),te({modelValue:i.value,"onUpdate:modelValue":a[1]||(a[1]=f=>i.value=f)},l.value),null,16,["modelValue"])]),_:1},8,["modelValue"])):A("",!0)],4)]),_:1})]),_:1})]),_:1})):A("",!0)}};export{Ee as default};
