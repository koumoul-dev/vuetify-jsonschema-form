<script setup>
import Debug from 'debug'
import { computed, onRenderTriggered } from 'vue'
import { useTheme, useDefaults } from 'vuetify'
import { VCol } from 'vuetify/components/VGrid'
import { VDefaultsProvider } from 'vuetify/components/VDefaultsProvider'
import NodeSlot from './fragments/node-slot.vue'
import HelpMessage from './fragments/help-message.vue'

const debugRender = Debug('vjsf:render')

useDefaults({}, 'VjsfNode')

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../types.js').VjsfNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

/** @type Record<import('../types.js').Density, string> */
const beforeAfterClasses = {
  compact: 'my-1',
  comfortable: 'my-2',
  default: 'my-3'
}

const theme = useTheme()

if (debugRender.enabled) {
  debugRender('setup node', props.modelValue.fullKey, props.modelValue.layout.comp)
  onRenderTriggered(() => {
    debugRender('render node', props.modelValue.fullKey, props.modelValue.layout.comp)
  })
}

const indent = computed(() => {
  if (props.modelValue.parentFullKey === null) return 0
  if (!props.modelValue.options.indent) return 0
  if (props.modelValue.layout.comp !== 'section') return 0
  if (!props.modelValue.layout.title) return 0
  if (typeof props.modelValue.options.indent === 'number') return props.modelValue.options.indent
  if (props.modelValue.options.density === 'compact') return 2
  if (props.modelValue.options.density === 'comfortable') return 4
  return 6
})

const showHelp = computed(() => {
  return (props.modelValue.layout.help || props.modelValue.layout.warning) && !props.modelValue.options.summary
})

const nodeClasses = computed(() => {
  let classes = `vjsf-node vjsf-node-${props.modelValue.layout.comp} vjsf-density-${props.modelValue.options.density}`
  if (props.modelValue.options.readOnly) classes += ' vjsf-readonly'
  if (props.modelValue.options.summary) classes += ' vjsf-summary'
  if (theme.current.value.dark) classes += ' vjsf-dark'
  if (indent.value) classes += ' ml-' + indent.value
  if (showHelp.value) classes += ' vjsf-has-help'
  return classes
})

if (props.modelValue.layout.comp !== 'none' && !props.modelValue.slots?.component && !props.statefulLayout.options.nodeComponents[props.modelValue.layout.comp]) {
  console.error(`vjsf: missing component to render vjsf node "${props.modelValue.layout.comp}", maybe you forgot to register a component from a plugin ?`)
}

</script>

<template>
  <v-defaults-provider :defaults="{global: { density: props.modelValue.options.density }}">
    <v-col
      v-if="modelValue.layout.comp !== 'none'"
      :cols="modelValue.cols"
      :class="nodeClasses"
    >
      <node-slot
        v-if="modelValue.slots?.before"
        key="before"
        :layout-slot="modelValue.slots?.before"
        :node="modelValue"
        :stateful-layout="statefulLayout"
        :class="beforeAfterClasses[modelValue.options.density]"
      />

      <help-message
        v-if="showHelp"
        :node="modelValue"
      />
      <node-slot
        v-if="modelValue.slots?.component"
        key="component"
        :layout-slot="modelValue.slots?.component"
        :node="modelValue"
        :stateful-layout="statefulLayout"
      />
      <node-slot
        v-else-if="modelValue.slots?.compositeComponent"
        key="compositeComponent"
        :layout-slot="modelValue.slots?.compositeComponent"
        :node="modelValue"
        :stateful-layout="statefulLayout"
      />
      <component
        :is="props.statefulLayout.options.nodeComponents[modelValue.layout.comp]"
        v-else
        :model-value="modelValue"
        :stateful-layout="statefulLayout"
      />

      <node-slot
        v-if="modelValue.slots?.after"
        key="after"
        :layout-slot="modelValue.slots?.after"
        :node="modelValue"
        :stateful-layout="statefulLayout"
        :class="beforeAfterClasses[modelValue.options.density]"
      />
    </v-col>
  </v-defaults-provider>
</template>
