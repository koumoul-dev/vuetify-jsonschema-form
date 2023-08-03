<script setup lang="ts">
import { ref } from 'vue'
import { StatefulLayout } from '@json-layout/core'
import Node from './node.vue'

const props = defineProps<{ modelValue: StatefulLayout }>()

const root = ref(props.modelValue.root)

props.modelValue.events.on('update', (newValue: StatefulLayout) => {
  root.value = newValue.root
})
</script>

<template>
  <node
    :stateful-layout="modelValue"
    :model-value="root"
  />
</template>
