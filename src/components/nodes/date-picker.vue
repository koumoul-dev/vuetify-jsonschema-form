<script setup lang="ts">
import { StatefulLayout, DatePickerNode } from '@json-layout/core'
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { useDate } from 'vuetify/labs/date'
import { computed } from 'vue'
import { getCompProps } from '../../utils/props'
import { getDateTimeParts } from '../../utils/dates'

const props = defineProps<{ modelValue: DatePickerNode, statefulLayout: StatefulLayout }>()

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
    :formatted-value="modelValue.data && vDate.format(modelValue.data, 'fullDateWithWeekday')"
  >
    <template #default="{close}">
      <v-date-picker
        v-bind="datePickerProps"
        @update:model-value="value => {statefulLayout.input(modelValue, value && getDateTimeParts(value as unknown as Date)[0]); close()}"
      />
    </template>
  </text-field-menu>
</template>
