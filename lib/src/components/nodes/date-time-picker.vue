<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VDatePicker } from 'vuetify/components/VDatePicker'
import { VTimePicker } from 'vuetify/components/VTimePicker'
import { VDefaultsProvider } from 'vuetify/components/VDefaultsProvider'
import { VTabs, VTab, VTabsWindow, VTabsWindowItem } from 'vuetify/components/VTabs'
import { VIcon } from 'vuetify/components/VIcon'
import { VSheet } from 'vuetify/components/VSheet'
import { useDate, useDefaults } from 'vuetify'
import { computed, ref, watch, toRef } from 'vue'
import { getDateTimeParts, getDateTimeWithOffset, getShortTime } from '../../utils/dates.js'
import useNode from '../../composables/use-node.js'
import useCompDefaults from '../../composables/use-comp-defaults.js'

useDefaults({}, 'VjsfDatePicker')
const datePickerDefaults = useCompDefaults('VDatePicker', { hideHeader: true })
const timePickerDefaults = useCompDefaults('VTimePicker', { title: '' })

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

const { compProps, localData } = useNode(toRef(props, 'modelValue'), props.statefulLayout)

const datePickerProps = computed(() => {
  const datePickerProps = { ...datePickerDefaults.value, ...compProps.value }
  datePickerProps.hideActions = true
  if (localData.value) datePickerProps.modelValue = new Date(localData.value)
  datePickerProps['onUpdate:modelValue'] = (/** @type {Date} */value) => {
    if (!value) return

    if (localData.value) {
      // replace date part of current value
      const datePart = value && getDateTimeParts(/** @type Date */(/** @type unknown */(value)))[0]
      props.statefulLayout.input(props.modelValue, datePart + localData.value.slice(10))
    } else {
      props.statefulLayout.input(props.modelValue, getDateTimeWithOffset(value))
    }
    tab.value = 'time'
  }
  return datePickerProps
})

const timePickerProps = computed(() => {
  const timePickerProps = { ...timePickerDefaults.value, ...compProps.value }
  if (timePickerProps.format !== '24hr') timePickerProps['ampm-in-title'] = true
  if (localData.value) timePickerProps.modelValue = getShortTime(localData.value.slice(11))
  timePickerProps['onUpdate:modelValue'] = (/** @type {string} */value) => {
    if (!localData.value) return
    props.statefulLayout.input(props.modelValue, localData.value.slice(0, 11) + value + localData.value.slice(16))
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
    <template #prepend-inner>
      <v-icon :icon="statefulLayout.options.icons.calendar" />
    </template>
    <v-sheet style="width: 328px">
      <v-tabs
        v-model="tab"
        align-tabs="center"
      >
        <v-tab value="date">
          <v-icon :icon="statefulLayout.options.icons.calendar" />
        </v-tab>
        <v-tab
          value="time"
          :disabled="!modelValue.data"
        >
          <v-icon :icon="statefulLayout.options.icons.clock" />
        </v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="date">
          <v-date-picker v-bind="datePickerProps" />
        </v-tabs-window-item>
        <v-tabs-window-item value="time">
          <v-defaults-provider :defaults="{global: { density: 'default' }}">
            <v-time-picker v-bind="timePickerProps" />
          </v-defaults-provider>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-sheet>
  </text-field-menu>
</template>
