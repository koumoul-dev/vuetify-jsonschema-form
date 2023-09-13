<script setup lang="ts">
import { ref, computed, getCurrentInstance, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { compile, StatefulLayout, StatefulLayoutOptions, StateTree } from '@json-layout/core'
import Tree from './tree.vue'

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
const statefulLayout = ref<StatefulLayout | null>(null)
const stateTree = ref<StateTree | null>(null)

const el = ref(null)
const { width } = useElementSize(el)

const fullOptions = computed<StatefulLayoutOptions | null>(() => {
  if (!width.value) return null
  return { ...props.options, width: Math.round(width.value) }
})

watch(fullOptions, (newOptions) => {
  if (!newOptions) {
    statefulLayout.value = null
  } else if (statefulLayout.value) {
    statefulLayout.value.options = newOptions
  } else {
    const _statefulLayout = new StatefulLayout(compiledLayout.value, compiledLayout.value.skeletonTree, newOptions, props.modelValue)
    statefulLayout.value = _statefulLayout
    stateTree.value = _statefulLayout.stateTree
    _statefulLayout.events.on('update', () => {
      stateTree.value = _statefulLayout.stateTree
      emit('update:modelValue', _statefulLayout.data)
      emit('update:state', _statefulLayout)
    })
    emit('update:state', _statefulLayout)
  }
})

// case where data is updated from outside
watch(() => props.modelValue, (newData) => {
  if (statefulLayout.value && statefulLayout.value.data !== newData) statefulLayout.value.data = newData
})

</script>

<template>
  <div ref="el">
    <tree
      v-if="statefulLayout && stateTree"
      :model-value="stateTree"
      :stateful-layout="(statefulLayout as StatefulLayout)"
    />
  </div>
</template>
