<template>
  <v-container class="doc-content-page">
    <h1 class="text-h2 mb-8">
      {{ title }}
    </h1>
    <p>
      The old documentation for v2 is still available <a href="https://koumoul-dev.github.io/vuetify-jsonschema-form/2.x/">here</a>.
    </p>
    <p>
      VJSF v3 is a complete rewrite. The motivation was to :
    </p>
    <p>
      <ul>
        <li>migrate to vue 3 and vuetify 3</li>
        <li>rethink the annotations vocabulary and the options for more power and clarity</li>
        <li>losen the coupling between schema structure and presentation while preserving simplicity</li>
        <li>implement a saner reactivity model and hopefully see gains in performance and stability</li>
        <li>fully validate the data (using Ajv) and offer a stronger guarantee that a valid form means a valid output data</li>
        <li>extract all the core logic into a separate project (<a href="https://github.com/json-layout/json-layout">JSON Layout</a>) to pave the way for implementations in other UI frameworks</li>
        <li>provide a compilation solution that allows the users to move as much pre-processing as possible (and the associated dependencies) to build time</li>
      </ul>
    </p>
    <p>
      Being an entirely new major version of VJSF with a new vocabulary of annotations, breaking changes are inevitable. But a compatibility function is provided to help facilitate the migration.
    </p>

    <code-block>
      <pre>
import { v2compat } from '@koumoul/vjsf/compat/v2'
const v3Schema = v2compat(schema)
      </pre>
    </code-block>
  </v-container>
</template>

<script>
import { VContainer } from 'vuetify/components'

export default {
  components: {
    VContainer
  },
  data: () => ({
    title: 'v2 to v3'
  }),
  head () {
    return {
      title: 'VJSF - ' + this.title
    }
  }
}
</script>

<style lang="css" scoped>
</style>
