const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./D7VCcQ-L.js","./BosuxZz1.js","./n9uOD1Gl.js","./entry.C_wqPJpf.css"])))=>i.map(i=>d[i]);
import{d as z,r as F,M as K,i as V,aO as Q,h as m,o as J,aM as W,ac as w,aP as Y,N as X,aQ as b,aR as H,O as L,S as $}from"./n9uOD1Gl.js";import{u as ee,V as oe,a as te,b as re}from"./Ds8oC_zk.js";import{u as ae}from"./D5xCrpn3.js";/* empty css        */import{m as E,c as S}from"./BNNbKEFv.js";const ne={name:"markdown",shouldDebounce:!0,emitsBlur:!0,focusable:!0},c=e=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="${e}" /></svg>`,p=z({props:{modelValue:{type:Object,required:!0},statefulLayout:{type:Object,required:!0}},setup(e,{expose:l}){ae({},"VjsfMarkdown");const o=F(null),{inputProps:n,compSlots:r,localData:i}=ee(K(e.modelValue),e.statefulLayout),v=V(()=>i.value&&Q.parse(i.value)),u=V(()=>{const a={...r.value};return a.default=()=>{const t=[m(oe,{text:n.value.label}),m("textarea",{ref:o})];return e.modelValue.options.summary&&t.push(m("div",{innerHTML:v.value})),m("div",{class:"vjsf-node-markdown-content"},t)},a});let f=null,s=null;const y=async()=>{if(e.modelValue.options.readOnly)return;if(!o.value)throw new Error("component was not mounted for markdown editor");const a=(await Y(async()=>{const{default:U}=await import("./D7VCcQ-L.js").then(q=>q.e);return{default:U}},__vite__mapDeps([0,1,2,3]),import.meta.url)).default,t=e.modelValue.messages,g=e.modelValue.options.pluginsOptions.markdown,d={...g==null?void 0:g.icons,formatBold:"M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z",formatItalic:"M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z",formatTitle:"M5,4V7H10.5V19H13.5V7H19V4H5Z",formatQuoteOpen:"M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z",formatListBulleted:"M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z",formatListNumbered:"M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z",link:"M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z",image:"M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z",table:"M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z",eye:"M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",undo:"M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z",redo:"M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z",helpCircle:"M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"},G={element:o.value,initialValue:e.modelValue.data??"",renderingConfig:{},status:!1,autoDownloadFontAwesome:!1,spellChecker:!1,minHeight:"300px",insertTexts:{link:[t.mdeLink1,t.mdeLink2],image:[t.mdeImg1,t.mdeImg2],table:[t.mdeTable1,t.mdeTable2],horizontalRule:["",`

-----

`]},toolbar:[{name:"bold",action:a.toggleBold,icon:c(d.formatBold),title:t.bold},{name:"italic",action:a.toggleItalic,icon:c(d.formatItalic),title:t.italic},{name:"heading",action:a.toggleHeadingSmaller,icon:c(d.formatTitle),title:t.heading},"|",{name:"quote",action:a.toggleBlockquote,icon:c(d.formatQuoteOpen),title:t.quote},{name:"unordered-list",action:a.toggleUnorderedList,icon:c(d.formatListBulleted),title:t.unorderedList},{name:"ordered-list",action:a.toggleOrderedList,icon:c(d.formatListNumbered),title:t.orderedList},"|",{name:"link",action:a.drawLink,icon:c(d.link),title:t.createLink},{name:"image",action:a.drawImage,icon:c(d.image),title:t.insertImage},{name:"table",action:a.drawTable,icon:c(d.table),title:t.createTable},"|",{name:"preview",action:a.togglePreview,icon:c(d.eye),className:"text-accent",title:t.preview,noDisable:!0},"|",{name:"undo",action:a.undo,icon:c(d.undo),title:t.undo,noDisable:!0},{name:"redo",action:a.redo,icon:c(d.redo),title:t.redo,noDisable:!0},"|",{name:"guide",action:"https://simplemde.com/markdown-guide",icon:c(d.helpCircle),className:"text-success",title:t.mdeGuide,noDisable:!0}],...g==null?void 0:g.easyMDEOptions};s&&s.toTextArea(),s=new a(G);let k=!1;s.codemirror.on("change",()=>{k=!0,s&&e.statefulLayout.input(e.modelValue,s.value())}),s.codemirror.on("blur",()=>{f=setTimeout(()=>{k&&e.statefulLayout.blur(e.modelValue),k=!1},500)}),s.codemirror.on("focus",()=>{f&&clearTimeout(f)}),e.modelValue.autofocus&&s.codemirror.focus()};J(y),W(()=>{s&&s.toTextArea()}),w(()=>i,()=>{s&&s.value()!==(i.value??"")&&s.value(i.value??"")}),w(()=>[e.modelValue.options.readOnly,e.modelValue.messages,e.modelValue.options.easyMDEOptions],(a,t)=>{(a[0]!==t[0]||a[1]!==t[1]||a[2]!==t[2])&&y()});const B=te(),R=V(()=>le(B));return()=>[m("style",{innerHTML:R.value}),m(re,n.value,u.value)]}}),le=e=>`
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .CodeMirror {
    color: white;
    border-color: ${e.current.value.variables["border-color"]};
    background-color: ${e.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .cm-s-easymde .CodeMirror-cursor {
    border-color: white;
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-cursor {
    border-left:1px solid white;
    border-right:none;width:0;
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .editor-toolbar > * {
    border-color: ${e.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .editor-toolbar {
    border-top: 1px solid ${e.current.value.variables["border-color"]};
    border-left: 1px solid ${e.current.value.variables["border-color"]};
    border-right: 1px solid ${e.current.value.variables["border-color"]};
}
.vjsf-node-markdown.vjsf-dark .editor-toolbar i.separator {
    border-left: 1px solid ${e.current.value.variables["border-color"]};
    border-right: 1px solid ${e.current.value.variables["border-color"]};
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .editor-toolbar > .active, .editor-toolbar > button:hover, .editor-preview pre, .cm-s-easymde .cm-comment {
    background-color: ${e.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .CodeMirror-fullscreen {
    background: ${e.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .editor-toolbar.fullscreen {
    background: ${e.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .editor-preview {
    background: ${e.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .editor-preview-side {
    border-color: ${e.current.value.variables["border-color"]};
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-selected {
    background: ${e.current.value.colors.secondary};
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-focused .CodeMirror-selected {
    background: ${e.current.value.colors.secondary};
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection {
    background:${e.current.value.colors.secondary}
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection {
    background:${e.current.value.colors.secondary}
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .CodeMirror-focused .CodeMirror-selected {
    background: ${e.current.value.colors.secondary}
}
  `;X(p);const Me={info:ne,nodeComponent:p},h=b.reduce((e,l)=>(e[l]={type:[Boolean,String,Number],default:!1},e),{}),N=b.reduce((e,l)=>{const o="offset"+H(l);return e[o]={type:[String,Number],default:null},e},{}),T=b.reduce((e,l)=>{const o="order"+H(l);return e[o]={type:[String,Number],default:null},e},{}),A={col:Object.keys(h),offset:Object.keys(N),order:Object.keys(T)};function se(e,l,o){let n=e;if(!(o==null||o===!1)){if(l){const r=l.replace(e,"");n+=`-${r}`}return e==="col"&&(n="v-"+n),e==="col"&&(o===""||o===!0)||(n+=`-${o}`),n.toLowerCase()}}const ie=["auto","start","end","center","baseline","stretch"],de=L({cols:{type:[Boolean,String,Number],default:!1},...h,offset:{type:[String,Number],default:null},...N,order:{type:[String,Number],default:null},...T,alignSelf:{type:String,default:null,validator:e=>ie.includes(e)},...E(),...S()},"VCol"),ye=$()({name:"VCol",props:de(),setup(e,l){let{slots:o}=l;const n=V(()=>{const r=[];let i;for(i in A)A[i].forEach(u=>{const f=e[u],s=se(i,u,f);s&&r.push(s)});const v=r.some(u=>u.startsWith("v-col-"));return r.push({"v-col":!v||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),r});return()=>{var r;return m(e.tag,{class:[n.value,e.class],style:e.style},(r=o.default)==null?void 0:r.call(o))}}}),C=["start","end","center"],D=["space-between","space-around","space-evenly"];function M(e,l){return b.reduce((o,n)=>{const r=e+H(n);return o[r]=l(),o},{})}const ce=[...C,"baseline","stretch"],_=e=>ce.includes(e),x=M("align",()=>({type:String,default:null,validator:_})),ue=[...C,...D],O=e=>ue.includes(e),P=M("justify",()=>({type:String,default:null,validator:O})),fe=[...C,...D,"stretch"],I=e=>fe.includes(e),Z=M("alignContent",()=>({type:String,default:null,validator:I})),j={align:Object.keys(x),justify:Object.keys(P),alignContent:Object.keys(Z)},me={align:"align",justify:"justify",alignContent:"align-content"};function ve(e,l,o){let n=me[e];if(o!=null){if(l){const r=l.replace(e,"");n+=`-${r}`}return n+=`-${o}`,n.toLowerCase()}}const ge=L({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:_},...x,justify:{type:String,default:null,validator:O},...P,alignContent:{type:String,default:null,validator:I},...Z,...E(),...S()},"VRow"),we=$()({name:"VRow",props:ge(),setup(e,l){let{slots:o}=l;const n=V(()=>{const r=[];let i;for(i in j)j[i].forEach(v=>{const u=e[v],f=ve(i,v,u);f&&r.push(f)});return r.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),r});return()=>{var r;return m(e.tag,{class:["v-row",n.value,e.class],style:e.style},(r=o.default)==null?void 0:r.call(o))}}});export{we as V,ye as a,Me as b};
