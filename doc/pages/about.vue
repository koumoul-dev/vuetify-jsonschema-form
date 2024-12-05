<template>
  <v-container class="doc-content-page">
    <h1 class="text-h2 mb-8">
      {{ title }}
    </h1>

    <p>
      VJSF is a library to create forms for <a href="https://vuejs.org/">Vue.js</a> / <a href="https://vuetifyjs.com/">Vuetify</a> applications in a declarative manner using annotated <a href="https://json-schema.org/">JSON Schemas</a>. The core of VJSF is <a href="https://github.com/json-layout/json-layout">JSON Layout</a>.
    </p>
    <p>
      It is written primarily as a "scratch my own itch" project by <a href="https://koumoul.com">Koumoul</a>, and we use it extensively.
      But it is opened to feedback and contributions on <a href="https://github.com/koumoul-dev/vuetify-jsonschema-form">Github</a> and it is published under the very permissive MIT license.
    </p>

    <p>
      It might be suited for you if:
    </p>
    <ul>
      <li>you are tired of coding forms</li>
      <li>you need declarative forms as a consequence of your software's architecture (generic admin UI, etc.)</li>
      <li>you already use Vue.js + Vuetify (or if you are prepared to pull a bunch of new dependencies)</li>
    </ul>

    <p>
      We try to strike a nice balance between these qualities:
    </p>
    <ul>
      <li><b>simplicity</b> - feed VJSF a simple and valid JSON schema and you should get a viable form</li>
      <li><b>completeness</b> - the main JSON schemas semantics should be covered as well as the most common use-cases for forms in Web applications</li>
      <li><b>extensibility</b> - more specific use cases should also be supported through the use of lower level tools like slots, custom styles, etc.</li>
      <li><b>validity</b> - the output of the form should be valid against the provided schema</li>
      <li><b>homogeneity</b> - the look and feel should be consistent accross all form functionalities and inside your application as a whole</li>
    </ul>
    <p>
      While trying to strike this balance we made some debatable choices that you should be aware of:
    </p>
    <ul>
      <li>Structure and presentation are coupled. Meaning that the rendering of the form is derived directly from the schema (as well as some options) and you will need to change the schema in order to modify a label, create a section, etc.</li>
      <li>Some functionalities are explicitly coupled to Vuetify. We let you use parameters that are directly mapped to Vuetify underlying components (slots, props, layout classes, etc.)</li>
    </ul>
  </v-container>
</template>

<script setup>
import { VContainer } from 'vuetify/components'

const title = 'About'

useHead({
  title: 'VJSF - ' + title,
})
</script>

<style lang="css">
</style>
