<script setup lang="ts">
import { StatefulLayout, DatePickerNode } from '@json-layout/core'
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { computed } from 'vue'
import { getCompProps } from './utils'

const props = defineProps<{ modelValue: DatePickerNode, statefulLayout: StatefulLayout }>()

const datePickerProps = computed(() => {
  const datePickerProps = getCompProps(props.modelValue, 'datePicker', true)
  datePickerProps.hideActions = true
  return datePickerProps
})
</script>

<template>
  <text-field-menu :model-value="modelValue">
    <template #default="{close}">
      <v-date-picker
        v-bind="datePickerProps"
        @update:model-value="value => {statefulLayout.input(modelValue, value && Number(value)); close()}"
      />
    </template>
  </text-field-menu>
</template>
