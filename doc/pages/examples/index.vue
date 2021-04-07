<template>
  <v-container class="examples-container">
    <template v-for="(examplesGroup, i) in examples">
      <example-wrapper v-for="example in examplesGroup.examples" :key="i + example.key" :params="example" />
    </template>
  </v-container>
</template>

<script>
import ExampleWrapper from '~/components/example-wrapper'
import { examples } from '~/examples'
import { scrollToHash } from '~/app/router.scrollBehavior.js'

export default {
  components: { ExampleWrapper },
  data: () => ({ examples }),
  mounted() {
    if (this.$route.hash) {
      location.hash = this.$route.hash
      scrollToHash(this.$route.hash, false)
    }
  },
  head() {
    return {
      title: 'vjsf - Examples'
    }
  }
}
</script>

<style lang="css" scoped>
.example-wrapper:last-child {
  height: 100vh;
}
</style>
