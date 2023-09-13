<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container fluid>
    <h1 class="text-h3 mb-3">
      {{ example.title }}
      <v-btn
        icon="mdi-reply"
        flat
        title="get back to parent page"
        :to="`/${examplesCategory.id}`"
      />
      <v-btn
        v-if="nodeEnv === 'development'"
        icon="mdi-package-variant-closed"
        flat
        title="open compiled version"
        :to="`/compiled/${examplesCategory.id}/${example.id}`"
      />
    </h1>
    <markdown-block :content="example.description" />
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
    nodeEnv () {
      return process.env.NODE_ENV
    },
    examplesCategory () {
      return examples.find(e => e.id === this.$route.params.categoryId)
    },
    example () {
      return this.examplesCategory?.examples.find(e => e.id === this.$route.params.id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
