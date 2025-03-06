/* empty css        */import{m as te,a as j,u as _,b as be,c as Se}from"./mDfEz_Ao.js";import{R as $,S as P,j as u,h as I,bp as E,bq as T,z as b,a1 as ne,aE as O,aU as Ve,aI as ke,br as se,T as F,aM as A,a6 as Ce,a8 as x,r as B,V as w,aq as Pe,N as Me,O as we,av as le,al as Ie,E as je,bd as $e,e as De,o as Le,ag as Y,Y as Ae,a0 as Oe,as as Be,aD as Ee,aF as J,bs as Ne}from"./BQ4DIMAD.js";import{a as xe,k as _e,n as Te,l as Fe}from"./LYhvEHL8.js";import{M as ze,m as Re,f as Ue}from"./EKIVRTgg.js";import{B as Q,C as Ke,D as Ge}from"./B8C66oTJ.js";const ie=E.reduce((e,s)=>(e[s]={type:[Boolean,String,Number],default:!1},e),{}),ue=E.reduce((e,s)=>{const n="offset"+T(s);return e[n]={type:[String,Number],default:null},e},{}),oe=E.reduce((e,s)=>{const n="order"+T(s);return e[n]={type:[String,Number],default:null},e},{}),X={col:Object.keys(ie),offset:Object.keys(ue),order:Object.keys(oe)};function qe(e,s,n){let t=e;if(!(n==null||n===!1)){if(s){const i=s.replace(e,"");t+=`-${i}`}return e==="col"&&(t="v-"+t),e==="col"&&(n===""||n===!0)||(t+=`-${n}`),t.toLowerCase()}}const He=["auto","start","end","center","baseline","stretch"],We=P({cols:{type:[Boolean,String,Number],default:!1},...ie,offset:{type:[String,Number],default:null},...ue,order:{type:[String,Number],default:null},...oe,alignSelf:{type:String,default:null,validator:e=>He.includes(e)},...j(),...te()},"VCol"),ha=$()({name:"VCol",props:We(),setup(e,s){let{slots:n}=s;const t=u(()=>{const i=[];let a;for(a in X)X[a].forEach(v=>{const p=e[v],g=qe(a,v,p);g&&i.push(g)});const o=i.some(v=>v.startsWith("v-col-"));return i.push({"v-col":!o||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),i});return()=>{var i;return I(e.tag,{class:[t.value,e.class],style:e.style},(i=n.default)==null?void 0:i.call(n))}}}),z=["start","end","center"],re=["space-between","space-around","space-evenly"];function R(e,s){return E.reduce((n,t)=>{const i=e+T(t);return n[i]=s(),n},{})}const Ye=[...z,"baseline","stretch"],ce=e=>Ye.includes(e),de=R("align",()=>({type:String,default:null,validator:ce})),Je=[...z,...re],fe=e=>Je.includes(e),ve=R("justify",()=>({type:String,default:null,validator:fe})),Qe=[...z,...re,"stretch"],ge=e=>Qe.includes(e),ye=R("alignContent",()=>({type:String,default:null,validator:ge})),Z={align:Object.keys(de),justify:Object.keys(ve),alignContent:Object.keys(ye)},Xe={align:"align",justify:"justify",alignContent:"align-content"};function Ze(e,s,n){let t=Xe[e];if(n!=null){if(s){const i=s.replace(e,"");t+=`-${i}`}return t+=`-${n}`,t.toLowerCase()}}const ea=P({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:ce},...de,justify:{type:String,default:null,validator:fe},...ve,alignContent:{type:String,default:null,validator:ge},...ye,...j(),...te()},"VRow"),pa=$()({name:"VRow",props:ea(),setup(e,s){let{slots:n}=s;const t=u(()=>{const i=[];let a;for(a in Z)Z[a].forEach(o=>{const v=e[o],p=Ze(a,o,v);p&&i.push(p)});return i.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),i});return()=>{var i;return I(e.tag,{class:["v-row",t.value,e.class],style:e.style},(i=n.default)==null?void 0:i.call(n))}}}),aa={props:{layoutSlot:{type:Object,required:!0},node:{type:Object,required:!0},statefulLayout:{type:Object,required:!0},tag:{type:String,default:null}},render(){const e=this.tag??(Q(this.layoutSlot)?"p":"div");if(Q(this.layoutSlot))return I(e,this.layoutSlot.text);if(Ke(this.layoutSlot))return I(e,{innerHTML:this.layoutSlot.markdown});if(Ge(this.layoutSlot))if(!this.statefulLayout.options.vjsfSlots[this.layoutSlot.name])console.error(`vjsf: layout references a code slot "${this.layoutSlot.name}" that was not provided.`);else{const s={node:this.node,statefulLayout:this.statefulLayout};return this.layoutSlot.props&&Object.assign(s,this.layoutSlot.props),I(e,this.statefulLayout.options.vjsfSlots[this.layoutSlot.name](s))}return null}},ta=P({text:String,onClick:O(),...j(),...ne()},"VLabel"),ba=$()({name:"VLabel",props:ta(),setup(e,s){let{slots:n}=s;return _(()=>{var t;return b("label",{class:["v-label",{"v-label--clickable":!!e.onClick},e.class],style:e.style,onClick:e.onClick},[e.text,(t=n.default)==null?void 0:t.call(n)])}),{}}});function na(e){const{t:s}=Ve();function n(t){let{name:i}=t;const a={prepend:"prependAction",prependInner:"prependAction",append:"appendAction",appendInner:"appendAction",clear:"clear"}[i],o=e[`onClick:${i}`];function v(g){g.key!=="Enter"&&g.key!==" "||(g.preventDefault(),g.stopPropagation(),ke(o,new PointerEvent("click",g)))}const p=o&&a?s(`$vuetify.input.${a}`,e.label??""):void 0;return b(xe,{icon:e[`${i}Icon`],"aria-label":p,onClick:o,onKeydown:v},null)}return{InputIcon:n}}const sa=P({focused:Boolean,"onUpdate:focused":O()},"focus");function Sa(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:se();const n=F(e,"focused"),t=u(()=>({[`${s}--focused`]:n.value}));function i(){n.value=!0}function a(){n.value=!1}return{focusClasses:t,isFocused:n,focus:i,blur:a}}const la=P({active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},...j(),...Re({transition:{component:Ue,leaveAbsolute:!0,group:!0}})},"VMessages"),ia=$()({name:"VMessages",props:la(),setup(e,s){let{slots:n}=s;const t=u(()=>A(e.messages)),{textColorClasses:i,textColorStyles:a}=_e(u(()=>e.color));return _(()=>b(ze,{transition:e.transition,tag:"div",class:["v-messages",i.value,e.class],style:[a.value,e.style]},{default:()=>[e.active&&t.value.map((o,v)=>b("div",{class:"v-messages__message",key:`${v}-${t.value}`},[n.message?n.message({message:o}):o]))]})),{}}}),me=Symbol.for("vuetify:form"),Va=P({disabled:Boolean,fastFail:Boolean,readonly:Boolean,modelValue:{type:Boolean,default:null},validateOn:{type:String,default:"input"}},"form");function ka(e){const s=F(e,"modelValue"),n=u(()=>e.disabled),t=u(()=>e.readonly),i=x(!1),a=B([]),o=B([]);async function v(){const r=[];let c=!0;o.value=[],i.value=!0;for(const h of a.value){const f=await h.validate();if(f.length>0&&(c=!1,r.push({id:h.id,errorMessages:f})),!c&&e.fastFail)break}return o.value=r,i.value=!1,{valid:c,errors:o.value}}function p(){a.value.forEach(r=>r.reset())}function g(){a.value.forEach(r=>r.resetValidation())}return w(a,()=>{let r=0,c=0;const h=[];for(const f of a.value)f.isValid===!1?(c++,h.push({id:f.id,errorMessages:f.errorMessages})):f.isValid===!0&&r++;o.value=h,s.value=c>0?!1:r===a.value.length?!0:null},{deep:!0,flush:"post"}),Pe(me,{register:r=>{let{id:c,vm:h,validate:f,reset:V,resetValidation:S}=r;a.value.some(C=>C.id===c),a.value.push({id:c,validate:f,reset:V,resetValidation:S,vm:we(h),isValid:null,errorMessages:[]})},unregister:r=>{a.value=a.value.filter(c=>c.id!==r)},update:(r,c,h)=>{const f=a.value.find(V=>V.id===r);f&&(f.isValid=c,f.errorMessages=h)},isDisabled:n,isReadonly:t,isValidating:i,isValid:s,items:a,validateOn:Me(e,"validateOn")}),{errors:o,isDisabled:n,isReadonly:t,isValidating:i,isValid:s,items:a,validate:v,reset:p,resetValidation:g}}function ua(e){const s=Ce(me,null);return{...s,isReadonly:u(()=>!!((e==null?void 0:e.readonly)??(s==null?void 0:s.isReadonly.value))),isDisabled:u(()=>!!((e==null?void 0:e.disabled)??(s==null?void 0:s.isDisabled.value)))}}const oa=P({disabled:{type:Boolean,default:null},error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:{type:Boolean,default:null},rules:{type:Array,default:()=>[]},modelValue:null,validateOn:String,validationValue:null,...sa()},"validation");function ra(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:se(),n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:le();const t=F(e,"modelValue"),i=u(()=>e.validationValue===void 0?t.value:e.validationValue),a=ua(e),o=B([]),v=x(!0),p=u(()=>!!(A(t.value===""?null:t.value).length||A(i.value===""?null:i.value).length)),g=u(()=>{var l;return(l=e.errorMessages)!=null&&l.length?A(e.errorMessages).concat(o.value).slice(0,Math.max(0,+e.maxErrors)):o.value}),r=u(()=>{var k;let l=(e.validateOn??((k=a.validateOn)==null?void 0:k.value))||"input";l==="lazy"&&(l="input lazy"),l==="eager"&&(l="input eager");const m=new Set((l==null?void 0:l.split(" "))??[]);return{input:m.has("input"),blur:m.has("blur")||m.has("input")||m.has("invalid-input"),invalidInput:m.has("invalid-input"),lazy:m.has("lazy"),eager:m.has("eager")}}),c=u(()=>{var l;return e.error||(l=e.errorMessages)!=null&&l.length?!1:e.rules.length?v.value?o.value.length||r.value.lazy?null:!0:!o.value.length:!0}),h=x(!1),f=u(()=>({[`${s}--error`]:c.value===!1,[`${s}--dirty`]:p.value,[`${s}--disabled`]:a.isDisabled.value,[`${s}--readonly`]:a.isReadonly.value})),V=Ie("validation"),S=u(()=>e.name??je(n));$e(()=>{var l;(l=a.register)==null||l.call(a,{id:S.value,vm:V,validate:d,reset:C,resetValidation:y})}),De(()=>{var l;(l=a.unregister)==null||l.call(a,S.value)}),Le(async()=>{var l;r.value.lazy||await d(!r.value.eager),(l=a.update)==null||l.call(a,S.value,c.value,g.value)}),Y(()=>r.value.input||r.value.invalidInput&&c.value===!1,()=>{w(i,()=>{if(i.value!=null)d();else if(e.focused){const l=w(()=>e.focused,m=>{m||d(),l()})}})}),Y(()=>r.value.blur,()=>{w(()=>e.focused,l=>{l||d()})}),w([c,g],()=>{var l;(l=a.update)==null||l.call(a,S.value,c.value,g.value)});async function C(){t.value=null,await Ae(),await y()}async function y(){v.value=!0,r.value.lazy?o.value=[]:await d(!r.value.eager)}async function d(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const m=[];h.value=!0;for(const k of e.rules){if(m.length>=+(e.maxErrors??1))break;const M=await(typeof k=="function"?k:()=>k)(i.value);if(M!==!0){if(M!==!1&&typeof M!="string"){console.warn(`${M} is not a valid value. Rule functions must return boolean true or a string.`);continue}m.push(M||"")}}return o.value=m,h.value=!1,v.value=l,o.value}return{errorMessages:g,isDirty:p,isDisabled:a.isDisabled,isReadonly:a.isReadonly,isPristine:v,isValid:c,isValidating:h,reset:C,resetValidation:y,validate:d,validationClasses:f}}const ca=P({id:String,appendIcon:J,centerAffix:{type:Boolean,default:!0},prependIcon:J,hideDetails:[Boolean,String],hideSpinButtons:Boolean,hint:String,persistentHint:Boolean,messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},"onClick:prepend":O(),"onClick:append":O(),...j(),...Fe(),...Ee(Se(),["maxWidth","minWidth","width"]),...ne(),...oa()},"VInput"),Ca=$()({name:"VInput",props:{...ca()},emits:{"update:modelValue":e=>!0},setup(e,s){let{attrs:n,slots:t,emit:i}=s;const{densityClasses:a}=Te(e),{dimensionStyles:o}=be(e),{themeClasses:v}=Oe(e),{rtlClasses:p}=Be(),{InputIcon:g}=na(e),r=le(),c=u(()=>e.id||`input-${r}`),h=u(()=>`${c.value}-messages`),{errorMessages:f,isDirty:V,isDisabled:S,isReadonly:C,isPristine:y,isValid:d,isValidating:l,reset:m,resetValidation:k,validate:N,validationClasses:M}=ra(e,"v-input",c),D=u(()=>({id:c,messagesId:h,isDirty:V,isDisabled:S,isReadonly:C,isPristine:y,isValid:d,isValidating:l,reset:m,resetValidation:k,validate:N})),U=u(()=>{var L;return(L=e.errorMessages)!=null&&L.length||!y.value&&f.value.length?f.value:e.hint&&(e.persistentHint||e.focused)?e.hint:e.messages});return _(()=>{var G,q,H,W;const L=!!(t.prepend||e.prependIcon),he=!!(t.append||e.appendIcon),K=U.value.length>0,pe=!e.hideDetails||e.hideDetails==="auto"&&(K||!!t.details);return b("div",{class:["v-input",`v-input--${e.direction}`,{"v-input--center-affix":e.centerAffix,"v-input--hide-spin-buttons":e.hideSpinButtons},a.value,v.value,p.value,M.value,e.class],style:[o.value,e.style]},[L&&b("div",{key:"prepend",class:"v-input__prepend"},[(G=t.prepend)==null?void 0:G.call(t,D.value),e.prependIcon&&b(g,{key:"prepend-icon",name:"prepend"},null)]),t.default&&b("div",{class:"v-input__control"},[(q=t.default)==null?void 0:q.call(t,D.value)]),he&&b("div",{key:"append",class:"v-input__append"},[e.appendIcon&&b(g,{key:"append-icon",name:"append"},null),(H=t.append)==null?void 0:H.call(t,D.value)]),pe&&b("div",{id:h.value,class:"v-input__details",role:"alert","aria-live":"polite"},[b(ia,{active:K,messages:U.value},{message:t.message}),(W=t.details)==null?void 0:W.call(t,D.value)])])}),{reset:m,resetValidation:k,validate:N,isValid:d,errorMessages:f}}}),ee={fieldPropsCompact:{hideDetails:"auto"},fieldPropsReadOnly:{hideDetails:"auto",variant:"plain"}};function ae(e){const s={class:[]};for(const n of e)if(n)for(const t of Object.keys(n))t==="class"?Array.isArray(n.class)?s.class=s.class.concat(n.class):s.class=[n.class]:s[Ne(t)]=n[t];return s}function Pa(e,s,n={}){n.bindData===void 0&&(n.bindData=!0),n.isMainComp===void 0&&(n.isMainComp=!0);const t=u(()=>e.value.options),i=u(()=>e.value.skeleton),a=u(()=>e.value.layout),o=u(()=>e.value.data),v=u(()=>e.value.error),p=u(()=>e.value.validated),g=u(()=>e.value.props),r=u(()=>e.value.autofocus),c=u(()=>e.value.children),h=u(()=>typeof o.value=="string"&&a.value.separator?o.value.split(a.value.separator):o.value),f=B();w(h,y=>{f.value=y},{immediate:!0});const V=u(()=>{const y=[];t.value.density==="compact"&&y.push(ee.fieldPropsCompact),t.value.readOnly&&y.push(ee.fieldPropsReadOnly),n.isMainComp&&g.value&&y.push(g.value);const d=ae(y);if(d.label=a.value.label,d.hint=a.value.hint,v.value&&p.value&&(d.errorMessages=v.value),t.value.readOnly&&(d.disabled=!0,d.class.push("vjsf-input--readonly")),r.value&&d.class.push("vjsf-input--autofocus"),n.layoutPropsMap)for(const l of n.layoutPropsMap)typeof l=="string"?l in a.value&&(d[l]=a.value[l]):l[1]in a.value&&(d[l[0]]=a.value[l[1]]);return n.bindData&&(d["onUpdate:modelValue"]=l=>{const m=Array.isArray(l)&&a.value.separator?l.join(a.value.separator):l;return f.value=m,s.input(e.value,m)}),d.onBlur=()=>s.blur(e.value),d}),S=u(()=>{const y=[{density:t.value.density}];return n.isMainComp&&y.push(a.value.props),ae(y)}),C=u(()=>{if(!a.value.slots)return{};const y={};for(const[d,l]of Object.entries(a.value.slots))y[d]=()=>I(aa,{layoutSlot:l,node:e.value,statefulLayout:s});return y});return{localData:f,inputProps:V,compProps:S,compSlots:C,options:t,skeleton:i,layout:a,data:o,children:c}}export{ha as V,aa as _,pa as a,ba as b,Ca as c,Sa as d,na as e,ca as f,ua as g,ka as h,Va as i,sa as m,Pa as u};
