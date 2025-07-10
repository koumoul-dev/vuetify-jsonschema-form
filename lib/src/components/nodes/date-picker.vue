<script setup>
import TextFieldMenu from '../fragments/text-field-menu.vue'
import { VIcon } from 'vuetify/components/VIcon'
import { VDatePicker } from 'vuetify/components/VDatePicker'
import { useDefaults } from 'vuetify'
import { computed, ref, toRef, watch } from 'vue'
import Debug from 'debug'
import { getDateTimeParts, getDateTimeWithOffset, localeKeyboardFormat } from '../../utils/dates.js'
import useNode from '../../composables/use-node.js'
import useCompDefaults from '../../composables/use-comp-defaults.js'

const debug = Debug('vjsf:date-picker')

useDefaults({}, 'VjsfDatePicker')
const datePickerDefaults = useCompDefaults('VDatePicker', { hideHeader: true })

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

const menuOpened = ref(false)

const { compProps, localData } = useNode(toRef(props, 'modelValue'), props.statefulLayout)

const updateValue = (/** @type {Date | null} */value) => {
  if (!value) return

  const isoValue = props.modelValue.layout.format === 'date-time'
    ? getDateTimeWithOffset(value)
    : getDateTimeParts(/** @type Date */(/** @type unknown */(value)))[0]
  if (isoValue !== localData.value) {
    debug(`apply normalized iso value ${value.toLocaleString()} -> ${isoValue}`)
    props.statefulLayout.input(props.modelValue, isoValue)
    menuOpened.value = false
  }
}

const datePickerProps = computed(() => {
  /** @type Record<String, any> */
  const datePickerProps = { ...datePickerDefaults.value, ...compProps.value }
  datePickerProps.hideActions = true
  if (localData.value) datePickerProps.modelValue = new Date(/** @type {string} */(localData.value))
  datePickerProps['onUpdate:modelValue'] = (/** @type {Date} */value) => {
    updateValue(value)
  }
  return datePickerProps
})

/** @type {import('vue').Ref<string | null>} */
const formattedValue = ref('')
const setFormattedValue = () => {
  formattedValue.value = localData.value ? localeKeyboardFormat(props.modelValue.options.locale).format(new Date(localData.value)) : null
}
watch(localData, setFormattedValue, { immediate: true })
const updateFormattedValue = () => {
  if (formattedValue.value) {
    const newValue = localeKeyboardFormat(props.modelValue.options.locale).parse(formattedValue.value)
    debug(`parsed user input as date ${formattedValue.value} -> ${newValue?.toLocaleString()}`)
    if (!newValue) setFormattedValue()
    else updateValue(newValue)
  }
}

</script>

<template>
  <text-field-menu
    v-model:menu-opened="menuOpened"
    v-model:formatted-value="formattedValue"
    :model-value="props.modelValue"
    :stateful-layout="statefulLayout"
    :readonly="false"
    :placeholder="props.modelValue.messages.keyboardDate"
    @blur="updateFormattedValue"
  >
    <template #prepend-inner>
      <v-icon :icon="statefulLayout.options.icons.calendar" />
    </template>
    <v-date-picker v-bind="datePickerProps" />
  </text-field-menu>
</template>
