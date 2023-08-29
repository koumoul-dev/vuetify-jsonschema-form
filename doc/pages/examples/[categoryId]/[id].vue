<template>
  <example :example="example" />
</template>

<script>
import { examples } from '@json-layout/examples'

export default {
  computed: {
    example () {
      for (const examplesGroup of examples) {
        for (const example of examplesGroup.examples) {
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
