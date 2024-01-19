<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container class="doc-content-page">
    <h1 class="text-h2 mb-8">
      {{ title }}
    </h1>

    <v-alert
      type="warning"
      variant="outlined"
      class="mb-8"
    >
      VJSF and its core <i>JSON Layout</i> are not pre-bundled. They are distributed as pure ESM modules written in JS code with type annotations. The transpiling, tree-shaking, minifying, etc should be performed on your side.
    </v-alert>

    <p>Install from npm:</p>
    <code-block>npm install @koumoul/vjsf@next</code-block>

    <h2 class="text-h4 mb-6">
      Compile at runtime
    </h2>
    <p>This is the simplest way to use VJSF. If you work with static schemas you might want to look into compiling at build time instead.</p>

    <code-block language="markup">
      <pre>
&lt;script setup&gt;
  import Vjsf from '@koumoul/vjsf'
&lt;/script&gt;
&lt;template&gt;
  &lt;vjsf v-model="data" :schema="schema" :options="options" /&gt;
&lt;/template&gt;</pre>
    </code-block>

    <h2 class="text-h4 mb-6">
      Compile at build time
    </h2>
    <p>This is a more advanced way of using VJSF. All pre-processing that can be done prior to execution is done at build time, this includes compiling validation functions, compiling expression functions, normalizing the layout keywords and building a skeleton tree of the components that will be used to render the form.</p>

    <p>In the build script:</p>
    <code-block>
      <pre>
import { compile } from '@koumoul/vjsf/compile'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)</pre>
    </code-block>

    <p>In the page:</p>
    <code-block language="markup">
      <pre>
&lt;script setup&gt;
  import MyVjsf from './components/compiled/my-vjsf.vue'
&lt;/script&gt;
&lt;template&gt;
  &lt;my-vjsf v-model="data" :options="options" /&gt;
&lt;/template&gt;</pre>
    </code-block>

    <h2 class="text-h4 mb-6">
      CommonJS dependencies
    </h2>
    <p>Unfortunately some of the dependencies used by vjsf are published in the CommonJS format. This breaks homogeneity with the otherwise ESM modules of this library. You might need to inform your build system, for example with Vite:</p>

    <code-block language="js">
      <pre>
import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'
...
  optimizeDeps: {
    include: commonjsDeps,
  },
  build: {
    commonjsOptions: {
      include: commonjsDeps,
    },
  },
...</pre>
    </code-block>
  </v-container>
</template>

<script setup>
import { VContainer, VAlert } from 'vuetify/components'

const title = 'Getting started'

useHead({
  title: 'VJSF - ' + title
})
</script>
