const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./BMrYDT2K2.js","./DAXXjFlN.js"])))=>i.map(i=>d[i]);
import{o as e}from"./DAXXjFlN.js";import{B as t,C as n,D as r,I as i,bt as a,d as o,ft as s,gt as c,nt as l,z as u}from"./DAU6Le7d.js";import{t as d}from"./HclGiUj8.js";import{h as f}from"./cYdfBdP-.js";import{a as p}from"./cZT_eHjN.js";import{d as m,y as h}from"./B7Bp4N2f.js";import{t as g}from"./CtaBI5gJ.js";import{i as _,n as v}from"./BweOYUGz.js";var y={name:`markdown`,shouldDebounce:!0,emitsBlur:!0,focusable:!0},b=e(_()),x={en:{mdeLink1:`[Link title`,mdeLink2:`](link url)`,mdeImg1:`![](`,mdeImg2:`image url)`,mdeTable1:``,mdeTable2:`

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Text     | Text     | Text     |

`,bold:`Bold`,italic:`Italic`,heading:`Title`,quote:`Quote`,unorderedList:`Unordered list`,orderedList:`Ordered list`,createLink:`Create a link`,insertImage:`Insert an image`,createTable:`Create a table`,preview:`Aperçu du rendu`,mdeGuide:`Documentation de la syntaxe`,undo:`Undo`,redo:`Redo`},fr:{mdeLink1:`[titre du lien`,mdeLink2:`](adresse du lien)`,mdeImg1:`![](`,mdeImg2:`adresse de l'image)`,mdeTable1:``,mdeTable2:`

| Colonne 1 | Colonne 2 | Colonne 3 |
| -------- | -------- | -------- |
| Texte     | Texte     | Texte     |

`,bold:`Gras`,italic:`Italique`,heading:`Titre`,quote:`Citation`,unorderedList:`Liste à puce`,orderedList:`Liste numérotée`,createLink:`Créer un lien`,insertImage:`Insérer une image`,createTable:`Créer un tableau`,preview:`Preview`,mdeGuide:`Syntax documentation`,undo:`Défaire`,redo:`Refaire`},nl:{mdeLink1:`[Link titel`,mdeLink2:`](link url)`,mdeImg1:`![](`,mdeImg2:`afbeelding url)`,mdeTable1:``,mdeTable2:`

| Kolom 1  | Kolom 2  | Kolom 3  |
| -------- | -------- | -------- |
| Tekst    | Tekst    | Tekst    |

`,bold:`Vet`,italic:`Cursief`,heading:`Titel`,quote:`Citaat`,unorderedList:`Ongeordende lijst`,orderedList:`Geordende lijst`,createLink:`Maak een koppeling`,insertImage:`Afbeelding invoegen`,createTable:`Tabel aanmaken`,preview:`Voorbeeld`,mdeGuide:`Documentatie over syntaxis`,undo:`Ongedaan maken`,redo:`Opnieuw`},de:{mdeLink1:`[Link-Titel`,mdeLink2:`](Link-URL)`,mdeImg1:`![](`,mdeImg2:`Bild-URL)`,mdeTable1:``,mdeTable2:`

| Spalte 1 | Spalte 2 | Spalte 3 |
| -------- | -------- | -------- |
| Text     | Text     | Text     |

`,bold:`Fett`,italic:`Kursiv`,heading:`Titel`,quote:`Zitat`,unorderedList:`Ungeordnete Liste`,orderedList:`Geordnete Liste`,createLink:`Link erstellen`,insertImage:`Bild einfügen`,createTable:`Tabelle erstellen`,preview:`Vorschau`,mdeGuide:`Syntax-Dokumentation`,undo:`Rückgängig`,redo:`Wiederholen`}},S=(0,b.default)(`vjsf-markdown`),C=e=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="${e}" /></svg>`,w=n({props:{modelValue:{type:String,default:``},label:{type:String,required:!0},readOnly:{type:Boolean,default:!1},messages:{type:Object,default:()=>({})},locale:{type:String,default:`en`},inputProps:{type:Object,default:()=>({})},autofocus:{type:Boolean,default:!1},easyMdeOptions:{type:Object,default:()=>({})},icons:{type:Object,default:()=>({})},cspNonce:{type:String,default:``}},emits:[`update:modelValue`,`blur`],setup(n,{expose:a,emit:s}){f({},`VjsfMarkdown`);let _=c(null),v=o(()=>({...x.en,...x[n.locale],...n.messages})),y=o(()=>{let e={};return e.default=()=>{let e=[r(h,{text:n.label})];return n.readOnly?e.push(r(`div`,{innerHTML:g.parse(n.modelValue)})):e.push(r(`textarea`,{ref:_})),r(`div`,{class:`vjsf-markdown-content`},e)},e}),b=null,w=null,E=!1,D=async()=>{if(n.readOnly)return;if(!_.value)throw Error(`component was not mounted for markdown editor`);S(`initEasyMDE`);let t=(await d(async()=>{let{default:t}=await import(`./BMrYDT2K2.js`).then(t=>e(t.default));return{default:t}},__vite__mapDeps([0,1]),import.meta.url)).default,r={...n.icons,formatBold:`M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z`,formatItalic:`M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z`,formatTitle:`M5,4V7H10.5V19H13.5V7H19V4H5Z`,formatQuoteOpen:`M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z`,formatListBulleted:`M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z`,formatListNumbered:`M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z`,link:`M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z`,image:`M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z`,table:`M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z`,eye:`M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z`,undo:`M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z`,redo:`M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z`,helpCircle:`M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z`},i={element:_.value,initialValue:n.modelValue,renderingConfig:{},status:!1,autoDownloadFontAwesome:!1,spellChecker:!1,minHeight:`300px`,insertTexts:{link:[v.value.mdeLink1,v.value.mdeLink2],image:[v.value.mdeImg1,v.value.mdeImg2],table:[v.value.mdeTable1,v.value.mdeTable2],horizontalRule:[``,`

-----

`]},toolbar:[{name:`bold`,action:t.toggleBold,icon:C(r.formatBold),title:v.value.bold},{name:`italic`,action:t.toggleItalic,icon:C(r.formatItalic),title:v.value.italic},{name:`heading`,action:t.toggleHeadingSmaller,icon:C(r.formatTitle),title:v.value.heading},`|`,{name:`quote`,action:t.toggleBlockquote,icon:C(r.formatQuoteOpen),title:v.value.quote},{name:`unordered-list`,action:t.toggleUnorderedList,icon:C(r.formatListBulleted),title:v.value.unorderedList},{name:`ordered-list`,action:t.toggleOrderedList,icon:C(r.formatListNumbered),title:v.value.orderedList},`|`,{name:`link`,action:t.drawLink,icon:C(r.link),title:v.value.createLink},{name:`image`,action:t.drawImage,icon:C(r.image),title:v.value.insertImage},{name:`table`,action:t.drawTable,icon:C(r.table),title:v.value.createTable},`|`,{name:`preview`,action:t.togglePreview,icon:C(r.eye),className:`text-accent`,title:v.value.preview,noDisable:!0},`|`,{name:`undo`,action:t.undo,icon:C(r.undo),title:v.value.undo,noDisable:!0},{name:`redo`,action:t.redo,icon:C(r.redo),title:v.value.redo,noDisable:!0},`|`,{name:`guide`,action:`https://simplemde.com/markdown-guide`,icon:C(r.helpCircle),className:`text-success`,title:v.value.mdeGuide,noDisable:!0}],...n.easyMdeOptions};w&&w.toTextArea(),w=new t(i),E=!1,w.codemirror.on(`change`,()=>{E=!0,w&&s(`update:modelValue`,w.value())}),w.codemirror.on(`blur`,()=>{b=setTimeout(()=>{E&&s(`blur`),E=!1},500)}),w.codemirror.on(`focus`,()=>{b&&clearTimeout(b)}),n.autofocus&&w.codemirror.focus()};u(D),i(()=>{b&&=(clearTimeout(b),null),E&&=(s(`blur`),!1)}),t(()=>{w&&w.toTextArea()}),l(()=>n.modelValue,()=>{w&&w.value()!==(n.modelValue??``)&&(S(`data was updated from outside, apply to easymde`),w.value(n.modelValue??``))}),l(()=>[n.readOnly,n.messages,n.locale,n.easyMdeOptions],(e,t)=>{JSON.stringify(e)!==JSON.stringify(t)&&(S(`easymde config was updated from outside, reinit easymde`),D())});let O=o(()=>{let e={...n.inputProps};return e.class&&typeof e.class==`string`?e.class+=` vjsf-markdown-input`:Array.isArray(e.class)?e.class.push(`vjsf-markdown-input`):e.class=`vjsf-markdown-input`,e}),k=p(),A=o(()=>T(k));return()=>[r(`style`,{innerHTML:A.value,nonce:n.cspNonce||void 0}),r(m,O.value,y.value)]}}),T=e=>`
.vjsf-markdown-input.v-theme--dark .EasyMDEContainer .CodeMirror {
    color: white;
    border-color: ${e.current.value.variables[`border-color`]};
    background-color: ${e.current.value.colors.surface};
}
.vjsf-markdown-input.v-theme--dark .EasyMDEContainer .cm-s-easymde .CodeMirror-cursor {
    border-color: white;
}
.vjsf-markdown-input.v-theme--dark .CodeMirror-cursor {
    border-left:1px solid white;
    border-right:none;width:0;
}
.vjsf-markdown-input.v-theme--dark .EasyMDEContainer .editor-toolbar > * {
    border-color: ${e.current.value.colors.surface};
}
.vjsf-markdown-input.v-theme--dark .editor-toolbar {
    border-top: 1px solid ${e.current.value.variables[`border-color`]};
    border-left: 1px solid ${e.current.value.variables[`border-color`]};
    border-right: 1px solid ${e.current.value.variables[`border-color`]};
}
.vjsf-markdown-input.v-theme--dark .editor-toolbar i.separator {
    border-left: 1px solid ${e.current.value.variables[`border-color`]};
    border-right: 1px solid ${e.current.value.variables[`border-color`]};
}
.vjsf-markdown-input.v-theme--dark .EasyMDEContainer .editor-toolbar > .active, .editor-toolbar > button:hover, .editor-preview pre, .cm-s-easymde .cm-comment {
    background-color: ${e.current.value.colors.surface};
}
.vjsf-markdown-input.v-theme--dark .EasyMDEContainer .CodeMirror-fullscreen {
    background: ${e.current.value.colors.surface};
}
.vjsf-markdown-input.v-theme--dark .editor-toolbar.fullscreen {
    background: ${e.current.value.colors.surface};
}
.vjsf-markdown-input.v-theme--dark .editor-preview {
    background: ${e.current.value.colors.surface};
}
.vjsf-markdown-input.v-theme--dark .editor-preview-side {
    border-color: ${e.current.value.variables[`border-color`]};
}
.vjsf-markdown-input.v-theme--dark .CodeMirror-selected {
    background: ${e.current.value.colors.secondary};
}
.vjsf-markdown-input.v-theme--dark .CodeMirror-focused .CodeMirror-selected {
    background: ${e.current.value.colors.secondary};
}
.vjsf-markdown-input.v-theme--dark .CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection {
    background:${e.current.value.colors.secondary}
}
.vjsf-markdown-input.v-theme--dark .CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection {
    background:${e.current.value.colors.secondary}
}
.vjsf-markdown-input.v-theme--dark .EasyMDEContainer .CodeMirror-focused .CodeMirror-selected {
    background: ${e.current.value.colors.secondary}
}
  `,E=n({props:{modelValue:{type:Object,required:!0},statefulLayout:{type:Object,required:!0}},setup(e,{expose:t}){let{inputProps:n,localData:i}=v(a(e,`modelValue`),e.statefulLayout),o=e.modelValue.options.pluginsOptions.markdown;return()=>r(w,{modelValue:i.value,label:n.value.label,readOnly:e.modelValue.options.readOnly,messages:e.modelValue.messages,locale:e.modelValue.options.locale??`en`,inputProps:n.value??{},autofocus:e.modelValue.autofocus??!1,easyMdeOptions:o?.easyMDEOptions??{},icons:o?.icons??{},cspNonce:o?.cspNonce??``,onBlur:()=>e.statefulLayout.blur(e.modelValue),"onUpdate:modelValue":t=>e.statefulLayout.input(e.modelValue,t)})}});s(E);var D={info:y,nodeComponent:E};export{D as t};