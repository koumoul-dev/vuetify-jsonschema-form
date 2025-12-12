<script setup>
import { VAlert } from 'vuetify/components/VAlert'
import { computed } from 'vue'

const props = defineProps({
  node: {
    /** @type import('vue').PropType<import('../../types.js').VjsfNode> */
    type: Object,
    required: true
  },
  hideTitle: {
    type: Boolean,
    default: false
  }
})

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
  <div
    v-if="(node.layout.title && !hideTitle) || node.layout.subtitle || (node.error && node.validated)"
    :class="`mb-${titleDepthBase - node.options.titleDepth} mt-${hideTitle ? 0 : (titleDepthBase - node.options.titleDepth)}`"
  >
    <component
      :is="`h${node.options.titleDepth}`"
      v-if="node.layout.title && !hideTitle"
      :class="`${titleClass}`"
    >
      {{ node.layout.title }}
    </component>
    <p
      v-if="node.layout.subtitle"
      :class="`text-subtitle mt-${hideTitle ? 0 : (titleDepthBase - node.options.titleDepth)}`"
      v-html="node.layout.subtitle"
    />
    <v-alert
      v-if="node.error && node.validated"
      type="error"
      :class="`mt-${titleDepthBase - node.options.titleDepth}`"
    >
      {{ node.error }}
    </v-alert>
  </div>
</template>
