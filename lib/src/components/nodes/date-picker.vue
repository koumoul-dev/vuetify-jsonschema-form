<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { useDate } from 'vuetify/labs/date'
import { computed } from 'vue'
import { getCompProps } from '../../utils/props.js'
import { getDateTimeParts } from '../../utils/dates.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').DatePickerNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

const vDate = useDate()

const datePickerProps = computed(() => {
  const datePickerProps = getCompProps(props.modelValue, 'datePicker', true)
  datePickerProps.hideActions = true
  if (props.modelValue.data) datePickerProps.modelValue = new Date(props.modelValue.data)
  return datePickerProps
})
</script>

<template>
  <text-field-menu
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
    :formatted-value="modelValue.data && vDate.format(modelValue.data, 'fullDateWithWeekday')"
  >
    <template #default="{close}">
      <v-date-picker
        v-bind="datePickerProps"
        @update:model-value="value => {statefulLayout.input(modelValue, value && getDateTimeParts(/** @type Date */(/** @type unknown */(value)))[0]); close()}"
      />
    </template>
  </text-field-menu>
</template>
