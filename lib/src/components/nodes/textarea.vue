<script setup lang="ts">
import { StatefulLayout, TextareaNode } from '@json-layout/core'
import { VTextarea } from 'vuetify/components'
import { computed } from 'vue'
import { getInputProps } from '../../utils/props.js'

const props = defineProps<{ modelValue: TextareaNode, statefulLayout: StatefulLayout }>()

const fieldProps = computed(() => getInputProps(props.modelValue))
</script>

<template>
  <v-textarea
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
  />
</template>
