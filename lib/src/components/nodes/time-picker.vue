<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { useDate, useDefaults } from 'vuetify'
import { computed } from 'vue'
import { getCompProps, getShortTime, getLongTime } from '../../utils/index.js'

useDefaults({}, 'VjsfDatePicker')

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfDatePickerNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

const vDate = useDate()

const timePickerProps = computed(() => {
  const timePickerProps = getCompProps(props.modelValue, true)
  timePickerProps['ampm-in-title'] = true
  if (props.modelValue.data) timePickerProps.modelValue = getShortTime(props.modelValue.data)
  return timePickerProps
})
</script>

<template>
  <text-field-menu
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
    :formatted-value="timePickerProps.modelValue && vDate.format('2010-04-13T' + timePickerProps.modelValue, 'fullTime')"
  >
    <v-time-picker
      v-bind="timePickerProps"
      @update:model-value="value => {statefulLayout.input(modelValue, value && getLongTime(value))}"
    />
  </text-field-menu>
</template>
