import{_ as r}from"./DbUAIg-R.js";import{u as a}from"./K_7jjPXs.js";import{E as p,C as o,F as m,y as u,z as e,B as n,A as d,D as s}from"./BCMl23rY.js";import{V as f}from"./dIFVbCjq.js";import{V as g}from"./Y9w_EZdE.js";import"./DaF-pQcE.js";import"./CE1G-McA.js";import"./B6FS_0xl.js";import"./reWqVhpc.js";import"./DN0bdKbN.js";import"./B1JnOqyW.js";const l="Getting started",C={__name:"getting-started",setup(y){return a({title:"VJSF - "+l,meta:[{name:"description",content:"Install VJSF and start using it in your projects"}]}),(v,t)=>{const i=r;return u(),p(m(g),{class:"doc-content-page"},{default:o(()=>[e("h1",{class:"text-display-medium mb-8"},d(l)),n(m(f),{type:"warning",variant:"outlined",class:"mb-8"},{default:o(()=>[...t[0]||(t[0]=[s(" VJSF and its core ",-1),e("i",null,"JSON Layout",-1),s(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ",-1)])]),_:1}),t[6]||(t[6]=e("p",null,"Install from npm:",-1)),n(i,null,{default:o(()=>[...t[1]||(t[1]=[s("npm install @koumoul/vjsf",-1)])]),_:1}),t[7]||(t[7]=e("h2",{class:"text-headline-large mb-6"}," Compile at runtime ",-1)),t[8]||(t[8]=e("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1)),n(i,{language:"markup"},{default:o(()=>[...t[2]||(t[2]=[e("pre",null,`<script setup>
  import Vjsf from '@koumoul/vjsf'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <vjsf v-model="data" :schema="schema" :options="options" />
  </v-form>
</template>`,-1)])]),_:1}),t[9]||(t[9]=e("h2",{class:"text-headline-large mb-6"}," Compile at build time ",-1)),t[10]||(t[10]=e("p",null,"This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.",-1)),t[11]||(t[11]=e("p",null,"In the build script:",-1)),n(i,null,{default:o(()=>[...t[3]||(t[3]=[e("pre",null,`import compile from '@koumoul/vjsf-compiler'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)`,-1)])]),_:1}),t[12]||(t[12]=e("p",null,"In the page:",-1)),n(i,{language:"markup"},{default:o(()=>[...t[4]||(t[4]=[e("pre",null,`<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <my-vjsf v-model="data" :options="options" />
  </v-form>
</template>`,-1)])]),_:1}),t[13]||(t[13]=e("h2",{class:"text-headline-large mb-6"}," CommonJS dependencies ",-1)),t[14]||(t[14]=e("p",null,"Unfortunately some of the dependencies used by vjsf are published in the CommonJS format. This breaks homogeneity with the otherwise ESM modules of this library. You might need to inform your build system, for example with Vite:",-1)),n(i,{language:"js"},{default:o(()=>[...t[5]||(t[5]=[e("pre",null,`import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'
...
  optimizeDeps: {
    include: commonjsDeps,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
...`,-1)])]),_:1}),t[15]||(t[15]=e("p",null,"When changing these parameters in Vite some caching can create confusion, in this case you can use `vite --force` or remove `node_modules/.cache/vite`.",-1))]),_:1})}}};export{C as default};
