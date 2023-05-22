<script setup lang="ts">
import { compile, StatefulLayout } from '@json-layout/core'
import Node from './node.vue'

const props = defineProps<{ schema: object, modelValue: unknown }>()
const emit = defineEmits(['update:modelValue'])

const compiledLayout = compile(props.schema)

const statefulLayout = new StatefulLayout(compiledLayout, compiledLayout.tree, 'write', 1000, props.modelValue)
statefulLayout.events.on('input', (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  hello
  <node
    :stateful-layout="statefulLayout"
    :node="statefulLayout.root"
  />
</template>
