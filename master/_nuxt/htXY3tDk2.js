import{B as e,Ct as t,H as n,M as r,Ut as i,d as a,f as o,gt as s,it as c,m as l,nt as u,p as d,x as f,z as p}from"./DAU6Le7d.js";import{n as m}from"./pcmOeemA.js";import{a as h,h as g,l as _,o as v}from"./FRH5axOF.js";import{t as y}from"./C7QhYIeT.js";import{A as b,k as x}from"./BweOYUGz.js";import{n as S,t as C}from"./CF_Y3Se_2.js";import"./bY6-ris52.js";import"./BoSLCq0_2.js";import{t as w}from"./dsPy0lat2.js";import{n as T}from"./D_CXQWyq2.js";function E(){}E.prototype={diff:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.callback;typeof n==`function`&&(r=n,n={}),this.options=n;var i=this;function a(e){return r?(setTimeout(function(){r(void 0,e)},0),!0):e}e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e)),t=this.removeEmpty(this.tokenize(t));var o=t.length,s=e.length,c=1,l=o+s;n.maxEditLength&&(l=Math.min(l,n.maxEditLength));var u=n.timeout??1/0,d=Date.now()+u,f=[{oldPos:-1,lastComponent:void 0}],p=this.extractCommon(f[0],t,e,0);if(f[0].oldPos+1>=s&&p+1>=o)return a([{value:this.join(t),count:t.length}]);var m=-1/0,h=1/0;function g(){for(var n=Math.max(m,-c);n<=Math.min(h,c);n+=2){var r=void 0,l=f[n-1],u=f[n+1];l&&(f[n-1]=void 0);var d=!1;if(u){var g=u.oldPos-n;d=u&&0<=g&&g<o}var _=l&&l.oldPos+1<s;if(!d&&!_){f[n]=void 0;continue}if(r=!_||d&&l.oldPos+1<u.oldPos?i.addToPath(u,!0,void 0,0):i.addToPath(l,void 0,!0,1),p=i.extractCommon(r,t,e,n),r.oldPos+1>=s&&p+1>=o)return a(D(i,r.lastComponent,t,e,i.useLongestToken));f[n]=r,r.oldPos+1>=s&&(h=Math.min(h,n-1)),p+1>=o&&(m=Math.max(m,n+1))}c++}if(r)(function e(){setTimeout(function(){if(c>l||Date.now()>d)return r();g()||e()},0)})();else for(;c<=l&&Date.now()<=d;){var _=g();if(_)return _}},addToPath:function(e,t,n,r){var i=e.lastComponent;return i&&i.added===t&&i.removed===n?{oldPos:e.oldPos+r,lastComponent:{count:i.count+1,added:t,removed:n,previousComponent:i.previousComponent}}:{oldPos:e.oldPos+r,lastComponent:{count:1,added:t,removed:n,previousComponent:i}}},extractCommon:function(e,t,n,r){for(var i=t.length,a=n.length,o=e.oldPos,s=o-r,c=0;s+1<i&&o+1<a&&this.equals(t[s+1],n[o+1]);)s++,o++,c++;return c&&(e.lastComponent={count:c,previousComponent:e.lastComponent}),e.oldPos=o,s},equals:function(e,t){return this.options.comparator?this.options.comparator(e,t):e===t||this.options.ignoreCase&&e.toLowerCase()===t.toLowerCase()},removeEmpty:function(e){for(var t=[],n=0;n<e.length;n++)e[n]&&t.push(e[n]);return t},castInput:function(e){return e},tokenize:function(e){return e.split(``)},join:function(e){return e.join(``)}};function D(e,t,n,r,i){for(var a=[],o;t;)a.push(t),o=t.previousComponent,delete t.previousComponent,t=o;a.reverse();for(var s=0,c=a.length,l=0,u=0;s<c;s++){var d=a[s];if(!d.removed){if(!d.added&&i){var f=n.slice(l,l+d.count);f=f.map(function(e,t){var n=r[u+t];return n.length>e.length?n:e}),d.value=e.join(f)}else d.value=e.join(n.slice(l,l+d.count));l+=d.count,d.added||(u+=d.count)}else if(d.value=e.join(r.slice(u,u+d.count)),u+=d.count,s&&a[s-1].added){var p=a[s-1];a[s-1]=a[s],a[s]=p}}var m=a[c-1];return c>1&&typeof m.value==`string`&&(m.added||m.removed)&&e.equals(``,m.value)&&(a[c-2].value+=m.value,a.pop()),a}new E;var O=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,k=/\S/,A=new E;A.equals=function(e,t){return this.options.ignoreCase&&(e=e.toLowerCase(),t=t.toLowerCase()),e===t||this.options.ignoreWhitespace&&!k.test(e)&&!k.test(t)},A.tokenize=function(e){for(var t=e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),n=0;n<t.length-1;n++)!t[n+1]&&t[n+2]&&O.test(t[n])&&O.test(t[n+2])&&(t[n]+=t[n+2],t.splice(n+1,2),n--);return t};function j(e,t,n){return A.diff(e,t,n)}var M=new E;M.tokenize=function(e){this.options.stripTrailingCr&&(e=e.replace(/\r\n/g,`
`));var t=[],n=e.split(/(\n|\r\n)/);n[n.length-1]||n.pop();for(var r=0;r<n.length;r++){var i=n[r];r%2&&!this.options.newlineIsToken?t[t.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),t.push(i))}return t};var N=new E;N.tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)};var P=new E;P.tokenize=function(e){return e.split(/([{}:;,]|\s+)/)};function F(e){"@babel/helpers - typeof";return F=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},F(e)}var I=Object.prototype.toString,L=new E;L.useLongestToken=!0,L.tokenize=M.tokenize,L.castInput=function(e){var t=this.options,n=t.undefinedReplacement,r=t.stringifyReplacer,i=r===void 0?function(e,t){return t===void 0?n:t}:r;return typeof e==`string`?e:JSON.stringify(R(e,null,null,i),i,`  `)},L.equals=function(e,t){return E.prototype.equals.call(L,e.replace(/,([\r\n])/g,`$1`),t.replace(/,([\r\n])/g,`$1`))};function R(e,t,n,r,i){t||=[],n||=[],r&&(e=r(i,e));var a;for(a=0;a<t.length;a+=1)if(t[a]===e)return n[a];var o;if(I.call(e)===`[object Array]`){for(t.push(e),o=Array(e.length),n.push(o),a=0;a<e.length;a+=1)o[a]=R(e[a],t,n,r,i);return t.pop(),n.pop(),o}if(e&&e.toJSON&&(e=e.toJSON()),F(e)===`object`&&e!==null){t.push(e),o={},n.push(o);var s=[],c;for(c in e)e.hasOwnProperty(c)&&s.push(c);for(s.sort(),a=0;a<s.length;a+=1)c=s[a],o[c]=R(e[c],t,n,r,c);t.pop(),n.pop()}else o=e;return o}var z=new E;z.tokenize=function(e){return e.slice()},z.join=z.removeEmpty=function(e){return e};var B=[`
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
`],V={__name:`player`,setup(E){let D=s(``),O=s(null),k=s({}),A=s({}),M=e=>C.highlight(e,C.languages.yaml,`yaml`),{height:N}=v(),P=a(()=>N.value),F=s({}),I=s(null);u([O,k],()=>{if(!k.value||!O.value)return;let e;try{e=_(O.value,{defaultOptions:h,...k.value}),F.value=e.validationErrors}catch(e){F.value={"":[e.message]}}Object.keys(F.value).length||(I.value={precompiledLayout:e,options:k.value,schema:O.value})},{immediate:!0});let L=s(null),R=s(null),z=async([e,t])=>{let n=Math.random()*(t-e)+e;return new Promise(e=>setTimeout(e,n))},V={lineBreak:[100,200],addChar:[40,120],removeChar:[20,60]},H=async(e,t)=>{if(e.added){let n=0;e.value.endsWith(`
`)&&(D.value=D.value.slice(0,t)+`
`+D.value.slice(t),await z(V.lineBreak),e.value=e.value.slice(0,-1),n++);for(let r=0;r<e.value.length;r++){let i=e.value[r],a=t+r;D.value=D.value.slice(0,a)+i+D.value.slice(a),i===`
`?await z(V.lineBreak):await z(V.addChar),n++}return n}else if(e.removed){for(let n=t+e.value.length;n>t;n--)D.value=D.value.slice(0,n-1)+D.value.slice(n),await z(V.removeChar);return-e.value.length}else return e.value.length};return u(D,()=>{try{O.value=w.parse(D.value)}catch{}}),(async()=>{for(let e of B.map(e=>e.trim())){console.log(`apply step`,e);let t=j(D.value,e),n=0;for(let e of t){let t=await H(e,n);console.log(`index`,t),n+=t}D.value=e}})(),m({title:`VJSF - Player`,meta:[{name:`robots`,content:`noindex, nofollow`}]}),p(()=>{document.getElementsByTagName(`html`)[0].style.overflowY=`hidden`}),e(()=>{document.getElementsByTagName(`html`)[0].style.overflowY=``}),(e,a)=>O.value?(n(),d(t(y),{key:0,fluid:``,class:`pa-0`},{default:c(()=>[f(t(x),null,{default:c(()=>[f(t(b),{class:`ma-0`},{default:c(()=>[o(`div`,{style:i(`max-height: ${P.value}px;overflow-y: auto;`)},[f(t(S),{modelValue:D.value,"onUpdate:modelValue":a[0]||=e=>D.value=e,class:`vjsf-code-editor py-2`,style:{"min-height":`200px`},highlight:M,"line-numbers":``,readonly:!0},null,8,[`modelValue`])],4)]),_:1}),f(t(b),null,{default:c(()=>[o(`div`,{style:i(`max-height: ${P.value}px;overflow-y: auto;`),class:`pt-2 pr-2`},[I.value?(n(),d(t(g),{key:0,ref_key:`form`,ref:L,modelValue:R.value,"onUpdate:modelValue":a[2]||=e=>R.value=e},{default:c(()=>[f(t(T),r({modelValue:A.value,"onUpdate:modelValue":a[1]||=e=>A.value=e},I.value),null,16,[`modelValue`])]),_:1},8,[`modelValue`])):l(``,!0)],4)]),_:1})]),_:1})]),_:1})):l(``,!0)}};export{V as default};