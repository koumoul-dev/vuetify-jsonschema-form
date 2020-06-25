<template>
  <v-container>
    <h1 class="display-1 mb-4">
      Getting started
    </h1>

    <h2 class="headline my-4">
      Load from CDN
    </h2>
    <!-- eslint-disable vue/html-indent -->
    <v-sheet v-hljs dark class="codeblock">
      <pre><code class="html">&lt;script src="https://cdn.jsdelivr.net/npm/@koumoul/vjsf@latest/dist/main.js"&gt;&lt;/script&gt;
&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@koumoul/vjsf@latest/dist/main.css"&gt;
&lt;!-- load third-party dependencies (markdown-it, vuedraggable) --&gt;
&lt;!-- you can also load them separately based on your needs --&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/@koumoul/vjsf@latest/dist/third-party.js"&gt;&lt;/script&gt;</code></pre>
</v-sheet>
    <v-sheet v-hljs dark class="codeblock">
      <pre><code class="javascript">Vue.component('VJsf', VJsf.default)</code></pre>
    </v-sheet>

    <h2 class="headline my-4">
      Load from NPM
    </h2>
    <v-sheet v-hljs dark class="codeblock">
      <pre><code class="bash">npm install --save @koumoul/vjsf</code></pre>
    </v-sheet>

    <h3 class="title my-4">
      Import built version of the module
    </h3>
    <v-sheet v-hljs dark class="codeblock">
      <pre><code class="javascript">import VJsf from '@koumoul/vjsf'
import '@koumoul/vjsf/dist/main.css'
// load third-party dependencies (markdown-it, vuedraggable)
// you can also load them separately based on your needs
import '@koumoul/vjsf/dist/third-party.js'

Vue.component('VJsf', VJsf)</code></pre>
    </v-sheet>

    <h3 class="title my-4">
      Import module from source
    </h3>
    <p>
      This is useful if you wish to let your build tool analyze the source code of vjsf. Particularily interesting if you use vuetify-loader.
    </p>
    <v-sheet v-hljs dark class="codeblock">
      <pre><code class="javascript">import VJsf from '@koumoul/vjsf/lib/VJsf.js'
import '@koumoul/vjsf/lib/VJsf.css'
// load third-party dependencies (markdown-it, vuedraggable)
// you can also load them separately based on your needs
import '@koumoul/vjsf/lib/deps/third-party.js'

Vue.component('VJsf', VJsf)</code></pre>
    </v-sheet>
    <v-sheet v-hljs dark class="codeblock">
      <pre><code class="javascript">// you should have something like the following somewhere in webpack.config.js or nuxt.config.js, etc.
build: {
  transpile: ['vuetify', /@koumoul/], // necessary for "à la carte" import of vuetify components
}
</code></pre>
    </v-sheet>

    <h2 class="headline my-4">
      Usage
    </h2>

    <v-sheet v-hljs dark class="codeblock">
      <pre><code class="html">&lt;v-form v-model="valid"&gt;
  &lt;v-jsf v-model="model" :schema="schema" :options="options" /&gt;
&lt;/ v-form&gt;</code></pre>
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
