<script setup lang="ts">
import { StatefulLayout, NumberFieldNode } from '@json-layout/core'
import { VTextField } from 'vuetify/components'
import { computed } from 'vue'
import { getInputProps } from '../../utils/props'

const props = defineProps<{ modelValue: NumberFieldNode, statefulLayout: StatefulLayout }>()

const fieldProps = computed(() => {
  const fieldProps = getInputProps(props.modelValue)
  if ('step' in props.modelValue.layout) fieldProps.step = props.modelValue.layout.step
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
