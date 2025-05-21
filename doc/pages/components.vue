<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <h1 class="text-h2 mb-8">
      {{ title }}
    </h1>

    <v-alert
      type="warning"
      variant="outlined"
      class="mb-8"
    >
      This page describes the annotation system of json-schema for Vjsf in a somewhat technical way.
      For a more intuitive approach please explore the examples.
    </v-alert>

    <h2 class="text-h4 mb-6">
      Vocabulary
    </h2>

    <p class="mb-2">
      The json schema provided to Vjsf can be enriched using the <code>layout keyword</code>.
      This keyword is formally defined <a href="https://github.com/json-layout/json-layout/blob/main/vocabulary/src/normalized-layout/schema.json">here</a>.
      It is automatically normalized for mor efficient processing, the normalized version is defined <a href="https://github.com/json-layout/json-layout/blob/main/vocabulary/src/normalized-layout/schema.json">here</a>.
    </p>

    <p class="mb-2">
      A default component is automatically attributed to each property in the schema, it can be overwritten using <code>layout=component name</code> or <code>layout.comp=component name</code>.
      The <code>layout keyword</code> content varies depending on the component.
    </p>

    <h2 class="text-h4 mb-6">
      Common component properties
    </h2>

    <p class="mb-2">
      These properties are shared by multiple components depending on their characteristics.
    </p>

    <comp-schema
      :schema="normalizedLayoutSchema['$defs']['base-comp-object']"
      name="base component properties"
    />
    <comp-schema
      :schema="normalizedLayoutSchema['$defs']['composite-comp-object'].allOf[1]"
      name="composite component properties"
    />
    <comp-schema
      :schema="normalizedLayoutSchema['$defs']['simple-comp-object'].allOf[1]"
      name="simple component properties (not composite)"
    />
    <comp-schema
      :schema="normalizedLayoutSchema['$defs']['focusable-comp-object'].allOf[1]"
      name="focusable component properties"
    />
    <comp-schema
      :schema="normalizedLayoutSchema['$defs']['items-based-comp-object'].allOf[1]"
      name="items based component properties (for selection controls)"
    />
    <comp-schema
      :schema="normalizedLayoutSchema['$defs']['multiple-compat-comp-object'].allOf[1]"
      name="array compatible component properties"
    />

    <h2 class="text-h4 my-6">
      Standard components
    </h2>
    <comp-list :components="standardComponents" />

    <h2 class="text-h4 my-6">
      Plugin components
    </h2>
    <comp-list :components="pluginComponents" />
  </v-container>
</template>

<script setup>
import { VContainer, VAlert } from 'vuetify/components'
import { standardComponents } from '@json-layout/vocabulary'
import { normalizedLayoutSchema } from '@json-layout/vocabulary/normalize'
import markdown from '@koumoul/vjsf-markdown'
// import pack from '../../package.json'

const title = 'Components'

useHead({
  title: 'VJSF - ' + title,
})

// const vocabVersion = pack.devDependencies['@json-layout/vocabulary']
const pluginComponents = [markdown.info]
</script>
