import{u as D}from"./vue.f36acd1f.DBN0n21e.js";import{n as A,o as F,p as w,q as E,e as L,_ as T}from"./vjsf.Cc3KNX-R.js";import{N as C,O as N,Q as O,r as x,S as I,T as P,U as R,V as k,W as g,z as s,F as U,A as i,G as c,t as j,x as z,y as H,B as b}from"./entry.B8oTM9XL.js";import{u as W}from"./VSpacer.Cs9f79b1.js";import{V as q}from"./index.B0V51VOD.js";import{u as G}from"./tag.BZewxweC.js";import{V as J}from"./VBtn.C6apUN51.js";import{V as M}from"./VCard.DS_rganz.js";import{V as Q}from"./VContainer.C8FGWlM-.js";import"./en.C2aea8f9.js";import"./VAlert.DGOwHrTx.js";import"./dimensions.B8z_gaGn.js";import"./VList.Bz-QtjpJ.js";import"./ssrBoot.BKvPlNUh.js";/* empty css              */import"./resizeObserver.CrLfAFwT.js";const $=C({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...A({origin:"center center",scrollStrategy:"block",transition:{component:F},zIndex:2400})},"VDialog"),K=N()({name:"VDialog",props:$(),emits:{"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,v){let{emit:V,slots:u}=v;const r=O(e,"modelValue"),{scopeId:m}=W(),t=x();function y(a){var l,f;const n=a.relatedTarget,d=a.target;if(n!==d&&((l=t.value)!=null&&l.contentEl)&&((f=t.value)!=null&&f.globalTop)&&![document,t.value.contentEl].includes(d)&&!t.value.contentEl.contains(d)){const o=k(t.value.contentEl);if(!o.length)return;const p=o[0],S=o[o.length-1];n===p?S.focus():p.focus()}}I&&P(()=>r.value&&e.retainFocus,a=>{a?document.addEventListener("focusin",y):document.removeEventListener("focusin",y)},{immediate:!0});function _(){var a;(a=t.value)!=null&&a.contentEl&&!t.value.contentEl.contains(document.activeElement)&&t.value.contentEl.focus({preventScroll:!0})}function B(){V("afterLeave")}return P(r,async a=>{var n;a||(await R(),(n=t.value.activatorEl)==null||n.focus({preventScroll:!0}))}),G(()=>{const a=E.filterProps(e),n=g({"aria-haspopup":"dialog","aria-expanded":String(r.value)},e.activatorProps),d=g({tabindex:-1},e.contentProps);return s(E,g({ref:t,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},a,{modelValue:r.value,"onUpdate:modelValue":l=>r.value=l,"aria-modal":"true",activatorProps:n,contentProps:d,role:"dialog",onAfterEnter:_,onAfterLeave:B},m),{activator:u.activator,default:function(){for(var l=arguments.length,f=new Array(l),o=0;o<l;o++)f[o]=arguments[o];return s(q,{root:"VDialog"},{default:()=>{var p;return[(p=u.default)==null?void 0:p.call(u,...f)]}})}})}),w({},t)}}),h="dev - dialog integration",fe={__name:"dialog",setup(e){const v=x({}),V={type:"object",properties:{array1:{type:"array",items:{type:"object",properties:{string1:{type:"string"},string2:{type:"string"}}}}}};return D({title:"VJSF - "+h}),(u,r)=>(j(),U(c(Q),{class:"doc-content-page"},{default:i(()=>[z("h1",{class:"text-h2 mb-8"},H(h)),s(c(K),{width:"auto"},{activator:i(({props:m})=>[s(c(J),g(m,{color:"primary"}),{default:i(()=>[b(" Open dialog ")]),_:2},1040)]),default:i(()=>[s(c(M),null,{default:i(()=>[s(c(L),null,{default:i(()=>[b(" Hello "),s(c(T),{modelValue:v.value,"onUpdate:modelValue":r[0]||(r[0]=m=>v.value=m),schema:V},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}))}};export{fe as default};
