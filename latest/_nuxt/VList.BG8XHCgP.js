import{O as L,bx as Se,ab as he,g as be,N as _,a3 as ft,z as u,c as S,W as Z,by as Fe,ah as w,aq as Re,ai as z,r as P,T as Y,ar as gt,U as mt,e as Ce,J as ee,I as Me,K as ve,aA as fe,ay as Ne,Y as $,Z as ae,$ as ie,ak as le,af as se,aF as O,al as $e,Q as de,ae as yt,aT as St,ac as te,bz as ht,ad as bt,aQ as F,an as Ee,X as Ct,aK as kt}from"./entry.CfrOr43U.js";import{m as R,u as M,a as E}from"./tag.BHOyZ4DR.js";import{u as wt}from"./ssrBoot.BkPfLqOl.js";import{h as re,w as De,r as oe,m as ke,x as _t,j as we,k as Ge,l as _e,y as It,a as ge,V as ne,t as Ue,c as Vt,b as We,d as He,i as At,R as Pt,s as Lt,u as qe,n as Ke,v as Xe}from"./index.BHfLXwVM.js";import{m as Ie,u as Ve}from"./dimensions.C-cgsL8O.js";const Bt=_({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function A(e,l,n){return L()({name:e,props:Bt({mode:n,origin:l}),setup(t,s){let{slots:a}=s;const i={onBeforeEnter(r){t.origin&&(r.style.transformOrigin=t.origin)},onLeave(r){if(t.leaveAbsolute){const{offsetTop:m,offsetLeft:d,offsetWidth:v,offsetHeight:y}=r;r._transitionInitialStyles={position:r.style.position,top:r.style.top,left:r.style.left,width:r.style.width,height:r.style.height},r.style.position="absolute",r.style.top=`${m}px`,r.style.left=`${d}px`,r.style.width=`${v}px`,r.style.height=`${y}px`}t.hideOnLeave&&r.style.setProperty("display","none","important")},onAfterLeave(r){if(t.leaveAbsolute&&(r!=null&&r._transitionInitialStyles)){const{position:m,top:d,left:v,width:y,height:b}=r._transitionInitialStyles;delete r._transitionInitialStyles,r.style.position=m||"",r.style.top=d||"",r.style.left=v||"",r.style.width=y||"",r.style.height=b||""}}};return()=>{const r=t.group?Se:he;return be(r,{name:t.disabled?"":e,css:!t.disabled,...t.group?void 0:{mode:t.mode},...t.disabled?{}:i},a.default)}}})}function Je(e,l){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return L()({name:e,props:{mode:{type:String,default:n},disabled:Boolean,group:Boolean},setup(t,s){let{slots:a}=s;const i=t.group?Se:he;return()=>be(i,{name:t.disabled?"":e,css:!t.disabled,...t.disabled?{}:l},a.default)}})}function Qe(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const n=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",t=ft(`offset-${n}`);return{onBeforeEnter(i){i._parent=i.parentNode,i._initialStyle={transition:i.style.transition,overflow:i.style.overflow,[n]:i.style[n]}},onEnter(i){const r=i._initialStyle;i.style.setProperty("transition","none","important"),i.style.overflow="hidden";const m=`${i[t]}px`;i.style[n]="0",i.offsetHeight,i.style.transition=r.transition,e&&i._parent&&i._parent.classList.add(e),requestAnimationFrame(()=>{i.style[n]=m})},onAfterEnter:a,onEnterCancelled:a,onLeave(i){i._initialStyle={transition:"",overflow:i.style.overflow,[n]:i.style[n]},i.style.overflow="hidden",i.style[n]=`${i[t]}px`,i.offsetHeight,requestAnimationFrame(()=>i.style[n]="0")},onAfterLeave:s,onLeaveCancelled:s};function s(i){e&&i._parent&&i._parent.classList.remove(e),a(i)}function a(i){const r=i._initialStyle[n];i.style.overflow=i._initialStyle.overflow,r!=null&&(i.style[n]=r),delete i._initialStyle}}A("fab-transition","center center","out-in");A("dialog-bottom-transition");A("dialog-top-transition");const Sn=A("fade-transition"),hn=A("scale-transition");A("scroll-x-transition");A("scroll-x-reverse-transition");A("scroll-y-transition");A("scroll-y-reverse-transition");A("slide-x-transition");const bn=A("slide-x-reverse-transition"),Cn=A("slide-y-transition");A("slide-y-reverse-transition");const xt=Je("expand-transition",Qe()),kn=Je("expand-x-transition",Qe("",!0));function pt(e){return{aspectStyles:S(()=>{const l=Number(e.aspectRatio);return l?{paddingBottom:String(1/l*100)+"%"}:void 0})}}const Ye=_({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...R(),...Ie()},"VResponsive"),Oe=L()({name:"VResponsive",props:Ye(),setup(e,l){let{slots:n}=l;const{aspectStyles:t}=pt(e),{dimensionStyles:s}=Ve(e);return M(()=>{var a;return u("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[s.value,e.style]},[u("div",{class:"v-responsive__sizer",style:t.value},null),(a=n.additional)==null?void 0:a.call(n),n.default&&u("div",{class:["v-responsive__content",e.contentClass]},[n.default()])])}),{}}}),Ot=_({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),q=(e,l)=>{let{slots:n}=l;const{transition:t,disabled:s,group:a,...i}=e,{component:r=a?Se:he,...m}=typeof t=="object"?t:{};return be(r,Z(typeof t=="string"?{name:s?"":t}:m,typeof t=="string"?{}:Object.fromEntries(Object.entries({disabled:s,group:a}).filter(d=>{let[v,y]=d;return y!==void 0})),i),n)};function Tt(e,l){if(!Fe)return;const n=l.modifiers||{},t=l.value,{handler:s,options:a}=typeof t=="object"?t:{handler:t,options:{}},i=new IntersectionObserver(function(){var y;let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],m=arguments.length>1?arguments[1]:void 0;const d=(y=e._observe)==null?void 0:y[l.instance.$.uid];if(!d)return;const v=r.some(b=>b.isIntersecting);s&&(!n.quiet||d.init)&&(!n.once||v||d.init)&&s(v,r,m),v&&n.once?Ze(e,l):d.init=!0},a);e._observe=Object(e._observe),e._observe[l.instance.$.uid]={init:!1,observer:i},i.observe(e)}function Ze(e,l){var t;const n=(t=e._observe)==null?void 0:t[l.instance.$.uid];n&&(n.observer.unobserve(e),delete e._observe[l.instance.$.uid])}const jt={mounted:Tt,unmounted:Ze},zt=jt,Ft=_({alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...Ye(),...R(),...re(),...Ot()},"VImg"),Rt=L()({name:"VImg",directives:{intersect:zt},props:Ft(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,l){let{emit:n,slots:t}=l;const{backgroundColorClasses:s,backgroundColorStyles:a}=De(w(e,"color")),{roundedClasses:i}=oe(e),r=Re("VImg"),m=z(""),d=P(),v=z(e.eager?"loading":"idle"),y=z(),b=z(),o=S(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),c=S(()=>o.value.aspect||y.value/b.value||0);Y(()=>e.src,()=>{f(v.value!=="idle")}),Y(c,(g,C)=>{!g&&C&&d.value&&V(d.value)}),gt(()=>f());function f(g){if(!(e.eager&&g)&&!(Fe&&!g&&!e.eager)){if(v.value="loading",o.value.lazySrc){const C=new Image;C.src=o.value.lazySrc,V(C,null)}o.value.src&&mt(()=>{var C;n("loadstart",((C=d.value)==null?void 0:C.currentSrc)||o.value.src),setTimeout(()=>{var j;if(!r.isUnmounted)if((j=d.value)!=null&&j.complete){if(d.value.naturalWidth||B(),v.value==="error")return;c.value||V(d.value,null),v.value==="loading"&&h()}else c.value||V(d.value),N()})})}}function h(){var g;r.isUnmounted||(N(),V(d.value),v.value="loaded",n("load",((g=d.value)==null?void 0:g.currentSrc)||o.value.src))}function B(){var g;r.isUnmounted||(v.value="error",n("error",((g=d.value)==null?void 0:g.currentSrc)||o.value.src))}function N(){const g=d.value;g&&(m.value=g.currentSrc||g.src)}let I=-1;Ce(()=>{clearTimeout(I)});function V(g){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const j=()=>{if(clearTimeout(I),r.isUnmounted)return;const{naturalHeight:X,naturalWidth:J}=g;X||J?(y.value=J,b.value=X):!g.complete&&v.value==="loading"&&C!=null?I=window.setTimeout(j,C):(g.currentSrc.endsWith(".svg")||g.currentSrc.startsWith("data:image/svg+xml"))&&(y.value=1,b.value=1)};j()}const T=S(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),D=()=>{var j;if(!o.value.src||v.value==="idle")return null;const g=u("img",{class:["v-img__img",T.value],style:{objectPosition:e.position},src:o.value.src,srcset:o.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:d,onLoad:h,onError:B},null),C=(j=t.sources)==null?void 0:j.call(t);return u(q,{transition:e.transition,appear:!0},{default:()=>[ee(C?u("picture",{class:"v-img__picture"},[C,g]):g,[[Ne,v.value==="loaded"]])]})},G=()=>u(q,{transition:e.transition},{default:()=>[o.value.lazySrc&&v.value!=="loaded"&&u("img",{class:["v-img__img","v-img__img--preload",T.value],style:{objectPosition:e.position},src:o.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),U=()=>t.placeholder?u(q,{transition:e.transition,appear:!0},{default:()=>[(v.value==="loading"||v.value==="error"&&!t.error)&&u("div",{class:"v-img__placeholder"},[t.placeholder()])]}):null,W=()=>t.error?u(q,{transition:e.transition,appear:!0},{default:()=>[v.value==="error"&&u("div",{class:"v-img__error"},[t.error()])]}):null,H=()=>e.gradient?u("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,x=z(!1);{const g=Y(c,C=>{C&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{x.value=!0})}),g())})}return M(()=>{const g=Oe.filterProps(e);return ee(u(Oe,Z({class:["v-img",{"v-img--booting":!x.value},s.value,i.value,e.class],style:[{width:fe(e.width==="auto"?y.value:e.width)},a.value,e.style]},g,{aspectRatio:c.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>u(ve,null,[u(D,null,null),u(G,null,null),u(H,null,null),u(U,null,null),u(W,null,null)]),default:t.default}),[[Me("intersect"),{handler:f,options:e.options},null,{once:!0}]])}),{currentSrc:m,image:d,state:v,naturalWidth:y,naturalHeight:b}}}),Mt=_({start:Boolean,end:Boolean,icon:$,image:String,text:String,...R(),...ke(),...re(),..._t(),...E(),...ae(),...we({variant:"flat"})},"VAvatar"),Te=L()({name:"VAvatar",props:Mt(),setup(e,l){let{slots:n}=l;const{themeClasses:t}=ie(e),{colorClasses:s,colorStyles:a,variantClasses:i}=Ge(e),{densityClasses:r}=_e(e),{roundedClasses:m}=oe(e),{sizeClasses:d,sizeStyles:v}=It(e);return M(()=>u(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},t.value,s.value,r.value,m.value,d.value,i.value,e.class],style:[a.value,v.value,e.style]},{default:()=>[n.default?u(ne,{key:"content-defaults",defaults:{VImg:{cover:!0,image:e.image},VIcon:{icon:e.icon}}},{default:()=>[n.default()]}):e.image?u(Rt,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?u(ge,{key:"icon",icon:e.icon},null):e.text,Ue(!1,"v-avatar")]})),{}}}),me=Symbol.for("vuetify:list");function et(){const e=le(me,{hasPrepend:z(!1),updateHasPrepend:()=>null}),l={hasPrepend:z(!1),updateHasPrepend:n=>{n&&(l.hasPrepend.value=n)}};return se(me,l),e}function tt(){return le(me,null)}const Ae=e=>{const l={activate:n=>{let{id:t,value:s,activated:a}=n;return t=O(t),e&&!s&&a.size===1&&a.has(t)||(s?a.add(t):a.delete(t)),a},in:(n,t,s)=>{let a=new Set;if(n!=null)for(const i of $e(n))a=l.activate({id:i,value:!0,activated:new Set(a),children:t,parents:s});return a},out:n=>Array.from(n)};return l},nt=e=>{const l=Ae(e);return{activate:t=>{let{activated:s,id:a,...i}=t;a=O(a);const r=s.has(a)?new Set([a]):new Set;return l.activate({...i,id:a,activated:r})},in:(t,s,a)=>{let i=new Set;if(t!=null){const r=$e(t);r.length&&(i=l.in(r.slice(0,1),s,a))}return i},out:(t,s,a)=>l.out(t,s,a)}},Nt=e=>{const l=Ae(e);return{activate:t=>{let{id:s,activated:a,children:i,...r}=t;return s=O(s),i.has(s)?a:l.activate({id:s,activated:a,children:i,...r})},in:l.in,out:l.out}},$t=e=>{const l=nt(e);return{activate:t=>{let{id:s,activated:a,children:i,...r}=t;return s=O(s),i.has(s)?a:l.activate({id:s,activated:a,children:i,...r})},in:l.in,out:l.out}},Et={open:e=>{let{id:l,value:n,opened:t,parents:s}=e;if(n){const a=new Set;a.add(l);let i=s.get(l);for(;i!=null;)a.add(i),i=s.get(i);return a}else return t.delete(l),t},select:()=>null},at={open:e=>{let{id:l,value:n,opened:t,parents:s}=e;if(n){let a=s.get(l);for(t.add(l);a!=null&&a!==l;)t.add(a),a=s.get(a);return t}else t.delete(l);return t},select:()=>null},Dt={open:at.open,select:e=>{let{id:l,value:n,opened:t,parents:s}=e;if(!n)return t;const a=[];let i=s.get(l);for(;i!=null;)a.push(i),i=s.get(i);return new Set(a)}},Pe=e=>{const l={select:n=>{let{id:t,value:s,selected:a}=n;if(t=O(t),e&&!s){const i=Array.from(a.entries()).reduce((r,m)=>{let[d,v]=m;return v==="on"&&r.push(d),r},[]);if(i.length===1&&i[0]===t)return a}return a.set(t,s?"on":"off"),a},in:(n,t,s)=>{let a=new Map;for(const i of n||[])a=l.select({id:i,value:!0,selected:new Map(a),children:t,parents:s});return a},out:n=>{const t=[];for(const[s,a]of n.entries())a==="on"&&t.push(s);return t}};return l},it=e=>{const l=Pe(e);return{select:t=>{let{selected:s,id:a,...i}=t;a=O(a);const r=s.has(a)?new Map([[a,s.get(a)]]):new Map;return l.select({...i,id:a,selected:r})},in:(t,s,a)=>{let i=new Map;return t!=null&&t.length&&(i=l.in(t.slice(0,1),s,a)),i},out:(t,s,a)=>l.out(t,s,a)}},Gt=e=>{const l=Pe(e);return{select:t=>{let{id:s,selected:a,children:i,...r}=t;return s=O(s),i.has(s)?a:l.select({id:s,selected:a,children:i,...r})},in:l.in,out:l.out}},Ut=e=>{const l=it(e);return{select:t=>{let{id:s,selected:a,children:i,...r}=t;return s=O(s),i.has(s)?a:l.select({id:s,selected:a,children:i,...r})},in:l.in,out:l.out}},Wt=e=>{const l={select:n=>{let{id:t,value:s,selected:a,children:i,parents:r}=n;t=O(t);const m=new Map(a),d=[t];for(;d.length;){const y=d.shift();a.set(y,s?"on":"off"),i.has(y)&&d.push(...i.get(y))}let v=r.get(t);for(;v;){const y=i.get(v),b=y.every(c=>a.get(c)==="on"),o=y.every(c=>!a.has(c)||a.get(c)==="off");a.set(v,b?"on":o?"off":"indeterminate"),v=r.get(v)}return e&&!s&&Array.from(a.entries()).reduce((b,o)=>{let[c,f]=o;return f==="on"&&b.push(c),b},[]).length===0?m:a},in:(n,t,s)=>{let a=new Map;for(const i of n||[])a=l.select({id:i,value:!0,selected:new Map(a),children:t,parents:s});return a},out:(n,t)=>{const s=[];for(const[a,i]of n.entries())i==="on"&&!t.has(a)&&s.push(a);return s}};return l},K=Symbol.for("vuetify:nested"),lt={id:z(),root:{register:()=>null,unregister:()=>null,parents:P(new Map),children:P(new Map),open:()=>null,openOnSelect:()=>null,activate:()=>null,select:()=>null,activatable:P(!1),selectable:P(!1),opened:P(new Set),activated:P(new Set),selected:P(new Map),selectedValues:P([])}},Ht=_({activatable:Boolean,selectable:Boolean,activeStrategy:[String,Function,Object],selectStrategy:[String,Function,Object],openStrategy:[String,Object],opened:null,activated:null,selected:null,mandatory:Boolean},"nested"),qt=e=>{let l=!1;const n=P(new Map),t=P(new Map),s=de(e,"opened",e.opened,o=>new Set(o),o=>[...o.values()]),a=S(()=>{if(typeof e.activeStrategy=="object")return e.activeStrategy;if(typeof e.activeStrategy=="function")return e.activeStrategy(e.mandatory);switch(e.activeStrategy){case"leaf":return Nt(e.mandatory);case"single-leaf":return $t(e.mandatory);case"independent":return Ae(e.mandatory);case"single-independent":default:return nt(e.mandatory)}}),i=S(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;if(typeof e.selectStrategy=="function")return e.selectStrategy(e.mandatory);switch(e.selectStrategy){case"single-leaf":return Ut(e.mandatory);case"leaf":return Gt(e.mandatory);case"independent":return Pe(e.mandatory);case"single-independent":return it(e.mandatory);case"classic":default:return Wt(e.mandatory)}}),r=S(()=>{if(typeof e.openStrategy=="object")return e.openStrategy;switch(e.openStrategy){case"list":return Dt;case"single":return Et;case"multiple":default:return at}}),m=de(e,"activated",e.activated,o=>a.value.in(o,n.value,t.value),o=>a.value.out(o,n.value,t.value)),d=de(e,"selected",e.selected,o=>i.value.in(o,n.value,t.value),o=>i.value.out(o,n.value,t.value));Ce(()=>{l=!0});function v(o){const c=[];let f=o;for(;f!=null;)c.unshift(f),f=t.value.get(f);return c}const y=Re("nested"),b={id:z(),root:{opened:s,activatable:w(e,"activatable"),selectable:w(e,"selectable"),activated:m,selected:d,selectedValues:S(()=>{const o=[];for(const[c,f]of d.value.entries())f==="on"&&o.push(c);return o}),register:(o,c,f)=>{c&&o!==c&&t.value.set(o,c),f&&n.value.set(o,[]),c!=null&&n.value.set(c,[...n.value.get(c)||[],o])},unregister:o=>{if(l)return;n.value.delete(o);const c=t.value.get(o);if(c){const f=n.value.get(c)??[];n.value.set(c,f.filter(h=>h!==o))}t.value.delete(o),s.value.delete(o)},open:(o,c,f)=>{y.emit("click:open",{id:o,value:c,path:v(o),event:f});const h=r.value.open({id:o,value:c,opened:new Set(s.value),children:n.value,parents:t.value,event:f});h&&(s.value=h)},openOnSelect:(o,c,f)=>{const h=r.value.select({id:o,value:c,selected:new Map(d.value),opened:new Set(s.value),children:n.value,parents:t.value,event:f});h&&(s.value=h)},select:(o,c,f)=>{y.emit("click:select",{id:o,value:c,path:v(o),event:f});const h=i.value.select({id:o,value:c,selected:new Map(d.value),children:n.value,parents:t.value,event:f});h&&(d.value=h),b.root.openOnSelect(o,c,f)},activate:(o,c,f)=>{if(!e.activatable)return b.root.select(o,!0,f);y.emit("click:activate",{id:o,value:c,path:v(o),event:f});const h=a.value.activate({id:o,value:c,activated:new Set(m.value),children:n.value,parents:t.value,event:f});h&&(m.value=h)},children:n,parents:t}};return se(K,b),b.root},st=(e,l)=>{const n=le(K,lt),t=Symbol(yt()),s=S(()=>e.value!==void 0?e.value:t),a={...n,id:s,open:(i,r)=>n.root.open(s.value,i,r),openOnSelect:(i,r)=>n.root.openOnSelect(s.value,i,r),isOpen:S(()=>n.root.opened.value.has(s.value)),parent:S(()=>n.root.parents.value.get(s.value)),activate:(i,r)=>n.root.activate(s.value,i,r),isActivated:S(()=>n.root.activated.value.has(O(s.value))),select:(i,r)=>n.root.select(s.value,i,r),isSelected:S(()=>n.root.selected.value.get(O(s.value))==="on"),isIndeterminate:S(()=>n.root.selected.value.get(s.value)==="indeterminate"),isLeaf:S(()=>!n.root.children.value.get(s.value)),isGroupActivator:n.isGroupActivator};return!n.isGroupActivator&&n.root.register(s.value,n.id.value,l),Ce(()=>{!n.isGroupActivator&&n.root.unregister(s.value)}),l&&se(K,a),a},Kt=()=>{const e=le(K,lt);se(K,{...e,isGroupActivator:!0})},Xt=St({name:"VListGroupActivator",setup(e,l){let{slots:n}=l;return Kt(),()=>{var t;return(t=n.default)==null?void 0:t.call(n)}}}),Jt=_({activeColor:String,baseColor:String,color:String,collapseIcon:{type:$,default:"$collapse"},expandIcon:{type:$,default:"$expand"},prependIcon:$,appendIcon:$,fluid:Boolean,subgroup:Boolean,title:String,value:null,...R(),...E()},"VListGroup"),je=L()({name:"VListGroup",props:Jt(),setup(e,l){let{slots:n}=l;const{isOpen:t,open:s,id:a}=st(w(e,"value"),!0),i=S(()=>`v-list-group--id-${String(a.value)}`),r=tt(),{isBooted:m}=wt();function d(o){o.stopPropagation(),s(!t.value,o)}const v=S(()=>({onClick:d,class:"v-list-group__header",id:i.value})),y=S(()=>t.value?e.collapseIcon:e.expandIcon),b=S(()=>({VListItem:{active:t.value,activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&y.value,appendIcon:e.appendIcon||!e.subgroup&&y.value,title:e.title,value:e.value}}));return M(()=>u(e.tag,{class:["v-list-group",{"v-list-group--prepend":r==null?void 0:r.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":t.value},e.class],style:e.style},{default:()=>[n.activator&&u(ne,{defaults:b.value},{default:()=>[u(Xt,null,{default:()=>[n.activator({props:v.value,isOpen:t.value})]})]}),u(q,{transition:{component:xt},disabled:!m.value},{default:()=>{var o;return[ee(u("div",{class:"v-list-group__items",role:"group","aria-labelledby":i.value},[(o=n.default)==null?void 0:o.call(n)]),[[Ne,t.value]])]}})]})),{isOpen:t}}}),Qt=_({opacity:[Number,String],...R(),...E()},"VListItemSubtitle"),Yt=L()({name:"VListItemSubtitle",props:Qt(),setup(e,l){let{slots:n}=l;return M(()=>u(e.tag,{class:["v-list-item-subtitle",e.class],style:[{"--v-list-item-subtitle-opacity":e.opacity},e.style]},n)),{}}}),Zt=Vt("v-list-item-title"),en=_({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:$,baseColor:String,disabled:Boolean,lines:[Boolean,String],link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:$,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,subtitle:[String,Number],title:[String,Number],value:null,onClick:te(),onClickOnce:te(),...We(),...R(),...ke(),...Ie(),...He(),...re(),...At(),...E(),...ae(),...we({variant:"text"})},"VListItem"),ze=L()({name:"VListItem",directives:{Ripple:Pt},props:en(),emits:{click:e=>!0},setup(e,l){let{attrs:n,slots:t,emit:s}=l;const a=Lt(e,n),i=S(()=>e.value===void 0?a.href.value:e.value),{activate:r,isActivated:m,select:d,isSelected:v,isIndeterminate:y,isGroupActivator:b,root:o,parent:c,openOnSelect:f}=st(i,!1),h=tt(),B=S(()=>{var k;return e.active!==!1&&(e.active||((k=a.isActive)==null?void 0:k.value)||(o.activatable.value?m.value:v.value))}),N=S(()=>e.link!==!1&&a.isLink.value),I=S(()=>!e.disabled&&e.link!==!1&&(e.link||a.isClickable.value||!!h&&(o.selectable.value||o.activatable.value||e.value!=null))),V=S(()=>e.rounded||e.nav),T=S(()=>e.color??e.activeColor),D=S(()=>({color:B.value?T.value??e.baseColor:e.baseColor,variant:e.variant}));Y(()=>{var k;return(k=a.isActive)==null?void 0:k.value},k=>{k&&c.value!=null&&o.open(c.value,!0),k&&f(k)},{immediate:!0});const{themeClasses:G}=ie(e),{borderClasses:U}=qe(e),{colorClasses:W,colorStyles:H,variantClasses:x}=Ge(D),{densityClasses:g}=_e(e),{dimensionStyles:C}=Ve(e),{elevationClasses:j}=Ke(e),{roundedClasses:X}=oe(V),J=S(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),ue=S(()=>({isActive:B.value,select:d,isSelected:v.value,isIndeterminate:y.value}));function Le(k){var Q;s("click",k),I.value&&((Q=a.navigate)==null||Q.call(a,k),!b&&(o.activatable.value?r(!m.value,k):(o.selectable.value||e.value!=null)&&d(!v.value,k)))}function ct(k){(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),Le(k))}return M(()=>{const k=N.value?"a":e.tag,Q=t.title||e.title!=null,dt=t.subtitle||e.subtitle!=null,Be=!!(e.appendAvatar||e.appendIcon),vt=!!(Be||t.append),xe=!!(e.prependAvatar||e.prependIcon),ce=!!(xe||t.prepend);return h==null||h.updateHasPrepend(ce),e.activeColor&&ht("active-color",["color","base-color"]),ee(u(k,{class:["v-list-item",{"v-list-item--active":B.value,"v-list-item--disabled":e.disabled,"v-list-item--link":I.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!ce&&(h==null?void 0:h.hasPrepend.value),"v-list-item--slim":e.slim,[`${e.activeClass}`]:e.activeClass&&B.value},G.value,U.value,W.value,g.value,j.value,J.value,X.value,x.value,e.class],style:[H.value,C.value,e.style],href:a.href.value,tabindex:I.value?h?-2:0:void 0,onClick:Le,onKeydown:I.value&&!N.value&&ct},{default:()=>{var pe;return[Ue(I.value||B.value,"v-list-item"),ce&&u("div",{key:"prepend",class:"v-list-item__prepend"},[t.prepend?u(ne,{key:"prepend-defaults",disabled:!xe,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>{var p;return[(p=t.prepend)==null?void 0:p.call(t,ue.value)]}}):u(ve,null,[e.prependAvatar&&u(Te,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&u(ge,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),u("div",{class:"v-list-item__spacer"},null)]),u("div",{class:"v-list-item__content","data-no-activator":""},[Q&&u(Zt,{key:"title"},{default:()=>{var p;return[((p=t.title)==null?void 0:p.call(t,{title:e.title}))??e.title]}}),dt&&u(Yt,{key:"subtitle"},{default:()=>{var p;return[((p=t.subtitle)==null?void 0:p.call(t,{subtitle:e.subtitle}))??e.subtitle]}}),(pe=t.default)==null?void 0:pe.call(t,ue.value)]),vt&&u("div",{key:"append",class:"v-list-item__append"},[t.append?u(ne,{key:"append-defaults",disabled:!Be,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>{var p;return[(p=t.append)==null?void 0:p.call(t,ue.value)]}}):u(ve,null,[e.appendIcon&&u(ge,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&u(Te,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),u("div",{class:"v-list-item__spacer"},null)])]}}),[[Me("ripple"),I.value&&e.ripple]])}),{activate:r,isActivated:m,isGroupActivator:b,isSelected:v,list:h,select:d}}}),tn=_({color:String,inset:Boolean,sticky:Boolean,title:String,...R(),...E()},"VListSubheader"),nn=L()({name:"VListSubheader",props:tn(),setup(e,l){let{slots:n}=l;const{textColorClasses:t,textColorStyles:s}=Xe(w(e,"color"));return M(()=>{const a=!!(n.default||e.title);return u(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},t.value,e.class],style:[{textColorStyles:s},e.style]},{default:()=>{var i;return[a&&u("div",{class:"v-list-subheader__text"},[((i=n.default)==null?void 0:i.call(n))??e.title])]}})}),{}}}),an=_({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,...R(),...ae()},"VDivider"),ln=L()({name:"VDivider",props:an(),setup(e,l){let{attrs:n,slots:t}=l;const{themeClasses:s}=ie(e),{textColorClasses:a,textColorStyles:i}=Xe(w(e,"color")),r=S(()=>{const m={};return e.length&&(m[e.vertical?"height":"width"]=fe(e.length)),e.thickness&&(m[e.vertical?"borderRightWidth":"borderTopWidth"]=fe(e.thickness)),m});return M(()=>{const m=u("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},s.value,a.value,e.class],style:[r.value,i.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":!n.role||n.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${n.role||"separator"}`},null);return t.default?u("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[m,u("div",{class:"v-divider__content"},[t.default()]),m]):m}),{}}}),sn=_({items:Array,returnObject:Boolean},"VListChildren"),rt=L()({name:"VListChildren",props:sn(),setup(e,l){let{slots:n}=l;return et(),()=>{var t,s;return((t=n.default)==null?void 0:t.call(n))??((s=e.items)==null?void 0:s.map(a=>{var b,o;let{children:i,props:r,type:m,raw:d}=a;if(m==="divider")return((b=n.divider)==null?void 0:b.call(n,{props:r}))??u(ln,r,null);if(m==="subheader")return((o=n.subheader)==null?void 0:o.call(n,{props:r}))??u(nn,r,null);const v={subtitle:n.subtitle?c=>{var f;return(f=n.subtitle)==null?void 0:f.call(n,{...c,item:d})}:void 0,prepend:n.prepend?c=>{var f;return(f=n.prepend)==null?void 0:f.call(n,{...c,item:d})}:void 0,append:n.append?c=>{var f;return(f=n.append)==null?void 0:f.call(n,{...c,item:d})}:void 0,title:n.title?c=>{var f;return(f=n.title)==null?void 0:f.call(n,{...c,item:d})}:void 0},y=je.filterProps(r);return i?u(je,Z({value:r==null?void 0:r.value},y),{activator:c=>{let{props:f}=c;const h={...r,...f,value:e.returnObject?d:r.value};return n.header?n.header({props:h}):u(ze,h,v)},default:()=>u(rt,{items:i,returnObject:e.returnObject},n)}):n.item?n.item({props:r}):u(ze,Z(r,{value:e.returnObject?d:r.value}),v)}))}}}),rn=_({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean,valueComparator:{type:Function,default:bt}},"list-items");function ye(e,l){const n=F(l,e.itemTitle,l),t=F(l,e.itemValue,n),s=F(l,e.itemChildren),a=e.itemProps===!0?typeof l=="object"&&l!=null&&!Array.isArray(l)?"children"in l?Ee(l,["children"]):l:void 0:F(l,e.itemProps),i={title:n,value:t,...a};return{title:String(i.title??""),value:i.value,props:i,children:Array.isArray(s)?ot(e,s):void 0,raw:l}}function ot(e,l){const n=[];for(const t of l)n.push(ye(e,t));return n}function wn(e){const l=S(()=>ot(e,e.items)),n=S(()=>l.value.some(a=>a.value===null));function t(a){return n.value||(a=a.filter(i=>i!==null)),a.map(i=>e.returnObject&&typeof i=="string"?ye(e,i):l.value.find(r=>e.valueComparator(i,r.value))||ye(e,i))}function s(a){return e.returnObject?a.map(i=>{let{raw:r}=i;return r}):a.map(i=>{let{value:r}=i;return r})}return{items:l,transformIn:t,transformOut:s}}function on(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"}function un(e,l){const n=F(l,e.itemType,"item"),t=on(l)?l:F(l,e.itemTitle),s=F(l,e.itemValue,void 0),a=F(l,e.itemChildren),i=e.itemProps===!0?Ee(l,["children"]):F(l,e.itemProps),r={title:t,value:s,...i};return{type:n,title:r.title,value:r.value,props:r,children:n==="item"&&a?ut(e,a):void 0,raw:l}}function ut(e,l){const n=[];for(const t of l)n.push(un(e,t));return n}function cn(e){return{items:S(()=>ut(e,e.items))}}const dn=_({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,expandIcon:String,collapseIcon:String,lines:{type:[Boolean,String],default:"one"},slim:Boolean,nav:Boolean,"onClick:open":te(),"onClick:select":te(),...Ht({selectStrategy:"single-leaf",openStrategy:"list"}),...We(),...R(),...ke(),...Ie(),...He(),itemType:{type:String,default:"type"},...rn(),...re(),...E(),...ae(),...we({variant:"text"})},"VList"),_n=L()({name:"VList",props:dn(),emits:{"update:selected":e=>!0,"update:activated":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:activate":e=>!0,"click:select":e=>!0},setup(e,l){let{slots:n}=l;const{items:t}=cn(e),{themeClasses:s}=ie(e),{backgroundColorClasses:a,backgroundColorStyles:i}=De(w(e,"bgColor")),{borderClasses:r}=qe(e),{densityClasses:m}=_e(e),{dimensionStyles:d}=Ve(e),{elevationClasses:v}=Ke(e),{roundedClasses:y}=oe(e),{children:b,open:o,parents:c,select:f}=qt(e),h=S(()=>e.lines?`v-list--${e.lines}-line`:void 0),B=w(e,"activeColor"),N=w(e,"baseColor"),I=w(e,"color");et(),Ct({VListGroup:{activeColor:B,baseColor:N,color:I,expandIcon:w(e,"expandIcon"),collapseIcon:w(e,"collapseIcon")},VListItem:{activeClass:w(e,"activeClass"),activeColor:B,baseColor:N,color:I,density:w(e,"density"),disabled:w(e,"disabled"),lines:w(e,"lines"),nav:w(e,"nav"),slim:w(e,"slim"),variant:w(e,"variant")}});const V=z(!1),T=P();function D(g){V.value=!0}function G(g){V.value=!1}function U(g){var C;!V.value&&!(g.relatedTarget&&((C=T.value)!=null&&C.contains(g.relatedTarget)))&&x()}function W(g){const C=g.target;if(!(!T.value||["INPUT","TEXTAREA"].includes(C.tagName))){if(g.key==="ArrowDown")x("next");else if(g.key==="ArrowUp")x("prev");else if(g.key==="Home")x("first");else if(g.key==="End")x("last");else return;g.preventDefault()}}function H(g){V.value=!0}function x(g){if(T.value)return kt(T.value,g)}return M(()=>u(e.tag,{ref:T,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav,"v-list--slim":e.slim},s.value,a.value,r.value,m.value,v.value,h.value,y.value,e.class],style:[i.value,d.value,e.style],tabindex:e.disabled||V.value?-1:0,role:"listbox","aria-activedescendant":void 0,onFocusin:D,onFocusout:G,onFocus:U,onKeydown:W,onMousedown:H},{default:()=>[u(rt,{items:t.value,returnObject:e.returnObject},n)]})),{open:o,select:f,focus:x,children:b,parents:c}}});export{zt as I,q as M,_n as V,ze as a,Zt as b,nn as c,ln as d,Yt as e,Te as f,Rt as g,Cn as h,Sn as i,kn as j,rn as k,hn as l,Ot as m,xt as n,bn as o,ye as t,wn as u};
