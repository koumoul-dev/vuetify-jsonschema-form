import{_ as y,a as V}from"./vjsf-example.CvaITTMG.js";import{E as g,c as i,F as n,A as m,G as o,t as l,B as u,x as w,y as b,z as r,H as d}from"./entry.DTIvWivT.js";import{u as h}from"./vue.f36acd1f.fPLB0xGu.js";import{e as B}from"./index.DePuyH86.js";import{V as _}from"./VAlert.Cg8srvwG.js";import{V as v}from"./VBtn._4JRzG-w.js";import{V as C}from"./VContainer.D2yxw9E8.js";import"./code-block.CV8on2GT.js";import"./prismeditor.min.CDw03TBV.js";import"./index.CGpMKhBv.js";import"./tag.CG-DjV1o.js";import"./VList.Cflr0k1r.js";import"./ssrBoot.CzIkhk8Z.js";import"./index.CXbSpQjk.js";/* empty css              */import"./VSpacer.Bh7leN4z.js";import"./resizeObserver.B6wrahc7.js";const N={class:"text-h3 mb-3"},M={__name:"[id]",setup($){const p=g(),f="production",a=i(()=>B.find(t=>t.id===p.params.categoryId)),e=i(()=>{var t;return(t=a.value)==null?void 0:t.examples.find(s=>s.id===p.params.id)}),x=i(()=>{var t;return"VJSF - "+(((t=e.value)==null?void 0:t.title)||"Unknown example")});return h({title:x}),(t,s)=>{const c=y,k=V;return!a.value||!e.value?(l(),n(o(_),{key:0,type:"warning",variant:"outlined",class:"mb-4"},{default:m(()=>[u(" Unknown example ")]),_:1})):(l(),n(o(C),{key:1,fluid:""},{default:m(()=>[w("h1",N,[u(b(e.value.title)+" ",1),r(o(v),{icon:"mdi-reply",flat:"",title:"get back to parent page",to:`/${a.value.id}`},null,8,["to"]),o(f)==="development"?(l(),n(o(v),{key:0,icon:"mdi-package-variant-closed",flat:"",title:"open compiled version",to:`/compiled/${a.value.id}/${e.value.id}`},null,8,["to"])):d("",!0)]),e.value.warning?(l(),n(o(_),{key:0,type:"warning",variant:"outlined",class:"mb-4"},{default:m(()=>[r(c,{content:e.value.warning},null,8,["content"])]),_:1})):d("",!0),r(c,{content:e.value.description},null,8,["content"]),r(k,{example:e.value,v2:a.value.id==="v2-compat"},null,8,["example","v2"])]),_:1}))}}};export{M as default};
