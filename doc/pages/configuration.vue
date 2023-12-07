<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <h1 class="text-h2 mb-8">
      {{ title }}
    </h1>
    TODO
  </v-container>
</template>

<script setup>
import { VContainer } from 'vuetify/components'
const title = 'Configuration'
useHead({
  title: 'VJSF - ' + title
})
</script>
