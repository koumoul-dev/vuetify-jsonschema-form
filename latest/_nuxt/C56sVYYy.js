import{_ as y,a as V}from"./NAdj_j6d.js";import{E as g,j as l,F as n,G as o,A as m,t as r,B as u,x as w,y as b,z as i,H as d}from"./BmAGl0XT.js";import{u as h}from"./-7tOzqDu.js";import{e as B}from"./BTknogPG.js";import{V as _}from"./D1UpF_v0.js";import{V as v}from"./BRWUfCeO.js";import{V as C}from"./CQkrtnQ8.js";import"./CnKUMhot.js";import"./TqRGqZT9.js";import"./CgbBk1tO.js";import"./DKLa9CYD.js";import"./CqVSsfj7.js";import"./D-ZgK6e8.js";import"./DTIHN5fY.js";import"./Cqda0CeW.js";import"./BBnItB3I.js";/* empty css        */import"./DMBY8HKz.js";import"./BHBKzK-v.js";import"./B4kgidLk.js";const N={class:"text-h3 mb-3"},Q={__name:"[id]",setup($){const p=g(),f="production",a=l(()=>B.find(t=>t.id===p.params.categoryId)),e=l(()=>{var t;return(t=a.value)==null?void 0:t.examples.find(s=>s.id===p.params.id)}),x=l(()=>{var t;return"VJSF - "+(((t=e.value)==null?void 0:t.title)||"Unknown example")});return h({title:x}),(t,s)=>{const c=y,k=V;return!a.value||!e.value?(r(),n(o(_),{key:0,type:"warning",variant:"outlined",class:"mb-4"},{default:m(()=>[u(" Unknown example ")]),_:1})):(r(),n(o(C),{key:1,fluid:""},{default:m(()=>[w("h1",N,[u(b(e.value.title)+" ",1),i(o(v),{icon:"mdi-reply",flat:"",title:"get back to parent page",to:`/${a.value.id}`},null,8,["to"]),o(f)==="development"?(r(),n(o(v),{key:0,icon:"mdi-package-variant-closed",flat:"",title:"open compiled version",to:`/compiled/${a.value.id}/${e.value.id}`},null,8,["to"])):d("",!0)]),e.value.warning?(r(),n(o(_),{key:0,type:"warning",variant:"outlined",class:"mb-4"},{default:m(()=>[i(c,{content:e.value.warning},null,8,["content"])]),_:1})):d("",!0),i(c,{content:e.value.description},null,8,["content"]),i(k,{example:e.value,v2:a.value.id==="v2-compat"},null,8,["example","v2"])]),_:1}))}}};export{Q as default};
