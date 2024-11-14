import{_ as L,a as A}from"./DDisc0Oj.js";import{_ as N,g as d,G as D,t as l,D as m,A as u,H as O,z as c,B as _,v as S,I as V,J as $,K as H,y as p,F as w,C as b,i as x,E as f,x as g,P as j}from"./DxK5QV_v.js";import{V as F}from"./BDfomSTS.js";import{V as z,a as J,b as P,c as R}from"./BM4NCaxS.js";import{e as U}from"./CbeB1nDV.js";import{u as q}from"./DK_vE9zt.js";import{V as G}from"./wYq7c63x.js";import{V as k}from"./rADhcB2M.js";import{V as K}from"./_A32tspL.js";import"./Bs-NgG50.js";import"./COzRHrj0.js";import"./BosuxZz1.js";import"./CQodmBQP.js";import"./CJpVtMeO.js";import"./DhGIs5ff.js";import"./BSsSwofs.js";import"./BQI04MH9.js";import"./BpL2aHmH.js";import"./DWgt0j8g.js";/* empty css        */import"./BeZTEJME.js";import"./413CScsq.js";import"./KN3z3sJk.js";import"./CFhA7ZrK.js";import"./BX9utgig.js";import"./DQiSaMqm.js";function I(t,e){const{self:o=!1}=e.modifiers??{},s=e.value,n=typeof s=="object"&&s.options||{passive:!0},r=typeof s=="function"||"handleEvent"in s?s:s.handler,a=o?t:e.arg?document.querySelector(e.arg):window;a&&(a.addEventListener("scroll",r,n),t._onScroll=Object(t._onScroll),t._onScroll[e.instance.$.uid]={handler:r,options:n,target:o?void 0:a})}function E(t,e){var r;if(!((r=t._onScroll)!=null&&r[e.instance.$.uid]))return;const{handler:o,options:s,target:n=t}=t._onScroll[e.instance.$.uid];n.removeEventListener("scroll",o,s),delete t._onScroll[e.instance.$.uid]}function Y(t,e){e.value!==e.oldValue&&(E(t,e),I(t,e))}const M={mounted:I,unmounted:E,updated:Y},Q={components:{VNavigationDrawer:F,VList:z,VListItem:J,VListItemTitle:P,VListSubheader:R},directives:{Scroll:M},props:{sections:{type:Array,default:()=>[]}},data:()=>({offsets:[],timeout:null,activeSection:null,activeIndex:null}),computed:{toc(){return this.sections.map(t=>({...t,hash:`#${t.id}`})).reverse()}},mounted(){this.onScroll()},methods:{itemStyle(t){return`border-left: 2px solid ${t?this.$vuetify.theme.themes.light.colors.primary:"transparent"};`},goTo(t){const e=document.getElementById(t);if(!e)return null;this.$vuetify.goTo(e.offsetTop+20)},setOffsets(){this.offsets=this.toc.map(t=>{const e=document.getElementById(t.id);return e?e.offsetTop:null}).filter(t=>t!==null)},async findActiveIndex(){const t=window.pageYOffset||document.documentElement.offsetTop||0;this.setOffsets();let e=this.offsets.findIndex(o=>o-40<t);e===-1&&(e=this.toc.length-1),t+window.innerHeight===document.documentElement.offsetHeight&&(e=0),this.activeIndex=this.toc.length-(e+1),this.activeSection=this.toc[e]},onScroll(){this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(this.findActiveIndex,17)}}};function W(t,e,o,s,n,r){const a=d("v-list-subheader"),v=d("v-list-item-title"),h=d("v-list-item"),i=d("v-list"),T=d("v-navigation-drawer"),B=D("scroll");return t.$vuetify.display.lgAndUp?(l(),m(T,{key:0,location:"right",permanent:"",floating:"",color:"transparent"},{default:u(()=>[o.sections&&o.sections.length?O((l(),m(i,{key:0,dense:"",density:"compact"},{default:u(()=>[c(a,null,{default:u(()=>e[0]||(e[0]=[_("Contents")])),_:1}),(l(!0),S(V,null,$(o.sections,(y,C)=>(l(),m(h,{key:C,style:H(r.itemStyle(!!t.activeSection&&t.activeSection.id===y.id)),to:{hash:`#${y.id}`},active:!1},{default:u(()=>[c(v,null,{default:u(()=>[_(p(y.title),1)]),_:2},1024)]),_:2},1032,["style","to"]))),128))]),_:1})),[[B,r.onScroll]]):w("",!0)]),_:1})):w("",!0)}const X=N(Q,[["render",W]]),Z={class:"text-h3 mb-6"},tt=["id"],et={class:"text-h4 mt-8 mb-3"},Tt={__name:"index",setup(t){const e=b(),o=x(()=>U.find(n=>n.id===e.params.categoryId)),s=x(()=>{var n;return"VJSF - "+(((n=o.value)==null?void 0:n.title)||"Unknown category")});return q({title:s}),(n,r)=>{const a=L,v=A,h=X;return o.value?(l(),m(f(G),{key:0},{default:u(()=>[g("h1",Z,p(o.value.title),1),c(a,{content:o.value.description},null,8,["content"]),(l(!0),S(V,null,$(o.value.examples,i=>(l(),S(V,{key:i.id},[g("a",{id:i.id,class:"anchor"},null,8,tt),g("h2",et,[_(p(i.title)+" ",1),c(f(K),{icon:"mdi-fullscreen",flat:"",title:"open example in fullscreen",to:`/${o.value.id}/${i.id}`},null,8,["to"])]),i.warning?(l(),m(f(k),{key:0,type:"warning",variant:"outlined",class:"mb-4"},{default:u(()=>[c(a,{content:i.warning},null,8,["content"])]),_:2},1024)):w("",!0),c(a,{content:i.description},null,8,["content"]),c(v,{example:i,v2:o.value.id==="v2-compat"},null,8,["example","v2"])],64))),128)),c(h,{sections:o.value.examples},null,8,["sections"])]),_:1})):(l(),m(f(k),{key:1},{default:u(()=>[_(" No examples category found with id "+p((n._.provides[j]||n.$route).params.categoryId),1)]),_:1}))}}};export{Tt as default};
