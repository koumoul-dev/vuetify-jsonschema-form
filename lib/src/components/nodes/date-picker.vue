<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VDatePicker } from 'vuetify/components/VDatePicker'
import { useDate, useDefaults } from 'vuetify'
import { computed, ref, toRef } from 'vue'
import { getDateTimeParts, getDateTimeWithOffset } from '../../utils/dates.js'
import useField from '../../composables/use-field.js'

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

const { compProps, localData } = useField(toRef(props, 'modelValue'), props.statefulLayout)

const datePickerProps = computed(() => {
  const datePickerProps = { ...compProps.value }
  datePickerProps.hideActions = true
  if (localData.value) datePickerProps.modelValue = new Date(/** @type {string} */(localData.value))
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

const formattedValue = computed(() => {
  return localData.value ? vDate.format(/** @type {string} */(localData.value), 'fullDateWithWeekday') : null
})

</script>

<template>
  <text-field-menu
    v-model:menu-opened="menuOpened"
    :model-value="props.modelValue"
    :stateful-layout="statefulLayout"
    :formatted-value="formattedValue"
  >
    <v-date-picker v-bind="datePickerProps" />
  </text-field-menu>
</template>
