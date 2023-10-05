<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VColorPicker } from 'vuetify/components'
import { computed } from 'vue'
import { getCompProps } from '../../utils/props.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').ColorPickerNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

const colorPickerProps = computed(() => {
  const colorPickerProps = getCompProps(props.modelValue, 'colorPicker', true)
  return colorPickerProps
})
</script>

<template>
  <text-field-menu
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
    :formatted-value="modelValue.data"
  >
    <template
      v-if="modelValue.data"
      #prepend-inner
    >
      <div :style="`height:30px; width: 30px; border-radius: 40px; margin-right:6px; background: ${modelValue.data};`" />
    </template>
    <v-color-picker
      v-bind="colorPickerProps"
      @update:model-value="value => statefulLayout.input(modelValue, value)"
    />
  </text-field-menu>
</template>
