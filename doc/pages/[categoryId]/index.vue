<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container v-if="examplesCategory">
    <h1 class="text-h3 mb-6">
      {{ examplesCategory.title }}
    </h1>
    <div v-html="$markdown(examplesCategory.description)" />
    <template
      v-for="example in examplesCategory.examples"
      :key="example.id"
    >
      <h2 class="text-h4 mt-8 mb-3">
        {{ example.title }}
      </h2>
      <div v-html="$markdown(example.description)" />
      <example
        :example="example"
        :v2="examplesCategory.id === 'v2'"
      />
    </template>
  </v-container>
  <v-alert v-else>
    No examples category found with id {{ $route.params.categoryId }}
  </v-alert>
</template>

<script>
import examples from '~/examples/'

export default {
  computed: {
    examplesCategory () {
      return examples.find(e => e.id === this.$route.params.categoryId)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
