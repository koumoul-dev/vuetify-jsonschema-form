import{_ as L,t as y,v as w,N as q,O as E,Q as N,J as H,I as G,z as a,i as u,F as b,A as n,K as T,L as C,B as g,y as f,x as v,H as k,M as Q,R as J}from"./entry.B542wA9T.js";import{_ as X}from"./code-block.BhybkLdE.js";import{a as Y,c as Z,r as R,b as ee,i as te,_ as oe,V as le,d as ae,e as ie,f as ne,g as se,h as re,j as de,k as ue,l as pe,m as fe}from"./vjsf.DSEJwSF5.js";import{V as me}from"./index.1vKKKPHo.js";import{V as ye}from"./index.C4FS8Yf8.js";import{m as ve,a as ce,u as Ve}from"./tag.CepiBBuP.js";import{m as xe,u as _e}from"./dimensions.XZPijtYM.js";import{m as be,I as ge,M as we,d as Oe}from"./VList.hrlsjIKn.js";import{V as ke}from"./index.elRQEzWh.js";import{V as je}from"./VContainer.DXQTvFIz.js";import{V as $e}from"./VSpacer.DtC6IDor.js";import{V as De}from"./VBtn.BPFCLns6.js";const Se={props:{content:{type:String,required:!0}}},Pe=["innerHTML"];function Te(e,t,i,p,r,d){return y(),w("div",{class:"markdown-block",innerHTML:e.$markdown(i.content)},null,8,Pe)}const et=L(Se,[["render",Te]]),Ce=q({modelValue:Boolean,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},...ve(),...xe(),...ce(),...be({transition:"fade-transition"})},"VLazy"),Ue=E()({name:"VLazy",directives:{intersect:ge},props:Ce(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:i}=t;const{dimensionStyles:p}=_e(e),r=N(e,"modelValue");function d(o){r.value||(r.value=o)}return Ve(()=>H(a(e.tag,{class:["v-lazy",e.class],style:[p.value,e.style]},{default:()=>[r.value&&a(we,{transition:e.transition,appear:!0},{default:()=>{var o;return[(o=i.default)==null?void 0:o.call(i)]}})]}),[[G("intersect"),{handler:d,options:e.options},null]])),{}}}),Le=ee,Me={modelRoot:"rootData",root:"rootData",model:"data",value:"data"},U=e=>e.match(/^[a-z.]*$/i)&&!["data","context","rootData","parent"].some(t=>e.startsWith(t+"."))?"rootData."+e:e,j=(e,t="js-eval")=>{let i=e,p=!0;i.includes("parent.value")&&(p=!1,i=i.replace(/parent\.value/g,"parent.data"));for(const[r,d]of Object.entries(Me))i=i.replace(new RegExp(`${r}\\.`,"g"),d+".");if(t==="js-eval"&&(i=U(i)),t==="js-tpl")for(const r of i.matchAll(/\{(.*?)\}/g))r[1]!=="q"&&(i=i.replace(r[0],"${"+U(r[1])+"}"));return i.includes("rootData")&&(p=!1),{type:t,expr:i,pure:p}},m=(e,t,i)=>{var p,r,d;if(e.$ref){const[o,s]=t(i,e.$ref);m(o,t,s)}if(!e.layout){const o={};if((e.separator||e["x-separator"])&&(o.separator=e.separator||e["x-separator"],delete e.separator,delete e["x-separator"]),e["x-display"]==="icon"&&(e.enum||(p=e.items)!=null&&p.enum)&&(o.getItems={itemIcon:e["x-itemIcon"]||"data.value"},delete e["x-display"]),e["x-display"]){let s=e["x-display"];s==="radio"&&(s="radio-group"),s==="checkbox"&&e.type!=="boolean"&&(s="checkbox-group"),s==="switch"&&e.type!=="boolean"&&(s="switch-group"),o.comp=s,delete e["x-display"]}if(e.format==="hexcolor"&&(o.comp="color-picker",delete e.format),e["x-props"]&&(o.props=e["x-props"],delete e["x-props"]),e["x-fromData"]&&(o.comp=o.comp??"select",o.getItems=j(e["x-fromData"]),delete e["x-fromData"]),e["x-if"]&&(o.if=j(e["x-if"]),delete e["x-if"]),e["x-fromUrl"]){const s=e["x-fromUrl"];o.getItems={url:j(s,"js-tpl")},delete e["x-fromUrl"]}o.getItems&&te(o.getItems)&&(e["x-itemKey"]&&(o.getItems.itemKey=`data["${e["x-itemKey"]}"]`),e["x-itemTitle"]&&(o.getItems.itemTitle=`data["${e["x-itemTitle"]}"]`),e["x-itemValue"]&&(o.getItems.itemValue=`data["${e["x-itemValue"]}"]`),e["x-itemIcon"]&&(o.getItems.itemIcon=`data["${e["x-itemIcon"]}"]`),e["x-itemsProp"]&&(o.getItems.itemsResults=`data["${e["x-itemsProp"]}"]`),delete e["x-itemKey"],delete e["x-itemTitle"],delete e["x-itemValue"],delete e["x-itemsProp"]),e["x-cols"]&&(o.cols=e["x-cols"]),Object.keys(o).length===1&&"comp"in o?e.layout=o.comp:Object.keys(o).length>0&&(e.layout=o)}if(e.properties)for(const o of Object.keys(e.properties))m(e.properties[o],t,i);if(e.allOf)for(const o of e.allOf)m(o,t,i);if(e.oneOf){if(!e.oneOfLayout){const o=Object.keys(((r=e.oneOf[0])==null?void 0:r.properties)||{}).find(s=>{var c;return!!((c=e.oneOf[0])!=null&&c.properties[s].const)});if(o){const s=(d=e.oneOf[0])==null?void 0:d.properties[o];s!=null&&s.title&&(e.oneOfLayout={label:s.title}),e.required&&Array.isArray(e.required)&&(e.required=e.required.filter(c=>c!==o))}}for(const o of e.oneOf)m(o,t,i)}if(e.anyOf)for(const o of e.anyOf)m(o,t,i);if(e.type==="array"&&e.items)if(Array.isArray(e.items))for(const o of e.items)m(o,t,i);else m(e.items,t,i);if(e.dependencies)for(const o of Object.keys(e.dependencies))m(e.dependencies[o],t,i);e.if&&(e.then&&m(e.then,t,i),e.else&&m(e.else,t,i))};function he(e,t,i="en"){let p=t;if(!p){const o={strict:!1,allErrors:!0},s=new Le(o);Y.default(s),p=s}const r=Z(e);r.$id=r.$id??"_jl";const d=R(r,p,i);return m(r,d,r.$id),r}const Ie={"custom-textarea":`
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
  </template>`},Ae={components:{Vjsf:oe,VContainer:je,VRow:le,VCol:ae,VSpacer:$e,VForm:ie,VBtn:De,VDivider:Oe,VSelect:ne,VSwitch:se,VToolbar:ye,VSheet:re,VWindow:de,VSlider:ue,VWindowItem:pe,VLazy:Ue,VDefaultsProvider:ke,VTextField:fe},props:{example:{type:Object,required:!0},v2:{type:Boolean,default:!1}},data:()=>({data:null,tab:null,stateTree:null,display:null,options:{readOnly:!1,summary:!1,density:"default",titleDepth:4,validateOn:"input",initialValidation:"withData",updateOn:"input",debounceInputMs:300,defaultOn:"empty",removeAdditional:"error",autofocus:!1,readOnlyPropertiesMode:"show",locale:"en",plugins:[me]},filledOptions:null,wrapperWidth:100,slotCodes:Ie,valid:null}),computed:{tabs(){var t;const e=[];return this.v2&&e.push({value:"schemaV2",title:"Schema V2"}),e.push({value:"schema",title:"Schema"}),e.push({value:"model",title:"Data"}),(t=this.example.codeSlots)!=null&&t.length&&e.push({value:"slots",title:"Slots"}),this.example.defaultProps&&e.push({value:"defaultProps",title:"Default props"}),e.push({value:"options",title:"Options"}),e},schema(){return this.v2?he(this.example.schema):this.example.schema},changeOption(e){return t=>{this.options={...this.options,[e]:t}}},validateColor(){return this.valid===!1?"error":this.valid===!0?"success":"default"}},created(){this.example.options&&Object.assign(this.options,this.example.options),this.example.data&&(this.data=JSON.parse(JSON.stringify(this.example.data)))},methods:{updateState(e){this.stateTree=e.stateTree,this.display=e.display,this.filledOptions=e.options},editExample(){localStorage.setItem("vjsf-editor-state",JSON.stringify({schema:this.schema,options:this.options,data:this.data})),this.$router.push("/editor")}}},ze={key:0,class:"text-caption ml-2"},Be=v("div",{class:"text-subtitle"}," Options filled with default values: ",-1),Fe=["value","onInput"];function Ke(e,t,i,p,r,d){const o=u("v-btn"),s=u("v-spacer"),c=u("v-toolbar"),O=u("v-divider"),V=X,x=u("v-window-item"),$=u("v-switch"),_=u("v-select"),M=u("v-slider"),D=u("v-col"),S=u("v-row"),h=u("v-window"),I=u("vjsf"),A=u("v-defaults-provider"),z=u("v-form"),B=u("v-lazy"),F=u("v-container"),K=u("v-sheet");return y(),b(K,{class:"my-6",border:"",rounded:"",color:"transparent"},{default:n(()=>[a(c,{density:"compact"},{default:n(()=>[(y(!0),w(T,null,C(d.tabs,l=>(y(),b(o,{key:l.value,class:"text-none font-weight-bold",size:"small",variant:"text",active:e.tab===l.value,onClick:P=>e.tab=e.tab===l.value?null:l.value},{default:n(()=>[g(f(l.title),1)]),_:2},1032,["active","onClick"]))),128)),a(s),a(o,{color:"primary",icon:"mdi-pencil",onClick:d.editExample},null,8,["onClick"])]),_:1}),a(O),e.tab?(y(),b(h,{key:0,modelValue:e.tab,"onUpdate:modelValue":t[8]||(t[8]=l=>e.tab=l),style:{height:"400px","overflow-y":"auto"}},{default:n(()=>[a(x,{value:"schemaV2",class:"ma-3"},{default:n(()=>[a(V,null,{default:n(()=>[v("pre",null,f(JSON.stringify(i.example.schema,null,2)),1)]),_:1})]),_:1}),a(x,{value:"schema",class:"ma-3"},{default:n(()=>[a(V,null,{default:n(()=>[v("pre",null,f(JSON.stringify(d.schema,null,2)),1)]),_:1})]),_:1}),a(x,{value:"model",class:"ma-3 fill-height"},{default:n(()=>[e.data!==null&&e.data!==void 0?(y(),b(V,{key:0},{default:n(()=>[v("pre",null,f(JSON.stringify(e.data,null,2)),1)]),_:1})):k("",!0)]),_:1}),a(x,{value:"slots",class:"ma-3"},{default:n(()=>[(y(!0),w(T,null,C(i.example.codeSlots,l=>(y(),b(V,{key:l},{default:n(()=>[v("pre",null,f(e.slotCodes[l]),1)]),_:2},1024))),128))]),_:1}),a(x,{value:"defaultProps",class:"ma-3"},{default:n(()=>[a(V,null,{default:n(()=>[v("pre",null,f(JSON.stringify(i.example.defaultProps,null,2)),1)]),_:1})]),_:1}),a(x,{value:"options",class:"ma-3",style:{height:"400px"}},{default:n(()=>[a(S,{style:{height:"400px"}},{default:n(()=>[a(D,null,{default:n(()=>[a($,{modelValue:e.options.readOnly,"onUpdate:modelValue":t[0]||(t[0]=l=>e.options.readOnly=l),label:"readOnly",color:"primary","hide-details":"",density:"compact"},null,8,["modelValue"]),a($,{modelValue:e.options.summary,"onUpdate:modelValue":t[1]||(t[1]=l=>e.options.summary=l),label:"summary",color:"primary","hide-details":"",density:"compact"},null,8,["modelValue"]),a(_,{modelValue:e.options.density,"onUpdate:modelValue":t[2]||(t[2]=l=>e.options.density=l),density:"compact","hide-details":"",label:"density",style:{"max-width":"300px"},items:["default","comfortable","compact"]},null,8,["modelValue"]),a(_,{modelValue:e.options.initialValidation,"onUpdate:modelValue":t[3]||(t[3]=l=>e.options.initialValidation=l),density:"compact","hide-details":"",label:"initialValidation",style:{"max-width":"300px"},items:["never","withData","always"]},null,8,["modelValue"]),a(_,{modelValue:e.options.validateOn,"onUpdate:modelValue":t[4]||(t[4]=l=>e.options.validateOn=l),density:"compact","hide-details":"",label:"validateOn",style:{"max-width":"300px"},items:["input","blur","submit"]},null,8,["modelValue"]),a(_,{modelValue:e.options.updateOn,"onUpdate:modelValue":t[5]||(t[5]=l=>e.options.updateOn=l),density:"compact","hide-details":"",label:"updateOn",style:{"max-width":"300px"},items:["input","blur"]},null,8,["modelValue"]),a(_,{modelValue:e.options.locale,"onUpdate:modelValue":t[6]||(t[6]=l=>e.options.locale=l),density:"compact","hide-details":"",label:"locale",style:{"max-width":"300px"},items:["en","fr"]},null,8,["modelValue"]),a(M,{modelValue:e.wrapperWidth,"onUpdate:modelValue":t[7]||(t[7]=l=>e.wrapperWidth=l),min:0,max:100,step:1,color:"primary",label:"container width",style:{"max-width":"500px"},"hide-details":"",density:"compact"},{append:n(()=>[g(f(e.wrapperWidth)+" % ",1)]),_:1},8,["modelValue"]),e.display?(y(),w("div",ze," width="+f(e.display.width)+"px, display="+f(e.display.name),1)):k("",!0)]),_:1}),a(O,{vertical:""}),a(D,{style:{height:"400px","overflow-y":"auto"}},{default:n(()=>[Be,a(V,null,{default:n(()=>[v("pre",null,f(JSON.stringify(e.filledOptions,null,2)),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])):k("",!0),a(O),a(F,{fluid:""},{default:n(()=>[a(B,{"min-height":120},{default:n(()=>[v("div",{style:Q(`width: ${e.wrapperWidth}%`)},[a(z,{ref:"form",modelValue:e.valid,"onUpdate:modelValue":t[11]||(t[11]=l=>e.valid=l)},{default:n(()=>[a(A,{defaults:i.example.defaultProps||{}},{default:n(()=>[J(e.$slots,"vjsf",{modelValue:e.data,options:e.options,updateState:d.updateState,updateModelValue:l=>e.data=l},()=>[a(I,{modelValue:e.data,"onUpdate:modelValue":t[9]||(t[9]=l=>e.data=l),schema:d.schema,options:e.options,"onUpdate:state":d.updateState},{"custom-textarea":n(({node:l,statefulLayout:P})=>[v("textarea",{value:l.data,style:{border:"1px solid red"},placeholder:"A custom textarea",onInput:W=>P.input(l,W.target.value)},null,40,Fe)]),"custom-message":n(({node:l})=>[g(" This message is defined in a slot (key="+f(l.key)+") ",1)]),_:1},8,["modelValue","schema","options","onUpdate:state"])])]),_:3},8,["defaults"]),a(S,{class:"ma-0"},{default:n(()=>[a(s),a(o,{color:d.validateColor,flat:"",class:"ma-2",onClick:t[10]||(t[10]=l=>e.$refs.form.validate())},{default:n(()=>[g(" Validate ")]),_:1},8,["color"])]),_:1})]),_:3},8,["modelValue"])],4)]),_:3})]),_:3})]),_:3})}const tt=L(Ae,[["render",Ke]]);export{et as _,tt as a};
