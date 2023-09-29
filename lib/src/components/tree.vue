<script setup>
import Node from './node.vue'

defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').StateTree> */
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
  <v-row>
    <node
      :stateful-layout="statefulLayout"
      :model-value="modelValue.root"
    />
  </v-row>
</template>
