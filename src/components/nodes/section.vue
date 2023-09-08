<script setup lang="ts">
import { SectionNode, StatefulLayout } from '@json-layout/core'
import Node from '../node.vue'

defineProps<{ modelValue: SectionNode, statefulLayout: StatefulLayout }>()

</script>

<template>
  <node
    v-for="child of modelValue.children"
    :key="child.fullKey"
    :model-value="child"
    :stateful-layout="statefulLayout"
  />
</template>
