import{_ as a}from"./CcuRCpzk.js";import{u as r}from"./z9aFarv0.js";import{F as l,A as t,G as i,t as p,x as e,y as c,z as o,B as s}from"./DBzMYewB.js";import{V as u}from"./2LputaBm.js";import{V as d}from"./Dvp-ClNT.js";import"./Cw_5nuFU.js";import"./BFZVDx-b.js";import"./CZZUuXO1.js";import"./C9KdxyT9.js";import"./CVBg_mNe.js";import"./5TnVhMSW.js";/* empty css        */const h=e("i",null,"JSON Layout",-1),f=e("p",null,"Install from npm:",-1),_=e("h2",{class:"text-h4 mb-6"}," Compile at runtime ",-1),g=e("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1),y=e("pre",null,`<script setup>
  import Vjsf from '@koumoul/vjsf'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <vjsf v-model="data" :schema="schema" :options="options" />
  </v-form>
</template>`,-1),v=e("h2",{class:"text-h4 mb-6"}," Compile at build time ",-1),b=e("p",null,"This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.",-1),V=e("p",null,"In the build script:",-1),j=e("pre",null,`import { compile } from '@koumoul/vjsf/compile'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)`,-1),w=e("p",null,"In the page:",-1),k=e("pre",null,`<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <my-vjsf v-model="data" :options="options" />
  </v-form>
</template>`,-1),x=e("h2",{class:"text-h4 mb-6"}," CommonJS dependencies ",-1),S=e("p",null,"Unfortunately some of the dependencies used by vjsf are published in the CommonJS format. This breaks homogeneity with the otherwise ESM modules of this library. You might need to inform your build system, for example with Vite:",-1),F=e("pre",null,`import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'
...
  optimizeDeps: {
    include: commonjsDeps,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
...`,-1),J=e("p",null,"When changing these parameters in Vite some caching can create confusion, in this case you can use `vite --force` or remove `node_modules/.cache/vite`.",-1),m="Getting started",W={__name:"getting-started",setup(C){return r({title:"VJSF - "+m}),(T,M)=>{const n=a;return p(),l(i(d),{class:"doc-content-page"},{default:t(()=>[e("h1",{class:"text-h2 mb-8"},c(m)),o(i(u),{type:"warning",variant:"outlined",class:"mb-8"},{default:t(()=>[s(" VJSF and its core "),h,s(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ")]),_:1}),f,o(n,null,{default:t(()=>[s("npm install @koumoul/vjsf")]),_:1}),_,g,o(n,{language:"markup"},{default:t(()=>[y]),_:1}),v,b,V,o(n,null,{default:t(()=>[j]),_:1}),w,o(n,{language:"markup"},{default:t(()=>[k]),_:1}),x,S,o(n,{language:"js"},{default:t(()=>[F]),_:1}),J]),_:1})}}};export{W as default};
