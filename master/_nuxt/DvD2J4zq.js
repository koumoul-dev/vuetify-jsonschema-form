import{_ as H,t as U,v as k,d as ee,M as te,N as ae,r as oe,h as B,O as le,g as V,D as M,A as f,z as n,F as K,I as R,J as G,B as P,y as z,x as T,K as ne,Q as ie}from"./XjrPQf8n.js";import{_ as re}from"./plS7VqH1.js";import{V as de,a as se,c as fe,r as ue,b as pe,d as me,e as ce,f as ve,g as ye,h as Ve,i as $e,_ as ge}from"./D73Co7YY.js";import{V as _e}from"./COcAKq_w.js";import{u as be,V as we,a as ze}from"./B13VRMII.js";import{c as Y,a as Oe,b as ke,i as xe}from"./CLg9alGX.js";import{g as je}from"./BosuxZz1.js";import"./D114PZ1t.js";import{V as Te}from"./Dx8oVPVH.js";import{V as he,a as De}from"./EMmthR_e.js";import{V as Se}from"./BGYmgC6S.js";import{d as Me}from"./BXmpPSfR.js";import{V as Ee}from"./D-S3HWTN.js";import{V as Ae}from"./BtLTJgjb.js";import{V as Ce}from"./DODpMNBw.js";const Fe={props:{content:{type:String,required:!0}}},Ie=["innerHTML"];function Pe(e,a,l,r,s,u){return k(),U("div",{class:"markdown-block",innerHTML:e.$markdown(l.content)},null,8,Ie)}const pt=H(Fe,[["render",Pe]]),Ue={name:"img-cropper",focusable:!0,isFileInput:!0,schema:{properties:{accept:{type:"string",default:"image/*"},placeholder:{type:"string"}}}},Q=ee({props:{modelValue:{type:Object,required:!0},statefulLayout:{type:Object,required:!0}},setup(e){te({},"VjsfImgCropper");const{inputProps:a,localData:l,compSlots:r}=be(ae(e,"modelValue"),e.statefulLayout,{layoutPropsMap:["placeholder","accept"]}),s=oe(!1);return()=>{const u=B(de,{accept:"image/*",...a.value,modelValue:l.value},r.value);if(s.value){const c=B(se,{});return[u,c]}else return[u]}}});le(Q);const Ne={info:Ue,nodeComponent:Q};var W={exports:{}},X={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.formatNames=e.fastFormats=e.fullFormats=void 0;function a(t,d){return{validate:t,compare:d}}e.fullFormats={date:a(u,c),time:a(o,i),"date-time":a(_,v),duration:/^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,uri:j,"uri-reference":/^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,"uri-template":/^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,url:/^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,email:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,hostname:/^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,ipv4:/^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,ipv6:/^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,regex:L,uuid:/^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,"json-pointer":/^(?:\/(?:[^~/]|~0|~1)*)*$/,"json-pointer-uri-fragment":/^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,"relative-json-pointer":/^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,byte:E,int32:{type:"number",validate:b},int64:{type:"number",validate:A},float:{type:"number",validate:C},double:{type:"number",validate:C},password:!0,binary:!0},e.fastFormats={...e.fullFormats,date:a(/^\d\d\d\d-[0-1]\d-[0-3]\d$/,c),time:a(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,i),"date-time":a(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,v),uri:/^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,"uri-reference":/^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,email:/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i},e.formatNames=Object.keys(e.fullFormats);function l(t){return t%4===0&&(t%100!==0||t%400===0)}const r=/^(\d\d\d\d)-(\d\d)-(\d\d)$/,s=[0,31,28,31,30,31,30,31,31,30,31,30,31];function u(t){const d=r.exec(t);if(!d)return!1;const g=+d[1],w=+d[2],S=+d[3];return w>=1&&w<=12&&S>=1&&S<=(w===2&&l(g)?29:s[w])}function c(t,d){if(t&&d)return t>d?1:t<d?-1:0}const p=/^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;function o(t,d){const g=p.exec(t);if(!g)return!1;const w=+g[1],S=+g[2],F=+g[3],I=g[5];return(w<=23&&S<=59&&F<=59||w===23&&S===59&&F===60)&&(!d||I!=="")}function i(t,d){if(!(t&&d))return;const g=p.exec(t),w=p.exec(d);if(g&&w)return t=g[1]+g[2]+g[3]+(g[4]||""),d=w[1]+w[2]+w[3]+(w[4]||""),t>d?1:t<d?-1:0}const m=/t|\s/i;function _(t){const d=t.split(m);return d.length===2&&u(d[0])&&o(d[1],!0)}function v(t,d){if(!(t&&d))return;const[g,w]=t.split(m),[S,F]=d.split(m),I=c(g,S);if(I!==void 0)return I||i(w,F)}const $=/\/|:/,y=/^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;function j(t){return $.test(t)&&y.test(t)}const h=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;function E(t){return h.lastIndex=0,h.test(t)}const D=-2147483648,O=2**31-1;function b(t){return Number.isInteger(t)&&t<=O&&t>=D}function A(t){return Number.isInteger(t)}function C(){return!0}const N=/[^\\]\\Z/;function L(t){if(N.test(t))return!1;try{return new RegExp(t),!0}catch{return!1}}})(X);var J={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.formatLimitDefinition=void 0;const a=Oe,l=Y,r=l.operators,s={formatMaximum:{okStr:"<=",ok:r.LTE,fail:r.GT},formatMinimum:{okStr:">=",ok:r.GTE,fail:r.LT},formatExclusiveMaximum:{okStr:"<",ok:r.LT,fail:r.GTE},formatExclusiveMinimum:{okStr:">",ok:r.GT,fail:r.LTE}},u={message:({keyword:p,schemaCode:o})=>l.str`should be ${s[p].okStr} ${o}`,params:({keyword:p,schemaCode:o})=>l._`{comparison: ${s[p].okStr}, limit: ${o}}`};e.formatLimitDefinition={keyword:Object.keys(s),type:"string",schemaType:"string",$data:!0,error:u,code(p){const{gen:o,data:i,schemaCode:m,keyword:_,it:v}=p,{opts:$,self:y}=v;if(!$.validateFormats)return;const j=new a.KeywordCxt(v,y.RULES.all.format.definition,"format");j.$data?h():E();function h(){const O=o.scopeValue("formats",{ref:y.formats,code:$.code.formats}),b=o.const("fmt",l._`${O}[${j.schemaCode}]`);p.fail$data(l.or(l._`typeof ${b} != "object"`,l._`${b} instanceof RegExp`,l._`typeof ${b}.compare != "function"`,D(b)))}function E(){const O=j.schema,b=y.formats[O];if(!b||b===!0)return;if(typeof b!="object"||b instanceof RegExp||typeof b.compare!="function")throw new Error(`"${_}": format "${O}" does not define "compare" function`);const A=o.scopeValue("formats",{key:O,ref:b,code:$.code.formats?l._`${$.code.formats}${l.getProperty(O)}`:void 0});p.fail$data(D(A))}function D(O){return l._`${O}.compare(${i}, ${m}) ${s[_].fail} 0`}},dependencies:["format"]};const c=p=>(p.addKeyword(e.formatLimitDefinition),p);e.default=c})(J);(function(e,a){Object.defineProperty(a,"__esModule",{value:!0});const l=X,r=J,s=Y,u=new s.Name("fullFormats"),c=new s.Name("fastFormats"),p=(i,m={keywords:!0})=>{if(Array.isArray(m))return o(i,m,l.fullFormats,u),i;const[_,v]=m.mode==="fast"?[l.fastFormats,c]:[l.fullFormats,u],$=m.formats||l.formatNames;return o(i,$,_,v),m.keywords&&r.default(i),i};p.get=(i,m="full")=>{const v=(m==="fast"?l.fastFormats:l.fullFormats)[i];if(!v)throw new Error(`Unknown format "${i}"`);return v};function o(i,m,_,v){var $,y;($=(y=i.opts.code).formats)!==null&&$!==void 0||(y.formats=s._`require("ajv-formats/dist/formats").${v}`);for(const j of m)i.addFormat(j,_[j])}e.exports=a=p,Object.defineProperty(a,"__esModule",{value:!0}),a.default=p})(W,W.exports);var Le=W.exports;const Ke=je(Le),qe=ke,We={modelRoot:"rootData",root:"rootData",model:"data",value:"data"},Z=e=>(e.match(/^[a-z.]*$/i)&&!["data","context","rootData","parent"].some(a=>e.startsWith(a+"."))&&(e="rootData."+e),e=e.replace(/(.*)\.(\d+)(.*)/,"$1[$2]$3"),e),q=(e,a="js-eval")=>{let l=e,r=!0;l.includes("parent.value")&&(r=!1,l=l.replace(/parent\.value/g,"parent.data"));for(const[s,u]of Object.entries(We))l=l.replace(new RegExp(`${s}\\.`,"g"),u+".");if(a==="js-eval"&&(l=Z(l)),a==="js-tpl")for(const s of l.matchAll(/\{(.*?)\}/g))s[1]!=="q"&&(l=l.replace(s[0],"${"+Z(s[1])+"}"));return l.includes("rootData")&&(r=!1),{type:a,expr:l,pure:r}},x=(e,a,l,r)=>{var s,u,c,p;if(!r.includes(e)){if(r.push(e),e.$ref){const[o,i]=a(l,e.$ref);x(o,a,i,r)}if(!e.layout){const o={};if((e.separator||e["x-separator"])&&(o.separator=e.separator||e["x-separator"],delete e.separator,delete e["x-separator"]),e["x-display"]==="icon"&&(e.enum||(s=e.items)!=null&&s.enum)&&(o.getItems={itemIcon:e["x-itemIcon"]||"data.value"},delete e["x-display"]),e["x-display"]){let i=e["x-display"];i==="radio"&&(i="radio-group"),i==="checkbox"&&e.type!=="boolean"&&(i="checkbox-group"),i==="switch"&&e.type!=="boolean"&&(i="switch-group"),i==="hidden"&&(i="none"),o.comp=i,delete e["x-display"]}if(e.format==="hexcolor"&&(o.comp="color-picker",delete e.format),e["x-props"]&&(o.props=e["x-props"],delete e["x-props"]),e["x-fromData"]&&(o.comp=o.comp??"select",o.getItems=q(e["x-fromData"]),delete e["x-fromData"]),e["x-if"]&&(o.if=q(e["x-if"]),delete e["x-if"]),e["x-fromUrl"]){const i=e["x-fromUrl"];o.getItems={url:q(i,"js-tpl")},delete e["x-fromUrl"]}o.getItems&&xe(o.getItems)&&(e["x-itemKey"]&&(o.getItems.itemKey=`data["${e["x-itemKey"]}"]`),e["x-itemTitle"]&&(o.getItems.itemTitle=`data["${e["x-itemTitle"]}"]`),e["x-itemValue"]&&(o.getItems.itemValue=`data["${e["x-itemValue"]}"]`),e["x-itemIcon"]&&(o.getItems.itemIcon=`data["${e["x-itemIcon"]}"]`),e["x-itemsProp"]&&(o.getItems.itemsResults=`data["${e["x-itemsProp"]}"]`),delete e["x-itemKey"],delete e["x-itemTitle"],delete e["x-itemValue"],delete e["x-itemsProp"]),e["x-cols"]&&(o.cols=e["x-cols"]),(u=e["x-options"])!=null&&u.hideInArrayItem&&!o.if&&(o.if="!summary"),Object.keys(o).length===1&&"comp"in o?e.layout=o.comp:Object.keys(o).length>0&&(e.layout=o)}if(e.properties)for(const o of Object.keys(e.properties))x(e.properties[o],a,l,r);if(e.allOf)for(const o of e.allOf)x(o,a,l,r);if(e.oneOf){if(!e.oneOfLayout){const o=Object.keys(((c=e.oneOf[0])==null?void 0:c.properties)||{}).find(i=>{var m;return!!((m=e.oneOf[0])!=null&&m.properties[i].const)});if(o){const i=(p=e.oneOf[0])==null?void 0:p.properties[o];i!=null&&i.title&&(e.oneOfLayout={label:i.title}),e.required&&Array.isArray(e.required)&&(e.required=e.required.filter(m=>m!==o))}}for(const o of e.oneOf)x(o,a,l,r)}if(e.anyOf)for(const o of e.anyOf)x(o,a,l,r);if(e.type==="array"&&e.items)if(Array.isArray(e.items))for(const o of e.items)x(o,a,l,r);else x(e.items,a,l,r);if(e.dependencies)for(const o of Object.keys(e.dependencies))x(e.dependencies[o],a,l,r);e.if&&(e.then&&x(e.then,a,l,r),e.else&&x(e.else,a,l,r))}};function Be(e,a,l="en"){let r=a;if(!r){const p={strict:!1,allErrors:!0},o=new qe(p);Ke.default(o),r=o}const s=fe(e);s.$id=s.$id??"_jl";const u=ue(s,r,l),c=[];return x(s,u,s.$id,c),s}const Re={"custom-textarea":`
  <template #custom-textarea="{node, statefulLayout}">
    <textarea
      :value="node.data"
      style="border: 1px solid red;"
      placeholder="A custom textarea"
      @input="event => statefulLayout.input(node, event.target.value)"
    />
  </template>`,"custom-message":`
  <template #custom-message="{node, statefulLayout}">
    This message is defined in a slot (key={{ node.key }}, data={{ node.data }}, additional prop={{ prop1 }})
  </template>`},Ge={components:{Vjsf:ge,VIcon:De,VContainer:Ce,VRow:ze,VCol:we,VSpacer:Ae,VForm:$e,VBtn:Ee,VDivider:Me,VSelect:Ve,VSwitch:ye,VToolbar:Se,VSheet:ve,VWindow:ce,VSlider:me,VWindowItem:pe,VDefaultsProvider:he,VThemeProvider:Te},props:{example:{type:Object,required:!0},v2:{type:Boolean,default:!1}},data:()=>({data:null,tab:null,stateTree:null,display:null,options:{readOnly:!1,summary:!1,density:"comfortable",indent:!1,titleDepth:2,validateOn:"input",initialValidation:"withData",updateOn:"input",debounceInputMs:300,defaultOn:"empty",removeAdditional:"error",autofocus:!1,readOnlyPropertiesMode:"show",locale:"en",plugins:[_e,Ne]},filledOptions:null,wrapperWidth:100,slotCodes:Re,valid:null,theme:"light"}),computed:{tabs(){var a;const e=[];return this.v2&&e.push({value:"schemaV2",title:"Schema V2"}),e.push({value:"schema",title:"Schema"}),e.push({value:"model",title:"Data"}),(a=this.example.codeSlots)!=null&&a.length&&e.push({value:"slots",title:"Slots"}),this.example.defaultProps&&e.push({value:"defaultProps",title:"Default props"}),e.push({value:"options",title:"Options"}),e},schema(){return this.v2?Be(this.example.schema):this.example.schema},changeOption(e){return a=>{this.options={...this.options,[e]:a}}},validateColor(){return this.valid===!1?"error":this.valid===!0?"success":"default"}},created(){this.example.options&&Object.assign(this.options,this.example.options),this.example.data&&(this.data=JSON.parse(JSON.stringify(this.example.data)))},methods:{updateState(e){this.stateTree=e.stateTree,this.display=e.display,this.filledOptions={...e.options},delete this.filledOptions.vjsfSlots,delete this.filledOptions.nodeComponents,delete this.filledOptions.components,delete this.filledOptions.plugins},editExample(){const e={...this.options};delete e.plugins,localStorage.setItem("vjsf-editor-state",JSON.stringify({schema:this.schema,options:e,data:this.data})),this.$router.push("/editor")},toggleTheme(){this.theme=this.theme==="light"?"dark":"light"}}},Ze={key:0,class:"text-caption ml-2"},He=["value","onInput"];function Ye(e,a,l,r,s,u){const c=V("v-btn"),p=V("v-spacer"),o=V("v-icon"),i=V("v-toolbar"),m=V("v-divider"),_=re,v=V("v-window-item"),$=V("v-switch"),y=V("v-select"),j=V("v-slider"),h=V("v-defaults-provider"),E=V("v-col"),D=V("v-row"),O=V("v-window"),b=V("vjsf"),A=V("v-form"),C=V("v-container"),N=V("v-theme-provider"),L=V("v-sheet");return k(),M(L,{class:"my-6",border:"sm",rounded:"",color:"transparent"},{default:f(()=>[n(i,{density:"compact",color:"surface",rounded:""},{default:f(()=>[(k(!0),U(R,null,G(u.tabs,t=>(k(),M(c,{key:t.value,class:"text-none font-weight-bold ml-2",variant:e.tab===t.value?"flat":"text",active:e.tab===t.value,color:e.tab===t.value?"primary":"",onClick:d=>e.tab=e.tab===t.value?null:t.value},{default:f(()=>[P(z(t.title),1)]),_:2},1032,["variant","active","color","onClick"]))),128)),n(p),n(c,{icon:"",color:"primary",class:"mr-2",onClick:u.toggleTheme},{default:f(()=>[e.theme==="light"?(k(),M(o,{key:0,icon:"mdi-weather-night"})):(k(),M(o,{key:1,icon:"mdi-weather-sunny"}))]),_:1},8,["onClick"]),n(c,{color:"primary",icon:"mdi-pencil",onClick:u.editExample},null,8,["onClick"])]),_:1}),n(m),e.tab?(k(),M(O,{key:0,modelValue:e.tab,"onUpdate:modelValue":a[14]||(a[14]=t=>e.tab=t),style:{height:"600px","overflow-y":"auto"}},{default:f(()=>[n(v,{value:"schemaV2",class:"ma-3"},{default:f(()=>[n(_,null,{default:f(()=>[T("pre",null,z(JSON.stringify(l.example.schema,null,2)),1)]),_:1})]),_:1}),n(v,{value:"schema",class:"ma-3"},{default:f(()=>[n(_,null,{default:f(()=>[T("pre",null,z(JSON.stringify(u.schema,null,2)),1)]),_:1})]),_:1}),n(v,{value:"model",class:"ma-3 fill-height"},{default:f(()=>[e.data!==null&&e.data!==void 0?(k(),M(_,{key:0},{default:f(()=>[T("pre",null,z(JSON.stringify(e.data,null,2)),1)]),_:1})):K("",!0)]),_:1}),n(v,{value:"slots",class:"ma-3"},{default:f(()=>[(k(!0),U(R,null,G(l.example.codeSlots,t=>(k(),M(_,{key:t},{default:f(()=>[T("pre",null,z(e.slotCodes[t]),1)]),_:2},1024))),128))]),_:1}),n(v,{value:"defaultProps",class:"ma-3"},{default:f(()=>[n(_,null,{default:f(()=>[T("pre",null,z(JSON.stringify(l.example.defaultProps,null,2)),1)]),_:1})]),_:1}),n(v,{value:"options",class:"ma-3",style:{height:"600px"}},{default:f(()=>[n(D,{style:{height:"600px"}},{default:f(()=>[n(E,null,{default:f(()=>[n(h,{defaults:{global:{density:"compact",color:"primary",hideDetails:!0}}},{default:f(()=>[n($,{modelValue:e.options.readOnly,"onUpdate:modelValue":a[0]||(a[0]=t=>e.options.readOnly=t),label:"readOnly"},null,8,["modelValue"]),n($,{modelValue:e.options.summary,"onUpdate:modelValue":a[1]||(a[1]=t=>e.options.summary=t),label:"summary"},null,8,["modelValue"]),n($,{modelValue:e.options.autofocus,"onUpdate:modelValue":a[2]||(a[2]=t=>e.options.autofocus=t),label:"autofocus"},null,8,["modelValue"]),n(y,{modelValue:e.options.density,"onUpdate:modelValue":a[3]||(a[3]=t=>e.options.density=t),style:{"max-width":"300px"},items:["default","comfortable","compact"]},null,8,["modelValue"]),n($,{modelValue:e.options.indent,"onUpdate:modelValue":a[4]||(a[4]=t=>e.options.indent=t),label:"indent"},null,8,["modelValue"]),n(y,{modelValue:e.options.titleDepth,"onUpdate:modelValue":a[5]||(a[5]=t=>e.options.titleDepth=t),label:"titleDepth",style:{"max-width":"300px"},items:[1,2,3,4,5,6]},null,8,["modelValue"]),n(y,{modelValue:e.options.validateOn,"onUpdate:modelValue":a[6]||(a[6]=t=>e.options.validateOn=t),label:"validateOn",style:{"max-width":"300px"},items:["input","blur","submit"]},null,8,["modelValue"]),n(y,{modelValue:e.options.initialValidation,"onUpdate:modelValue":a[7]||(a[7]=t=>e.options.initialValidation=t),label:"initialValidation",style:{"max-width":"300px"},items:["never","withData","always"]},null,8,["modelValue"]),n(y,{modelValue:e.options.updateOn,"onUpdate:modelValue":a[8]||(a[8]=t=>e.options.updateOn=t),label:"updateOn",style:{"max-width":"300px"},items:["input","blur"]},null,8,["modelValue"]),n(y,{modelValue:e.options.defaultOn,"onUpdate:modelValue":a[9]||(a[9]=t=>e.options.defaultOn=t),label:"defaultOn",style:{"max-width":"300px"},items:["never","missing","empty"]},null,8,["modelValue"]),n(y,{modelValue:e.options.removeAdditional,"onUpdate:modelValue":a[10]||(a[10]=t=>e.options.removeAdditional=t),label:"removeAdditional",style:{"max-width":"300px"},items:["unknown","error","none"]},null,8,["modelValue"]),n(y,{modelValue:e.options.readOnlyPropertiesMode,"onUpdate:modelValue":a[11]||(a[11]=t=>e.options.readOnlyPropertiesMode=t),label:"readOnlyPropertiesMode",style:{"max-width":"300px"},items:["remove","hide","show"]},null,8,["modelValue"]),n(y,{modelValue:e.options.locale,"onUpdate:modelValue":a[12]||(a[12]=t=>e.options.locale=t),label:"locale",style:{"max-width":"300px"},items:["en","fr","nl"]},null,8,["modelValue"]),n(j,{modelValue:e.wrapperWidth,"onUpdate:modelValue":a[13]||(a[13]=t=>e.wrapperWidth=t),min:0,max:100,step:1,label:"container width",style:{"max-width":"600px"}},{append:f(()=>[P(z(e.wrapperWidth)+" % ",1)]),_:1},8,["modelValue"])]),_:1}),e.display?(k(),U("div",Ze," width="+z(e.display.width)+"px, display="+z(e.display.name),1)):K("",!0)]),_:1}),n(m,{vertical:""}),n(E,{style:{height:"600px","overflow-y":"auto"}},{default:f(()=>[a[18]||(a[18]=T("div",{class:"text-subtitle"}," Options filled with default values: ",-1)),n(_,null,{default:f(()=>[T("pre",null,z(JSON.stringify(e.filledOptions,null,2)),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])):K("",!0),n(N,{theme:e.theme,"with-background":"",class:"rounded-b"},{default:f(()=>[n(C,{fluid:""},{default:f(()=>[T("div",{style:ne(`width: ${e.wrapperWidth}%`)},[n(A,{ref:"form",modelValue:e.valid,"onUpdate:modelValue":a[17]||(a[17]=t=>e.valid=t)},{default:f(()=>[n(h,{defaults:l.example.defaultProps||{}},{default:f(()=>[ie(e.$slots,"vjsf",{modelValue:e.data,options:e.options,updateState:u.updateState,updateModelValue:t=>e.data=t},()=>[n(b,{modelValue:e.data,"onUpdate:modelValue":a[15]||(a[15]=t=>e.data=t),schema:u.schema,options:e.options,"onUpdate:state":u.updateState},{"custom-textarea":f(({node:t,statefulLayout:d})=>[T("textarea",{value:t.data,style:{border:"1px solid red"},placeholder:"A custom textarea",onInput:g=>d.input(t,g.target.value)},null,40,He)]),"custom-message":f(({node:t,prop1:d})=>[P(" This message is defined in a slot (key="+z(t.key)+", data="+z(t.data)+", additional prop="+z(d)+") ",1)]),_:1},8,["modelValue","schema","options","onUpdate:state"])])]),_:3},8,["defaults"]),n(D,{class:"ma-0"},{default:f(()=>[n(p),n(c,{color:u.validateColor,flat:"",class:"mt-2",onClick:a[16]||(a[16]=t=>e.$refs.form.validate())},{default:f(()=>a[19]||(a[19]=[P(" Validate ")])),_:1},8,["color"])]),_:1})]),_:3},8,["modelValue"])],4)]),_:3})]),_:3},8,["theme"])]),_:3})}const mt=H(Ge,[["render",Ye]]);export{pt as _,mt as a};
