<script setup>
import { VCheckbox } from 'vuetify/components'
import { computed } from 'vue'
import { getInputProps } from '../../utils/index.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfCheckboxNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
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
