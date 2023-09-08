<script setup lang="ts">
import { StatefulLayout, NumberFieldNode } from '@json-layout/core'
import { VTextField } from 'vuetify/components'
import { computed } from 'vue'
import { fullFieldProps } from './utils'

const props = defineProps<{ modelValue: NumberFieldNode, statefulLayout: StatefulLayout }>()

const fieldProps = computed(() => {
  const fieldProps = fullFieldProps([props.modelValue.layout.options?.numberFieldProps, props.modelValue.layout.props], props.modelValue)
  if ('step' in props.modelValue.layout) fieldProps.step = props.modelValue.layout
  return fieldProps
})
</script>

<template>
  <v-text-field
    type="number"
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value && Number(value))"
  />
</template>
