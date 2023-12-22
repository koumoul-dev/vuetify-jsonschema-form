import{Z as k,a4 as j,$ as T,aq as J,ap as W,v as a,r as M,ac as V,c as d,av as X,E as w,o as ee,e as ae,a7 as te,ao as le,ab as R,a2 as O,C as oe,au as se,b9 as ne,az as re,ba as ue,I,x as l,m as S,y as h,t as H,T as C,q as ie,M as ce,L as de,bb as ve,J as me,b3 as fe,s as U}from"./entry.ce06a5d2.js";import{r as pe,j as G,p as q,o as D,V as E,b as y,c as b,s as he,a as ge,e as ye}from"./index.27ff01fd.js";import{m as z,u as x,a as K}from"./tag.5a7d9c09.js";import{m as be,c as Ve,a as Y,u as Z,b as _e,V as Se}from"./VNavigationDrawer.62716eab.js";import{P as ke,V as N,g as Be,h as Ie,j as we,c as Te,n as xe,p as Pe,q as Ae,I as Ce,a as L}from"./VBtn.3e866bdd.js";const Le=k({...z(),...be({fullHeight:!0}),...j()},"VApp"),Ne=T()({name:"VApp",props:Le(),setup(e,n){let{slots:o}=n;const u=J(e),{layoutClasses:s,getLayoutItem:t,items:v,layoutRef:i}=Ve(e),{rtlClasses:p}=W();return x(()=>{var c;return a("div",{ref:i,class:["v-application",u.themeClasses.value,s.value,p.value,e.class],style:[e.style]},[a("div",{class:"v-application__wrap"},[(c=o.default)==null?void 0:c.call(o)])])}),{getLayoutItem:t,items:v,theme:u}}});const Re=k({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Ee(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:o}=n;let u=0;const s=M(null),t=V(0),v=V(0),i=V(0),p=V(!1),c=V(!1),r=d(()=>Number(e.scrollThreshold)),_=d(()=>X((r.value-t.value)/r.value||0)),g=()=>{const m=s.value;!m||o&&!o.value||(u=t.value,t.value="window"in m?m.pageYOffset:m.scrollTop,c.value=t.value<u,i.value=Math.abs(t.value-r.value))};return w(c,()=>{v.value=v.value||t.value}),w(p,()=>{v.value=0}),ee(()=>{w(()=>e.scrollTarget,m=>{var P;const B=m?document.querySelector(m):window;B&&B!==s.value&&((P=s.value)==null||P.removeEventListener("scroll",g),s.value=B,s.value.addEventListener("scroll",g,{passive:!0}))},{immediate:!0})}),ae(()=>{var m;(m=s.value)==null||m.removeEventListener("scroll",g)}),o&&w(o,g,{immediate:!0}),{scrollThreshold:r,currentScroll:t,currentThreshold:i,isScrollActive:p,scrollRatio:_,isScrollingUp:c,savedScroll:v}}const Me=k({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...pe(),...Y(),...Re(),height:{type:[Number,String],default:64}},"VAppBar"),ze=T()({name:"VAppBar",props:Me(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:o}=n;const u=M(),s=te(e,"modelValue"),t=d(()=>{var A;const f=new Set(((A=e.scrollBehavior)==null?void 0:A.split(" "))??[]);return{hide:f.has("hide"),inverted:f.has("inverted"),collapse:f.has("collapse"),elevate:f.has("elevate"),fadeImage:f.has("fade-image")}}),v=d(()=>{const f=t.value;return f.hide||f.inverted||f.collapse||f.elevate||f.fadeImage||!s.value}),{currentScroll:i,scrollThreshold:p,isScrollingUp:c,scrollRatio:r}=Ee(e,{canScroll:v}),_=d(()=>e.collapse||t.value.collapse&&(t.value.inverted?r.value>0:r.value===0)),g=d(()=>e.flat||t.value.elevate&&(t.value.inverted?i.value>0:i.value===0)),m=d(()=>t.value.fadeImage?t.value.inverted?1-r.value:r.value:void 0),B=d(()=>{var F,$;if(t.value.hide&&t.value.inverted)return 0;const f=((F=u.value)==null?void 0:F.contentHeight)??0,A=(($=u.value)==null?void 0:$.extensionHeight)??0;return f+A});le(d(()=>!!e.scrollBehavior),()=>{oe(()=>{t.value.hide?t.value.inverted?s.value=i.value>p.value:s.value=c.value||i.value<p.value:s.value=!0})});const{ssrBootStyles:P}=G(),{layoutItemStyles:Q}=Z({id:e.name,order:d(()=>parseInt(e.order,10)),position:R(e,"location"),layoutSize:B,elementSize:V(void 0),active:s,absolute:R(e,"absolute")});return x(()=>{const[f]=q.filterProps(e);return a(q,O({ref:u,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...Q.value,"--v-toolbar-image-opacity":m.value,height:void 0,...P.value},e.style]},f,{collapse:_.value,flat:g.value}),o)}),{}}}),Fe=k({...ke({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),$e=T()({name:"VAppBarNavIcon",props:Fe(),setup(e,n){let{slots:o}=n;return x(()=>a(N,O(e,{class:["v-app-bar-nav-icon"]}),o)),{}}});const He=k({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...Be(),...z(),...Ie(),...Y(),...we(),...K({tag:"footer"}),...j()},"VFooter"),Ue=T()({name:"VFooter",props:He(),setup(e,n){let{slots:o}=n;const{themeClasses:u}=J(e),{backgroundColorClasses:s,backgroundColorStyles:t}=Te(R(e,"color")),{borderClasses:v}=xe(e),{elevationClasses:i}=Pe(e),{roundedClasses:p}=Ae(e),c=V(32),{resizeRef:r}=Ce(m=>{m.length&&(c.value=m[0].target.clientHeight)}),_=d(()=>e.height==="auto"?c.value:parseInt(e.height,10)),{layoutItemStyles:g}=Z({id:e.name,order:d(()=>parseInt(e.order,10)),position:d(()=>"bottom"),layoutSize:_,elementSize:d(()=>e.height==="auto"?void 0:_.value),active:d(()=>e.app),absolute:R(e,"absolute")});return x(()=>a(e.tag,{ref:r,class:["v-footer",u.value,s.value,v.value,i.value,p.value,e.class],style:[t.value,e.app?g.value:{height:se(e.height)},e.style]},o)),{}}});const qe=k({scrollable:Boolean,...z(),...K({tag:"main"})},"VMain"),De=T()({name:"VMain",props:qe(),setup(e,n){let{slots:o}=n;const{mainStyles:u}=_e(),{ssrBootStyles:s}=G();return x(()=>a(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[u.value,s.value,e.style]},{default:()=>{var t,v;return[e.scrollable?a("div",{class:"v-main__scroller"},[(t=o.default)==null?void 0:t.call(o)]):(v=o.default)==null?void 0:v.call(o)]}})),{}}}),je="2.21.3";const Je=U("span",{class:"text-caption"},[h("Maintained by "),U("a",{href:"https://koumoul.com",class:"text-primary text-decoration-none font-weight-medium"},"Koumoul")],-1),Qe={__name:"default",setup(e){const n=ne(),o=re(),u=localStorage.getItem("theme");u&&(n.global.name.value=u);const s=()=>{n.global.name.value==="dark"?n.global.name.value="light":n.global.name.value="dark",localStorage.setItem("theme",n.global.name.value)},t=M(!1),v=ue(),i=d(()=>v.name==="categoryId-id"||o.smAndDown.value);return w(i,p=>{t.value=!p},{immediate:!0}),(p,c)=>(S(),I(Ne,null,{default:l(()=>[a(Se,{modelValue:t.value,"onUpdate:modelValue":c[0]||(c[0]=r=>t.value=r),temporary:i.value,permanent:!i.value,app:"",class:"main-drawer",theme:"dark"},{append:l(()=>[a(Ue,null,{default:l(()=>[a(D),Je]),_:1})]),default:l(()=>[a(E,{class:"py-0"},{default:l(()=>[a(y,{to:"/",class:"text-primary py-2"},{default:l(()=>[a(b,{class:"text-h6 font-weight-bold"},{default:l(()=>[h(" VJSF ")]),_:1}),a(he,{class:"font-weight-bold"},{default:l(()=>[h(H(C(je)),1)]),_:1})]),_:1})]),_:1}),a(E,{class:"pt-0",color:"primary"},{default:l(()=>[a(y,{to:"/about"},{default:l(()=>[a(b,null,{default:l(()=>[h(" About ")]),_:1})]),_:1}),a(y,{to:"/getting-started"},{default:l(()=>[a(b,null,{default:l(()=>[h(" Getting started ")]),_:1})]),_:1}),a(y,{to:"/2to3"},{default:l(()=>[a(b,null,{default:l(()=>[h(" 2.x to 3.x ")]),_:1})]),_:1}),a(y,{to:"/configuration"},{default:l(()=>[a(b,null,{default:l(()=>[h(" Configuration ")]),_:1})]),_:1}),a(y,{to:"/expressions"},{default:l(()=>[a(b,null,{default:l(()=>[h(" Expressions ")]),_:1})]),_:1})]),_:1}),a(E,{density:"compact",nav:""},{default:l(()=>[a(ge,null,{default:l(()=>[h("Examples")]),_:1}),(S(!0),ie(de,null,ce(C(ye),r=>(S(),I(y,{key:r.id,to:`/${r.id}`,class:"mb-0"},{default:l(()=>[a(b,null,{default:l(()=>[h(H(r.title),1)]),_:2},1024)]),_:2},1032,["to"]))),128))]),_:1})]),_:1},8,["modelValue","temporary","permanent"]),a(ze,{app:"",flat:"",density:"comfortable",color:"transparent"},{default:l(()=>[i.value?(S(),I($e,{key:0,onClick:c[1]||(c[1]=ve(r=>t.value=!t.value,["stop"]))})):me("",!0),a(D),a(N,{icon:"",color:"primary",onClick:s},{default:l(()=>[C(n).global.name.value==="light"?(S(),I(L,{key:0,icon:"mdi-weather-night"})):(S(),I(L,{key:1,icon:"mdi-weather-sunny"}))]),_:1}),a(N,{href:"https://github.com/sponsors/koumoul-dev",variant:"outlined",rounded:"",color:"primary",style:{"text-transform":"none"},class:"mx-2"},{prepend:l(()=>[a(L,{color:"pink-accent-3",size:"large",icon:"mdi-heart"})]),default:l(()=>[h(" Sponsor ")]),_:1}),a(N,{icon:"",href:"https://github.com/koumoul-dev/vuetify-jsonschema-form",color:C(n).global.name.value==="light"?"black":"white",size:"x-large",density:"compact",title:"repository on github"},{default:l(()=>[a(L,{icon:"mdi-github"})]),_:1},8,["color"])]),_:1}),a(De,null,{default:l(()=>[fe(p.$slots,"default")]),_:3})]),_:3}))}};export{Qe as default};