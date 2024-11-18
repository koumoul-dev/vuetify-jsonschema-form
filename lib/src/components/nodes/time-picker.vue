<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VIcon } from 'vuetify/components/VIcon'
import { useDate, useDefaults } from 'vuetify'
import { computed, toRef } from 'vue'
import { getShortTime, getLongTime } from '../../utils/dates.js'
import useNode from '../../composables/use-node.js'

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

const { compProps, localData } = useNode(toRef(props, 'modelValue'), props.statefulLayout)

const timePickerProps = computed(() => {
  const timePickerProps = { ...compProps.value }
  timePickerProps['ampm-in-title'] = true
  if (localData.value) timePickerProps.modelValue = getShortTime(localData.value)
  return timePickerProps
})
</script>

<template>
  <text-field-menu
    :model-value="props.modelValue"
    :stateful-layout="statefulLayout"
    :formatted-value="timePickerProps.modelValue && vDate.format('2010-04-13T' + timePickerProps.modelValue, 'fullTime')"
  >
    <template #prepend-inner>
      <v-icon :icon="statefulLayout.options.icons.clock" />
    </template>
    <v-time-picker
      v-bind="timePickerProps"
      @update:model-value="value => {statefulLayout.input(props.modelValue, value && getLongTime(value))}"
    />
  </text-field-menu>
</template>
