import{Ct as e,H as t,Wt as n,b as r,f as i,it as a,p as o,x as s}from"./DAU6Le7d.js";import{n as c}from"./pcmOeemA.js";import{t as l}from"./RaW-_SRg.js";import{t as u}from"./C7QhYIeT.js";import{t as d}from"./DzI9DZhV2.js";var f=`Getting started`,p={__name:`getting-started`,setup(p){return c({title:`VJSF - Getting started`,meta:[{name:`description`,content:`Install VJSF and start using it in your projects`}]}),(c,p)=>{let m=d;return t(),o(e(u),{class:`doc-content-page`},{default:a(()=>[i(`h1`,{class:`text-display-medium mb-8`},n(f)),s(e(l),{type:`warning`,variant:`outlined`,class:`mb-8`},{default:a(()=>[...p[0]||=[r(` VJSF and its core `,-1),i(`i`,null,`JSON Layout`,-1),r(` are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side. `,-1)]]),_:1}),p[6]||=i(`p`,null,`Install from npm:`,-1),s(m,null,{default:a(()=>[...p[1]||=[r(`npm install @koumoul/vjsf`,-1)]]),_:1}),p[7]||=i(`h2`,{class:`text-headline-large mb-6`},` Compile at runtime `,-1),p[8]||=i(`p`,null,`This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.`,-1),s(m,{language:`markup`},{default:a(()=>[...p[2]||=[i(`pre`,null,`<script setup>
  import Vjsf from '@koumoul/vjsf'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <vjsf v-model="data" :schema="schema" :options="options" />
  </v-form>
</template>`,-1)]]),_:1}),p[9]||=i(`h2`,{class:`text-headline-large mb-6`},` Compile at build time `,-1),p[10]||=i(`p`,null,`This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.`,-1),p[11]||=i(`p`,null,`In the build script:`,-1),s(m,null,{default:a(()=>[...p[3]||=[i(`pre`,null,`import compile from '@koumoul/vjsf-compiler'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)`,-1)]]),_:1}),p[12]||=i(`p`,null,`In the page:`,-1),s(m,{language:`markup`},{default:a(()=>[...p[4]||=[i(`pre`,null,`<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
  import { VForm } from 'vuetify/components'
<\/script>
<template>
  <v-form>
    <my-vjsf v-model="data" :options="options" />
  </v-form>
</template>`,-1)]]),_:1}),p[13]||=i(`h2`,{class:`text-headline-large mb-6`},` CommonJS dependencies `,-1),p[14]||=i(`p`,null,`Unfortunately some of the dependencies used by vjsf are published in the CommonJS format. This breaks homogeneity with the otherwise ESM modules of this library. You might need to inform your build system, for example with Vite:`,-1),s(m,{language:`js`},{default:a(()=>[...p[5]||=[i(`pre`,null,`import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'
...
  optimizeDeps: {
    include: commonjsDeps,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
...`,-1)]]),_:1}),p[15]||=i(`p`,null,"When changing these parameters in Vite some caching can create confusion, in this case you can use `vite --force` or remove `node_modules/.cache/vite`.",-1)]),_:1})}}};export{p as default};