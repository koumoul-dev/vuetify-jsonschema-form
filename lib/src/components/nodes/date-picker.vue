<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VDatePicker } from 'vuetify/components/VDatePicker'
import { useDate, useDefaults } from 'vuetify'
import { computed } from 'vue'
import { getCompProps, getDateTimeParts } from '../../utils/index.js'

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

const datePickerProps = computed(() => {
  const datePickerProps = getCompProps(props.modelValue, true)
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
