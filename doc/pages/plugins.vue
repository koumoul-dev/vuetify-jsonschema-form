<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container class="doc-content-page">
    <h1 class="text-h2 mb-8">
      {{ title }}
    </h1>

    <p>All components that are quite light and that mostly use Vuetify components are included directly into vjsf. But other components that use more specific dependencies are externalized into plugins.</p>

    <h2 class="text-h4 my-6">
      Known plugins
    </h2>

    <h3 class="test-h6 my-4">
      @koumoul/vjsf-markdown
    </h3>

    <p>This plugin provides a rich markdown editor based on <a href="https://github.com/Ionaru/easy-markdown-editor">EasyMDE</a>. You can customize EasyMDE configuration like so:</p>

    <code-block>
      <pre>
const vjsfOptions = {
  ...
  plugins: {
    markdown: {
      easyMDEOptions: { minHeight: '300px', maxHeight: '300px' }
    }
  }
}</pre>
    </code-block>

    <p>Please note that this plugins uses <a href="https://github.com/Ionaru/easy-markdown-editor">EasyMDE</a> which is a CommonJS dependency. You might need to declare it to your build system. For example with Vite:</p>
    <code-block>
      <pre>
optimizeDeps: {
  include: ['easymde']
}
</pre>
    </code-block>

    <h2 class="text-h4 my-6">
      Using a plugin
    </h2>

    <p>Install it:</p>

    <code-block language="bash">
      npm install @koumoul/vjsf-markdown
    </code-block>

    <p>When using compilation at build time, installing the plugin is sufficient and the necessary imports will be taken care of automatically.</p>

    <p>When using compilation at runtime, you should import the plugin and provide it to vjsf using the nodeComponents option:</p>

    <code-block>
      <pre>
import Vjsf from '@koumoul/vjsf'
import VjsfNodeMarkdown from '@koumoul/vjsf-markdown'

const options = {
  nodeComponents: {
    markdown: VjsfNodeMarkdown
  }
}
</pre>
    </code-block>
  </v-container>
</template>

<script setup>
import { VContainer } from 'vuetify/components'

const title = 'Plugins'

useHead({
  title: 'VJSF - ' + title
})
</script>
