import{_ as a}from"./code-block.24a9124c.js";import{_ as l,I as r,x as e,m as p,s as t,t as c,v as o,y as n}from"./entry.ecf6d011.js";import{V as m}from"./VContainer.4e42706f.js";import{V as d}from"./VAlert.ab427842.js";import"./prism.639fd599.js";import"./VGrid.62a124ac.js";import"./VBtn.c8bb7252.js";const u={data:()=>({title:"Getting started"}),head(){return{title:"VJSF - "+this.title}}},h={class:"text-h2 mb-8"},_=t("i",null,"JSON Layout",-1),f=t("p",null,"Install from npm:",-1),g=t("h2",{class:"text-h4 mb-6"}," Compile at runtime ",-1),y=t("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1),b=t("pre",null,`<script setup>
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
</template>`,-1);function S(i,J,F,I,T,$){const s=a;return p(),r(m,{class:"doc-content-page"},{default:e(()=>[t("h1",h,c(i.title),1),o(d,{type:"warning",variant:"outlined",class:"mb-8"},{default:e(()=>[n(" VJSF and its core "),_,n(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ")]),_:1}),f,o(s,null,{default:e(()=>[n("npm install @koumoul/vjsf@next")]),_:1}),g,y,o(s,{language:"markup"},{default:e(()=>[b]),_:1}),v,k,w,o(s,null,{default:e(()=>[V]),_:1}),x,o(s,{language:"markup"},{default:e(()=>[j]),_:1})]),_:1})}const E=l(u,[["render",S]]);export{E as default};
