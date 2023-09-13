<script setup lang="ts">
import { StateNode } from '@json-layout/core'

defineProps<{ node: StateNode }>()
</script>

<template>
  <component
    :is="`h${node.options.titleDepth}`"
    v-if="node.layout.title"
    :class="`text-h${node.options.titleDepth} my-${7 - node.options.titleDepth}`"
  >
    {{ node.layout.title }}
  </component>
</template>
