import{_ as l}from"./code-block.B5k7fgMJ.js";import{u as m}from"./vue.f36acd1f.Wp3BNzrM.js";import{F as r,A as t,G as i,t as c,x as e,y as p,z as o,B as n}from"./entry.CapxH_e5.js";import{V as u}from"./VAlert.iQIxDPCi.js";import{V as d}from"./VContainer.nGEjow1C.js";import"./prismeditor.min.A18OyQv6.js";import"./index.D8FvItpQ.js";import"./tag.BJb0UtWL.js";import"./dimensions.BBteUhws.js";import"./VBtn.sWKEM-XC.js";import"./resizeObserver.DBCIsiOF.js";/* empty css              */const h=e("i",null,"JSON Layout",-1),_=e("p",null,"Install from npm:",-1),f=e("h2",{class:"text-h4 mb-6"}," Compile at runtime ",-1),g=e("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1),y=e("pre",null,`<script setup>
  import Vjsf from '@koumoul/vjsf'
<\/script>
<template>
  <vjsf v-model="data" :schema="schema" :options="options" />
</template>`,-1),b=e("h2",{class:"text-h4 mb-6"}," Compile at build time ",-1),v=e("p",null,"This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.",-1),j=e("p",null,"In the build script:",-1),w=e("pre",null,`import { compile } from '@koumoul/vjsf/compile'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)`,-1),k=e("p",null,"In the page:",-1),V=e("pre",null,`<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
<\/script>
<template>
  <my-vjsf v-model="data" :options="options" />
</template>`,-1),x=e("h2",{class:"text-h4 mb-6"}," CommonJS dependencies ",-1),S=e("p",null,"Unfortunately some of the dependencies used by vjsf are published in the CommonJS format. This breaks homogeneity with the otherwise ESM modules of this library. You might need to inform your build system, for example with Vite:",-1),J=e("pre",null,`import { commonjsDeps, commonjsDepsPaths } from '@koumoul/vjsf/utils/build.js'
...
  optimizeDeps: {
    include: commonjsDeps,
  },
  build: {
    commonjsOptions: {
      include: commonjsDepsPaths,
    },
  },
...`,-1),C=e("p",null,"When changing these parameters in Vite some caching can create confusion, in this case you can use `vite --force` or remove `node_modules/.cache/vite`.",-1),a="Getting started",U={__name:"getting-started",setup(D){return m({title:"VJSF - "+a}),(F,T)=>{const s=l;return c(),r(i(d),{class:"doc-content-page"},{default:t(()=>[e("h1",{class:"text-h2 mb-8"},p(a)),o(i(u),{type:"warning",variant:"outlined",class:"mb-8"},{default:t(()=>[n(" VJSF and its core "),h,n(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ")]),_:1}),_,o(s,null,{default:t(()=>[n("npm install @koumoul/vjsf")]),_:1}),f,g,o(s,{language:"markup"},{default:t(()=>[y]),_:1}),b,v,j,o(s,null,{default:t(()=>[w]),_:1}),k,o(s,{language:"markup"},{default:t(()=>[V]),_:1}),x,S,o(s,{language:"js"},{default:t(()=>[J]),_:1}),C]),_:1})}}};export{U as default};
