<script setup>
import { VSwitch } from 'vuetify/components/VSwitch'
import { computed } from 'vue'
import { getInputProps } from '../../utils/index.js'
import { useDefaults } from 'vuetify'

useDefaults({}, 'VjsfSwitch')

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfSwitchNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

const fieldProps = computed(() => {
  const inputProps = getInputProps(props.modelValue, props.statefulLayout)
  // it is not very common to show an error below checkboxes and switches and without hide-details=auto they take a lot of space
  if (!('hideDetails' in inputProps)) inputProps.hideDetails = 'auto'
  return inputProps
})
</script>

<template>
  <v-switch
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
  />
</template>
