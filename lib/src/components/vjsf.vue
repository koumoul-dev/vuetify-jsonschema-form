<script setup>
import { ref, shallowRef, computed, getCurrentInstance, watch, useSlots, inject, toRaw } from 'vue'
import { useElementSize } from '@vueuse/core'
import { StatefulLayout, compile } from '@json-layout/core'
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
import NodeSelect from './nodes/select.vue'
import NodeAutocomplete from './nodes/autocomplete.vue'
import NodeOneOfSelect from './nodes/one-of-select.vue'
import NodeTabs from './nodes/tabs.vue'
import NodeVerticalTabs from './nodes/vertical-tabs.vue'
import NodeCombobox from './nodes/combobox.vue'
import NodeNumberCombobox from './nodes/number-combobox.vue'
import NodeExpansionPanels from './nodes/expansion-panels.vue'
import NodeList from './nodes/list.vue'
import { defaultOptions } from './options.js'

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
  select: NodeSelect,
  autocomplete: NodeAutocomplete,
  'one-of-select': NodeOneOfSelect,
  tabs: NodeTabs,
  'vertical-tabs': NodeVerticalTabs,
  'expansion-panels': NodeExpansionPanels,
  list: NodeList,
  combobox: NodeCombobox,
  'number-combobox': NodeNumberCombobox
}

const instance = getCurrentInstance()
for (const [name, comp] of Object.entries(comps)) {
  if (!instance?.appContext.app.component(`vjsf-node-${name}`)) {
    instance?.appContext.app.component(`vjsf-node-${name}`, comp)
  }
}

const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [Object, String, Number, Boolean],
    default: null
  },
  options: {
    /** @type import('vue').PropType<Partial<Omit<import('./types.js').VjsfOptions, 'width'>>> */
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'update:state'])

/** @type import('vue').ShallowRef<StatefulLayout | null> */
const statefulLayout = shallowRef(null)
/** @type import('vue').ShallowRef<import('@json-layout/core').StateTree | null> */
const stateTree = shallowRef(null)

// cf https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/composables/form.ts
const form = inject(Symbol.for('vuetify:form'))
if (form) {
  form.register({
    id: 'vjsf', // TODO: a unique random id ?
    validate: () => statefulLayout.value?.validate(),
    reset: () => statefulLayout.value?.resetValidation(), // TODO: also empty the data ?
    resetValidation: () => statefulLayout.value?.resetValidation()
  })
}

const el = ref(null)
const { width } = useElementSize(el)

const slots = useSlots()

/** @type import('vue').ComputedRef<import('./types.js').VjsfOptions> */
const fullOptions = computed(() => {
  const options = {
    ...defaultOptions,
    readOnly: form.isDisabled || form.isReadOnly,
    ...props.options,
    context: props.options.context ? JSON.parse(JSON.stringify(props.options.context)) : {},
    width: Math.round(width.value ?? 0),
    vjsfSlots: { ...slots }
  }
  return /** @type import('./types.js').VjsfOptions */ (options)
})

const compiledLayout = computed(() => compile(props.schema, fullOptions.value))

const onStatefulLayoutUpdate = () => {
  if (!statefulLayout.value) return
  stateTree.value = statefulLayout.value.stateTree
  emit('update:modelValue', statefulLayout.value.data)
  emit('update:state', statefulLayout.value)
  if (form) {
    // cf https://vuetifyjs.com/en/components/forms/#validation-state
    if (statefulLayout.value.valid) form.update('vjsf', true, [])
    else if (statefulLayout.value.hasHiddenError) form.update('vjsf', null, [])
    else form.update('vjsf', false, [])
  }
}

const initStatefulLayout = () => {
  if (!width.value) return
  const _statefulLayout = new StatefulLayout(toRaw(compiledLayout.value), toRaw(compiledLayout.value.skeletonTree), toRaw(fullOptions.value), props.modelValue)
  statefulLayout.value = _statefulLayout
  onStatefulLayoutUpdate()
  _statefulLayout.events.on('update', () => {
    onStatefulLayoutUpdate()
  })
  emit('update:state', _statefulLayout)
}

watch(fullOptions, (newOptions) => {
  if (statefulLayout.value) {
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
      :stateful-layout="statefulLayout"
    />
  </div>
</template>

<style lang="css">
/* override vuetify styles to manage readOnly fields more usable than the default disabled fields */
.vjsf-input--readonly.v-input--disabled.v-text-field  .v-field--disabled input {
  pointer-events: auto;
}
.vjsf-input--readonly.v-input--disabled .v-field--disabled,
.vjsf-input--readonly.v-input--disabled .v-input__details,
.vjsf-input--readonly.v-input--disabled .v-input__append,
.vjsf-input--readonly.v-input--disabled .v-input__prepend {
  opacity: inherit;
}
</style>
