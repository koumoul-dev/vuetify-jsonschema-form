<template>
  <v-container>
    <example-wrapper v-for="example in examples" :key="example.key" :params="example" />
  </v-container>
</template>

<script>
import ExampleWrapper from '~/components/example-wrapper'
import examples from '~/examples'

export default {
  components: { ExampleWrapper },
  data: () => ({ examples })
}
</script>

<style lang="css" scoped>
</style>
