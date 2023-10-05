<script setup>
import { VSlider } from 'vuetify/components'
import { computed } from 'vue'
import { getInputProps } from '../../utils/props.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').SliderNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

const fieldProps = computed(() => {
  const fieldProps = getInputProps(props.modelValue, props.statefulLayout)
  if ('step' in props.modelValue.layout) fieldProps.step = props.modelValue.layout.step
  fieldProps.min = props.modelValue.layout.min
  fieldProps.max = props.modelValue.layout.max
  return fieldProps
})
</script>

<template>
  <v-slider
    type="number"
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value && Number(value))"
  />
</template>
