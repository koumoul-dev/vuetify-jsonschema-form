import{N as F,r as R,ag as k,c as u,aA as Q,T,o as O,e as Y,O as E,Q as Z,aq as X,af as A,z as t,W as j,aB as ee,a8 as ae,as as te,az as le,Z as oe,av as se,E as re,F as I,A as l,G as a,t as B,B as f,y as M,v as ne,L as ue,K as ie,bv as ce,H as de,R as me,x as U}from"./entry.BlE-bMWa.js";import{m as ve,V as D,e as fe}from"./index.D8zSORpx.js";import{e as he,f as pe,g as ge,c as ye,j as be,l as Ve,n as Se,a as P}from"./index.qRfdr1Ks.js";import{u as H,m as _e,a as ke}from"./tag.X2cuBqpN.js";import{m as q,u as G}from"./layout.BsAFCrML.js";import{u as Be}from"./resizeObserver.FyU1CWvn.js";import{e as we,V as N}from"./VBtn.Dm9AVPwb.js";import{u as Ie}from"./ssrBoot.DTFOHzvm.js";import{V as Te,a as xe}from"./VMain.Bd6vjAP7.js";import{V as $}from"./VSpacer.C6oyOFkG.js";import{V as C,a as y,b,e as Pe,c as Ne}from"./VList.4VfwgjwR.js";import{V as Ae}from"./VNavigationDrawer.D1y0Rtd_.js";import"./dimensions.CIrk7PXE.js";/* empty css              */const Fe=F({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Ce(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:h}=i;let g=0;const s=R(null),o=k(0),m=k(0),n=k(0),v=k(!1),c=k(!1),p=u(()=>Number(e.scrollThreshold)),_=u(()=>Q((p.value-o.value)/p.value||0)),V=()=>{const d=s.value;!d||h&&!h.value||(g=o.value,o.value="window"in d?d.pageYOffset:d.scrollTop,c.value=o.value<g,n.value=Math.abs(o.value-p.value))};return T(c,()=>{m.value=m.value||o.value}),T(v,()=>{m.value=0}),O(()=>{T(()=>e.scrollTarget,d=>{var x;const S=d?document.querySelector(d):window;S&&S!==s.value&&((x=s.value)==null||x.removeEventListener("scroll",V),s.value=S,s.value.addEventListener("scroll",V,{passive:!0}))},{immediate:!0})}),Y(()=>{var d;(d=s.value)==null||d.removeEventListener("scroll",V)}),h&&T(h,V,{immediate:!0}),{scrollThreshold:p,currentScroll:o,currentThreshold:n,isScrollActive:v,scrollRatio:_,isScrollingUp:c,savedScroll:m}}const Re=F({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...ve(),...q(),...Fe(),height:{type:[Number,String],default:64}},"VAppBar"),Ee=E()({name:"VAppBar",props:Re(),emits:{"update:modelValue":e=>!0},setup(e,i){let{slots:h}=i;const g=R(),s=Z(e,"modelValue"),o=u(()=>{var w;const r=new Set(((w=e.scrollBehavior)==null?void 0:w.split(" "))??[]);return{hide:r.has("hide"),fullyHide:r.has("fully-hide"),inverted:r.has("inverted"),collapse:r.has("collapse"),elevate:r.has("elevate"),fadeImage:r.has("fade-image")}}),m=u(()=>{const r=o.value;return r.hide||r.fullyHide||r.inverted||r.collapse||r.elevate||r.fadeImage||!s.value}),{currentScroll:n,scrollThreshold:v,isScrollingUp:c,scrollRatio:p}=Ce(e,{canScroll:m}),_=u(()=>o.value.hide||o.value.fullyHide),V=u(()=>e.collapse||o.value.collapse&&(o.value.inverted?p.value>0:p.value===0)),d=u(()=>e.flat||o.value.fullyHide&&!s.value||o.value.elevate&&(o.value.inverted?n.value>0:n.value===0)),S=u(()=>o.value.fadeImage?o.value.inverted?1-p.value:p.value:void 0),x=u(()=>{var L,z;const r=Number(((L=g.value)==null?void 0:L.contentHeight)??e.height),w=Number(((z=g.value)==null?void 0:z.extensionHeight)??0);return _.value?n.value<v.value||o.value.fullyHide?r+w:r:r+w});X(u(()=>!!e.scrollBehavior),()=>{ee(()=>{_.value?o.value.inverted?s.value=n.value>v.value:s.value=c.value||n.value<v.value:s.value=!0})});const{ssrBootStyles:K}=Ie(),{layoutItemStyles:W,layoutIsReady:J}=G({id:e.name,order:u(()=>parseInt(e.order,10)),position:A(e,"location"),layoutSize:x,elementSize:k(void 0),active:s,absolute:A(e,"absolute")});return H(()=>{const r=D.filterProps(e);return t(D,j({ref:g,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...W.value,"--v-toolbar-image-opacity":S.value,height:void 0,...K.value},e.style]},r,{collapse:V.value,flat:d.value}),h)}),J}}),He=F({...we({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),Le=E()({name:"VAppBarNavIcon",props:He(),setup(e,i){let{slots:h}=i;return H(()=>t(N,j(e,{class:["v-app-bar-nav-icon"]}),h)),{}}}),ze=F({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...he(),..._e(),...pe(),...q(),...ge(),...ke({tag:"footer"}),...ae()},"VFooter"),Me=E()({name:"VFooter",props:ze(),setup(e,i){let{slots:h}=i;const{themeClasses:g}=te(e),{backgroundColorClasses:s,backgroundColorStyles:o}=ye(A(e,"color")),{borderClasses:m}=be(e),{elevationClasses:n}=Ve(e),{roundedClasses:v}=Se(e),c=k(32),{resizeRef:p}=Be(S=>{S.length&&(c.value=S[0].target.clientHeight)}),_=u(()=>e.height==="auto"?c.value:parseInt(e.height,10)),{layoutItemStyles:V,layoutIsReady:d}=G({id:e.name,order:u(()=>parseInt(e.order,10)),position:u(()=>"bottom"),layoutSize:_,elementSize:u(()=>e.height==="auto"?void 0:_.value),active:u(()=>e.app),absolute:A(e,"absolute")});return H(()=>t(e.tag,{ref:p,class:["v-footer",g.value,s.value,m.value,n.value,v.value,e.class],style:[o.value,e.app?V.value:{height:le(e.height)},e.style]},h)),e.app?d:{}}}),Ue="3.0.0-beta.33",De=U("span",{class:"text-caption"},[f("Maintained by "),U("a",{href:"https://koumoul.com",class:"text-primary text-decoration-none font-weight-medium"},"Koumoul")],-1),ta={__name:"default",setup(e){const i=oe(),h=se();O(()=>{const n=window.localStorage.getItem("theme");n&&(i.global.name.value=n)});const g=()=>{i.global.name.value==="dark"?i.global.name.value="light":i.global.name.value="dark",localStorage.setItem("theme",i.global.name.value)},s=R(!1),o=re(),m=u(()=>["categoryId-id","editor"].includes(o.name)||o.name.startsWith("compiled-")||h.smAndDown.value);return T(m,n=>{s.value=!n},{immediate:!0}),(n,v)=>(B(),I(a(xe),null,{default:l(()=>[t(a(Ae),{modelValue:s.value,"onUpdate:modelValue":v[0]||(v[0]=c=>s.value=c),temporary:m.value,permanent:!m.value,app:"",class:"main-drawer",theme:"dark"},{append:l(()=>[t(a(Me),null,{default:l(()=>[t(a($)),De]),_:1})]),default:l(()=>[t(a(C),{class:"py-0"},{default:l(()=>[t(a(y),{to:"/",class:"text-primary py-2"},{default:l(()=>[t(a(b),{class:"text-h6 font-weight-bold"},{default:l(()=>[f(" VJSF ")]),_:1}),t(a(Pe),{class:"font-weight-bold"},{default:l(()=>[f(M(a(Ue)),1)]),_:1})]),_:1})]),_:1}),t(a(C),{class:"pt-0",color:"primary"},{default:l(()=>[t(a(y),{to:"/about"},{default:l(()=>[t(a(b),null,{default:l(()=>[f(" About ")]),_:1})]),_:1}),t(a(y),{to:"/getting-started"},{default:l(()=>[t(a(b),null,{default:l(()=>[f(" Getting started ")]),_:1})]),_:1}),t(a(y),{to:"/2to3"},{default:l(()=>[t(a(b),null,{default:l(()=>[f(" 2.x to 3.x ")]),_:1})]),_:1}),t(a(y),{to:"/configuration"},{default:l(()=>[t(a(b),null,{default:l(()=>[f(" Configuration ")]),_:1})]),_:1}),t(a(y),{to:"/expressions"},{default:l(()=>[t(a(b),null,{default:l(()=>[f(" Expressions ")]),_:1})]),_:1}),t(a(y),{to:"/editor"},{default:l(()=>[t(a(b),null,{default:l(()=>[f(" Editor ")]),_:1})]),_:1}),t(a(y),{to:"/plugins"},{default:l(()=>[t(a(b),null,{default:l(()=>[f(" Plugins ")]),_:1})]),_:1})]),_:1}),t(a(C),{density:"compact",nav:""},{default:l(()=>[t(a(Ne),null,{default:l(()=>[f("Examples")]),_:1}),(B(!0),ne(ie,null,ue(a(fe),c=>(B(),I(a(y),{key:c.id,to:`/${c.id}`,class:"mb-0"},{default:l(()=>[t(a(b),null,{default:l(()=>[f(M(c.title),1)]),_:2},1024)]),_:2},1032,["to"]))),128))]),_:1})]),_:1},8,["modelValue","temporary","permanent"]),t(a(Ee),{app:"",density:"comfortable",color:a(i).global.name.value==="dark"?"#121212":"#FFFFFF","scroll-behavior":"elevate"},{default:l(()=>[m.value?(B(),I(a(Le),{key:0,onClick:v[1]||(v[1]=ce(c=>s.value=!s.value,["stop"]))})):de("",!0),t(a($)),t(a(N),{icon:"",color:"primary",onClick:g},{default:l(()=>[a(i).global.name.value==="light"?(B(),I(a(P),{key:0,icon:"mdi-weather-night"})):(B(),I(a(P),{key:1,icon:"mdi-weather-sunny"}))]),_:1}),t(a(N),{href:"https://github.com/sponsors/koumoul-dev",variant:"outlined",rounded:"",color:"primary",style:{"text-transform":"none"},class:"mx-2"},{prepend:l(()=>[t(a(P),{color:"pink-accent-3",size:"large",icon:"mdi-heart"})]),default:l(()=>[f(" Sponsor ")]),_:1}),t(a(N),{icon:"",href:"https://github.com/koumoul-dev/vuetify-jsonschema-form",color:a(i).global.name.value==="light"?"black":"white",size:"x-large",density:"compact",title:"repository on github"},{default:l(()=>[t(a(P),{icon:"mdi-github"})]),_:1},8,["color"])]),_:1},8,["color"]),t(a(Te),null,{default:l(()=>[me(n.$slots,"default")]),_:3})]),_:3}))}};export{ta as default};
