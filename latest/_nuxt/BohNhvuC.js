import{_ as l}from"./BeszEjj9.js";import{u as p}from"./DC2dVYlc.js";import{D as u,A as e,E as m,v as a,x as o,z as n,y as d,B as s}from"./D_Mb9exR.js";import{V as f}from"./Bj5iE0oK.js";import{V as g}from"./CNrKNm_B.js";import"./CN5uW8HJ.js";import"./BosuxZz1.js";import"./guhEt_Bv.js";import"./BRCDaBlT.js";import"./DPmvSs-3.js";import"./C-Un01dN.js";/* empty css        */const r="Getting started",T={__name:"getting-started",setup(y){return p({title:"VJSF - "+r}),(v,t)=>{const i=l;return a(),u(m(g),{class:"doc-content-page"},{default:e(()=>[o("h1",{class:"text-h2 mb-8"},d(r)),n(m(f),{type:"warning",variant:"outlined",class:"mb-8"},{default:e(()=>t[0]||(t[0]=[s(" VJSF and its core "),o("i",null,"JSON Layout",-1),s(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ")])),_:1}),t[6]||(t[6]=o("p",null,"Install from npm:",-1)),n(i,null,{default:e(()=>t[1]||(t[1]=[s("npm install @koumoul/vjsf")])),_:1}),t[7]||(t[7]=o("h2",{class:"text-h4 mb-6"}," Compile at runtime ",-1)),t[8]||(t[8]=o("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1)),n(i,{language:"markup"},{default:e(()=>t[2]||(t[2]=[o("pre",null,`<script setup>
  import Vjsf from '@koumoul/vjsf'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <vjsf v-model="data" :schema="schema" :options="options" />
  </v-form>
</template>`,-1)])),_:1}),t[9]||(t[9]=o("h2",{class:"text-h4 mb-6"}," Compile at build time ",-1)),t[10]||(t[10]=o("p",null,"This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.",-1)),t[11]||(t[11]=o("p",null,"In the build script:",-1)),n(i,null,{default:e(()=>t[3]||(t[3]=[o("pre",null,`import compile from '@koumoul/vjsf-compiler'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)`,-1)])),_:1}),t[12]||(t[12]=o("p",null,"In the page:",-1)),n(i,{language:"markup"},{default:e(()=>t[4]||(t[4]=[o("pre",null,`<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <my-vjsf v-model="data" :options="options" />
  </v-form>
</template>`,-1)])),_:1}),t[13]||(t[13]=o("h2",{class:"text-h4 mb-6"}," CommonJS dependencies ",-1)),t[14]||(t[14]=o("p",null,"Unfortunately some of the dependencies used by vjsf are published in the CommonJS format. This breaks homogeneity with the otherwise ESM modules of this library. You might need to inform your build system, for example with Vite:",-1)),n(i,{language:"js"},{default:e(()=>t[5]||(t[5]=[o("pre",null,`import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'
...
  optimizeDeps: {
    include: commonjsDeps,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
...`,-1)])),_:1}),t[15]||(t[15]=o("p",null,"When changing these parameters in Vite some caching can create confusion, in this case you can use `vite --force` or remove `node_modules/.cache/vite`.",-1))]),_:1})}}};export{T as default};
