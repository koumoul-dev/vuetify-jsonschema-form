<script setup>
import { computed } from 'vue'
import { isSection } from '@json-layout/core'

const { modelValue } = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').StateNode> */
    type: Object,
    required: true
  }
})

const pClass = computed(() => {
  if (modelValue.options.density === 'default') return 'mt-1 mb-5'
  if (modelValue.options.density === 'comfortable') return 'mb-4'
  return 'mb-3'
})
</script>
<template>
  <p
    v-if="isSection(modelValue) && modelValue.layout.subtitle"
    :class="`text-subtitle ${pClass}`"
    v-html="modelValue.layout.subtitle"
  />
</template>
