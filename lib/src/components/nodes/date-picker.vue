<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VDatePicker } from 'vuetify/components/VDatePicker'
import { useDate, useDefaults } from 'vuetify'
import { computed, ref } from 'vue'
import { getCompProps, getDateTimeParts, getDateTimeWithOffset } from '../../utils/index.js'

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

const menuOpened = ref(false)

const datePickerProps = computed(() => {
  const datePickerProps = getCompProps(props.modelValue, true)
  datePickerProps.hideActions = true
  if (props.modelValue.data) datePickerProps.modelValue = new Date(props.modelValue.data)
  datePickerProps['onUpdate:modelValue'] = (/** @type {Date} */value) => {
    if (!value) return
    if (props.modelValue.layout.format === 'date-time') {
      props.statefulLayout.input(props.modelValue, getDateTimeWithOffset(value))
    } else {
      props.statefulLayout.input(props.modelValue, getDateTimeParts(/** @type Date */(/** @type unknown */(value)))[0])
    }
    menuOpened.value = false
  }
  return datePickerProps
})
</script>

<template>
  <text-field-menu
    v-model:menu-opened="menuOpened"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
    :formatted-value="modelValue.data && vDate.format(modelValue.data, 'fullDateWithWeekday')"
  >
    <v-date-picker v-bind="datePickerProps" />
  </text-field-menu>
</template>
