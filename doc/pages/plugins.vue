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

    <ul>
      <li><b>@koumoul/vjsf-markdown</b> - provides a rich markdown editor based on <a href="https://github.com/Ionaru/easy-markdown-editor">EasyMDE</a>.</li>
    </ul>

    <h2 class="text-h4 my-6">
      Using a plugin
    </h2>

    <p>Install it:</p>

    <code-block>
      npm install @koumoul/vjsf-markdown
    </code-block>

    <p>When using compilation at build time, installing the plugin is sufficient and the necessary imports will be taken care of automatically.</p>

    <p>When using compilation at runtime, you should import the plugin for it to register its component(s) with vjsf:</p>

    <code-block>
      <pre>
import Vjsf from '@koumoul/vjsf'
import '@koumoul/vjsf-markdown'
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
