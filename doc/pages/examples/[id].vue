<template>
  <v-container>
    <example-wrapper
      :params="example"
      :start-activated="true"
    />
  </v-container>
</template>

<script>
import ExampleWrapper from '~/components/example-wrapper'
// import { examples } from '~/examples'

export default {
  components: { ExampleWrapper }
  /* computed: {
    example () {
      for (const examplesGroup of examples) {
        for (const example of examplesGroup.examples) {
          if (example.id === this.$route.params.id) { return example }
        }
      }
      return null
    }
  } */
}
</script>

<style lang="css" scoped>
</style>
