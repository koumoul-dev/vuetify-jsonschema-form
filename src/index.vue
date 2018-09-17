<template lang="html">
  <property :schema="resolvedSchema" :model-wrapper="modelWrapper" :debug="debug" model-key="root" parent-key=""/>
</template>

<script>
import jref from 'json-ref-lite'
import Property from './Property.vue'
export default {
  name: 'VJsonschemaForm',
  components: {Property},
  props: ['schema', 'model', 'debug'],
  data() {
    return {modelWrapper: {root: this.model}}
  },
  computed: {
    resolvedSchema() {
      return this.schema && jref.resolve(this.schema)
    }
  }
}
</script>
