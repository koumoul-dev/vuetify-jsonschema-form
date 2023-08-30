<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <h1 class="text-h3 mt-8 mb-3">
      {{ example.title }}
    </h1>
    <div v-html="$markdown(example.description)" />
    <example :example="example" />
  </v-container>
</template>

<script>
import { examples } from '@json-layout/examples'

export default {
  computed: {
    example () {
      for (const examplesCategory of examples) {
        for (const example of examplesCategory.examples) {
          if (example.id === this.$route.params.id) { return example }
        }
      }
      return null
    }
  }
}
</script>

<style lang="css" scoped>
</style>
