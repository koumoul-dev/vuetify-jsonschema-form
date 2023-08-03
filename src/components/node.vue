<script setup lang="ts">
import { isTextField, isSection, isNumberField, StateNode, StatefulLayout } from '@json-layout/core'
import NodeSection from './nodes/section.vue'
import NodeTextField from './nodes/text-field.vue'
import NodeNumberField from './nodes/number-field.vue'

defineProps<{ modelValue: StateNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  <node-section
    v-if="isSection(modelValue)"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
  />
  <node-text-field
    v-if="isTextField(modelValue)"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
  />
  <node-number-field
    v-if="isNumberField(modelValue)"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
  />
</template>
