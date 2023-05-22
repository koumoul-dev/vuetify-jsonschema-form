<template>
  <v-container>
    <!--<v-text-field label="hey!" />-->
    <!--{{ example }}-->
    {{ model }}
    <v-form>
      <v-jsf
        v-model="model"
        :schema="example.schema"
      />
    </v-form>
  </v-container>
</template>

<script>
import { examples } from '@json-layout/examples'
import { VJsf } from '~/../src/'

export default {
  components: { VJsf },
  data: () => ({
    model: {}
  }),
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
