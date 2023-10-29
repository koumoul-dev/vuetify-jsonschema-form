<script setup>
import { VRow } from 'vuetify/components'
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
  <v-row class="vjsf-tree">
    <node
      :stateful-layout="statefulLayout"
      :model-value="/** @type import('./types.js').VjsfNode */(modelValue.root)"
    />
  </v-row>
</template>
