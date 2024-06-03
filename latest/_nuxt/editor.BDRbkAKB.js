import{P as H,Y as z,c as G}from"./index.25T4rLfM.js";import{P as C}from"./prismeditor.min.DnC9s99Z.js";import{a as q,V as S}from"./VBtn.DA3GyknB.js";import{r as p,T as J,t as V,F as k,A as o,z as t,G as l,B as g,H as N,o as P,c as O,a0 as I,a1 as K,M as A,v as R,L as Q,K as X,x as B,y as U,W as Z}from"./entry.CfrOr43U.js";import{a as ee}from"./index.BHfLXwVM.js";import{h as ae,w as le,u as te,d as L,j as oe,l as $,e as re,_ as se,V as Y,s as ue}from"./vjsf.CIPmtQlS.js";import{u as ne}from"./vue.f36acd1f.Che_Mitl.js";import"./index.Cb5stM_z.js";import{e as ie,V as de}from"./index.CrsEbMew.js";import{V as F}from"./VAlert.BgXkkc7y.js";import{V as M}from"./VSpacer.BCRuAcjH.js";import{V as me}from"./VContainer.BmjfGhVd.js";import"./en.C2aea8f9.js";import"./tag.BHOyZ4DR.js";import"./dimensions.C-cgsL8O.js";import"./resizeObserver.GA4H4TN5.js";import"./VList.BG8XHCgP.js";import"./ssrBoot.BkPfLqOl.js";/* empty css              */const ve={__name:"object-editor",props:{modelValue:{type:[Object,String,Number,Boolean,Array],required:!0},readonly:{type:Boolean,default:!1}},emits:["update:modelValue","update:parseError"],setup(E,{emit:h}){C.manual=!0;const u=E,n=h,s=p({}),v=p("json"),m=p("{}"),b=(i,r)=>(r=r??v.value,r==="yaml"?z.parse(i):JSON.parse(i)),f=(i,r)=>(r=r??v.value,r==="yaml"?z.stringify(i):JSON.stringify(i,null,2));J(v,()=>{m.value=f(s.value)});const y=i=>{try{s.value=b(i),n("update:modelValue",s.value),n("update:parseError",null)}catch(r){n("update:parseError",r.message)}};J(()=>u.modelValue,()=>{u.modelValue!==s.value&&(s.value=JSON.parse(JSON.stringify(u.modelValue)),m.value=f(s.value))},{immediate:!0});const x=i=>C.highlight(i,C.languages[v.value],v.value);return(i,r)=>(V(),k(l(ae),{style:{position:"relative","background-color":"white"}},{default:o(()=>[t(l(q),{class:"rounded-0 rounded-bs-xl",rounded:"bs",density:"compact",variant:"elevated",elevation:"1",theme:"light",style:{position:"absolute",top:"0",right:"0","z-index":"200",height:"24px"}},{default:o(()=>[t(l(S),{size:"small",color:v.value==="json"?"primary":"",onClick:r[0]||(r[0]=c=>v.value="json")},{default:o(()=>[g(" JSON ")]),_:1},8,["color"]),t(l(S),{size:"small",color:v.value==="yaml"?"primary":"",onClick:r[1]||(r[1]=c=>v.value="yaml")},{default:o(()=>[g(" YAML ")]),_:1},8,["color"]),E.readonly?N("",!0):(V(),k(l(S),{key:0,size:"small",onClick:r[2]||(r[2]=c=>m.value=f(s.value))},{default:o(()=>[t(l(ee),null,{default:o(()=>[g("mdi-format-align-left")]),_:1})]),_:1}))]),_:1}),t(l(H),{modelValue:m.value,"onUpdate:modelValue":[r[3]||(r[3]=c=>m.value=c),y],class:"vjsf-code-editor py-2",style:{"min-height":"200px"},highlight:x,"line-numbers":"",readonly:E.readonly},null,8,["modelValue","readonly"])]),_:1}))}},pe={class:"text-caption"},ce=["value","onInput"],ze={__name:"editor",setup(E){const h=ie[0].examples[0],u=p(null),n=p(null),s=p(null);P(()=>{const d=window.localStorage.getItem("vjsf-editor-state");if(d){const a=JSON.parse(d);u.value=a.schema,n.value=a.options??{},s.value=a.data??{}}else u.value=h.schema,n.value=h.options??{},s.value=h.data??{};le([u,n,s],()=>{window.localStorage.setItem("vjsf-editor-state",JSON.stringify({schema:u.value,options:n.value,data:s.value}))},{debounce:500,immediate:!0})});const v=[{value:"schema",title:"Schema"},{value:"options",title:"Options"},{value:"data",title:"Data"}],m=p("schema"),{height:b}=te(),f=O(()=>b.value-56),y=p({}),x=p(null);J([u,n],()=>{if(!n.value||!u.value)return;let d;try{d=G(u.value,{defaultOptions:ue,...n.value}),y.value=d.validationErrors}catch(a){y.value={"":[a.message]}}Object.keys(y.value).length||(x.value={precompiledLayout:d,options:n.value,schema:u.value})},{immediate:!0});const i=I({}),r=(d,a)=>{a?i[d]=a:delete i[d]},c=O(()=>{const d={...i,...y.value};return Object.keys(d).length?z.stringify(d).trim():""}),T=p(null),_=p(null),W=O(()=>_.value===!1?"error":_.value===!0?"success":"default");return ne({title:"VJSF - Editor"}),P(()=>{document.getElementsByTagName("html")[0].style.overflowY="hidden"}),K(()=>{document.getElementsByTagName("html")[0].style.overflowY=""}),(d,a)=>{const j=ve;return u.value&&n.value&&s.value!==void 0?(V(),k(l(me),{key:0,fluid:"",class:"pa-0"},{default:o(()=>[t(l(Y),{dense:""},{default:o(()=>[t(l(L),{class:"ml-2"},{default:o(()=>[t(l(F),{variant:"outlined",color:c.value?"error":"grey",class:"pa-0",style:A(`max-height: ${f.value-8}px;overflow-y: auto;`)},{default:o(()=>[t(l(de),{density:"compact"},{default:o(()=>[(V(),R(X,null,Q(v,e=>t(l(S),{key:e.value,class:"text-none font-weight-bold",size:"small",variant:m.value===e.value?"flat":"text",active:m.value===e.value,color:m.value===e.value?"primary":"",onClick:w=>m.value=e.value},{default:o(()=>[g(U(e.title),1)]),_:2},1032,["variant","active","color","onClick"])),64)),t(l(M))]),_:1}),t(l(oe),{modelValue:m.value,"onUpdate:modelValue":a[6]||(a[6]=e=>m.value=e)},{default:o(()=>[t(l($),{value:"schema"},{default:o(()=>[t(j,{modelValue:u.value,"onUpdate:modelValue":a[0]||(a[0]=e=>u.value=e),"onUpdate:parseError":a[1]||(a[1]=e=>r("schema",e))},null,8,["modelValue"])]),_:1}),t(l($),{value:"options"},{default:o(()=>[t(j,{modelValue:n.value,"onUpdate:modelValue":a[2]||(a[2]=e=>n.value=e),"onUpdate:parseError":a[3]||(a[3]=e=>r("options",e))},null,8,["modelValue"])]),_:1}),t(l($),{value:"data"},{default:o(()=>[t(j,{modelValue:s.value,"onUpdate:modelValue":a[4]||(a[4]=e=>s.value=e),"onUpdate:parseError":a[5]||(a[5]=e=>r("schema",e))},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"]),c.value?(V(),k(l(F),{key:0,color:"error",variant:"text",class:"pa-2"},{default:o(()=>[B("pre",pe,U(c.value),1)]),_:1})):N("",!0)]),_:1},8,["color","style"])]),_:1}),t(l(L),null,{default:o(()=>[B("div",{style:A(`max-height: ${f.value-8}px;overflow-y: auto;`)},[x.value?(V(),k(l(re),{key:0,ref_key:"form",ref:T,modelValue:_.value,"onUpdate:modelValue":a[9]||(a[9]=e=>_.value=e),class:"mr-4"},{default:o(()=>[t(l(se),Z({modelValue:s.value,"onUpdate:modelValue":a[7]||(a[7]=e=>s.value=e)},x.value),{"custom-textarea":o(({node:e,statefulLayout:w})=>[B("textarea",{value:e.data,style:{border:"1px solid red"},placeholder:"A custom textarea",onInput:D=>w.input(e,D.target.value)},null,40,ce)]),"custom-message":o(({node:e})=>[g(" This message is defined in a slot (key="+U(e.key)+") ",1)]),_:1},16,["modelValue"]),t(l(Y),{class:"ma-0"},{default:o(()=>[t(l(M)),t(l(S),{color:W.value,flat:"",class:"ma-2",onClick:a[8]||(a[8]=e=>{var w;return(w=T.value)==null?void 0:w.validate()})},{default:o(()=>[g(" Validate ")]),_:1},8,["color"])]),_:1})]),_:1},8,["modelValue"])):N("",!0)],4)]),_:1})]),_:1})]),_:1})):N("",!0)}}};export{ze as default};
