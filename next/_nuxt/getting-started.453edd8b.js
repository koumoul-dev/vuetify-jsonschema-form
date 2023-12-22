import{_ as c}from"./code-block.bd392ce6.js";import{_ as p,i,E as m,A as e,t as d,x as t,y as u,z as o,B as s}from"./entry.7a28d242.js";import{V as _}from"./VContainer.ddac67c8.js";import{V as h}from"./VAlert.b28214d7.js";import"./prism.a56ee833.js";import"./VGrid.c7d929ae.js";import"./VBtn.ea6d8330.js";const f={components:{VContainer:_,VAlert:h},data:()=>({title:"Getting started"}),head(){return{title:"VJSF - "+this.title}}},g={class:"text-h2 mb-8"},v=t("i",null,"JSON Layout",-1),y=t("p",null,"Install from npm:",-1),b=t("h2",{class:"text-h4 mb-6"}," Compile at runtime ",-1),k=t("p",null,"This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.",-1),w=t("pre",null,`<script setup>
  import Vjsf from '@koumoul/vjsf'
<\/script>
<template>
  <vjsf v-model="data" :schema="schema" :options="options" />
</template>`,-1),V=t("h2",{class:"text-h4 mb-6"}," Compile at build time ",-1),x=t("p",null,"This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.",-1),j=t("p",null,"In the build script:",-1),S=t("pre",null,`import { compile } from '@koumoul/vjsf/compile'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)`,-1),J=t("p",null,"In the page:",-1),C=t("pre",null,`<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
<\/script>
<template>
  <my-vjsf v-model="data" :options="options" />
</template>`,-1);function F(a,T,$,B,I,N){const l=i("v-alert"),n=c,r=i("v-container");return d(),m(r,{class:"doc-content-page"},{default:e(()=>[t("h1",g,u(a.title),1),o(l,{type:"warning",variant:"outlined",class:"mb-8"},{default:e(()=>[s(" VJSF and its core "),v,s(" are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. ")]),_:1}),y,o(n,null,{default:e(()=>[s("npm install @koumoul/vjsf@next")]),_:1}),b,k,o(n,{language:"markup"},{default:e(()=>[w]),_:1}),V,x,j,o(n,null,{default:e(()=>[S]),_:1}),J,o(n,{language:"markup"},{default:e(()=>[C]),_:1})]),_:1})}const O=p(f,[["render",F]]);export{O as default};
