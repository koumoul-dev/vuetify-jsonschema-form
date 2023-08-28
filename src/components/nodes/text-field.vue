<script setup lang="ts">
import { StatefulLayout, TextFieldNode } from '@json-layout/core'
import { VTextField } from 'vuetify/components'

defineProps<{ modelValue: TextFieldNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  <v-text-field
    :label="modelValue.layout.label"
    :error-messages="modelValue.error"
    :model-value="modelValue.data"
    :readonly="modelValue.mode === 'read'"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
  />
</template>
