<script setup>
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'

defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../types.js').VjsfSectionNode> */
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
  <section-header :node="modelValue" />
  <v-row :dense="modelValue.options?.density === 'compact' || modelValue.options?.density === 'comfortable'">
    <node
      v-for="child of modelValue.children"
      :key="child.fullKey"
      :model-value="/** @type import('../types.js').VjsfNode */(child)"
      :stateful-layout="statefulLayout"
    />
  </v-row>
</template>
