const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DrUS81PN.js","./BosuxZz1.js","./CE1FyQDo.js","./entry.5b4CHmjf.css"])))=>i.map(i=>d[i]);
import{d as j,M as y,r as p,N as E,j as m,ac as D,h as d,o as $,a0 as x,V as H,ad as T,ae as _,O as Z}from"./CE1FyQDo.js";import{u as h,b as I,c as O}from"./CLmqY1bs.js";const B={name:"markdown",shouldDebounce:!0,emitsBlur:!0,focusable:!0},n=e=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="${e}" /></svg>`,V=j({props:{modelValue:{type:Object,required:!0},statefulLayout:{type:Object,required:!0}},setup(e,{expose:N}){y({},"VjsfMarkdown");const s=p(null),{inputProps:f,compSlots:b,localData:i}=h(E(e,"modelValue"),e.statefulLayout),M=m(()=>i.value&&D.parse(i.value)),k=m(()=>{const r={...b.value};return r.default=()=>{const o=[d(I,{text:f.value.label}),d("textarea",{ref:s})];return e.modelValue.options.summary&&o.push(d("div",{innerHTML:M.value})),d("div",{class:"vjsf-node-markdown-content"},o)},r});let c=null,a=null;const v=async()=>{if(e.modelValue.options.readOnly)return;if(!s.value)throw new Error("component was not mounted for markdown editor");const r=(await _(async()=>{const{default:A}=await import("./DrUS81PN.js").then(L=>L.e);return{default:A}},__vite__mapDeps([0,1,2,3]),import.meta.url)).default,o=e.modelValue.messages,l=e.modelValue.options.pluginsOptions.markdown,t={...l==null?void 0:l.icons,formatBold:"M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z",formatItalic:"M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z",formatTitle:"M5,4V7H10.5V19H13.5V7H19V4H5Z",formatQuoteOpen:"M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z",formatListBulleted:"M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z",formatListNumbered:"M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z",link:"M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z",image:"M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z",table:"M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z",eye:"M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",undo:"M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z",redo:"M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z",helpCircle:"M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"},w={element:s.value,initialValue:e.modelValue.data??"",renderingConfig:{},status:!1,autoDownloadFontAwesome:!1,spellChecker:!1,minHeight:"300px",insertTexts:{link:[o.mdeLink1,o.mdeLink2],image:[o.mdeImg1,o.mdeImg2],table:[o.mdeTable1,o.mdeTable2],horizontalRule:["",`

-----

`]},toolbar:[{name:"bold",action:r.toggleBold,icon:n(t.formatBold),title:o.bold},{name:"italic",action:r.toggleItalic,icon:n(t.formatItalic),title:o.italic},{name:"heading",action:r.toggleHeadingSmaller,icon:n(t.formatTitle),title:o.heading},"|",{name:"quote",action:r.toggleBlockquote,icon:n(t.formatQuoteOpen),title:o.quote},{name:"unordered-list",action:r.toggleUnorderedList,icon:n(t.formatListBulleted),title:o.unorderedList},{name:"ordered-list",action:r.toggleOrderedList,icon:n(t.formatListNumbered),title:o.orderedList},"|",{name:"link",action:r.drawLink,icon:n(t.link),title:o.createLink},{name:"image",action:r.drawImage,icon:n(t.image),title:o.insertImage},{name:"table",action:r.drawTable,icon:n(t.table),title:o.createTable},"|",{name:"preview",action:r.togglePreview,icon:n(t.eye),className:"text-accent",title:o.preview,noDisable:!0},"|",{name:"undo",action:r.undo,icon:n(t.undo),title:o.undo,noDisable:!0},{name:"redo",action:r.redo,icon:n(t.redo),title:o.redo,noDisable:!0},"|",{name:"guide",action:"https://simplemde.com/markdown-guide",icon:n(t.helpCircle),className:"text-success",title:o.mdeGuide,noDisable:!0}],...l==null?void 0:l.easyMDEOptions};a&&a.toTextArea(),a=new r(w);let u=!1;a.codemirror.on("change",()=>{u=!0,a&&e.statefulLayout.input(e.modelValue,a.value())}),a.codemirror.on("blur",()=>{c=setTimeout(()=>{u&&e.statefulLayout.blur(e.modelValue),u=!1},500)}),a.codemirror.on("focus",()=>{c&&clearTimeout(c)}),e.modelValue.autofocus&&a.codemirror.focus()};$(v),x(()=>{a&&a.toTextArea()}),H(()=>i,()=>{a&&a.value()!==(i.value??"")&&a.value(i.value??"")}),H(()=>[e.modelValue.options.readOnly,e.modelValue.messages,e.modelValue.options.easyMDEOptions],(r,o)=>{(r[0]!==o[0]||r[1]!==o[1]||r[2]!==o[2])&&v()});const C=T(),g=m(()=>S(C));return()=>[d("style",{innerHTML:g.value}),d(O,f.value,k.value)]}}),S=e=>`
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
  `;Z(V);const P={info:B,nodeComponent:V};export{P as V};
