<script setup lang="ts">
import { ref, computed, getCurrentInstance, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { compile, StatefulLayout, StateTree } from '@json-layout/core'
import Tree from './tree.vue'

import NodeSection from './nodes/section.vue'
import NodeTextField from './nodes/text-field.vue'
import NodeTextarea from './nodes/textarea.vue'
import NodeCheckbox from './nodes/checkbox.vue'
import NodeSwitch from './nodes/switch.vue'
import NodeNumberField from './nodes/number-field.vue'
import NodeSlider from './nodes/slider.vue'
import NodeDatePicker from './nodes/date-picker.vue'
import NodeDateTimePicker from './nodes/date-time-picker.vue'
import NodeColorPicker from './nodes/color-picker.vue'
import NodeOneOfSelect from './nodes/one-of-select.vue'
import NodeTabs from './nodes/tabs.vue'
import NodeVerticalTabs from './nodes/vertical-tabs.vue'
import NodeExpansionPanels from './nodes/expansion-panels.vue'
import NodeList from './nodes/list.vue'
import { defaultOptions, type VjsfOptions } from './options'

const comps = {
  section: NodeSection,
  'text-field': NodeTextField,
  textarea: NodeTextarea,
  checkbox: NodeCheckbox,
  switch: NodeSwitch,
  'number-field': NodeNumberField,
  slider: NodeSlider,
  'date-picker': NodeDatePicker,
  'date-time-picker': NodeDateTimePicker,
  'color-picker': NodeColorPicker,
  'one-of-select': NodeOneOfSelect,
  tabs: NodeTabs,
  'vertical-tabs': NodeVerticalTabs,
  'expansion-panels': NodeExpansionPanels,
  list: NodeList
}

const instance = getCurrentInstance()
for (const [name, comp] of Object.entries(comps)) {
  if (!instance?.appContext.app.component(`vjsf-node-${name}`)) {
    instance?.appContext.app.component(`vjsf-node-${name}`, comp)
  }
}

const props = defineProps<{ schema: object, modelValue: unknown, options: Partial<Omit<VjsfOptions, 'width'>> }>()
const emit = defineEmits(['update:modelValue', 'update:state'])

const compiledLayout = computed(() => compile(props.schema))
const statefulLayout = ref<StatefulLayout | null>(null)
const stateTree = ref<StateTree | null>(null)

const el = ref(null)
const { width } = useElementSize(el)

const fullOptions = computed<VjsfOptions | null>(() => {
  if (!width.value) return null
  const options = {
    ...defaultOptions,
    ...props.options,
    width: Math.round(width.value)
  }
  return options as VjsfOptions
})

const initStatefulLayout = () => {
  if (!fullOptions.value) return
  const _statefulLayout = new StatefulLayout(compiledLayout.value, compiledLayout.value.skeletonTree, fullOptions.value, props.modelValue)
  statefulLayout.value = _statefulLayout
  stateTree.value = _statefulLayout.stateTree
  _statefulLayout.events.on('update', () => {
    stateTree.value = _statefulLayout.stateTree
    emit('update:modelValue', _statefulLayout.data)
    emit('update:state', _statefulLayout)
  })
  emit('update:state', _statefulLayout)
}

watch(fullOptions, (newOptions) => {
  if (!newOptions) {
    statefulLayout.value = null
  } else if (statefulLayout.value) {
    statefulLayout.value.options = newOptions
  } else {
    initStatefulLayout()
  }
})

// case where data is updated from outside
watch(() => props.modelValue, (newData) => {
  if (statefulLayout.value && statefulLayout.value.data !== newData) statefulLayout.value.data = newData
})

// case where schema is updated from outside
watch(compiledLayout, (newCompiledLayout) => initStatefulLayout())

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

<style lang="css">
/* override vuetify styles to manage readOnly fields more usable than the default disabled fields */
.vjsf-input--readonly.v-input--disabled  .v-field--disabled {
  pointer-events: auto;
}
.vjsf-input--readonly.v-input--disabled .v-field--disabled,
.vjsf-input--readonly.v-input--disabled .v-input__details,
.vjsf-input--readonly.v-input--disabled .v-input__append,
.vjsf-input--readonly.v-input--disabled .v-input__prepend {
  opacity: inherit;
}
</style>
