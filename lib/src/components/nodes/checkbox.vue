<script setup lang="ts">
import { StatefulLayout, type CheckboxNode } from '@json-layout/core'
import { VCheckbox } from 'vuetify/components'
import { computed } from 'vue'
import { getInputProps } from '../../utils/props.js'

const props = defineProps<{ modelValue: CheckboxNode, statefulLayout: StatefulLayout }>()

const fieldProps = computed(() => getInputProps(props.modelValue))
</script>

<template>
  <v-checkbox
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
  />
</template>
