import{_ as C,a as A}from"./DyBrf-7X.js";import{_ as N,g as d,G as D,D as m,F as S,v as l,A as u,H as O,z as c,t as V,B as _,I as w,J as I,K as j,y as p,L as G,C as H,j as x,E as f,x as g,P as b}from"./BQ4DIMAD.js";import{V as F,a as z,b as J,c as P}from"./EKIVRTgg.js";import{V as R}from"./KcFyJ-5D.js";import{e as U}from"./CO4pUTyO.js";import{u as q}from"./eHzwsF_9.js";import{V as K}from"./D1Ema_iq.js";import{V as k}from"./BG_m-q8j.js";import{V as Y}from"./CyBvoUdF.js";import"./COhP6lXW.js";import"./CN5uW8HJ.js";import"./BosuxZz1.js";import"./cn-G9MQ7.js";import"./B8C66oTJ.js";import"./mDfEz_Ao.js";import"./LYhvEHL8.js";import"./CL1qVdRa.js";import"./mcE45wIK.js";/* empty css        */import"./CZEjMuJX.js";import"./DxkzZux7.js";import"./Cj5kdm3m.js";import"./C660TNbQ.js";import"./BBuxwdaE.js";import"./Dba0r615.js";function $(t,e){const{self:o=!1}=e.modifiers??{},s=e.value,n=typeof s=="object"&&s.options||{passive:!0},r=typeof s=="function"||"handleEvent"in s?s:s.handler,a=o?t:e.arg?document.querySelector(e.arg):window;a&&(a.addEventListener("scroll",r,n),t._onScroll=Object(t._onScroll),t._onScroll[e.instance.$.uid]={handler:r,options:n,target:o?void 0:a})}function T(t,e){var r;if(!((r=t._onScroll)!=null&&r[e.instance.$.uid]))return;const{handler:o,options:s,target:n=t}=t._onScroll[e.instance.$.uid];n.removeEventListener("scroll",o,s),delete t._onScroll[e.instance.$.uid]}function M(t,e){e.value!==e.oldValue&&(T(t,e),$(t,e))}const Q={mounted:$,unmounted:T,updated:M},W={components:{VNavigationDrawer:R,VList:P,VListItem:J,VListItemTitle:z,VListSubheader:F},directives:{Scroll:Q},props:{sections:{type:Array,default:()=>[]}},setup(){return{vGoTo:G()}},data:()=>({offsets:[],timeout:null,activeSection:null,activeIndex:null}),computed:{toc(){return this.sections.map(t=>({...t,hash:`#${t.id}`})).reverse()}},mounted(){this.onScroll()},methods:{itemStyle(t){return`border-left: 2px solid ${t?this.$vuetify.theme.themes.light.colors.primary:"transparent"};`},goTo(t){const e=document.getElementById(t);if(!e)return null;this.vGoTo(e.offsetTop+20)},setOffsets(){this.offsets=this.toc.map(t=>{const e=document.getElementById(t.id);return e?e.offsetTop:null}).filter(t=>t!==null)},async findActiveIndex(){const t=window.pageYOffset||document.documentElement.offsetTop||0;this.setOffsets();let e=this.offsets.findIndex(o=>o-40<t);e===-1&&(e=this.toc.length-1),t+window.innerHeight===document.documentElement.offsetHeight&&(e=0),this.activeIndex=this.toc.length-(e+1),this.activeSection=this.toc[e]},onScroll(){this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(this.findActiveIndex,17)}}};function X(t,e,o,s,n,r){const a=d("v-list-subheader"),v=d("v-list-item-title"),h=d("v-list-item"),i=d("v-list"),E=d("v-navigation-drawer"),B=D("scroll");return t.$vuetify.display.lgAndUp?(l(),m(E,{key:0,location:"right",permanent:"",floating:"",color:"transparent"},{default:u(()=>[o.sections&&o.sections.length?O((l(),m(i,{key:0,dense:"",density:"compact"},{default:u(()=>[c(a,null,{default:u(()=>e[0]||(e[0]=[_("Contents")])),_:1}),(l(!0),V(w,null,I(o.sections,(y,L)=>(l(),m(h,{key:L,style:j(r.itemStyle(!!t.activeSection&&t.activeSection.id===y.id)),to:{hash:`#${y.id}`},active:!1},{default:u(()=>[c(v,null,{default:u(()=>[_(p(y.title),1)]),_:2},1024)]),_:2},1032,["style","to"]))),128))]),_:1})),[[B,r.onScroll]]):S("",!0)]),_:1})):S("",!0)}const Z=N(W,[["render",X]]),tt={class:"text-h3 mb-6"},et=["id"],ot={class:"text-h4 mt-8 mb-3"},Et={__name:"index",setup(t){const e=H(),o=x(()=>U.find(n=>n.id===e.params.categoryId)),s=x(()=>{var n;return"VJSF - "+(((n=o.value)==null?void 0:n.title)||"Unknown category")});return q({title:s}),(n,r)=>{const a=C,v=A,h=Z;return o.value?(l(),m(f(Y),{key:0},{default:u(()=>[g("h1",tt,p(o.value.title),1),c(a,{content:o.value.description},null,8,["content"]),(l(!0),V(w,null,I(o.value.examples,i=>(l(),V(w,{key:i.id},[g("a",{id:i.id,class:"anchor"},null,8,et),g("h2",ot,[_(p(i.title)+" ",1),c(f(K),{icon:"mdi-fullscreen",flat:"",title:"open example in fullscreen",to:`/${o.value.id}/${i.id}`},null,8,["to"])]),i.warning?(l(),m(f(k),{key:0,type:"warning",variant:"outlined",class:"mb-4"},{default:u(()=>[c(a,{content:i.warning},null,8,["content"])]),_:2},1024)):S("",!0),c(a,{content:i.description},null,8,["content"]),c(v,{example:i,v2:o.value.id==="v2-compat"},null,8,["example","v2"])],64))),128)),c(h,{sections:o.value.examples},null,8,["sections"])]),_:1})):(l(),m(f(k),{key:1},{default:u(()=>[_(" No examples category found with id "+p((n._.provides[b]||n.$route).params.categoryId),1)]),_:1}))}}};export{Et as default};
