<script setup lang="ts">
import { isTextField, isSection, isNumberField, isOneOfSelect, StateNode, StatefulLayout } from '@json-layout/core'
import NodeSection from './nodes/section.vue'
import NodeTextField from './nodes/text-field.vue'
import NodeNumberField from './nodes/number-field.vue'
import OneOfSelect from './nodes/one-of-select.vue'

defineProps<{ modelValue: StateNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  <node-section
    v-if="isSection(modelValue)"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
  />
  <node-text-field
    v-else-if="isTextField(modelValue)"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
  />
  <node-number-field
    v-else-if="isNumberField(modelValue)"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
  />
  <one-of-select
    v-else-if="isOneOfSelect(modelValue)"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
  />
  <v-alert
    v-else-if="modelValue.layout.comp !== 'none'"
    type="error"
    variant="outlined"
  >
    Component not supported : {{ modelValue.layout.comp }}
  </v-alert>
</template>
