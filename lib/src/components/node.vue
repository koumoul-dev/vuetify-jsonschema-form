<script setup>
import { VCol } from 'vuetify/components'
import NodeSlot from './fragments/node-slot.vue'
import HelpMessage from './fragments/help-message.vue'

defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('./types.js').VjsfNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

/** @type Record<import('./types.js').Density, string> */
const beforeAfterClasses = {
  compact: 'my-1',
  comfortable: 'my-2',
  default: 'my-3'
}
</script>

<template>
  <v-col
    :cols="modelValue.cols"
    class="vjsf-node"
  >
    <node-slot
      v-if="modelValue.layout.slots?.before"
      key="before"
      :layout-slot="modelValue.layout.slots?.before"
      :node="modelValue"
      :stateful-layout="statefulLayout"
      :class="beforeAfterClasses[/** @type import('./types.js').VjsfOptions */(modelValue.options).density]"
    />

    <help-message
      v-if="modelValue.layout.help"
      :node="modelValue"
      :class="beforeAfterClasses[/** @type import('./types.js').VjsfOptions */(modelValue.options).density]"
    />
    <node-slot
      v-if="modelValue.layout.slots?.component"
      key="component"
      :layout-slot="modelValue.layout.slots?.component"
      :node="modelValue"
      :stateful-layout="statefulLayout"
    />
    <component
      :is="`vjsf-node-${modelValue.layout.comp}`"
      v-else-if="modelValue.layout.comp !== 'none'"
      :class="`vjsf-node-${modelValue.layout.comp}`"
      :model-value="modelValue"
      :stateful-layout="statefulLayout"
    />

    <node-slot
      v-if="modelValue.layout.slots?.after"
      key="after"
      :layout-slot="modelValue.layout.slots?.after"
      :node="modelValue"
      :stateful-layout="statefulLayout"
      :class="beforeAfterClasses[/** @type import('./types.js').VjsfOptions */(modelValue.options).density]"
    />
  </v-col>
</template>