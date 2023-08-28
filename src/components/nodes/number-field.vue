<script setup lang="ts">
import { StatefulLayout, NumberFieldNode } from '@json-layout/core'
import { VTextField } from 'vuetify/components'

defineProps<{ modelValue: NumberFieldNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  <v-text-field
    :label="modelValue.layout.label"
    type="number"
    :step="modelValue.layout.step"
    :error-messages="modelValue.error"
    :model-value="modelValue.data"
    :readonly="modelValue.mode === 'read'"
    @update:model-value="value => statefulLayout.input(modelValue, value && Number(value))"
  />
</template>
