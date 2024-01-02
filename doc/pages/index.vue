<template>
  <v-container
    fluid
    class="text-center index-container"
  >
    <h1 class="text-h1 my-4 text-primary font-weight-bold">
      VJSF
    </h1>

    <p class="text-subtitle font-italic mb-8">
      <b class="text-primary">V</b>uetify <b class="text-primary">J</b>SON <b class="text-primary">S</b>chema <b class="text-primary">F</b>orm
    </p>

    <p class="my-4">
      Easily create beautiful forms that output valid data.
    </p>

    <p class="my-4">
      Based on <a
        href="https://vuejs.org/"
        class="text-primary text-decoration-none font-weight-medium"
      >Vue.js</a> / <a
        href="https://vuetifyjs.com/"
        class="text-primary text-decoration-none font-weight-medium"
      >Vuetify</a> / <a
        href="https://json-schema.org/"
        class="text-primary text-decoration-none font-weight-medium"
      >JSON Schema</a> / <a
        href="https://github.com/json-layout/json-layout"
        class="text-primary text-decoration-none font-weight-medium"
      >JSON Layout</a>.
    </p>

    <!--<iframe
      width="560"
      height="463"
      sandbox="allow-same-origin allow-scripts allow-popups"
      src="https://videos.koumoul.com/videos/embed/29d12ba2-f694-4659-8027-e9386692d8b5?title=0&warningTitle=0&peertubeLink=0&autoplay=1"
      frameborder="0"
      allowfullscreen
    />-->
  </v-container>
</template>

<script setup>
import { VContainer } from 'vuetify/components'

useHead({
  title: 'VJSF'
})
</script>

<style lang="css" scoped>
</style>
