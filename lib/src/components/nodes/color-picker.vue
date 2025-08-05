<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VColorPicker } from 'vuetify/components/VColorPicker'
import { computed, toRef } from 'vue'
import useNode from '../../composables/use-node.js'
import { useDefaults } from 'vuetify'

useDefaults({}, 'VjsfColorPicker')

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfColorPickerNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

const { compProps, localData } = useNode(toRef(props, 'modelValue'), props.statefulLayout)

const colorPickerProps = computed(() => {
  const colorPickerProps = { ...compProps.value }
  colorPickerProps.modelValue = localData.value
  return colorPickerProps
})

const menuProps = computed(() => {
  return {
    minWidth: '300px',
    maxWidth: '300px',
  }
})
</script>

<template>
  <text-field-menu
    :model-value="modelValue"
    v-bind="menuProps"
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
