<!-- eslint-disable vue/no-v-html -->
<template>
  <v-alert
    v-if="!examplesCategory || !example"
    type="warning"
    variant="outlined"
    class="mb-4"
  >
    Unknown example
  </v-alert>
  <v-container
    v-else
    fluid
  >
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
    <v-alert
      v-if="example.warning"
      type="warning"
      variant="outlined"
      class="mb-4"
    >
      <markdown-block :content="example.warning" />
    </v-alert>
    <markdown-block :content="example.description" />
    <example
      :example="example"
      :v2="examplesCategory.id === 'v2-compat'"
    />
  </v-container>
</template>

<script>
import { VContainer, VBtn, VAlert } from 'vuetify/components'
import examples from '~/examples'

export default {
  components: { VContainer, VBtn, VAlert },
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
