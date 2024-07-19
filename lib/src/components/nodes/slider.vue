<script setup>
import { VSlider } from 'vuetify/components/VSlider'
import { computed } from 'vue'
import { getInputProps } from '../../utils/index.js'
import { useDefaults } from 'vuetify'

useDefaults({}, 'VjsfSlider')

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfSliderNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
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
