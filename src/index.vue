<template lang="html">
  <property
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
import jref from 'json-ref-lite'
import Property from './Property.vue'
export default {
  name: 'VJsonschemaForm',
  components: {Property},
  props: ['schema', 'model', 'options'],
  data() {
    return {modelWrapper: {root: this.model}}
  },
  computed: {
    resolvedSchema() {
      return this.schema && jref.resolve(this.schema)
    },
    fullOptions() {
      const httpLib = this.axios || this.$http || this.$axios
      return Object.assign({}, {debug: false, httpLib}, this.options)
    }
  }
}
</script>
