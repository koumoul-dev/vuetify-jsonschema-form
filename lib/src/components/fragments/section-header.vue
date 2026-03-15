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

const classes = ['text-display-large', 'text-display-medium', 'text-display-small', 'text-headline-large', 'text-headline-medium', 'text-headline-small', 'text-body-large', 'text-body-large']
const titleClass = computed(() => {
  const index = props.node.titleDepth
  if (props.node.options.density === 'compact') return classes[index + 2]
  if (props.node.options.density === 'comfortable') return classes[index + 1]
  return classes[index]
})
</script>

<template>
  <div
    v-if="(node.layout.title && !hideTitle) || node.layout.subtitle || (node.error && node.validated)"
    :class="`mb-${titleDepthBase - node.titleDepth} mt-${hideTitle ? 0 : (titleDepthBase - node.titleDepth)}`"
  >
    <component
      :is="`h${node.titleDepth}`"
      v-if="node.layout.title && !hideTitle"
      :class="`${titleClass}`"
    >
      {{ node.layout.title }}
    </component>
    <p
      v-if="node.layout.subtitle"
      :class="`text-subtitle mt-${hideTitle ? 0 : (titleDepthBase - node.titleDepth)}`"
      v-html="node.layout.subtitle"
    />
    <v-alert
      v-if="node.error && node.validated"
      type="error"
      :class="`mt-${titleDepthBase - node.titleDepth}`"
    >
      {{ node.error }}
    </v-alert>
  </div>
</template>
