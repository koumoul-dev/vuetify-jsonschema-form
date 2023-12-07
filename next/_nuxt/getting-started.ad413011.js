import{_ as a}from"./code-block.a7239852.js";import{_ as l,L as r,A as e,t as p,x as t,y as c,z as o,B as s}from"./entry.956ef850.js";import{V as m}from"./VContainer.82cc81db.js";import{V as d}from"./VAlert.71066fc2.js";import"./prism.138abcea.js";import"./VGrid.b0ce6ed8.js";import"./VBtn.459fcd6c.js";const u={data:()=>({title:"Getting started"}),head(){return{title:"VJSF - "+this.title}}},h={class:"text-h2 mb-8"},_=t("i",null,"JSON Layout",-1),f=t("p",null,"Install from npm:",-1),g=t("h2",{class:"text-h4 mb-6"}," Compile at runtime ",-1),y=t("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1),b=t("pre",null,`<script setup>
  import { Vjsf } from '@koumoul/vjsf'
<\/script>
<template>
  <vjsf v-model="data" :schema="schema" :options="options" />
</template>`,-1),v=t("h2",{class:"text-h4 mb-6"}," Compile at build time ",-1),k=t("p",null,"This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.",-1),w=t("p",null,"In the build script:",-1),V=t("pre",null,`import { compile } from '@koumoul/vjsf/compile'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)`,-1),x=t("p",null,"In the page:",-1),j=t("pre",null,`<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
<\/script>
<template>
  <my-vjsf v-model="data" :options="options" />
</template>`,-1);function S(i,J,F,T,$,B){const n=a;return p(),r(m,{class:"doc-content-page"},{default:e(()=>[t("h1",h,c(i.title),1),o(d,{type:"warning",variant:"outlined",class:"mb-8"},{default:e(()=>[s(" VJSF and its core "),_,s(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ")]),_:1}),f,o(n,null,{default:e(()=>[s("npm install @koumoul/vjsf@next")]),_:1}),g,y,o(n,{language:"markup"},{default:e(()=>[b]),_:1}),v,k,w,o(n,null,{default:e(()=>[V]),_:1}),x,o(n,{language:"markup"},{default:e(()=>[j]),_:1})]),_:1})}const D=l(u,[["render",S]]);export{D as default};
