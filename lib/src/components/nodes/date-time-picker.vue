<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VDatePicker } from 'vuetify/components/VDatePicker'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VTabs, VTab, VTabsWindow, VTabsWindowItem } from 'vuetify/components/VTabs'
import { VIcon } from 'vuetify/components/VIcon'
import { VSheet } from 'vuetify/components/VSheet'
import { useDate, useDefaults } from 'vuetify'
import { computed, ref, watch, toRef } from 'vue'
import { getDateTimeParts, getDateTimeWithOffset, getShortTime } from '../../utils/dates.js'
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

const tab = ref('date')
const menuOpened = ref(false)
watch(menuOpened, () => { tab.value = 'date' })

const { compProps } = useField(toRef(props, 'modelValue'), props.statefulLayout)

const datePickerProps = computed(() => {
  const datePickerProps = { ...compProps.value }
  datePickerProps.hideActions = true
  if (props.modelValue.data) datePickerProps.modelValue = new Date(props.modelValue.data)
  datePickerProps['onUpdate:modelValue'] = (/** @type {Date} */value) => {
    if (!value) return

    if (props.modelValue.data) {
      // replace date part of current value
      const datePart = value && getDateTimeParts(/** @type Date */(/** @type unknown */(value)))[0]
      props.statefulLayout.input(props.modelValue, datePart + props.modelValue.data.slice(10))
    } else {
      props.statefulLayout.input(props.modelValue, getDateTimeWithOffset(value))
    }
    tab.value = 'time'
  }
  return datePickerProps
})

const timePickerProps = computed(() => {
  const timePickerProps = { ...compProps.value }
  timePickerProps['ampm-in-title'] = true
  if (props.modelValue.data) timePickerProps.modelValue = getShortTime(props.modelValue.data.slice(11))
  timePickerProps['onUpdate:modelValue'] = (/** @type {string} */value) => {
    if (!props.modelValue.data) return
    console.log('set time', value, props.modelValue.data.slice(0, 10), props.modelValue.data.slice(15))
    props.statefulLayout.input(props.modelValue, props.modelValue.data.slice(0, 11) + value + props.modelValue.data.slice(16))
  }
  return timePickerProps
})
</script>

<template>
  <text-field-menu
    v-model:menu-opened="menuOpened"
    :model-value="modelValue"
    :stateful-layout="statefulLayout"
    :formatted-value="modelValue.data && vDate.format(modelValue.data, 'fullDateTime')"
  >
    <v-sheet style="width: 328px">
      <v-tabs
        v-model="tab"
        align-tabs="center"
      >
        <v-tab value="date">
          <v-icon>mdi-calendar</v-icon>
        </v-tab>
        <v-tab
          value="time"
          :disabled="!modelValue.data"
        >
          <v-icon>mdi-clock</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="date">
          <v-date-picker v-bind="datePickerProps" />
        </v-tabs-window-item>
        <v-tabs-window-item value="time">
          <v-time-picker v-bind="timePickerProps" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-sheet>
  </text-field-menu>
</template>
