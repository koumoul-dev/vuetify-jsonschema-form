<template lang="html">
  <property
    v-if="!!resolvedSchema"
    :schema="resolvedSchema"
    :model-root="modelWrapper.root"
    :model-wrapper="modelWrapper"
    :options="fullOptions"
    model-key="root"
    parent-key=""
    @error="e => $emit('error', e)"
  />
</template>

<script>
import jrefs from './json-refs'
import Property from './Property.vue'
import colors from './colors'
export default {
  name: 'VJsonschemaForm',
  components: {Property},
  props: ['schema', 'model', 'options'],
  data() {
    return {modelWrapper: {root: this.model}}
  },
  computed: {
    resolvedSchema() {
      return jrefs.resolve(this.schema)
    },
    fullOptions() {
      const httpLib = this.axios || this.$http || this.$axios
      return Object.assign({}, {
        debug: false,
        httpLib,
        disableAll: false,
        colors,
        autoFoldObjects: false,
        requiredMessage: 'This information is required',
        noDataMessage: 'No matching value found',
        searchMessage: 'Search...'
      }, this.options)
    }
  }
}
</script>
