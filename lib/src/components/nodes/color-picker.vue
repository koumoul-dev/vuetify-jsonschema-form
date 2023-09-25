<script setup lang="ts">
import { StatefulLayout, ColorPickerNode } from '@json-layout/core'
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VColorPicker } from 'vuetify/components'
import { computed } from 'vue'
import { getCompProps } from '../../utils/props.js'

const props = defineProps<{ modelValue: ColorPickerNode, statefulLayout: StatefulLayout }>()

const colorPickerProps = computed(() => {
  const colorPickerProps = getCompProps(props.modelValue, 'colorPicker', true)
  return colorPickerProps
})
</script>

<template>
  <text-field-menu
    :model-value="modelValue"
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
