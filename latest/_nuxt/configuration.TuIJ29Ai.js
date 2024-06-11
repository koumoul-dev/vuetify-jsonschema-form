import{V as k,d as m,a as _,b as V,e as c}from"./VList.BUCLP4ST.js";import{V as g}from"./VCard.BbaWFBSH.js";import{t as a,F as u,A as o,z as i,G as t,v as r,K as d,L as h,x as n,y as s,B as f,H as y}from"./entry.DtcpLzfz.js";import{u as O}from"./vue.f36acd1f.66aIO-oT.js";import{e as x}from"./en.DybEPrLn.js";import{V as T}from"./VContainer.C5S64zZh.js";import"./tag.CC32ocre.js";import"./ssrBoot.DZCWWRiE.js";import"./index.DUOAT2fE.js";import"./dimensions.BjBiB_8T.js";/* empty css              */const C={key:0},A=["textContent"],I={__name:"options-list",props:{options:{type:Array,required:!0}},setup(p){return(b,w)=>(a(),u(t(g),{variant:"flat"},{default:o(()=>[i(t(k),{lines:!1},{default:o(()=>[i(t(m)),(a(!0),r(d,null,h(p.options,e=>(a(),r(d,{key:e.key},[i(t(_),{class:"my-2 px-2"},{default:o(()=>[i(t(V),null,{default:o(()=>[n("strong",null,s(e.key),1),f(),e.default!==void 0?(a(),r("span",C,"(default="+s(e.default)+")",1)):y("",!0)]),_:2},1024),i(t(c),null,{default:o(()=>[f(s(e.description),1)]),_:2},1024),e.values?(a(),u(t(c),{key:0,class:"my-2"},{default:o(()=>[(a(!0),r(d,null,h(Object.keys(e.values),l=>(a(),r("p",{key:l,class:"pl-4"},[n("strong",null,s(l)+": ",1),n("span",{textContent:s(e.values[l])},null,8,A)]))),128))]),_:2},1024)):y("",!0)]),_:2},1024),i(t(m))],64))),128))]),_:1})]),_:1}))}},j=[{key:"ajv",description:"The Ajv instance to use, you should probably no overwrite this option and let Vjsf handle the Ajv instance."},{key:"ajvOptions",description:"Some options for the Ajv instance that will be created by default.",default:{allErrors:!0,strict:!1}},{key:"markdown",description:"A function that takes a string in markdown format and returns HTML code.",default:"A markdown-it instance render function"},{key:"markdownItOptions",description:"Some options for the markdown-it instance that will be created by default",default:{}},{key:"locale",description:"The locale of the form.",default:"en"},{key:"messages",description:"The locale messages. You can overwrite only the keys you want to change.",default:{},values:x}],L=[{key:"readOnly",description:"Render the form in read-only mode.",default:!1},{key:"summary",description:"Render the form in summary mode. In this mode some information may be omitted for the sake of information density and readability. Items in an editable array are rendered in this mode.",default:!1},{key:"density",description:"Matches the density concept of Material design.",default:"default",values:{default:"default",compact:"compact",comfortable:"comfortable"}},{key:"context",description:"A contextual data object that can be referenced in expressions",default:{}},{key:"titleDepth",description:"The depth of the section titles (an initial depth of 2 means that the first level of titles will be rendered as h2 tags)",default:2},{key:"validateOn",description:"Control the way form inputs are validated. It does not control the actual execution of a validation function (data is always validated as it changes), only the display of the validation errors to the users.",default:"input",values:{input:"Validate a form input as soon as the user used it to input some data.",blur:"Validate a form input when the user interacts with it then leaves it.",submit:"Validate the form inputs only when the form is submitted."}},{key:"initialValidation",description:'This option complements "validateOn". It controls the validation of form inputs when the form is initialized.',default:"withData",values:{never:"Form inputs are never validated at initialization.",always:"Form inputs are always validated at initialization",withData:"Only the inputs with data at initialization are validated."}},{key:"updateOn",description:"Control when the new data will be emitted by the form.",default:"input",values:{input:"The data will be updated in realtime when the user makes any input (except for the application of debounceInputMs).",blur:"The data will be updated only when the user interacts with a form input then leaves it."}},{key:"debounceInputMs",description:"The debounce time for the input event of editable fields.",default:300},{key:"defaultOn",description:"Control the use of default values in the form.",default:"empty",values:{never:"Never use the default data.",missing:"The default data is used when the property is not defined in the data.",empty:"The default data is used when the property is either undefined or empty (empty string, empty object, etc.)."}},{key:"removeAdditional",description:"Control the way additional data is managed (data that is present in the model but not defined by the schema).",default:"error",values:{true:'Remove all additional properties (alias "unknown").',error:"Remove additional properties that cause a validation error.",false:'Never remove additional properties (alias "none").'}},{key:"autofocus",description:"Activate autofocus. The focus will be given to the first input of the form.",default:!1},{key:"readOnlyPropertiesMode",description:"Control the way readOnly properties from the schema are managed.",default:"show",values:{remove:"Hide the readOnly properties and remove them from the data.",hide:"Hide the readOnly properties but keep them in the data.",show:"Show the readOnly properties."}}],M=[...j],N=[...L],S=n("h2",{class:"text-h4 mb-6"}," Compile options ",-1),z=n("p",{class:"mb-6"}," These options can only be used at compile time, they cannot be overwritten at runtime or in the intermediate levels of the schema ",-1),B=n("h2",{class:"text-h4 my-6"}," Runtime options ",-1),D=n("p",{class:"mb-6"}," These options can be used both at compile time and at runtime, and they can be overwritten in intermediate levels of the schema using `layout.options`. ",-1),v="Configuration",Q={__name:"configuration",setup(p){return O({title:"VJSF - "+v}),(b,w)=>{const e=I;return a(),u(t(T),null,{default:o(()=>[n("h1",{class:"text-h2 mb-8"},s(v)),S,z,i(e,{options:t(M)},null,8,["options"]),B,D,i(e,{options:t(N)},null,8,["options"])]),_:1})}}};export{Q as default};
