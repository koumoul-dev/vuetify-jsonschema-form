<script setup>
import { VCheckbox } from 'vuetify/components'
import { computed } from 'vue'
import { getInputProps } from '../../utils/props.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').CheckboxNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

const fieldProps = computed(() => getInputProps(props.modelValue, props.statefulLayout))
</script>

<template>
  <v-checkbox
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
  />
</template>
