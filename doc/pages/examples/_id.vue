<template>
  <v-container>
    <example-wrapper :params="example" :start-activated="true" />
  </v-container>
</template>

<script>
import ExampleWrapper from '~/components/example-wrapper'
import { examples } from '~/examples'

export default {
  components: { ExampleWrapper },
  data() {
    return {
      example: examples.find(e => e.id === this.$route.params.id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
