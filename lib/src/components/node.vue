<script setup>
defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').StateNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})
</script>

<template>
  <v-col
    :cols="modelValue.cols"
  >
    <component
      :is="`vjsf-node-${modelValue.layout.comp}`"
      v-if="modelValue.layout.comp !== 'none'"
      :model-value="modelValue"
      :stateful-layout="statefulLayout"
    />
  </v-col>
</template>

<!--<script>
import { h, getCurrentInstance } from 'vue'

export default {
  props: ['modelValue', 'statefulLayout'],
  render () {
    if (this.modelValue.layout.comp === 'none') return
    const instance = getCurrentInstance()
    console.log('RENDER ?', `vjsf-node-${this.modelValue.layout.comp}`, this.modelValue.fullKey)
    const component = instance?.appContext.app.component(`vjsf-node-${this.modelValue.layout.comp}`)
    return h(component, { modelValue: this.modelValue, statefulLayout: this.statefulLayout })
  }
}
</script>
-->
