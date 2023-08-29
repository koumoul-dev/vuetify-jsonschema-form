<script setup lang="ts">
import { StateNode, StatefulLayout } from '@json-layout/core'

defineProps<{ modelValue: StateNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  <component
    :is="`vjsf-node-${modelValue.layout.comp}`"
    v-if="modelValue.layout.comp !== 'none'"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
  />
</template>
