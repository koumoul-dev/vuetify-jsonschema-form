import{_ as T,t as c,v as j,L as q,M as E,N,H,G,z as a,g as p,D as O,A as n,I as S,J as C,B as k,y as f,x as V,F as D,K as J,O as Q}from"./CvXVYCmv.js";import{_ as X}from"./CzVAowgZ.js";import{a as Y,c as Z,r as R,b as ee,i as te,_ as le,V as oe,d as ae,e as ie,f as ne,g as se,h as de,j as re,k as ue,l as pe,m as me}from"./CWbhR30t.js";import{V as fe}from"./BS89yCMn.js";import{V as ye}from"./DX-9AI5c.js";import{V as ve}from"./86aUa6D2.js";import{V as Ve}from"./DeTZgfeD.js";import{m as ce,I as xe,M as be,d as we}from"./Roz0zKtG.js";import{V as Oe}from"./D0EZ6-Xf.js";import{m as ge,a as ke,u as je}from"./DzteZw27.js";import{m as De,u as _e}from"./DLkDSD5m.js";import{V as Ue}from"./CggvwESy.js";const $e={props:{content:{type:String,required:!0}}},Pe=["innerHTML"];function Se(e,t,i,s,r,u){return c(),j("div",{class:"markdown-block",innerHTML:e.$markdown(i.content)},null,8,Pe)}const Re=T($e,[["render",Se]]),Ce=q({modelValue:Boolean,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},...ge(),...De(),...ke(),...ce({transition:"fade-transition"})},"VLazy"),Me=E()({name:"VLazy",directives:{intersect:xe},props:Ce(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:i}=t;const{dimensionStyles:s}=_e(e),r=N(e,"modelValue");function u(m){r.value||(r.value=m)}return je(()=>H(a(e.tag,{class:["v-lazy",e.class],style:[s.value,e.style]},{default:()=>[r.value&&a(be,{transition:e.transition,appear:!0},{default:()=>{var m;return[(m=i.default)==null?void 0:m.call(i)]}})]}),[[G("intersect"),{handler:u,options:e.options},null]])),{}}}),Te=ee,Ae={modelRoot:"rootData",root:"rootData",model:"data",value:"data"},M=e=>e.match(/^[a-z.]*$/i)&&!["data","context","rootData","parent"].some(t=>e.startsWith(t+"."))?"rootData."+e:e,_=(e,t="js-eval")=>{let i=e,s=!0;i.includes("parent.value")&&(s=!1,i=i.replace(/parent\.value/g,"parent.data"));for(const[r,u]of Object.entries(Ae))i=i.replace(new RegExp(`${r}\\.`,"g"),u+".");if(t==="js-eval"&&(i=M(i)),t==="js-tpl")for(const r of i.matchAll(/\{(.*?)\}/g))r[1]!=="q"&&(i=i.replace(r[0],"${"+M(r[1])+"}"));return i.includes("rootData")&&(s=!1),{type:t,expr:i,pure:s}},y=(e,t,i,s)=>{var r,u,m;if(!s.includes(e)){if(s.push(e),e.$ref){const[o,d]=t(i,e.$ref);y(o,t,d,s)}if(!e.layout){const o={};if((e.separator||e["x-separator"])&&(o.separator=e.separator||e["x-separator"],delete e.separator,delete e["x-separator"]),e["x-display"]==="icon"&&(e.enum||(r=e.items)!=null&&r.enum)&&(o.getItems={itemIcon:e["x-itemIcon"]||"data.value"},delete e["x-display"]),e["x-display"]){let d=e["x-display"];d==="radio"&&(d="radio-group"),d==="checkbox"&&e.type!=="boolean"&&(d="checkbox-group"),d==="switch"&&e.type!=="boolean"&&(d="switch-group"),o.comp=d,delete e["x-display"]}if(e.format==="hexcolor"&&(o.comp="color-picker",delete e.format),e["x-props"]&&(o.props=e["x-props"],delete e["x-props"]),e["x-fromData"]&&(o.comp=o.comp??"select",o.getItems=_(e["x-fromData"]),delete e["x-fromData"]),e["x-if"]&&(o.if=_(e["x-if"]),delete e["x-if"]),e["x-fromUrl"]){const d=e["x-fromUrl"];o.getItems={url:_(d,"js-tpl")},delete e["x-fromUrl"]}o.getItems&&te(o.getItems)&&(e["x-itemKey"]&&(o.getItems.itemKey=`data["${e["x-itemKey"]}"]`),e["x-itemTitle"]&&(o.getItems.itemTitle=`data["${e["x-itemTitle"]}"]`),e["x-itemValue"]&&(o.getItems.itemValue=`data["${e["x-itemValue"]}"]`),e["x-itemIcon"]&&(o.getItems.itemIcon=`data["${e["x-itemIcon"]}"]`),e["x-itemsProp"]&&(o.getItems.itemsResults=`data["${e["x-itemsProp"]}"]`),delete e["x-itemKey"],delete e["x-itemTitle"],delete e["x-itemValue"],delete e["x-itemsProp"]),e["x-cols"]&&(o.cols=e["x-cols"]),Object.keys(o).length===1&&"comp"in o?e.layout=o.comp:Object.keys(o).length>0&&(e.layout=o)}if(e.properties)for(const o of Object.keys(e.properties))y(e.properties[o],t,i,s);if(e.allOf)for(const o of e.allOf)y(o,t,i,s);if(e.oneOf){if(!e.oneOfLayout){const o=Object.keys(((u=e.oneOf[0])==null?void 0:u.properties)||{}).find(d=>{var x;return!!((x=e.oneOf[0])!=null&&x.properties[d].const)});if(o){const d=(m=e.oneOf[0])==null?void 0:m.properties[o];d!=null&&d.title&&(e.oneOfLayout={label:d.title}),e.required&&Array.isArray(e.required)&&(e.required=e.required.filter(x=>x!==o))}}for(const o of e.oneOf)y(o,t,i,s)}if(e.anyOf)for(const o of e.anyOf)y(o,t,i,s);if(e.type==="array"&&e.items)if(Array.isArray(e.items))for(const o of e.items)y(o,t,i,s);else y(e.items,t,i,s);if(e.dependencies)for(const o of Object.keys(e.dependencies))y(e.dependencies[o],t,i,s);e.if&&(e.then&&y(e.then,t,i,s),e.else&&y(e.else,t,i,s))}};function he(e,t,i="en"){let s=t;if(!s){const o={strict:!1,allErrors:!0},d=new Te(o);Y.default(d),s=d}const r=Z(e);r.$id=r.$id??"_jl";const u=R(r,s,i),m=[];return y(r,u,r.$id,m),r}const Le={"custom-textarea":`
  <template #custom-textarea="{node, statefulLayout}">
    <textarea
      :value="node.data"
      style="border: 1px solid red;"
      placeholder="A custom textarea"
      @input="event => statefulLayout.input(node, event.target.value)"
    />
  </template>`,"custom-message":`
  <template #custom-message="{node, statefulLayout}">
    This message is defined in a slot (key={{ node.key }})
  </template>`},Ie={components:{Vjsf:le,VContainer:ye,VRow:oe,VCol:ae,VSpacer:ve,VForm:ie,VBtn:Ve,VDivider:we,VSelect:ne,VSwitch:se,VToolbar:Oe,VSheet:de,VWindow:re,VSlider:ue,VWindowItem:pe,VLazy:Me,VDefaultsProvider:Ue,VTextField:me},props:{example:{type:Object,required:!0},v2:{type:Boolean,default:!1}},data:()=>({data:null,tab:null,stateTree:null,display:null,options:{readOnly:!1,summary:!1,density:"default",indent:!1,titleDepth:2,validateOn:"input",initialValidation:"withData",updateOn:"input",debounceInputMs:300,defaultOn:"empty",removeAdditional:"error",autofocus:!1,readOnlyPropertiesMode:"show",locale:"en",plugins:[fe]},filledOptions:null,wrapperWidth:100,slotCodes:Le,valid:null}),computed:{tabs(){var t;const e=[];return this.v2&&e.push({value:"schemaV2",title:"Schema V2"}),e.push({value:"schema",title:"Schema"}),e.push({value:"model",title:"Data"}),(t=this.example.codeSlots)!=null&&t.length&&e.push({value:"slots",title:"Slots"}),this.example.defaultProps&&e.push({value:"defaultProps",title:"Default props"}),e.push({value:"options",title:"Options"}),e},schema(){return this.v2?he(this.example.schema):this.example.schema},changeOption(e){return t=>{this.options={...this.options,[e]:t}}},validateColor(){return this.valid===!1?"error":this.valid===!0?"success":"default"}},created(){this.example.options&&Object.assign(this.options,this.example.options),this.example.data&&(this.data=JSON.parse(JSON.stringify(this.example.data)))},methods:{updateState(e){this.stateTree=e.stateTree,this.display=e.display,this.filledOptions={...e.options},delete this.filledOptions.vjsfSlots,delete this.filledOptions.nodeComponents,delete this.filledOptions.components,delete this.filledOptions.plugins},editExample(){const e={...this.options};delete e.plugins,localStorage.setItem("vjsf-editor-state",JSON.stringify({schema:this.schema,options:e,data:this.data})),this.$router.push("/editor")}}},ze={key:0,class:"text-caption ml-2"},Be=["value","onInput"];function Fe(e,t,i,s,r,u){const m=p("v-btn"),o=p("v-spacer"),d=p("v-toolbar"),x=p("v-divider"),b=X,w=p("v-window-item"),g=p("v-switch"),v=p("v-select"),A=p("v-slider"),U=p("v-col"),$=p("v-row"),h=p("v-window"),L=p("vjsf"),I=p("v-defaults-provider"),z=p("v-form"),B=p("v-lazy"),F=p("v-container"),K=p("v-sheet");return c(),O(K,{class:"my-6",border:"",rounded:"",color:"transparent"},{default:n(()=>[a(d,{density:"compact"},{default:n(()=>[(c(!0),j(S,null,C(u.tabs,l=>(c(),O(m,{key:l.value,class:"text-none font-weight-bold",size:"small",variant:"text",active:e.tab===l.value,onClick:P=>e.tab=e.tab===l.value?null:l.value},{default:n(()=>[k(f(l.title),1)]),_:2},1032,["active","onClick"]))),128)),a(o),a(m,{color:"primary",icon:"mdi-pencil",onClick:u.editExample},null,8,["onClick"])]),_:1}),a(x),e.tab?(c(),O(h,{key:0,modelValue:e.tab,"onUpdate:modelValue":t[14]||(t[14]=l=>e.tab=l),style:{height:"600px","overflow-y":"auto"}},{default:n(()=>[a(w,{value:"schemaV2",class:"ma-3"},{default:n(()=>[a(b,null,{default:n(()=>[V("pre",null,f(JSON.stringify(i.example.schema,null,2)),1)]),_:1})]),_:1}),a(w,{value:"schema",class:"ma-3"},{default:n(()=>[a(b,null,{default:n(()=>[V("pre",null,f(JSON.stringify(u.schema,null,2)),1)]),_:1})]),_:1}),a(w,{value:"model",class:"ma-3 fill-height"},{default:n(()=>[e.data!==null&&e.data!==void 0?(c(),O(b,{key:0},{default:n(()=>[V("pre",null,f(JSON.stringify(e.data,null,2)),1)]),_:1})):D("",!0)]),_:1}),a(w,{value:"slots",class:"ma-3"},{default:n(()=>[(c(!0),j(S,null,C(i.example.codeSlots,l=>(c(),O(b,{key:l},{default:n(()=>[V("pre",null,f(e.slotCodes[l]),1)]),_:2},1024))),128))]),_:1}),a(w,{value:"defaultProps",class:"ma-3"},{default:n(()=>[a(b,null,{default:n(()=>[V("pre",null,f(JSON.stringify(i.example.defaultProps,null,2)),1)]),_:1})]),_:1}),a(w,{value:"options",class:"ma-3",style:{height:"600px"}},{default:n(()=>[a($,{style:{height:"600px"}},{default:n(()=>[a(U,null,{default:n(()=>[a(g,{modelValue:e.options.readOnly,"onUpdate:modelValue":t[0]||(t[0]=l=>e.options.readOnly=l),label:"readOnly",color:"primary","hide-details":"",density:"compact"},null,8,["modelValue"]),a(g,{modelValue:e.options.summary,"onUpdate:modelValue":t[1]||(t[1]=l=>e.options.summary=l),label:"summary",color:"primary","hide-details":"",density:"compact"},null,8,["modelValue"]),a(g,{modelValue:e.options.autofocus,"onUpdate:modelValue":t[2]||(t[2]=l=>e.options.autofocus=l),label:"autofocus",color:"primary","hide-details":"",density:"compact"},null,8,["modelValue"]),a(v,{modelValue:e.options.density,"onUpdate:modelValue":t[3]||(t[3]=l=>e.options.density=l),density:"compact","hide-details":"",label:"density",style:{"max-width":"300px"},items:["default","comfortable","compact"]},null,8,["modelValue"]),a(g,{modelValue:e.options.indent,"onUpdate:modelValue":t[4]||(t[4]=l=>e.options.indent=l),label:"indent",color:"primary","hide-details":"",density:"compact"},null,8,["modelValue"]),a(v,{modelValue:e.options.titleDepth,"onUpdate:modelValue":t[5]||(t[5]=l=>e.options.titleDepth=l),density:"compact","hide-details":"",label:"titleDepth",style:{"max-width":"300px"},items:[1,2,3,4,5,6]},null,8,["modelValue"]),a(v,{modelValue:e.options.validateOn,"onUpdate:modelValue":t[6]||(t[6]=l=>e.options.validateOn=l),density:"compact","hide-details":"",label:"validateOn",style:{"max-width":"300px"},items:["input","blur","submit"]},null,8,["modelValue"]),a(v,{modelValue:e.options.initialValidation,"onUpdate:modelValue":t[7]||(t[7]=l=>e.options.initialValidation=l),density:"compact","hide-details":"",label:"initialValidation",style:{"max-width":"300px"},items:["never","withData","always"]},null,8,["modelValue"]),a(v,{modelValue:e.options.updateOn,"onUpdate:modelValue":t[8]||(t[8]=l=>e.options.updateOn=l),density:"compact","hide-details":"",label:"updateOn",style:{"max-width":"300px"},items:["input","blur"]},null,8,["modelValue"]),a(v,{modelValue:e.options.defaultOn,"onUpdate:modelValue":t[9]||(t[9]=l=>e.options.defaultOn=l),density:"compact","hide-details":"",label:"defaultOn",style:{"max-width":"300px"},items:["never","missing","empty"]},null,8,["modelValue"]),a(v,{modelValue:e.options.removeAdditional,"onUpdate:modelValue":t[10]||(t[10]=l=>e.options.removeAdditional=l),density:"compact","hide-details":"",label:"removeAdditional",style:{"max-width":"300px"},items:["unknown","error","none"]},null,8,["modelValue"]),a(v,{modelValue:e.options.readOnlyPropertiesMode,"onUpdate:modelValue":t[11]||(t[11]=l=>e.options.readOnlyPropertiesMode=l),density:"compact","hide-details":"",label:"readOnlyPropertiesMode",style:{"max-width":"300px"},items:["remove","hide","show"]},null,8,["modelValue"]),a(v,{modelValue:e.options.locale,"onUpdate:modelValue":t[12]||(t[12]=l=>e.options.locale=l),density:"compact","hide-details":"",label:"locale",style:{"max-width":"300px"},items:["en","fr","nl"]},null,8,["modelValue"]),a(A,{modelValue:e.wrapperWidth,"onUpdate:modelValue":t[13]||(t[13]=l=>e.wrapperWidth=l),min:0,max:100,step:1,color:"primary",label:"container width",style:{"max-width":"600px"},"hide-details":"",density:"compact"},{append:n(()=>[k(f(e.wrapperWidth)+" % ",1)]),_:1},8,["modelValue"]),e.display?(c(),j("div",ze," width="+f(e.display.width)+"px, display="+f(e.display.name),1)):D("",!0)]),_:1}),a(x,{vertical:""}),a(U,{style:{height:"600px","overflow-y":"auto"}},{default:n(()=>[t[18]||(t[18]=V("div",{class:"text-subtitle"}," Options filled with default values: ",-1)),a(b,null,{default:n(()=>[V("pre",null,f(JSON.stringify(e.filledOptions,null,2)),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])):D("",!0),a(x),a(F,{fluid:""},{default:n(()=>[a(B,{"min-height":120},{default:n(()=>[V("div",{style:J(`width: ${e.wrapperWidth}%`)},[a(z,{ref:"form",modelValue:e.valid,"onUpdate:modelValue":t[17]||(t[17]=l=>e.valid=l)},{default:n(()=>[a(I,{defaults:i.example.defaultProps||{}},{default:n(()=>[Q(e.$slots,"vjsf",{modelValue:e.data,options:e.options,updateState:u.updateState,updateModelValue:l=>e.data=l},()=>[a(L,{modelValue:e.data,"onUpdate:modelValue":t[15]||(t[15]=l=>e.data=l),schema:u.schema,options:e.options,"onUpdate:state":u.updateState},{"custom-textarea":n(({node:l,statefulLayout:P})=>[V("textarea",{value:l.data,style:{border:"1px solid red"},placeholder:"A custom textarea",onInput:W=>P.input(l,W.target.value)},null,40,Be)]),"custom-message":n(({node:l})=>[k(" This message is defined in a slot (key="+f(l.key)+") ",1)]),_:1},8,["modelValue","schema","options","onUpdate:state"])])]),_:3},8,["defaults"]),a($,{class:"ma-0"},{default:n(()=>[a(o),a(m,{color:u.validateColor,flat:"",class:"ma-2",onClick:t[16]||(t[16]=l=>e.$refs.form.validate())},{default:n(()=>t[19]||(t[19]=[k(" Validate ")])),_:1},8,["color"])]),_:1})]),_:3},8,["modelValue"])],4)]),_:3})]),_:3})]),_:3})}const et=T(Ie,[["render",Fe]]);export{Re as _,et as a};
