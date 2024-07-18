<script setup>
import { computed } from 'vue'

import { compile } from '@json-layout/core'
import Tree from './tree.vue'
import { useVjsf, emits } from '../composables/use-vjsf.js'
import '../styles/vjsf.css'

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
import NodeSelect from './nodes/select.vue'
import NodeAutocomplete from './nodes/autocomplete.vue'
import NodeRadioGroup from './nodes/radio-group.vue'
import NodeCheckboxGroup from './nodes/checkbox-group.vue'
import NodeSwitchGroup from './nodes/switch-group.vue'
import NodeOneOfSelect from './nodes/one-of-select.vue'
import NodeTabs from './nodes/tabs.vue'
import NodeVerticalTabs from './nodes/vertical-tabs.vue'
import NodeCombobox from './nodes/combobox.vue'
import NodeNumberCombobox from './nodes/number-combobox.vue'
import NodeExpansionPanels from './nodes/expansion-panels.vue'
import NodeStepper from './nodes/stepper.vue'
import NodeList from './nodes/list.vue'
import NodeFileInput from './nodes/file-input.vue'
import NodeCard from './nodes/card.vue'

/** @type {Record<string, import('vue').Component>} */
const nodeComponents = {
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
  select: NodeSelect,
  autocomplete: NodeAutocomplete,
  'radio-group': NodeRadioGroup,
  'checkbox-group': NodeCheckboxGroup,
  'switch-group': NodeSwitchGroup,
  'one-of-select': NodeOneOfSelect,
  tabs: NodeTabs,
  'vertical-tabs': NodeVerticalTabs,
  'expansion-panels': NodeExpansionPanels,
  stepper: NodeStepper,
  list: NodeList,
  combobox: NodeCombobox,
  'number-combobox': NodeNumberCombobox,
  'file-input': NodeFileInput,
  card: NodeCard
}

const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  precompiledLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').CompiledLayout> */
    type: Object,
    default: null
  },
  modelValue: {
    type: null,
    default: null
  },
  options: {
    /** @type import('vue').PropType<import('../types.js').PartialVjsfOptions | null> */
    type: Object,
    default: null
  }
})

const emit = defineEmits(emits)

const { el, statefulLayout, stateTree } = useVjsf(
  computed(() => props.schema),
  computed(() => props.modelValue),
  computed(() => props.options),
  nodeComponents,
  emit,
  compile,
  computed(() => props.precompiledLayout)
)

</script>

<template>
  <div
    ref="el"
    class="vjsf"
  >
    <tree
      v-if="statefulLayout && stateTree"
      :model-value="stateTree"
      :stateful-layout="statefulLayout"
    />
  </div>
</template>

<style lang="css">
/* nothing here, use ../styles/vjsf.css */
</style>
