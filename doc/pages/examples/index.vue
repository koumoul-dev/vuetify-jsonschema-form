<template>
  <v-container>
    <example-wrapper v-for="example in examples" :key="example.key" :params="example" />
  </v-container>
</template>

<script>
import ExampleWrapper from '~/components/example-wrapper'
const examples = require('~/examples')

export default {
  components: { ExampleWrapper },
  data: () => ({ examples })
}
</script>

<style lang="css" scoped>
</style>
