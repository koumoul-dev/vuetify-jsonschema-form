import{_ as A,t as v,v as j,L as E,M as N,N as H,H as G,G as J,z as a,g as p,D as b,A as n,I as C,J as S,B as k,y as f,x as g,F as _,K as Q,O as X}from"./DxK5QV_v.js";import{_ as Y}from"./Bs-NgG50.js";import{c as Z,r as R,_ as ee,V as te,a as oe,b as le,d as ae,e as ie,f as ne,g as se,h as re}from"./CQodmBQP.js";import{V as de}from"./CFhA7ZrK.js";import{a as ue,b as pe,i as me}from"./CJpVtMeO.js";import"./BpL2aHmH.js";import{V as fe,a as ve}from"./BSsSwofs.js";import{V as ye}from"./wYq7c63x.js";import{V as Ve,a as ge}from"./DWgt0j8g.js";import{V as be}from"./BeZTEJME.js";import{V as we}from"./_A32tspL.js";import{m as Oe,I as xe,M as ce,d as ke}from"./BM4NCaxS.js";import{V as je}from"./CbeB1nDV.js";import{m as _e,a as De,u as Ue}from"./DhGIs5ff.js";import{m as he,u as Pe}from"./BQI04MH9.js";import{V as Te}from"./BX9utgig.js";const $e={props:{content:{type:String,required:!0}}},Ce=["innerHTML"];function Se(e,t,i,s,d,u){return v(),j("div",{class:"markdown-block",innerHTML:e.$markdown(i.content)},null,8,Ce)}const nt=A($e,[["render",Se]]),Me=E({modelValue:Boolean,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},..._e(),...he(),...De(),...Oe({transition:"fade-transition"})},"VLazy"),Ae=N()({name:"VLazy",directives:{intersect:xe},props:Me(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:i}=t;const{dimensionStyles:s}=Pe(e),d=H(e,"modelValue");function u(m){d.value||(d.value=m)}return Ue(()=>G(a(e.tag,{class:["v-lazy",e.class],style:[s.value,e.style]},{default:()=>[d.value&&a(ce,{transition:e.transition,appear:!0},{default:()=>{var m;return[(m=i.default)==null?void 0:m.call(i)]}})]}),[[J("intersect"),{handler:u,options:e.options},null]])),{}}}),Le=pe,Ie={modelRoot:"rootData",root:"rootData",model:"data",value:"data"},M=e=>e.match(/^[a-z.]*$/i)&&!["data","context","rootData","parent"].some(t=>e.startsWith(t+"."))?"rootData."+e:e,D=(e,t="js-eval")=>{let i=e,s=!0;i.includes("parent.value")&&(s=!1,i=i.replace(/parent\.value/g,"parent.data"));for(const[d,u]of Object.entries(Ie))i=i.replace(new RegExp(`${d}\\.`,"g"),u+".");if(t==="js-eval"&&(i=M(i)),t==="js-tpl")for(const d of i.matchAll(/\{(.*?)\}/g))d[1]!=="q"&&(i=i.replace(d[0],"${"+M(d[1])+"}"));return i.includes("rootData")&&(s=!1),{type:t,expr:i,pure:s}},y=(e,t,i,s)=>{var d,u,m;if(!s.includes(e)){if(s.push(e),e.$ref){const[l,r]=t(i,e.$ref);y(l,t,r,s)}if(!e.layout){const l={};if((e.separator||e["x-separator"])&&(l.separator=e.separator||e["x-separator"],delete e.separator,delete e["x-separator"]),e["x-display"]==="icon"&&(e.enum||(d=e.items)!=null&&d.enum)&&(l.getItems={itemIcon:e["x-itemIcon"]||"data.value"},delete e["x-display"]),e["x-display"]){let r=e["x-display"];r==="radio"&&(r="radio-group"),r==="checkbox"&&e.type!=="boolean"&&(r="checkbox-group"),r==="switch"&&e.type!=="boolean"&&(r="switch-group"),l.comp=r,delete e["x-display"]}if(e.format==="hexcolor"&&(l.comp="color-picker",delete e.format),e["x-props"]&&(l.props=e["x-props"],delete e["x-props"]),e["x-fromData"]&&(l.comp=l.comp??"select",l.getItems=D(e["x-fromData"]),delete e["x-fromData"]),e["x-if"]&&(l.if=D(e["x-if"]),delete e["x-if"]),e["x-fromUrl"]){const r=e["x-fromUrl"];l.getItems={url:D(r,"js-tpl")},delete e["x-fromUrl"]}l.getItems&&me(l.getItems)&&(e["x-itemKey"]&&(l.getItems.itemKey=`data["${e["x-itemKey"]}"]`),e["x-itemTitle"]&&(l.getItems.itemTitle=`data["${e["x-itemTitle"]}"]`),e["x-itemValue"]&&(l.getItems.itemValue=`data["${e["x-itemValue"]}"]`),e["x-itemIcon"]&&(l.getItems.itemIcon=`data["${e["x-itemIcon"]}"]`),e["x-itemsProp"]&&(l.getItems.itemsResults=`data["${e["x-itemsProp"]}"]`),delete e["x-itemKey"],delete e["x-itemTitle"],delete e["x-itemValue"],delete e["x-itemsProp"]),e["x-cols"]&&(l.cols=e["x-cols"]),Object.keys(l).length===1&&"comp"in l?e.layout=l.comp:Object.keys(l).length>0&&(e.layout=l)}if(e.properties)for(const l of Object.keys(e.properties))y(e.properties[l],t,i,s);if(e.allOf)for(const l of e.allOf)y(l,t,i,s);if(e.oneOf){if(!e.oneOfLayout){const l=Object.keys(((u=e.oneOf[0])==null?void 0:u.properties)||{}).find(r=>{var w;return!!((w=e.oneOf[0])!=null&&w.properties[r].const)});if(l){const r=(m=e.oneOf[0])==null?void 0:m.properties[l];r!=null&&r.title&&(e.oneOfLayout={label:r.title}),e.required&&Array.isArray(e.required)&&(e.required=e.required.filter(w=>w!==l))}}for(const l of e.oneOf)y(l,t,i,s)}if(e.anyOf)for(const l of e.anyOf)y(l,t,i,s);if(e.type==="array"&&e.items)if(Array.isArray(e.items))for(const l of e.items)y(l,t,i,s);else y(e.items,t,i,s);if(e.dependencies)for(const l of Object.keys(e.dependencies))y(e.dependencies[l],t,i,s);e.if&&(e.then&&y(e.then,t,i,s),e.else&&y(e.else,t,i,s))}};function ze(e,t,i="en"){let s=t;if(!s){const l={strict:!1,allErrors:!0},r=new Le(l);ue.default(r),s=r}const d=Z(e);d.$id=d.$id??"_jl";const u=R(d,s,i),m=[];return y(d,u,d.$id,m),d}const Be={"custom-textarea":`
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
  </template>`},Fe={components:{Vjsf:ee,VIcon:fe,VContainer:ye,VRow:Ve,VCol:ge,VSpacer:be,VForm:te,VBtn:we,VDivider:ke,VSelect:oe,VSwitch:le,VToolbar:je,VSheet:ae,VWindow:ie,VSlider:ne,VWindowItem:se,VLazy:Ae,VDefaultsProvider:ve,VThemeProvider:Te,VTextField:re},props:{example:{type:Object,required:!0},v2:{type:Boolean,default:!1}},data:()=>({data:null,tab:null,stateTree:null,display:null,options:{readOnly:!1,summary:!1,density:"comfortable",indent:!1,titleDepth:2,validateOn:"input",initialValidation:"withData",updateOn:"input",debounceInputMs:300,defaultOn:"empty",removeAdditional:"error",autofocus:!1,readOnlyPropertiesMode:"show",locale:"en",plugins:[de]},filledOptions:null,wrapperWidth:100,slotCodes:Be,valid:null,theme:"light"}),computed:{tabs(){var t;const e=[];return this.v2&&e.push({value:"schemaV2",title:"Schema V2"}),e.push({value:"schema",title:"Schema"}),e.push({value:"model",title:"Data"}),(t=this.example.codeSlots)!=null&&t.length&&e.push({value:"slots",title:"Slots"}),this.example.defaultProps&&e.push({value:"defaultProps",title:"Default props"}),e.push({value:"options",title:"Options"}),e},schema(){return this.v2?ze(this.example.schema):this.example.schema},changeOption(e){return t=>{this.options={...this.options,[e]:t}}},validateColor(){return this.valid===!1?"error":this.valid===!0?"success":"default"}},created(){this.example.options&&Object.assign(this.options,this.example.options),this.example.data&&(this.data=JSON.parse(JSON.stringify(this.example.data)))},methods:{updateState(e){this.stateTree=e.stateTree,this.display=e.display,this.filledOptions={...e.options},delete this.filledOptions.vjsfSlots,delete this.filledOptions.nodeComponents,delete this.filledOptions.components,delete this.filledOptions.plugins},editExample(){const e={...this.options};delete e.plugins,localStorage.setItem("vjsf-editor-state",JSON.stringify({schema:this.schema,options:e,data:this.data})),this.$router.push("/editor")},toggleTheme(){this.theme=this.theme==="light"?"dark":"light"}}},Ke={key:0,class:"text-caption ml-2"},We=["value","onInput"];function qe(e,t,i,s,d,u){const m=p("v-btn"),l=p("v-spacer"),r=p("v-icon"),w=p("v-toolbar"),U=p("v-divider"),O=Y,x=p("v-window-item"),c=p("v-switch"),V=p("v-select"),L=p("v-slider"),h=p("v-defaults-provider"),P=p("v-col"),T=p("v-row"),I=p("v-window"),z=p("vjsf"),B=p("v-form"),F=p("v-container"),K=p("v-theme-provider"),W=p("v-sheet");return v(),b(W,{class:"my-6",border:"sm",rounded:"",color:"transparent"},{default:n(()=>[a(w,{density:"compact",color:"surface",rounded:""},{default:n(()=>[(v(!0),j(C,null,S(u.tabs,o=>(v(),b(m,{key:o.value,class:"text-none font-weight-bold ml-2",variant:e.tab===o.value?"flat":"text",active:e.tab===o.value,color:e.tab===o.value?"primary":"",onClick:$=>e.tab=e.tab===o.value?null:o.value},{default:n(()=>[k(f(o.title),1)]),_:2},1032,["variant","active","color","onClick"]))),128)),a(l),a(m,{icon:"",color:"primary",class:"mr-2",onClick:u.toggleTheme},{default:n(()=>[e.theme==="light"?(v(),b(r,{key:0,icon:"mdi-weather-night"})):(v(),b(r,{key:1,icon:"mdi-weather-sunny"}))]),_:1},8,["onClick"]),a(m,{color:"primary",icon:"mdi-pencil",onClick:u.editExample},null,8,["onClick"])]),_:1}),a(U),e.tab?(v(),b(I,{key:0,modelValue:e.tab,"onUpdate:modelValue":t[14]||(t[14]=o=>e.tab=o),style:{height:"600px","overflow-y":"auto"}},{default:n(()=>[a(x,{value:"schemaV2",class:"ma-3"},{default:n(()=>[a(O,null,{default:n(()=>[g("pre",null,f(JSON.stringify(i.example.schema,null,2)),1)]),_:1})]),_:1}),a(x,{value:"schema",class:"ma-3"},{default:n(()=>[a(O,null,{default:n(()=>[g("pre",null,f(JSON.stringify(u.schema,null,2)),1)]),_:1})]),_:1}),a(x,{value:"model",class:"ma-3 fill-height"},{default:n(()=>[e.data!==null&&e.data!==void 0?(v(),b(O,{key:0},{default:n(()=>[g("pre",null,f(JSON.stringify(e.data,null,2)),1)]),_:1})):_("",!0)]),_:1}),a(x,{value:"slots",class:"ma-3"},{default:n(()=>[(v(!0),j(C,null,S(i.example.codeSlots,o=>(v(),b(O,{key:o},{default:n(()=>[g("pre",null,f(e.slotCodes[o]),1)]),_:2},1024))),128))]),_:1}),a(x,{value:"defaultProps",class:"ma-3"},{default:n(()=>[a(O,null,{default:n(()=>[g("pre",null,f(JSON.stringify(i.example.defaultProps,null,2)),1)]),_:1})]),_:1}),a(x,{value:"options",class:"ma-3",style:{height:"600px"}},{default:n(()=>[a(T,{style:{height:"600px"}},{default:n(()=>[a(P,null,{default:n(()=>[a(h,{defaults:{global:{density:"compact",color:"primary",hideDetails:!0}}},{default:n(()=>[a(c,{modelValue:e.options.readOnly,"onUpdate:modelValue":t[0]||(t[0]=o=>e.options.readOnly=o),label:"readOnly"},null,8,["modelValue"]),a(c,{modelValue:e.options.summary,"onUpdate:modelValue":t[1]||(t[1]=o=>e.options.summary=o),label:"summary"},null,8,["modelValue"]),a(c,{modelValue:e.options.autofocus,"onUpdate:modelValue":t[2]||(t[2]=o=>e.options.autofocus=o),label:"autofocus"},null,8,["modelValue"]),a(V,{modelValue:e.options.density,"onUpdate:modelValue":t[3]||(t[3]=o=>e.options.density=o),style:{"max-width":"300px"},items:["default","comfortable","compact"]},null,8,["modelValue"]),a(c,{modelValue:e.options.indent,"onUpdate:modelValue":t[4]||(t[4]=o=>e.options.indent=o),label:"indent"},null,8,["modelValue"]),a(V,{modelValue:e.options.titleDepth,"onUpdate:modelValue":t[5]||(t[5]=o=>e.options.titleDepth=o),label:"titleDepth",style:{"max-width":"300px"},items:[1,2,3,4,5,6]},null,8,["modelValue"]),a(V,{modelValue:e.options.validateOn,"onUpdate:modelValue":t[6]||(t[6]=o=>e.options.validateOn=o),label:"validateOn",style:{"max-width":"300px"},items:["input","blur","submit"]},null,8,["modelValue"]),a(V,{modelValue:e.options.initialValidation,"onUpdate:modelValue":t[7]||(t[7]=o=>e.options.initialValidation=o),label:"initialValidation",style:{"max-width":"300px"},items:["never","withData","always"]},null,8,["modelValue"]),a(V,{modelValue:e.options.updateOn,"onUpdate:modelValue":t[8]||(t[8]=o=>e.options.updateOn=o),label:"updateOn",style:{"max-width":"300px"},items:["input","blur"]},null,8,["modelValue"]),a(V,{modelValue:e.options.defaultOn,"onUpdate:modelValue":t[9]||(t[9]=o=>e.options.defaultOn=o),label:"defaultOn",style:{"max-width":"300px"},items:["never","missing","empty"]},null,8,["modelValue"]),a(V,{modelValue:e.options.removeAdditional,"onUpdate:modelValue":t[10]||(t[10]=o=>e.options.removeAdditional=o),label:"removeAdditional",style:{"max-width":"300px"},items:["unknown","error","none"]},null,8,["modelValue"]),a(V,{modelValue:e.options.readOnlyPropertiesMode,"onUpdate:modelValue":t[11]||(t[11]=o=>e.options.readOnlyPropertiesMode=o),label:"readOnlyPropertiesMode",style:{"max-width":"300px"},items:["remove","hide","show"]},null,8,["modelValue"]),a(V,{modelValue:e.options.locale,"onUpdate:modelValue":t[12]||(t[12]=o=>e.options.locale=o),label:"locale",style:{"max-width":"300px"},items:["en","fr","nl"]},null,8,["modelValue"]),a(L,{modelValue:e.wrapperWidth,"onUpdate:modelValue":t[13]||(t[13]=o=>e.wrapperWidth=o),min:0,max:100,step:1,label:"container width",style:{"max-width":"600px"}},{append:n(()=>[k(f(e.wrapperWidth)+" % ",1)]),_:1},8,["modelValue"])]),_:1}),e.display?(v(),j("div",Ke," width="+f(e.display.width)+"px, display="+f(e.display.name),1)):_("",!0)]),_:1}),a(U,{vertical:""}),a(P,{style:{height:"600px","overflow-y":"auto"}},{default:n(()=>[t[18]||(t[18]=g("div",{class:"text-subtitle"}," Options filled with default values: ",-1)),a(O,null,{default:n(()=>[g("pre",null,f(JSON.stringify(e.filledOptions,null,2)),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])):_("",!0),a(K,{theme:e.theme,"with-background":"",class:"rounded-b"},{default:n(()=>[a(F,{fluid:""},{default:n(()=>[g("div",{style:Q(`width: ${e.wrapperWidth}%`)},[a(B,{ref:"form",modelValue:e.valid,"onUpdate:modelValue":t[17]||(t[17]=o=>e.valid=o)},{default:n(()=>[a(h,{defaults:i.example.defaultProps||{}},{default:n(()=>[X(e.$slots,"vjsf",{modelValue:e.data,options:e.options,updateState:u.updateState,updateModelValue:o=>e.data=o},()=>[a(z,{modelValue:e.data,"onUpdate:modelValue":t[15]||(t[15]=o=>e.data=o),schema:u.schema,options:e.options,"onUpdate:state":u.updateState},{"custom-textarea":n(({node:o,statefulLayout:$})=>[g("textarea",{value:o.data,style:{border:"1px solid red"},placeholder:"A custom textarea",onInput:q=>$.input(o,q.target.value)},null,40,We)]),"custom-message":n(({node:o})=>[k(" This message is defined in a slot (key="+f(o.key)+") ",1)]),_:1},8,["modelValue","schema","options","onUpdate:state"])])]),_:3},8,["defaults"]),a(T,{class:"ma-0"},{default:n(()=>[a(l),a(m,{color:u.validateColor,flat:"",class:"mt-2",onClick:t[16]||(t[16]=o=>e.$refs.form.validate())},{default:n(()=>t[19]||(t[19]=[k(" Validate ")])),_:1},8,["color"])]),_:1})]),_:3},8,["modelValue"])],4)]),_:3})]),_:3},8,["theme"])]),_:3})}const st=A(Fe,[["render",qe]]);export{nt as _,st as a};
