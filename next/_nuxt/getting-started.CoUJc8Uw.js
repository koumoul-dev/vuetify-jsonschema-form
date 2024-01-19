import{_ as a}from"./code-block.m7PAVCBw.js";import{u as m}from"./vue.f36acd1f.-IvtMOSS.js";import{F as r,A as e,G as i,t as p,x as t,y as c,z as o,B as s}from"./entry.fxzHD1Px.js";import{V as u}from"./VAlert.EFt1PGWf.js";import{V as d}from"./VContainer.MjyRRpHI.js";import"./prism.gi14KCl2.js";import"./index._y1APrdy.js";import"./tag.JOC0f8Ok.js";import"./VBtn.A__WKVv2.js";import"./resizeObserver.yy7fxAlh.js";/* empty css              */const h=t("i",null,"JSON Layout",-1),_=t("p",null,"Install from npm:",-1),f=t("h2",{class:"text-h4 mb-6"}," Compile at runtime ",-1),g=t("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1),y=t("pre",null,`<script setup>
  import Vjsf from '@koumoul/vjsf'
<\/script>
<template>
  <vjsf v-model="data" :schema="schema" :options="options" />
</template>`,-1),b=t("h2",{class:"text-h4 mb-6"}," Compile at build time ",-1),j=t("p",null,"This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.",-1),v=t("p",null,"In the build script:",-1),w=t("pre",null,`import { compile } from '@koumoul/vjsf/compile'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)`,-1),k=t("p",null,"In the page:",-1),V=t("pre",null,`<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
<\/script>
<template>
  <my-vjsf v-model="data" :options="options" />
</template>`,-1),x=t("h2",{class:"text-h4 mb-6"}," CommonJS dependencies ",-1),S=t("p",null,"Unfortunately some of the dependencies used by vjsf are published in the CommonJS format. This breaks homogeneity with the otherwise ESM modules of this library. You might need to inform your build system, for example with Vite:",-1),J=t("pre",null,`import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'
...
  optimizeDeps: {
    include: commonjsDeps,
  },
  build: {
    commonjsOptions: {
      include: commonjsDeps,
    },
  },
...`,-1),l="Getting started",L={__name:"getting-started",setup(C){return m({title:"VJSF - "+l}),(F,T)=>{const n=a;return p(),r(i(d),{class:"doc-content-page"},{default:e(()=>[t("h1",{class:"text-h2 mb-8"},c(l)),o(i(u),{type:"warning",variant:"outlined",class:"mb-8"},{default:e(()=>[s(" VJSF and its core "),h,s(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ")]),_:1}),_,o(n,null,{default:e(()=>[s("npm install @koumoul/vjsf@next")]),_:1}),f,g,o(n,{language:"markup"},{default:e(()=>[y]),_:1}),b,j,v,o(n,null,{default:e(()=>[w]),_:1}),k,o(n,{language:"markup"},{default:e(()=>[V]),_:1}),x,S,o(n,{language:"js"},{default:e(()=>[J]),_:1})]),_:1})}}};export{L as default};
