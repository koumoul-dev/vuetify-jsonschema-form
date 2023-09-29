<script setup>
import { VTextField } from 'vuetify/components'
import { computed } from 'vue'
import { getInputProps } from '../../utils/props.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').NumberFieldNode> */
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
