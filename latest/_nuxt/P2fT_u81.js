import{u as te}from"./CyhATmos.js";import{N as K,ai as T,U as V,as as oe,ay as X,ax as Z,ah as ae,bw as ne,bx as se,j as l,f as ue,r as le,X as S,bR as k,au as L,bF as ie}from"./DCuHFJ9p.js";const $=Symbol.for("vuetify:layout"),D=Symbol.for("vuetify:layout-item"),B=1e3,de=K({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),fe=K({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function me(){const n=T($);if(!n)throw new Error("[Vuetify] Could not find injected layout");return{layoutIsReady:V(),getLayoutItem:n.getLayoutItem,mainRect:n.mainRect,mainStyles:n.mainStyles}}function pe(n){const o=T($);if(!o)throw new Error("[Vuetify] Could not find injected layout");const i=n.id??`layout-item-${oe()}`,c=X("useLayoutItem");Z(D,{id:i});const a=ae(!1);ne(()=>a.value=!0),se(()=>a.value=!1);const y=V(),{layoutItemStyles:u,layoutItemScrimStyles:v}=o.register(c,{...n,active:l(()=>a.value?!1:n.active.value),id:i});return ue(()=>o.unregister(i)),{layoutItemStyles:u,layoutRect:o.layoutRect,layoutItemScrimStyles:v,layoutIsReady:y}}const re=(n,o,i,c)=>{let a={top:0,left:0,right:0,bottom:0};const y=[{id:"",layer:{...a}}];for(const u of n){const v=o.get(u),p=i.get(u),R=c.get(u);if(!v||!p||!R)continue;const g={...a,[v.value]:parseInt(a[v.value],10)+(R.value?parseInt(p.value,10):0)};y.push({id:u,layer:g}),a=g}return y};function ge(n){const o=T($,null),i=l(()=>o?o.rootZIndex.value-100:B),c=le([]),a=S(new Map),y=S(new Map),u=S(new Map),v=S(new Map),p=S(new Map),{resizeRef:R,contentRect:g}=te(),h=k(()=>{const t=[...new Set([...u.values()].map(e=>e.value))].sort((e,f)=>e-f),r=[];for(const e of t){const f=c.value.filter(s=>{var m;return((m=u.get(s))==null?void 0:m.value)===e});r.push(...f)}return re(r,a,y,v)}),j=l(()=>!Array.from(p.values()).some(t=>t.value)),I=l(()=>h.value[h.value.length-1].layer),F=l(()=>({"--v-layout-left":L(I.value.left),"--v-layout-right":L(I.value.right),"--v-layout-top":L(I.value.top),"--v-layout-bottom":L(I.value.bottom),...j.value?void 0:{transition:"none"}})),x=k(()=>h.value.slice(1).map((t,r)=>{let{id:e}=t;const{layer:f}=h.value[r],s=y.get(e),m=a.get(e);return{id:e,...f,size:Number(s.value),position:m.value}})),A=t=>x.value.find(r=>r.id===t),z=X("createLayout"),H=V();Z($,{register:(t,r)=>{let{id:e,order:f,position:s,layoutSize:m,elementSize:b,active:N,disableTransitions:P,absolute:Y}=r;u.set(e,f),a.set(e,s),y.set(e,m),v.set(e,N),P&&p.set(e,P);const U=ie(D,z==null?void 0:z.vnode).indexOf(t);U>-1?c.value.splice(U,0,e):c.value.push(e);const C=l(()=>x.value.findIndex(w=>w.id===e)),E=l(()=>i.value+h.value.length*2-C.value*2),_=l(()=>{const w=s.value==="left"||s.value==="right",O=s.value==="right",J=s.value==="bottom",M=b.value??m.value,Q=M===0?"%":"px",ee={[s.value]:0,zIndex:E.value,transform:`translate${w?"X":"Y"}(${(N.value?0:-(M===0?100:M))*(O||J?-1:1)}${Q})`,position:Y.value||i.value!==B?"absolute":"fixed",...j.value?void 0:{transition:"none"}};if(C.value<0)throw new Error(`Layout item "${e}" is missing`);const d=x.value[C.value];if(!d)throw new Error(`[Vuetify] Could not find layout item "${e}"`);return{...ee,height:w?`calc(100% - ${d.top}px - ${d.bottom}px)`:b.value?`${b.value}px`:void 0,left:O?void 0:`${d.left}px`,right:O?`${d.right}px`:void 0,top:s.value!=="bottom"?`${d.top}px`:void 0,bottom:s.value!=="top"?`${d.bottom}px`:void 0,width:w?b.value?`${b.value}px`:void 0:`calc(100% - ${d.left}px - ${d.right}px)`}}),G=l(()=>({zIndex:E.value-1}));return{layoutItemStyles:_,layoutItemScrimStyles:G,zIndex:E}},unregister:t=>{u.delete(t),a.delete(t),y.delete(t),v.delete(t),p.delete(t),c.value=c.value.filter(r=>r!==t)},mainRect:I,mainStyles:F,getLayoutItem:A,items:x,layoutRect:g,rootZIndex:i,layoutIsReady:H});const q=l(()=>["v-layout",{"v-layout--full-height":n.fullHeight}]),W=l(()=>({zIndex:o?i.value:void 0,position:o?"relative":void 0,overflow:o?"hidden":void 0}));return{layoutClasses:q,layoutStyles:W,getLayoutItem:A,items:x,layoutRect:g,layoutIsReady:H,layoutRef:R}}export{de as a,me as b,ge as c,fe as m,pe as u};
