import{e as P,f as te,V as ae,d as O,a as ne,b as ie,g as L}from"./VList.DLW1Lv_e.js";import{m as I,u as w,a as se}from"./tag.DfXh_3Uk.js";import{O as A,S as de,z as a,N as F,T as k,K as m,U as le,V as oe,c as B,J as re,I as ue,t as o,F as _,A as r,G as i,v as y,L as D,B as N,y as c,x as u,H as ce}from"./entry.DoSmaqyO.js";import{c as x,a as H,b as j,V as C,d as me,m as fe,e as ve,f as he,g as pe,h as ye,i as ke,j as be,k as ge,R as Ve,l as _e,n as Ce,o as Ie,u as we,p as Ae,q as xe,r as Se,s as Te,t as Pe,v as Oe,L as Le,w as Be}from"./index.DgUvWx0I.js";import{u as De}from"./vue.f36acd1f.DHQGtKV6.js";import{e as Ne}from"./en.C2aea8f9.js";import{V as je}from"./VContainer.ClQQlKD8.js";import"./ssrBoot.COQZIVtp.js";/* empty css              */const Re=A()({name:"VCardActions",props:I(),setup(e,s){let{slots:n}=s;return de({VBtn:{slim:!0,variant:"text"}}),w(()=>{var t;return a("div",{class:["v-card-actions",e.class],style:e.style},[(t=n.default)==null?void 0:t.call(n)])}),{}}}),Fe=x("v-card-subtitle"),He=x("v-card-title"),Me=F({appendAvatar:String,appendIcon:k,prependAvatar:String,prependIcon:k,subtitle:[String,Number],title:[String,Number],...I(),...H()},"VCardItem"),ze=A()({name:"VCardItem",props:Me(),setup(e,s){let{slots:n}=s;return w(()=>{var v;const t=!!(e.prependAvatar||e.prependIcon),d=!!(t||n.prepend),f=!!(e.appendAvatar||e.appendIcon),b=!!(f||n.append),g=!!(e.title!=null||n.title),V=!!(e.subtitle!=null||n.subtitle);return a("div",{class:["v-card-item",e.class],style:e.style},[d&&a("div",{key:"prepend",class:"v-card-item__prepend"},[n.prepend?a(C,{key:"prepend-defaults",disabled:!t,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},n.prepend):a(m,null,[e.prependAvatar&&a(P,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&a(j,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),a("div",{class:"v-card-item__content"},[g&&a(He,{key:"title"},{default:()=>{var l;return[((l=n.title)==null?void 0:l.call(n))??e.title]}}),V&&a(Fe,{key:"subtitle"},{default:()=>{var l;return[((l=n.subtitle)==null?void 0:l.call(n))??e.subtitle]}}),(v=n.default)==null?void 0:v.call(n)]),b&&a("div",{key:"append",class:"v-card-item__append"},[n.append?a(C,{key:"append-defaults",disabled:!f,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},n.append):a(m,null,[e.appendIcon&&a(j,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&a(P,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),Ee=x("v-card-text"),$e=F({appendAvatar:String,appendIcon:k,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:k,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...me(),...I(),...H(),...fe(),...ve(),...he(),...pe(),...ye(),...ke(),...be(),...se(),...le(),...ge({variant:"elevated"})},"VCard"),qe=A()({name:"VCard",directives:{Ripple:Ve},props:$e(),setup(e,s){let{attrs:n,slots:t}=s;const{themeClasses:d}=oe(e),{borderClasses:f}=_e(e),{colorClasses:b,colorStyles:g,variantClasses:V}=Ce(e),{densityClasses:v}=Ie(e),{dimensionStyles:l}=we(e),{elevationClasses:M}=Ae(e),{loaderClasses:z}=xe(e),{locationStyles:E}=Se(e),{positionClasses:$}=Te(e),{roundedClasses:q}=Pe(e),h=Oe(e,n),J=B(()=>e.link!==!1&&h.isLink.value),p=B(()=>!e.disabled&&e.link!==!1&&(e.link||h.isClickable.value));return w(()=>{const G=J.value?"a":e.tag,K=!!(t.title||e.title!=null),U=!!(t.subtitle||e.subtitle!=null),Y=K||U,Q=!!(t.append||e.appendAvatar||e.appendIcon),W=!!(t.prepend||e.prependAvatar||e.prependIcon),X=!!(t.image||e.image),Z=Y||W||Q,ee=!!(t.text||e.text!=null);return re(a(G,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":p.value},d.value,f.value,b.value,v.value,M.value,z.value,$.value,q.value,V.value,e.class],style:[g.value,l.value,E.value,e.style],href:h.href.value,onClick:p.value&&h.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var S;return[X&&a("div",{key:"image",class:"v-card__image"},[t.image?a(C,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a(te,{key:"image-img",cover:!0,src:e.image},null)]),a(Le,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:t.loader}),Z&&a(ze,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:t.item,prepend:t.prepend,title:t.title,subtitle:t.subtitle,append:t.append}),ee&&a(Ee,{key:"text"},{default:()=>{var T;return[((T=t.text)==null?void 0:T.call(t))??e.text]}}),(S=t.default)==null?void 0:S.call(t),t.actions&&a(Re,null,{default:t.actions}),Be(p.value,"v-card")]}}),[[ue("ripple"),p.value&&e.ripple]])}),{}}}),Je=["textContent"],Ge={__name:"options-list",props:{options:{type:Array,required:!0}},setup(e){return(s,n)=>(o(),_(i(qe),{variant:"flat"},{default:r(()=>[a(i(ae),{lines:!1},{default:r(()=>[a(i(O)),(o(!0),y(m,null,D(e.options,t=>(o(),y(m,{key:t.key},[a(i(ne),{class:"my-2 px-2"},{default:r(()=>[a(i(ie),null,{default:r(()=>[N(c(t.key),1)]),_:2},1024),a(i(L),null,{default:r(()=>[N(c(t.description),1)]),_:2},1024),t.values?(o(),_(i(L),{key:0,class:"my-2"},{default:r(()=>[(o(!0),y(m,null,D(Object.keys(t.values),d=>(o(),y("p",{key:d,class:"pl-4"},[u("strong",null,c(d)+": ",1),u("span",{textContent:c(t.values[d])},null,8,Je)]))),128))]),_:2},1024)):ce("",!0)]),_:2},1024),a(i(O))],64))),128))]),_:1})]),_:1}))}},Ke=[{key:"ajv",description:"The Ajv instance to use, you should probably no overwrite this option and let Vjsf handle the Ajv instance."},{key:"ajvOptions",description:"Some options for the Ajv instance that will be created by default.",default:{allErrors:!0,strict:!1}},{key:"markdown",description:"A function that takes a string in markdown format and returns HTML code.",default:"A markdown-it instance render function"},{key:"markdownItOptions",description:"Some options for the markdown-it instance that will be created by default",default:{}},{key:"locale",description:"The locale of the form.",default:"en"},{key:"messages",description:"The locale messages. You wan overwrite only the key you want to change.",default:Ne}],Ue=[{key:"readOnly",description:"Render the form in read-only mode.",default:!1},{key:"summary",description:"Render the form in summary mode. In this mode some information may be omitted for the sake of information density and readability. Items in an editable array are rendered in this mode.",default:!1},{key:"density",description:"Matches the density concept of Material design.",default:"default",values:{default:"default",compact:"compact",comfortable:"comfortable"}},{key:"context",description:"A contextual data object that can be referenced in expressions",default:{}},{key:"titleDepth",description:"The depth of the section titles (an initial depth of 2 means that the first level of titles will be rendered as h2 tags)",default:2},{key:"validateOn",description:"Control the way form inputs are validated. It does not control the actual execution of a validation function (data is always validated as it changes), only the display of the validation errors to the users.",default:"input",values:{input:"Validate a form input as soon as the user used it to input some data.",blur:"Validate a form input when the user interacts with it then leaves it.",submit:"Validate the form inputs only when the form is submitted."}},{key:"initialValidation",description:'This option complements "validateOn". It controls the validation of form inputs when the form is initialized.',default:"withData",values:{never:"Form inputs are never validated at initialization.",always:"Form inputs are always validated at initialization",withData:"Only the inputs with data at initialization are validated."}},{key:"defaultOn",description:"Control the use of default values in the form.",default:"empty",values:{never:"Never use the default data.",missing:"The default data is used when the property if not defined in the data.",empty:"The default data is used when the property is either undefined of defined but empty (empty string, empty object, etc.)."}},{key:"removeAdditional",description:"Control the way additional data is managed (data that is present in the model but not defined by the schema).",default:"error",values:{true:'Remove all additional properties (alias "unknown").',error:"Remove additional properties that cause a validation error.",false:'Never remove additional properties (alias "none").'}},{key:"autofocus",description:"Activate autofocus. The focus will be given to the first input of the form.",default:!1},{key:"readOnlyPropertiesMode",description:"Control the way readOnly properties from the schema are managed.",default:"show",values:{remove:"Hide the readOnly properties and remove them from the data.",hide:"Hide the readOnly properties but keep them in the data.",show:"Show the readOnly properties."}}],Ye=[...Ke],Qe=[...Ue],We=u("h2",{class:"text-h4 mb-6"}," Compile options ",-1),Xe=u("p",{class:"mb-6"}," These options can only be used at compile time, they cannot be overwritten at runtime or in the intermediate levels of the schema ",-1),Ze=u("h2",{class:"text-h4 my-6"}," Runtime options ",-1),et=u("p",{class:"mb-6"}," These options can be used both at compile time and at runtime, and they can be overwritten in intermediate levels of the schema using `layout.options`. ",-1),R="Configuration",ut={__name:"configuration",setup(e){return De({title:"VJSF - "+R}),(s,n)=>{const t=Ge;return o(),_(i(je),null,{default:r(()=>[u("h1",{class:"text-h2 mb-8"},c(R)),We,Xe,a(t,{options:i(Ye)},null,8,["options"]),Ze,et,a(t,{options:i(Qe)},null,8,["options"])]),_:1})}}};export{ut as default};
