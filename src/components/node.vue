<script setup lang="ts">
import { StateNode, StatefulLayout } from '@json-layout/core'

defineProps<{ modelValue: StateNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  <v-col
    :cols="modelValue.cols"
    :class="{
      'pa-2': modelValue.options.density === 'default',
      'pa-1': modelValue.options.density === 'comfortable',
      'pa-1 pb-0': modelValue.options.density === 'compact'
    }"
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
