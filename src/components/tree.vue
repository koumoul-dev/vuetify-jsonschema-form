<script setup lang="ts">
import { StateTree, StatefulLayout } from '@json-layout/core'
import Node from './node.vue'

defineProps<{ modelValue: StateTree, statefulLayout: StatefulLayout }>()
</script>

<template>
  <node
    :stateful-layout="statefulLayout"
    :model-value="modelValue.root"
  />
</template>
