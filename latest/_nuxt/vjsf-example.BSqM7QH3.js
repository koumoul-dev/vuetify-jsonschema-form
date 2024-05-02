import{_ as C,t as m,v as g,N as B,O as F,Q as W,J as K,I as R,z as o,i as s,F as _,A as i,K as I,L as T,B as x,y as p,x as f,H as O,M as E,R as q}from"./entry.C6Eb3ZlI.js";import{_ as H}from"./code-block.CX2A8Yv7.js";import{a as G,c as Q,r as X,b as Y,i as Z,_ as ee,V as te,d as ae,e as le,f as oe,g as ie,h as se,j as ne,k as de,l as re,m as ue}from"./vjsf.dU-jyYZb.js";import{V as pe}from"./index.DTi2iJ_0.js";import{V as me}from"./index.NBeYj2EJ.js";import{m as fe,a as ve,u as ye}from"./tag.C0vrbNa3.js";import{m as ce,u as Ve,V as _e}from"./index.Cx8TLo-m.js";import{m as xe,I as ge,M as we,d as Oe}from"./VList.CCNdPX39.js";import{V as be}from"./VContainer.BFpLejlq.js";import{V as he}from"./VSpacer.TZy5_1hD.js";import{V as ke}from"./VBtn.CeQ2oUCU.js";const Se={props:{content:{type:String,required:!0}}},je=["innerHTML"];function Ie(e,l,t,d,n,r){return m(),g("div",{class:"markdown-block",innerHTML:e.$markdown(t.content)},null,8,je)}const Qe=C(Se,[["render",Ie]]),Te=B({modelValue:Boolean,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},...fe(),...ce(),...ve(),...xe({transition:"fade-transition"})},"VLazy"),Ce=F()({name:"VLazy",directives:{intersect:ge},props:Te(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const{dimensionStyles:d}=Ve(e),n=W(e,"modelValue");function r(u){n.value||(n.value=u)}return ye(()=>K(o(e.tag,{class:["v-lazy",e.class],style:[d.value,e.style]},{default:()=>[n.value&&o(we,{transition:e.transition,appear:!0},{default:()=>{var u;return[(u=t.default)==null?void 0:u.call(t)]}})]}),[[R("intersect"),{handler:r,options:e.options},null]])),{}}}),Pe=Y,v=e=>{var l;if(!e.layout){const t={};if((e.separator||e["x-separator"])&&(t.separator=e.separator||e["x-separator"],delete e.separator,delete e["x-separator"]),e["x-display"]==="icon"&&(e.enum||(l=e.items)!=null&&l.enum)&&(t.getItems={itemIcon:e["x-itemIcon"]||"data.value"},delete e["x-display"]),e["x-display"]&&(t.comp=e["x-display"],delete e["x-display"]),e.format==="hexcolor"&&(t.comp="color-picker",delete e.format),e["x-props"]&&(t.props=e["x-props"],delete e["x-props"]),e["x-fromData"]&&(t.comp="select",t.getItems={expr:e["x-fromData"]},delete e["x-fromData"]),e["x-fromUrl"]){let d=e["x-fromUrl"];for(const n of d.matchAll(/\{(.*?)\}/g))n[1]!=="q"&&(d=d.replace(n[0],"$"+n[0]));t.getItems={url:d},delete e["x-fromUrl"]}t.getItems&&Z(t.getItems)&&(e["x-itemKey"]&&(t.getItems.itemKey=`data["${e["x-itemKey"]}"]`),e["x-itemTitle"]&&(t.getItems.itemTitle=`data["${e["x-itemTitle"]}"]`),e["x-itemValue"]&&(t.getItems.itemValue=`data["${e["x-itemValue"]}"]`),e["x-itemIcon"]&&(t.getItems.itemIcon=`data["${e["x-itemIcon"]}"]`),e["x-itemsProp"]&&(t.getItems.itemsResults=`data["${e["x-itemsProp"]}"]`),delete e["x-itemKey"],delete e["x-itemTitle"],delete e["x-itemValue"],delete e["x-itemsProp"]),Object.keys(t).length===1&&"comp"in t?e.layout=t.comp:Object.keys(t).length>0&&(e.layout=t)}if(e.type==="object"){if(e.properties)for(const t of Object.keys(e.properties))v(e.properties[t]);if(e.allOf)for(const t of e.allOf)v(t);if(e.oneOf)for(const t of e.oneOf)v(t);if(e.anyOf)for(const t of e.anyOf)v(t)}if(e.type==="array"&&e.items)if(Array.isArray(e.items))for(const t of e.items)v(t);else v(e.items)};function Ue(e,l,t="en"){let d=l;if(!d){const r={strict:!1,allErrors:!0},u=new Pe(r);G.default(u),d=u}const n=Q(e);return n.$id=n.$id??"_jl",X(n,d,t),v(n),n}const $e={"custom-textarea":`
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
  </template>`},De={components:{Vjsf:ee,VContainer:be,VRow:te,VCol:ae,VSpacer:he,VForm:le,VBtn:ke,VDivider:Oe,VSelect:oe,VSwitch:ie,VToolbar:me,VSheet:se,VWindow:ne,VSlider:de,VWindowItem:re,VLazy:Ce,VDefaultsProvider:_e,VTextField:ue},props:{example:{type:Object,required:!0},v2:{type:Boolean,default:!1}},data:()=>({data:null,tab:null,stateTree:null,display:null,options:{readOnly:!1,summary:!1,density:"default",initialValidation:"withData",validateOn:"input",updateOn:"input",locale:"en",plugins:[pe]},filledOptions:null,wrapperWidth:100,slotCodes:$e,valid:null}),computed:{tabs(){var l;const e=[];return this.v2&&e.push({value:"schemaV2",title:"Schema V2"}),e.push({value:"schema",title:"Schema"}),e.push({value:"model",title:"Data"}),(l=this.example.codeSlots)!=null&&l.length&&e.push({value:"slots",title:"Slots"}),this.example.defaultProps&&e.push({value:"defaultProps",title:"Default props"}),e.push({value:"options",title:"Options"}),e},schema(){return this.v2?Ue(this.example.schema):this.example.schema},changeOption(e){return l=>{this.options={...this.options,[e]:l}}},validateColor(){return this.valid===!1?"error":this.valid===!0?"success":"default"}},created(){this.example.options&&Object.assign(this.options,this.example.options),this.example.data&&(this.data=JSON.parse(JSON.stringify(this.example.data)))},methods:{updateState(e){this.stateTree=e.stateTree,this.display=e.display,this.filledOptions=e.options},editExample(){localStorage.setItem("vjsf-editor-state",JSON.stringify({schema:this.schema,options:this.options,data:this.data})),this.$router.push("/editor")}}},Ne={key:0,class:"text-caption ml-2"},Le=f("div",{class:"text-subtitle"}," Options filled with default values: ",-1),Me=["value","onInput"];function ze(e,l,t,d,n,r){const u=s("v-btn"),b=s("v-spacer"),P=s("v-toolbar"),w=s("v-divider"),y=H,c=s("v-window-item"),h=s("v-switch"),V=s("v-select"),U=s("v-slider"),k=s("v-col"),S=s("v-row"),$=s("v-window"),D=s("vjsf"),N=s("v-defaults-provider"),L=s("v-form"),M=s("v-lazy"),z=s("v-container"),A=s("v-sheet");return m(),_(A,{class:"my-6",border:"",rounded:"",color:"transparent"},{default:i(()=>[o(P,{density:"compact"},{default:i(()=>[(m(!0),g(I,null,T(r.tabs,a=>(m(),_(u,{key:a.value,class:"text-none font-weight-bold",size:"small",variant:"text",active:e.tab===a.value,onClick:j=>e.tab=e.tab===a.value?null:a.value},{default:i(()=>[x(p(a.title),1)]),_:2},1032,["active","onClick"]))),128)),o(b),o(u,{color:"primary",icon:"mdi-pencil",onClick:r.editExample},null,8,["onClick"])]),_:1}),o(w),e.tab?(m(),_($,{key:0,modelValue:e.tab,"onUpdate:modelValue":l[8]||(l[8]=a=>e.tab=a),style:{height:"400px","overflow-y":"auto"}},{default:i(()=>[o(c,{value:"schemaV2",class:"ma-3"},{default:i(()=>[o(y,null,{default:i(()=>[f("pre",null,p(JSON.stringify(t.example.schema,null,2)),1)]),_:1})]),_:1}),o(c,{value:"schema",class:"ma-3"},{default:i(()=>[o(y,null,{default:i(()=>[f("pre",null,p(JSON.stringify(r.schema,null,2)),1)]),_:1})]),_:1}),o(c,{value:"model",class:"ma-3 fill-height"},{default:i(()=>[e.data!==null&&e.data!==void 0?(m(),_(y,{key:0},{default:i(()=>[f("pre",null,p(JSON.stringify(e.data,null,2)),1)]),_:1})):O("",!0)]),_:1}),o(c,{value:"slots",class:"ma-3"},{default:i(()=>[(m(!0),g(I,null,T(t.example.codeSlots,a=>(m(),_(y,{key:a},{default:i(()=>[f("pre",null,p(e.slotCodes[a]),1)]),_:2},1024))),128))]),_:1}),o(c,{value:"defaultProps",class:"ma-3"},{default:i(()=>[o(y,null,{default:i(()=>[f("pre",null,p(JSON.stringify(t.example.defaultProps,null,2)),1)]),_:1})]),_:1}),o(c,{value:"options",class:"ma-3",style:{height:"400px"}},{default:i(()=>[o(S,{style:{height:"400px"}},{default:i(()=>[o(k,null,{default:i(()=>[o(h,{modelValue:e.options.readOnly,"onUpdate:modelValue":l[0]||(l[0]=a=>e.options.readOnly=a),label:"readOnly",color:"primary","hide-details":"",density:"compact"},null,8,["modelValue"]),o(h,{modelValue:e.options.summary,"onUpdate:modelValue":l[1]||(l[1]=a=>e.options.summary=a),label:"summary",color:"primary","hide-details":"",density:"compact"},null,8,["modelValue"]),o(V,{modelValue:e.options.density,"onUpdate:modelValue":l[2]||(l[2]=a=>e.options.density=a),density:"compact","hide-details":"",label:"density",style:{"max-width":"300px"},items:["default","comfortable","compact"]},null,8,["modelValue"]),o(V,{modelValue:e.options.initialValidation,"onUpdate:modelValue":l[3]||(l[3]=a=>e.options.initialValidation=a),density:"compact","hide-details":"",label:"initialValidation",style:{"max-width":"300px"},items:["never","withData","always"]},null,8,["modelValue"]),o(V,{modelValue:e.options.validateOn,"onUpdate:modelValue":l[4]||(l[4]=a=>e.options.validateOn=a),density:"compact","hide-details":"",label:"validateOn",style:{"max-width":"300px"},items:["input","blur","submit"]},null,8,["modelValue"]),o(V,{modelValue:e.options.updateOn,"onUpdate:modelValue":l[5]||(l[5]=a=>e.options.updateOn=a),density:"compact","hide-details":"",label:"updateOn",style:{"max-width":"300px"},items:["input","blur"]},null,8,["modelValue"]),o(V,{modelValue:e.options.locale,"onUpdate:modelValue":l[6]||(l[6]=a=>e.options.locale=a),density:"compact","hide-details":"",label:"locale",style:{"max-width":"300px"},items:["en","fr"]},null,8,["modelValue"]),o(U,{modelValue:e.wrapperWidth,"onUpdate:modelValue":l[7]||(l[7]=a=>e.wrapperWidth=a),min:0,max:100,step:1,color:"primary",label:"container width",style:{"max-width":"500px"},"hide-details":"",density:"compact"},{append:i(()=>[x(p(e.wrapperWidth)+" % ",1)]),_:1},8,["modelValue"]),e.display?(m(),g("div",Ne," width="+p(e.display.width)+"px, display="+p(e.display.name),1)):O("",!0)]),_:1}),o(w,{vertical:""}),o(k,{style:{height:"400px","overflow-y":"auto"}},{default:i(()=>[Le,o(y,null,{default:i(()=>[f("pre",null,p(JSON.stringify(e.filledOptions,null,2)),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])):O("",!0),o(w),o(z,{fluid:""},{default:i(()=>[o(M,{"min-height":120},{default:i(()=>[f("div",{style:E(`width: ${e.wrapperWidth}%`)},[o(L,{ref:"form",modelValue:e.valid,"onUpdate:modelValue":l[11]||(l[11]=a=>e.valid=a)},{default:i(()=>[o(N,{defaults:t.example.defaultProps||{}},{default:i(()=>[q(e.$slots,"vjsf",{modelValue:e.data,options:e.options,updateState:r.updateState,updateModelValue:a=>e.data=a},()=>[o(D,{modelValue:e.data,"onUpdate:modelValue":l[9]||(l[9]=a=>e.data=a),schema:r.schema,options:e.options,"onUpdate:state":r.updateState},{"custom-textarea":i(({node:a,statefulLayout:j})=>[f("textarea",{value:a.data,style:{border:"1px solid red"},placeholder:"A custom textarea",onInput:J=>j.input(a,J.target.value)},null,40,Me)]),"custom-message":i(({node:a})=>[x(" This message is defined in a slot (key="+p(a.key)+") ",1)]),_:1},8,["modelValue","schema","options","onUpdate:state"])])]),_:3},8,["defaults"]),o(S,{class:"ma-0"},{default:i(()=>[o(b),o(u,{color:r.validateColor,flat:"",class:"ma-2",onClick:l[10]||(l[10]=a=>e.$refs.form.validate())},{default:i(()=>[x(" Validate ")]),_:1},8,["color"])]),_:1})]),_:3},8,["modelValue"])],4)]),_:3})]),_:3})]),_:3})}const Xe=C(De,[["render",ze]]);export{Qe as _,Xe as a};
