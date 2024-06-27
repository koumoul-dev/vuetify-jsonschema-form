<script setup>
import { computed } from 'vue'
import { useTheme, useDefaults } from 'vuetify'
import { VCol, VDefaultsProvider } from 'vuetify/components'
import NodeSlot from './fragments/node-slot.vue'
import HelpMessage from './fragments/help-message.vue'

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

const nodeClasses = computed(() => {
  let classes = `vjsf-node vjsf-node-${props.modelValue.layout.comp} vjsf-density-${props.modelValue.options.density}`
  if (props.modelValue.options.readOnly) classes += ' vjsf-readonly'
  if (props.modelValue.options.summary) classes += ' vjsf-summary'
  if (theme.current.value.dark) classes += ' vjsf-dark'
  return classes
})

if (props.modelValue.layout.comp !== 'none' && !props.statefulLayout.options.nodeComponents[props.modelValue.layout.comp]) {
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
        v-if="modelValue.layout.slots?.before"
        key="before"
        :layout-slot="modelValue.layout.slots?.before"
        :node="modelValue"
        :stateful-layout="statefulLayout"
        :class="beforeAfterClasses[modelValue.options.density]"
      />

      <help-message
        v-if="modelValue.layout.help && !modelValue.options.summary"
        :node="modelValue"
        :class="beforeAfterClasses[modelValue.options.density]"
      />
      <node-slot
        v-if="modelValue.layout.slots?.component"
        key="component"
        :layout-slot="modelValue.layout.slots?.component"
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
        v-if="modelValue.layout.slots?.after"
        key="after"
        :layout-slot="modelValue.layout.slots?.after"
        :node="modelValue"
        :stateful-layout="statefulLayout"
        :class="beforeAfterClasses[modelValue.options.density]"
      />
    </v-col>
  </v-defaults-provider>
</template>
