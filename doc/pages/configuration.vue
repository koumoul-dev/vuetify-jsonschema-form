<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <h1 class="text-h2 mb-8">
      {{ title }}
    </h1>
    <h2 class="text-h4 mb-6">
      Compile options
    </h2>

    <p class="mb-6">
      These options can only be used at compile time, they cannot be overwritten at runtime or in the intermediate levels of the schema
    </p>

    <options-list :options="compileOptions" />

    <h2 class="text-h4 my-6">
      Runtime options
    </h2>

    <p class="mb-6">
      These options can be used both at compile time and at runtime, and they can be overwritten in intermediate levels of the schema using `layout.options`.
    </p>

    <options-list :options="runtimeOptions" />
  </v-container>
</template>

<script setup>
import { VContainer } from 'vuetify/components'
import { compileOptions, runtimeOptions } from '~/assets/doc-options'

const title = 'Configuration'

useHead({
  title: 'VJSF - ' + title,
})
</script>
