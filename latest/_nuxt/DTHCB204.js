import{_ as a}from"./DjIZopqU.js";import{u as l}from"./BHk_mjvq.js";import{F as r,A as t,G as i,t as c,x as e,y as p,z as o,B as s}from"./DCimiJpv.js";import{V as u}from"./CxHPv1BN.js";import{V as d}from"./DATennmL.js";import"./BjF0KBdL.js";import"./CaN0hT5d.js";import"./CG1VKr1Q.js";import"./DEMaEIsj.js";import"./DeuvvsEa.js";import"./B9RFWRfe.js";/* empty css        */const h=e("i",null,"JSON Layout",-1),f=e("p",null,"Install from npm:",-1),_=e("h2",{class:"text-h4 mb-6"}," Compile at runtime ",-1),g=e("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1),y=e("pre",null,`<script setup>
  import Vjsf from '@koumoul/vjsf'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <vjsf v-model="data" :schema="schema" :options="options" />
  </v-form>
</template>`,-1),v=e("h2",{class:"text-h4 mb-6"}," Compile at build time ",-1),b=e("p",null,"This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.",-1),j=e("p",null,"In the build script:",-1),V=e("pre",null,`import { compile } from '@koumoul/vjsf/compile'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)`,-1),w=e("p",null,"In the page:",-1),k=e("pre",null,`<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <my-vjsf v-model="data" :options="options" />
  </v-form>
</template>`,-1),x=e("h2",{class:"text-h4 mb-6"}," CommonJS dependencies ",-1),S=e("p",null,"Unfortunately some of the dependencies used by vjsf are published in the CommonJS format. This breaks homogeneity with the otherwise ESM modules of this library. You might need to inform your build system, for example with Vite:",-1),F=e("pre",null,`import { commonjsDeps, commonjsDepsPaths } from '@koumoul/vjsf/utils/build.js'
...
  optimizeDeps: {
    include: commonjsDeps,
  },
  build: {
    commonjsOptions: {
      include: commonjsDepsPaths,
    },
  },
...`,-1),J=e("p",null,"When changing these parameters in Vite some caching can create confusion, in this case you can use `vite --force` or remove `node_modules/.cache/vite`.",-1),m="Getting started",U={__name:"getting-started",setup(C){return l({title:"VJSF - "+m}),(D,T)=>{const n=a;return c(),r(i(d),{class:"doc-content-page"},{default:t(()=>[e("h1",{class:"text-h2 mb-8"},p(m)),o(i(u),{type:"warning",variant:"outlined",class:"mb-8"},{default:t(()=>[s(" VJSF and its core "),h,s(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ")]),_:1}),f,o(n,null,{default:t(()=>[s("npm install @koumoul/vjsf")]),_:1}),_,g,o(n,{language:"markup"},{default:t(()=>[y]),_:1}),v,b,j,o(n,null,{default:t(()=>[V]),_:1}),w,o(n,{language:"markup"},{default:t(()=>[k]),_:1}),x,S,o(n,{language:"js"},{default:t(()=>[F]),_:1}),J]),_:1})}}};export{U as default};
