<script setup lang="ts">
import { StatefulLayout, TextareaNode } from '@json-layout/core'
import { VTextarea } from 'vuetify/components'
import { computed } from 'vue'
import { fullFieldProps } from './utils'

const props = defineProps<{ modelValue: TextareaNode, statefulLayout: StatefulLayout }>()

const fieldProps = computed(() => fullFieldProps(props.modelValue))
</script>

<template>
  <v-textarea
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
  />
</template>
