<script setup lang="ts">
import { StatefulLayout, TextFieldNode } from '@json-layout/core'
import { VTextField } from 'vuetify/components'
import { computed } from 'vue'
import { getInputProps } from './utils'

const props = defineProps<{ modelValue: TextFieldNode, statefulLayout: StatefulLayout }>()

const fieldProps = computed(() => getInputProps(props.modelValue))
</script>

<template>
  <v-text-field
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
  />
</template>
