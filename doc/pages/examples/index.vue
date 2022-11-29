<template>
  <v-container class="examples-container">
    <div
      v-for="(examplesGroup, i) in examples"
      :key="i"
    >
      <example-wrapper
        v-for="(example, j) in examplesGroup.examples"
        :key="`${i}-${j}`"
        :params="example"
      />
    </div>
  </v-container>
</template>

<script>
import ExampleWrapper from '~/components/example-wrapper'
import { examples } from '~/examples'
import { scrollToHash } from '~/app/router.scrollBehavior.js'

export default {
  components: { ExampleWrapper },
  data: () => ({ examples }),
  head () {
    return {
      title: 'vjsf - Examples'
    }
  },
  mounted () {
    // depcrecated now that we use SSR
    if (this.$route.hash && process.client) {
      location.hash = this.$route.hash
      scrollToHash(this.$route.hash, false)
    }
  }
}
</script>

<style lang="css" scoped>
.example-wrapper:last-child {
  height: 100vh;
}
</style>
