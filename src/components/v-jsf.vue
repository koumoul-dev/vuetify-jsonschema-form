<script setup lang="ts">
import { compile, StatefulLayout, StatefulLayoutOptions } from '@json-layout/core'
import Tree from './tree.vue'
import { ref, computed, getCurrentInstance, watch } from 'vue'

import NodeSection from './nodes/section.vue'
import NodeTextField from './nodes/text-field.vue'
import NodeTextarea from './nodes/textarea.vue'
import NodeCheckbox from './nodes/checkbox.vue'
import NodeSwitch from './nodes/switch.vue'
import NodeNumberField from './nodes/number-field.vue'
import NodeOneOfSelect from './nodes/one-of-select.vue'
import Tabs from './nodes/tabs.vue'
import VerticalTabs from './nodes/vertical-tabs.vue'
import ExpansionPanels from './nodes/expansion-panels.vue'

const comps = {
  section: NodeSection,
  'text-field': NodeTextField,
  textarea: NodeTextarea,
  checkbox: NodeCheckbox,
  switch: NodeSwitch,
  'number-field': NodeNumberField,
  'one-of-select': NodeOneOfSelect,
  tabs: Tabs,
  'vertical-tabs': VerticalTabs,
  'expansion-panels': ExpansionPanels
}

const instance = getCurrentInstance()
for (const [name, comp] of Object.entries(comps)) {
  if (!instance?.appContext.app.component(`vjsf-node-${name}`)) {
    instance?.appContext.app.component(`vjsf-node-${name}`, comp)
  }
}

const props = defineProps<{ schema: object, modelValue: unknown, options: StatefulLayoutOptions }>()
const emit = defineEmits(['update:modelValue', 'update:state'])

const compiledLayout = computed(() => compile(props.schema))
const statefulLayout = new StatefulLayout(compiledLayout.value, compiledLayout.value.skeletonTree, props.options, props.modelValue)

// apply options when it is mutated
watch(() => props.options, (newOptions) => { statefulLayout.options = { ...newOptions } }, { deep: true })

watch(() => props.modelValue, (newData) => {
  // case where data is updated from outside
  if (statefulLayout.data !== newData) statefulLayout.data = newData
})

const stateTree = ref(statefulLayout.stateTree)

statefulLayout.events.on('update', () => {
  stateTree.value = statefulLayout.stateTree
  emit('update:modelValue', statefulLayout.data)
  emit('update:state', statefulLayout)
})
emit('update:state', statefulLayout)

</script>

<template>
  <tree
    :model-value="stateTree"
    :stateful-layout="statefulLayout"
  />
</template>
