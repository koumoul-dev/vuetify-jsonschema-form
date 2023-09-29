<script setup>
import { VTextField } from 'vuetify/components'
import { computed } from 'vue'
import { getInputProps } from '../../utils/props.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').TextFieldNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

const fieldProps = computed(() => getInputProps(props.modelValue))
</script>

<template>
  <v-text-field
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
  />
</template>
