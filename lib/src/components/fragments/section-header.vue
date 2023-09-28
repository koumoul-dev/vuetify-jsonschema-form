<script setup lang="ts">
import { computed } from 'vue'
import { StateNode } from '@json-layout/core'

const props = defineProps<{ node: StateNode }>()

const titleDepthBase = computed(() => {
  if (props.node.options.density === 'compact') return 6
  if (props.node.options.density === 'comfortable') return 7
  return 8
})

const classes = ['text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5', 'text-h6', 'text-subtitle-1', 'text-subtitle-2']
const titleClass = computed(() => {
  const index = props.node.options.titleDepth
  if (props.node.options.density === 'compact') return classes[index + 2]
  if (props.node.options.density === 'comfortable') return classes[index + 1]
  return classes[index]
})
</script>

<template>
  <div :class="`mb-${titleDepthBase - node.options.titleDepth} mt-${titleDepthBase - node.options.titleDepth}`">
    <component
      :is="`h${node.options.titleDepth}`"
      v-if="node.layout.title"
      :class="`${titleClass}`"
    >
      {{ node.layout.title }}
    </component>
    <p
      v-if="node.layout.subtitle"
      :class="`text-subtitle mt-${titleDepthBase - node.options.titleDepth}`"
    >
      {{ node.layout.subtitle }}
    </p>
  </div>
</template>
