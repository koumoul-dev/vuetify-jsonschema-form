<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <h1 class="text-h3 mt-8 mb-3">
      {{ example.title }}
    </h1>
    <div v-html="$markdown(example.description)" />
    <example
      :example="example"
      :v2="examplesCategory.id === 'v2'"
    />
  </v-container>
</template>

<script>
import examples from '~/examples/'

export default {
  computed: {
    examplesCategory () {
      return examples.find(e => e.id === this.$route.params.categoryId)
    },
    example () {
      return this.examplesCategory?.find(e => e.id === this.$route.params.id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
