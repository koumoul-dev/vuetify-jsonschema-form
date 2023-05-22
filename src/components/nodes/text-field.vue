<script setup lang="ts">
import { StatefulLayout, TextFieldNode } from '@json-layout/core'
import { VTextField } from 'vuetify/components'

defineProps<{ node: TextFieldNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  text:
  <v-text-field
    label="label"
    :model-value="node.value"
    @update:model-value="value => statefulLayout.input(node, value)"
  />
</template>
