<script setup lang="ts">
import { SectionNode, StatefulLayout } from '@json-layout/core'
import Node from '../node.vue'

defineProps<{ modelValue: SectionNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  section:
  <node
    v-for="child of modelValue.children"
    :key="child.key"
    :model-value="child"
    :stateful-layout="statefulLayout"
  />
</template>
