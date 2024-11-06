import{_ as l}from"./DJzL2l_P.js";import{u as r}from"./B2CAr1a5.js";import{D as s,A as a,E as u,t as m,x as t,y as p,B as o,z as c}from"./CZ0VzNGo.js";import{V as d}from"./CkRxGyZI.js";import"./CcJ_VqHP.js";import"./BosuxZz1.js";/* empty css        */import"./BKjTprnq.js";const i="v2 to v3",j={__name:"2to3",setup(f){return r({title:"VJSF - "+i}),(v,e)=>{const n=l;return m(),s(u(d),{class:"doc-content-page"},{default:a(()=>[t("h1",{class:"text-h2 mb-8"},p(i)),e[1]||(e[1]=t("p",null,[o(" The old documentation for v2 is still available "),t("a",{href:"https://koumoul-dev.github.io/vuetify-jsonschema-form/2.x/"},"here"),o(". ")],-1)),e[2]||(e[2]=t("p",null," VJSF v3 is a complete rewrite. The motivation was to : ",-1)),e[3]||(e[3]=t("ul",null,[t("li",null,"migrate to vue 3 and vuetify 3"),t("li",null,"rethink the annotations vocabulary and the options for more power and clarity"),t("li",null,"losen the coupling between schema structure and presentation while preserving simplicity"),t("li",null,"implement a saner reactivity model and hopefully see gains in performance and stability"),t("li",null,"fully validate the data (using Ajv) and offer a stronger guarantee that a valid form means a valid output data"),t("li",null,[o("extract all the core logic into a separate project ("),t("a",{href:"https://github.com/json-layout/json-layout"},"JSON Layout"),o(") to pave the way for implementations in other UI frameworks")]),t("li",null,"provide a compilation solution that allows the users to move as much pre-processing as possible (and the associated dependencies) to build time")],-1)),e[4]||(e[4]=t("p",null," Being an entirely new major version of VJSF with a new vocabulary of annotations, breaking changes are inevitable. But a compatibility function is provided to help facilitate the migration. ",-1)),c(n,null,{default:a(()=>e[0]||(e[0]=[t("pre",null,`import { v2compat } from '@koumoul/vjsf/compat/v2'
const v3Schema = v2compat(schema)`,-1)])),_:1})]),_:1})}}};export{j as default};
