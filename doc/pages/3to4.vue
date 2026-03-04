<template>
  <v-container class="doc-content-page">
    <h1 class="text-display-medium mb-8">
      {{ title }}
    </h1>
    <p>
      The old documentation for v3 is still available <a href="https://koumoul-dev.github.io/vuetify-jsonschema-form/3.x/">here</a>.
    </p>
    <p>
      VJSF v4 is simply a port to Vuetify 4. No known breakage on our side, simply upgrade as part of the process of <a href="https://vuetifyjs.com/en/getting-started/upgrade-guide/#multi-step-migration">upgrading from Vuetify 3 to 4</a>.
    </p>
  </v-container>
</template>

<script setup>
import { VContainer } from 'vuetify/components'

const title = 'v3 to v4'

useHead({
  title: 'VJSF - ' + title,
  meta: [{ name: 'description', content: 'Instructions on how to migrate from VJSF v3 to v4.' }],
})
</script>

<style lang="css" scoped>
</style>
