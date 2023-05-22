// TODO: a large switch based on layoutNode subtype checks
// or a dynamic component name like so: "vjsf-node-{stateNode.comp}" ?
// that would make more sense in the context of pre-compiled vjsf component with dynamic list of node components loaded

<script setup lang="ts">
import { isTextField, isSection, StateNode, StatefulLayout } from '@json-layout/core'
import NodeSection from './nodes/section.vue'
import NodeTextField from './nodes/text-field.vue'

defineProps<{ node: StateNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  <node-section
    v-if="isSection(node)"
    :stateful-layout="statefulLayout"
    :node="node"
  />
  <node-text-field
    v-if="isTextField(node)"
    :stateful-layout="statefulLayout"
    :node="node"
  />
</template>
