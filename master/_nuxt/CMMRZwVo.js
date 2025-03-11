import{u as C,d as E,r as R,a as P,o as B,b as I,c as U,e as T,f as V,h as q,g as A,p as F,i as L,j as x,k as j,l as H,m as D,n as M,w as $,q as G,s as K,_ as Q,t as W,v as J,x as _,y as S,z as X,A as Y,B as Z}from"./XjrPQf8n.js";import{u as ee}from"./CR7DQl3o.js";async function O(t,n=C()){const{path:u,matched:p}=n.resolve(t);if(!p.length||(n._routePreloaded||(n._routePreloaded=new Set),n._routePreloaded.has(u)))return;const e=n._preloadPromises=n._preloadPromises||[];if(e.length>4)return Promise.all(e).then(()=>O(t,n));n._routePreloaded.add(u);const r=p.map(c=>{var a;return(a=c.components)==null?void 0:a.default}).filter(c=>typeof c=="function");for(const c of r){const a=Promise.resolve(c()).catch(()=>{}).finally(()=>e.splice(e.indexOf(a)));e.push(a)}await Promise.all(e)}const te=(...t)=>t.find(n=>n!==void 0);function ne(t){const n=t.componentName||"NuxtLink";function u(e,r){if(!e||t.trailingSlash!=="append"&&t.trailingSlash!=="remove")return e;if(typeof e=="string")return z(e,t.trailingSlash);const c="path"in e&&e.path!==void 0?e.path:r(e).path;return{...e,name:void 0,path:z(c,t.trailingSlash)}}function p(e){const r=C(),c=D(),a=x(()=>!!e.target&&e.target!=="_self"),d=x(()=>{const h=e.to||e.href||"";return typeof h=="string"&&j(h,{acceptRelative:!0})}),y=A("RouterLink"),g=y&&typeof y!="string"?y.useLink:void 0,m=x(()=>{if(e.external)return!0;const h=e.to||e.href||"";return typeof h=="object"?!1:h===""||d.value}),s=x(()=>{const h=e.to||e.href||"";return m.value?h:u(h,r.resolve)}),f=m.value||g==null?void 0:g({...e,to:s}),b=x(()=>{var h;if(!s.value||d.value)return s.value;if(m.value){const k=typeof s.value=="object"&&"path"in s.value?L(s.value):s.value,w=typeof k=="object"?r.resolve(k).href:k;return u(w,r.resolve)}return typeof s.value=="object"?((h=r.resolve(s.value))==null?void 0:h.href)??null:u(H(c.app.baseURL,s.value),r.resolve)});return{to:s,hasTarget:a,isAbsoluteUrl:d,isExternal:m,href:b,isActive:(f==null?void 0:f.isActive)??x(()=>s.value===r.currentRoute.value.path),isExactActive:(f==null?void 0:f.isExactActive)??x(()=>s.value===r.currentRoute.value.path),route:(f==null?void 0:f.route)??x(()=>r.resolve(s.value)),async navigate(){await M(b.value,{replace:e.replace,external:m.value||a.value})}}}return E({name:n,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},prefetchOn:{type:[String,Object],default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},useLink:p,setup(e,{slots:r}){const c=C(),{to:a,href:d,navigate:y,isExternal:g,hasTarget:m,isAbsoluteUrl:s}=p(e),f=R(!1),b=R(null),h=o=>{var l;b.value=e.custom?(l=o==null?void 0:o.$el)==null?void 0:l.nextElementSibling:o==null?void 0:o.$el};function k(o){var l,i;return!f.value&&(typeof e.prefetchOn=="string"?e.prefetchOn===o:((l=e.prefetchOn)==null?void 0:l[o])??((i=t.prefetchOn)==null?void 0:i[o]))&&(e.prefetch??t.prefetch)!==!1&&e.noPrefetch!==!0&&e.target!=="_blank"&&!ie()}async function w(o=P()){if(f.value)return;f.value=!0;const l=typeof a.value=="string"?a.value:g.value?L(a.value):c.resolve(a.value).fullPath,i=g.value?new URL(l,window.location.href).href:l;await Promise.all([o.hooks.callHook("link:prefetch",i).catch(()=>{}),!g.value&&!m.value&&O(a.value,c).catch(()=>{})])}if(k("visibility")){const o=P();let l,i=null;B(()=>{const v=ae();I(()=>{l=U(()=>{var N;(N=b==null?void 0:b.value)!=null&&N.tagName&&(i=v.observe(b.value,async()=>{i==null||i(),i=null,await w(o)}))})})}),T(()=>{l&&V(l),i==null||i(),i=null})}return()=>{var i;if(!g.value&&!m.value){const v={ref:h,to:a.value,activeClass:e.activeClass||t.activeClass,exactActiveClass:e.exactActiveClass||t.exactActiveClass,replace:e.replace,ariaCurrentValue:e.ariaCurrentValue,custom:e.custom};return e.custom||(k("interaction")&&(v.onPointerenter=w.bind(null,void 0),v.onFocus=w.bind(null,void 0)),f.value&&(v.class=e.prefetchedClass||t.prefetchedClass),v.rel=e.rel||void 0),q(A("RouterLink"),v,r.default)}const o=e.target||null,l=te(e.noRel?"":e.rel,t.externalRelAttribute,s.value||m.value?"noopener noreferrer":"")||null;return e.custom?r.default?r.default({href:d.value,navigate:y,prefetch:w,get route(){if(!d.value)return;const v=new URL(d.value,window.location.href);return{path:v.pathname,fullPath:v.pathname,get query(){return F(v.search)},hash:v.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:d.value}},rel:l,target:o,isExternal:g.value||m.value,isActive:!1,isExactActive:!1}):null:q("a",{ref:b,href:d.value||null,rel:l,target:o},(i=r.default)==null?void 0:i.call(r))}}})}const re=ne(K);function z(t,n){const u=n==="append"?$:G;return j(t)&&!t.startsWith("http")?t:u(t,!0)}function ae(){const t=P();if(t._observer)return t._observer;let n=null;const u=new Map,p=(r,c)=>(n||(n=new IntersectionObserver(a=>{for(const d of a){const y=u.get(d.target);(d.isIntersecting||d.intersectionRatio>0)&&y&&y()}})),u.set(r,c),n.observe(r),()=>{u.delete(r),n.unobserve(r),u.size===0&&(n.disconnect(),n=null)});return t._observer={observe:p}}const oe=/2g/;function ie(){const t=navigator.connection;return!!(t&&(t.saveData||oe.test(t.effectiveType)))}const se={class:"antialiased bg-white dark:bg-black dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-black"},le={class:"max-w-520px text-center z-20"},ue=["textContent"],ce=["textContent"],fe={class:"flex items-center justify-center w-full"},de={__name:"error-404",props:{appName:{type:String,default:"Nuxt"},version:{type:String,default:""},statusCode:{type:Number,default:404},statusMessage:{type:String,default:"Not Found"},description:{type:String,default:"Sorry, the page you are looking for could not be found."},backHome:{type:String,default:"Go back home"}},setup(t){const n=t;return ee({title:`${n.statusCode} - ${n.statusMessage} | ${n.appName}`,script:[{children:`!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();`}],style:[{children:'*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }'}]}),(u,p)=>{const e=re;return J(),W("div",se,[p[0]||(p[0]=_("div",{class:"fixed left-0 right-0 spotlight z-10"},null,-1)),_("div",le,[_("h1",{class:"font-medium mb-8 sm:text-10xl text-8xl",textContent:S(t.statusCode)},null,8,ue),_("p",{class:"font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl",textContent:S(t.description)},null,8,ce),_("div",fe,[X(e,{to:"/",class:"cursor-pointer gradient-border px-4 py-2 sm:px-6 sm:py-3 sm:text-xl text-md"},{default:Y(()=>[Z(S(t.backHome),1)]),_:1})])])])}}},pe=Q(de,[["__scopeId","data-v-00b6b518"]]);export{pe as default};
