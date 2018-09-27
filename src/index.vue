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
import jrefs from 'json-refs'
import Property from './Property.vue'
export default {
  name: 'VJsonschemaForm',
  components: {Property},
  props: ['schema', 'model', 'options'],
  data() {
    return {modelWrapper: {root: this.model}, resolvedSchema: null}
  },
  computed: {
    fullOptions() {
      const httpLib = this.axios || this.$http || this.$axios
      return Object.assign({}, {debug: false, httpLib, disableAll: false}, this.options)
    }
  },
  created() {
    jrefs.resolveRefs(this.schema).then(res => {
      this.resolvedSchema = res.resolved
    }, err => {
      this.$emit('error', err)
    })
  }
}
</script>
