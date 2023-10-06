import{_ as a}from"./code-block.bba734be.js";import{_ as l,I as r,x as e,m as c,s as t,t as p,v as o,y as s}from"./entry.bb0bdacd.js";import{V as m}from"./VContainer.d256f190.js";import{V as d}from"./VAlert.8f739323.js";import"./tag.ddf107cf.js";import"./VBtn.d9550529.js";const u={data:()=>({title:"Getting started"}),head(){return{title:"vjsf - "+this.title}}},_={class:"text-h2 mb-8"},h=t("i",null,"JSON Layout",-1),f=t("p",null,"Install from npm:",-1),g=t("pre",null,`npm install @koumoul/vjsf
      `,-1),y=t("h2",{class:"text-h4 mb-6"}," Compile at runtime ",-1),b=t("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1),v=t("pre",null,`<script setup>
  import { VJsf } from '@koumoul/vjsf'
<\/script>
<template>
  <v-jsf v-model="data" :schema="schema" :options="options" />
</template>
      `,-1),k=t("h2",{class:"text-h4 mb-6"}," Compile at build time ",-1),w=t("p",null,"This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.",-1),V=t("p",null,"In the build script:",-1),x=t("pre",null,`import { compile } from '@koumoul/vjsf/compile'
const code = compile(schema, options)
await writeFile('./components/my-v-jsf.vue', code)
      `,-1),j=t("p",null,"In your page:",-1),S=t("pre",null,`<script setup>
  import { VJsf } from './components/my-v-jsf'
<\/script>
<template>
  <my-v-jsf v-model="data" :options="options" />
</template>
      `,-1);function J(i,I,T,$,C,F){const n=a;return c(),r(m,{class:"doc-content-page"},{default:e(()=>[t("h1",_,p(i.title),1),o(d,{type:"warning",variant:"outlined",class:"mb-8"},{default:e(()=>[s(" VJSF and its core "),h,s(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ")]),_:1}),f,o(n,null,{default:e(()=>[g]),_:1}),y,b,o(n,{language:"markup"},{default:e(()=>[v]),_:1}),k,w,V,o(n,null,{default:e(()=>[x]),_:1}),j,o(n,{language:"markup"},{default:e(()=>[S]),_:1})]),_:1})}const G=l(u,[["render",J]]);export{G as default};
