/* empty css        */import{m as A,a as ae,u as T}from"./DhGIs5ff.js";import{bj as E,bk as z,L as P,M as O,i,h as I,ab as N,X as ne,z as V,aO as be,bl as se,N as F,as as D,aj as _,r as x,R as j,ao as Se,a2 as Ve,Z as ke,ar as Ce,ad as le,aB as Pe,E as Me,bm as we,e as je,o as Ie,ay as Y,S as $e,aa as J,be as Le,Y as Ae,ac as Oe,bn as Be}from"./DxK5QV_v.js";import{V as De,e as Ne,f as xe,g as Ee}from"./BSsSwofs.js";import{m as _e,g as Te,M as ze}from"./BM4NCaxS.js";import{m as Fe,u as Ue}from"./BQI04MH9.js";import{w as X,x as Re,y as Ge}from"./CJpVtMeO.js";const ie=E.reduce((e,s)=>(e[s]={type:[Boolean,String,Number],default:!1},e),{}),ue=E.reduce((e,s)=>{const n="offset"+z(s);return e[n]={type:[String,Number],default:null},e},{}),oe=E.reduce((e,s)=>{const n="order"+z(s);return e[n]={type:[String,Number],default:null},e},{}),Z={col:Object.keys(ie),offset:Object.keys(ue),order:Object.keys(oe)};function Ke(e,s,n){let a=e;if(!(n==null||n===!1)){if(s){const l=s.replace(e,"");a+=`-${l}`}return e==="col"&&(a="v-"+a),e==="col"&&(n===""||n===!0)||(a+=`-${n}`),a.toLowerCase()}}const qe=["auto","start","end","center","baseline","stretch"],He=P({cols:{type:[Boolean,String,Number],default:!1},...ie,offset:{type:[String,Number],default:null},...ue,order:{type:[String,Number],default:null},...oe,alignSelf:{type:String,default:null,validator:e=>qe.includes(e)},...A(),...ae()},"VCol"),pt=O()({name:"VCol",props:He(),setup(e,s){let{slots:n}=s;const a=i(()=>{const l=[];let t;for(t in Z)Z[t].forEach(c=>{const h=e[c],b=Ke(t,c,h);b&&l.push(b)});const u=l.some(c=>c.startsWith("v-col-"));return l.push({"v-col":!u||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),l});return()=>{var l;return I(e.tag,{class:[a.value,e.class],style:e.style},(l=n.default)==null?void 0:l.call(n))}}}),U=["start","end","center"],re=["space-between","space-around","space-evenly"];function R(e,s){return E.reduce((n,a)=>{const l=e+z(a);return n[l]=s(),n},{})}const We=[...U,"baseline","stretch"],ce=e=>We.includes(e),de=R("align",()=>({type:String,default:null,validator:ce})),Ye=[...U,...re],fe=e=>Ye.includes(e),ve=R("justify",()=>({type:String,default:null,validator:fe})),Je=[...U,...re,"stretch"],ge=e=>Je.includes(e),ye=R("alignContent",()=>({type:String,default:null,validator:ge})),Q={align:Object.keys(de),justify:Object.keys(ve),alignContent:Object.keys(ye)},Xe={align:"align",justify:"justify",alignContent:"align-content"};function Ze(e,s,n){let a=Xe[e];if(n!=null){if(s){const l=s.replace(e,"");a+=`-${l}`}return a+=`-${n}`,a.toLowerCase()}}const Qe=P({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:ce},...de,justify:{type:String,default:null,validator:fe},...ve,alignContent:{type:String,default:null,validator:ge},...ye,...A(),...ae()},"VRow"),ht=O()({name:"VRow",props:Qe(),setup(e,s){let{slots:n}=s;const a=i(()=>{const l=[];let t;for(t in Q)Q[t].forEach(u=>{const c=e[u],h=Ze(t,u,c);h&&l.push(h)});return l.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),l});return()=>{var l;return I(e.tag,{class:["v-row",a.value,e.class],style:e.style},(l=n.default)==null?void 0:l.call(n))}}}),et={props:{layoutSlot:{type:Object,required:!0},node:{type:Object,required:!0},statefulLayout:{type:Object,required:!0},tag:{type:String,default:null}},render(){const e=this.tag??(X(this.layoutSlot)?"p":"div");if(X(this.layoutSlot))return I(e,this.layoutSlot.text);if(Re(this.layoutSlot))return I(e,{innerHTML:this.layoutSlot.markdown});if(Ge(this.layoutSlot))if(!this.statefulLayout.options.vjsfSlots[this.layoutSlot.name])console.error(`vjsf: layout references a code slot "${this.layoutSlot.name}" that was not provided.`);else return I(e,this.statefulLayout.options.vjsfSlots[this.layoutSlot.name]({node:this.node,statefulLayout:this.statefulLayout}));return null}},tt=P({text:String,onClick:N(),...A(),...ne()},"VLabel"),bt=O()({name:"VLabel",props:tt(),setup(e,s){let{slots:n}=s;return T(()=>{var a;return V("label",{class:["v-label",{"v-label--clickable":!!e.onClick},e.class],style:e.style,onClick:e.onClick},[e.text,(a=n.default)==null?void 0:a.call(n)])}),{}}});function at(e){const{t:s}=be();function n(a){let{name:l}=a;const t={prepend:"prependAction",prependInner:"prependAction",append:"appendAction",appendInner:"appendAction",clear:"clear"}[l],u=e[`onClick:${l}`],c=u&&t?s(`$vuetify.input.${t}`,e.label??""):void 0;return V(De,{icon:e[`${l}Icon`],"aria-label":c,onClick:u},null)}return{InputIcon:n}}const nt=P({focused:Boolean,"onUpdate:focused":N()},"focus");function St(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:se();const n=F(e,"focused"),a=i(()=>({[`${s}--focused`]:n.value}));function l(){n.value=!0}function t(){n.value=!1}return{focusClasses:a,isFocused:n,focus:l,blur:t}}const st=P({active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},...A(),..._e({transition:{component:Te,leaveAbsolute:!0,group:!0}})},"VMessages"),lt=O()({name:"VMessages",props:st(),setup(e,s){let{slots:n}=s;const a=i(()=>D(e.messages)),{textColorClasses:l,textColorStyles:t}=Ne(i(()=>e.color));return T(()=>V(ze,{transition:e.transition,tag:"div",class:["v-messages",l.value,e.class],style:[t.value,e.style],role:"alert","aria-live":"polite"},{default:()=>[e.active&&a.value.map((u,c)=>V("div",{class:"v-messages__message",key:`${c}-${a.value}`},[n.message?n.message({message:u}):u]))]})),{}}}),me=Symbol.for("vuetify:form"),Vt=P({disabled:Boolean,fastFail:Boolean,readonly:Boolean,modelValue:{type:Boolean,default:null},validateOn:{type:String,default:"input"}},"form");function kt(e){const s=F(e,"modelValue"),n=i(()=>e.disabled),a=i(()=>e.readonly),l=_(!1),t=x([]),u=x([]);async function c(){const d=[];let r=!0;u.value=[],l.value=!0;for(const f of t.value){const o=await f.validate();if(o.length>0&&(r=!1,d.push({id:f.id,errorMessages:o})),!r&&e.fastFail)break}return u.value=d,l.value=!1,{valid:r,errors:u.value}}function h(){t.value.forEach(d=>d.reset())}function b(){t.value.forEach(d=>d.resetValidation())}return j(t,()=>{let d=0,r=0;const f=[];for(const o of t.value)o.isValid===!1?(r++,f.push({id:o.id,errorMessages:o.errorMessages})):o.isValid===!0&&d++;u.value=f,s.value=r>0?!1:d===t.value.length?!0:null},{deep:!0,flush:"post"}),Se(me,{register:d=>{let{id:r,vm:f,validate:o,reset:k,resetValidation:M}=d;t.value.some(w=>w.id===r),t.value.push({id:r,validate:o,reset:k,resetValidation:M,vm:Ve(f),isValid:null,errorMessages:[]})},unregister:d=>{t.value=t.value.filter(r=>r.id!==d)},update:(d,r,f)=>{const o=t.value.find(k=>k.id===d);o&&(o.isValid=r,o.errorMessages=f)},isDisabled:n,isReadonly:a,isValidating:l,isValid:s,items:t,validateOn:ke(e,"validateOn")}),{errors:u,isDisabled:n,isReadonly:a,isValidating:l,isValid:s,items:t,validate:c,reset:h,resetValidation:b}}function it(){return Ce(me,null)}const ut=P({disabled:{type:Boolean,default:null},error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:{type:Boolean,default:null},rules:{type:Array,default:()=>[]},modelValue:null,validateOn:String,validationValue:null,...nt()},"validation");function ot(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:se(),n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:le();const a=F(e,"modelValue"),l=i(()=>e.validationValue===void 0?a.value:e.validationValue),t=it(),u=x([]),c=_(!0),h=i(()=>!!(D(a.value===""?null:a.value).length||D(l.value===""?null:l.value).length)),b=i(()=>!!(e.disabled??(t==null?void 0:t.isDisabled.value))),d=i(()=>!!(e.readonly??(t==null?void 0:t.isReadonly.value))),r=i(()=>{var g;return(g=e.errorMessages)!=null&&g.length?D(e.errorMessages).concat(u.value).slice(0,Math.max(0,+e.maxErrors)):u.value}),f=i(()=>{let g=(e.validateOn??(t==null?void 0:t.validateOn.value))||"input";g==="lazy"&&(g="input lazy");const p=new Set((g==null?void 0:g.split(" "))??[]);return{blur:p.has("blur")||p.has("input"),input:p.has("input"),submit:p.has("submit"),lazy:p.has("lazy")}}),o=i(()=>{var g;return e.error||(g=e.errorMessages)!=null&&g.length?!1:e.rules.length?c.value?u.value.length||f.value.lazy?null:!0:!u.value.length:!0}),k=_(!1),M=i(()=>({[`${s}--error`]:o.value===!1,[`${s}--dirty`]:h.value,[`${s}--disabled`]:b.value,[`${s}--readonly`]:d.value})),w=Pe("validation"),v=i(()=>e.name??Me(n));we(()=>{t==null||t.register({id:v.value,vm:w,validate:S,reset:y,resetValidation:m})}),je(()=>{t==null||t.unregister(v.value)}),Ie(async()=>{f.value.lazy||await S(!0),t==null||t.update(v.value,o.value,r.value)}),Y(()=>f.value.input,()=>{j(l,()=>{if(l.value!=null)S();else if(e.focused){const g=j(()=>e.focused,p=>{p||S(),g()})}})}),Y(()=>f.value.blur,()=>{j(()=>e.focused,g=>{g||S()})}),j([o,r],()=>{t==null||t.update(v.value,o.value,r.value)});async function y(){a.value=null,await $e(),await m()}async function m(){c.value=!0,f.value.lazy?u.value=[]:await S(!0)}async function S(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const p=[];k.value=!0;for(const $ of e.rules){if(p.length>=+(e.maxErrors??1))break;const C=await(typeof $=="function"?$:()=>$)(l.value);if(C!==!0){if(C!==!1&&typeof C!="string"){console.warn(`${C} is not a valid value. Rule functions must return boolean true or a string.`);continue}p.push(C||"")}}return u.value=p,k.value=!1,c.value=g,u.value}return{errorMessages:r,isDirty:h,isDisabled:b,isReadonly:d,isPristine:c,isValid:o,isValidating:k,reset:y,resetValidation:m,validate:S,validationClasses:M}}const rt=P({id:String,appendIcon:J,centerAffix:{type:Boolean,default:!0},prependIcon:J,hideDetails:[Boolean,String],hideSpinButtons:Boolean,hint:String,persistentHint:Boolean,messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},"onClick:prepend":N(),"onClick:append":N(),...A(),...xe(),...Le(Fe(),["maxWidth","minWidth","width"]),...ne(),...ut()},"VInput"),Ct=O()({name:"VInput",props:{...rt()},emits:{"update:modelValue":e=>!0},setup(e,s){let{attrs:n,slots:a,emit:l}=s;const{densityClasses:t}=Ee(e),{dimensionStyles:u}=Ue(e),{themeClasses:c}=Ae(e),{rtlClasses:h}=Oe(),{InputIcon:b}=at(e),d=le(),r=i(()=>e.id||`input-${d}`),f=i(()=>`${r.value}-messages`),{errorMessages:o,isDirty:k,isDisabled:M,isReadonly:w,isPristine:v,isValid:y,isValidating:m,reset:S,resetValidation:g,validate:p,validationClasses:$}=ot(e,"v-input",r),L=i(()=>({id:r,messagesId:f,isDirty:k,isDisabled:M,isReadonly:w,isPristine:v,isValid:y,isValidating:m,reset:S,resetValidation:g,validate:p})),C=i(()=>{var B;return(B=e.errorMessages)!=null&&B.length||!v.value&&o.value.length?o.value:e.hint&&(e.persistentHint||e.focused)?e.hint:e.messages});return T(()=>{var K,q,H,W;const B=!!(a.prepend||e.prependIcon),pe=!!(a.append||e.appendIcon),G=C.value.length>0,he=!e.hideDetails||e.hideDetails==="auto"&&(G||!!a.details);return V("div",{class:["v-input",`v-input--${e.direction}`,{"v-input--center-affix":e.centerAffix,"v-input--hide-spin-buttons":e.hideSpinButtons},t.value,c.value,h.value,$.value,e.class],style:[u.value,e.style]},[B&&V("div",{key:"prepend",class:"v-input__prepend"},[(K=a.prepend)==null?void 0:K.call(a,L.value),e.prependIcon&&V(b,{key:"prepend-icon",name:"prepend"},null)]),a.default&&V("div",{class:"v-input__control"},[(q=a.default)==null?void 0:q.call(a,L.value)]),pe&&V("div",{key:"append",class:"v-input__append"},[e.appendIcon&&V(b,{key:"append-icon",name:"append"},null),(H=a.append)==null?void 0:H.call(a,L.value)]),he&&V("div",{class:"v-input__details"},[V(lt,{id:f.value,active:G,messages:C.value},{message:a.message}),(W=a.details)==null?void 0:W.call(a,L.value)])])}),{reset:S,resetValidation:g,validate:p,isValid:y,errorMessages:o}}}),ee={fieldPropsCompact:{hideDetails:"auto"},fieldPropsReadOnly:{hideDetails:"auto",variant:"plain"},fieldPropsSummary:{hideDetails:!0}};function te(e){const s={class:[]};for(const n of e)if(n)for(const a of Object.keys(n))a==="class"?Array.isArray(n.class)?s.class=s.class.concat(n.class):s.class=[n.class]:s[Be(a)]=n[a];return s}function Pt(e,s,n={}){n.bindData===void 0&&(n.bindData=!0),n.isMainComp===void 0&&(n.isMainComp=!0);const a=i(()=>e.value.options),l=i(()=>e.value.skeleton),t=i(()=>e.value.layout),u=i(()=>e.value.data),c=i(()=>e.value.error),h=i(()=>e.value.validated),b=i(()=>e.value.props),d=i(()=>e.value.autofocus),r=i(()=>e.value.children),f=i(()=>typeof u.value=="string"&&t.value.separator?u.value.split(t.value.separator):u.value),o=x();j(f,v=>{o.value=v},{immediate:!0});const k=i(()=>{const v=[];a.value.density==="compact"&&v.push(ee.fieldPropsCompact),a.value.readOnly&&v.push(ee.fieldPropsReadOnly),n.isMainComp&&b.value&&v.push(b.value);const y=te(v);if(y.label=t.value.label,c.value&&h.value&&(y.errorMessages=c.value),a.value.readOnly&&(y.disabled=!0,y.class.push("vjsf-input--readonly")),d.value&&y.class.push("vjsf-input--autofocus"),n.layoutPropsMap)for(const m of n.layoutPropsMap)typeof m=="string"?m in t.value&&(y[m]=t.value[m]):m[1]in t.value&&(y[m[0]]=t.value[m[1]]);return n.bindData&&(y["onUpdate:modelValue"]=m=>{const S=Array.isArray(m)&&t.value.separator?m.join(t.value.separator):m;return o.value=S,s.input(e.value,S)}),y.onBlur=()=>s.blur(e.value),y}),M=i(()=>{const v=[{density:a.value.density}];return n.isMainComp&&v.push(t.value.props),te(v)}),w=i(()=>{if(!t.value.slots)return{};const v={};for(const[y,m]of Object.entries(t.value.slots))v[y]=()=>I(et,{layoutSlot:m,node:e.value,statefulLayout:s});return v});return{localData:o,inputProps:k,compProps:M,compSlots:w,options:a,skeleton:l,layout:t,data:u,children:r}}export{ht as V,et as _,pt as a,bt as b,Ct as c,St as d,at as e,rt as f,it as g,Vt as h,kt as i,nt as m,Pt as u};
