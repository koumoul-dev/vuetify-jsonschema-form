<template>
  <v-container>
    <h1 class="display-1 my-4">
      Getting started
    </h1>

    <h2 class="headline my4">
      Load from CDN
    </h2>
    <!-- eslint-disable vue/html-indent -->
    <v-sheet v-hljs dark class="codeblock">
      <code class="html">&lt;script src="https://cdn.jsdelivr.net/npm/@koumoul/vjsf@latest/dist/main.js"&gt;&lt;/script&gt;
&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@koumoul/vjsf@latest/dist/main.css"&gt;</code>
    </v-sheet>
    <v-sheet v-hljs dark class="codeblock">
      <code class="javascript">Vue.component('VJsf', VJsf.default)</code>
    </v-sheet>

    <h2 class="headline my4">
      Load from NPM
    </h2>
    <v-sheet v-hljs dark class="codeblock">
      <code class="bash">npm install --save @koumoul/vjsf</code>
    </v-sheet>

    <h3 class="title my4">
      Import built version of the module
    </h3>
    <v-sheet v-hljs dark class="codeblock">
      <code class="javascript">import VJsf from '@koumoul/vjsf'
import '@koumoul/vjsf/dist/main.css'

Vue.component('VJsf', VJsf)</code>
    </v-sheet>

    <h3 class="title my4">
      Import module from source
    </h3>
    <p>
      This is useful if you wish to let your built tool analyze the source code of vjsf. Particularily interesting if you use vuetify-loader.
    </p>
    <v-sheet v-hljs dark class="codeblock">
      <code class="javascript">import VJsf from '@koumoul/vjsf'
import '@koumoul/vjsf/dist/main.css'

Vue.component('VJsf', VJsf)</code>
    </v-sheet>

    <!-- eslint-enable vue/html-indent -->
  </v-container>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.v-sheet.codeblock {
  margin-top: 6px;
  margin-bottom: 18px;
  padding: 8px 8px 2px 8px;
}
.v-sheet.codeblock code {
  background: none;
  box-shadow: none;
}
.v-sheet.codeblock code::before {
  content: "";
}
</style>
