<script setup lang="ts">
import { SectionNode, StatefulLayout } from '@json-layout/core'
import Node from '../node.vue'

defineProps<{ node: SectionNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  section:
  <node
    v-for="child of node.children"
    :key="child.key"
    :node="child"
    :stateful-layout="statefulLayout"
  />
</template>
