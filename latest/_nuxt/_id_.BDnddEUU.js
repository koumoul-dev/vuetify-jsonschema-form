import{_ as y,a as V}from"./vjsf-example.DyzxZgpX.js";import{E as g,c as l,F as n,A as m,G as o,t as r,B as u,x as w,y as b,z as i,H as d}from"./entry.CfrOr43U.js";import{u as h}from"./vue.f36acd1f.Che_Mitl.js";import{e as B}from"./index.CrsEbMew.js";import{V as _}from"./VAlert.BgXkkc7y.js";import{V as v}from"./VBtn.DA3GyknB.js";import{V as C}from"./VContainer.BmjfGhVd.js";import"./code-block.a28r8eLr.js";import"./prismeditor.min.DnC9s99Z.js";import"./vjsf.CIPmtQlS.js";import"./tag.BHOyZ4DR.js";import"./VList.BG8XHCgP.js";import"./ssrBoot.BkPfLqOl.js";import"./index.BHfLXwVM.js";import"./dimensions.C-cgsL8O.js";/* empty css              */import"./VSpacer.BCRuAcjH.js";import"./resizeObserver.GA4H4TN5.js";import"./index.Cb5stM_z.js";const N={class:"text-h3 mb-3"},P={__name:"[id]",setup($){const p=g(),f="production",a=l(()=>B.find(t=>t.id===p.params.categoryId)),e=l(()=>{var t;return(t=a.value)==null?void 0:t.examples.find(s=>s.id===p.params.id)}),x=l(()=>{var t;return"VJSF - "+(((t=e.value)==null?void 0:t.title)||"Unknown example")});return h({title:x}),(t,s)=>{const c=y,k=V;return!a.value||!e.value?(r(),n(o(_),{key:0,type:"warning",variant:"outlined",class:"mb-4"},{default:m(()=>[u(" Unknown example ")]),_:1})):(r(),n(o(C),{key:1,fluid:""},{default:m(()=>[w("h1",N,[u(b(e.value.title)+" ",1),i(o(v),{icon:"mdi-reply",flat:"",title:"get back to parent page",to:`/${a.value.id}`},null,8,["to"]),o(f)==="development"?(r(),n(o(v),{key:0,icon:"mdi-package-variant-closed",flat:"",title:"open compiled version",to:`/compiled/${a.value.id}/${e.value.id}`},null,8,["to"])):d("",!0)]),e.value.warning?(r(),n(o(_),{key:0,type:"warning",variant:"outlined",class:"mb-4"},{default:m(()=>[i(c,{content:e.value.warning},null,8,["content"])]),_:1})):d("",!0),i(c,{content:e.value.description},null,8,["content"]),i(k,{example:e.value,v2:a.value.id==="v2-compat"},null,8,["example","v2"])]),_:1}))}}};export{P as default};
