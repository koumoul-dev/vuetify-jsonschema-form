<script setup>
import { computed, ref, toRef, watch } from 'vue'
import { VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText } from 'vuetify/components/VExpansionPanel'
import { VContainer, VRow } from 'vuetify/components/VGrid'
import { VIcon } from 'vuetify/components/VIcon'
import { isSection } from '@json-layout/core/state'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'
import ChildSubtitle from '../fragments/child-subtitle.vue'
import useNode from '../../composables/use-node.js'
import { useVisibleChildren } from '../../composables/use-visible-children.js'
import { useDefaults } from 'vuetify'

useDefaults({}, 'VjsfExpansionPanels')

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfExpansionPanelsNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

const { compProps } = useNode(toRef(props, 'modelValue'), props.statefulLayout)

const panelsProps = computed(() => {
  const panelsProps = { ...compProps.value }
  // the open panels are managed locally, a modelValue in layout.props is only an initial value
  delete panelsProps.modelValue
  return panelsProps
})

const visibleChildren = useVisibleChildren(() => props.modelValue.children)

const openPanels = ref(compProps.value.modelValue)
watch(visibleChildren, (children) => {
  const isVisible = (/** @type {unknown} */index) => children.some(visible => visible.index === index)
  if (Array.isArray(openPanels.value)) {
    // with the "multiple" prop several panels are open at once, forget the ones that became hidden
    if (!openPanels.value.every(isVisible)) openPanels.value = openPanels.value.filter(isVisible)
  } else if (openPanels.value !== undefined && !isVisible(openPanels.value)) {
    // the open panel became hidden, the "mandatory" prop promises that one stays open
    openPanels.value = compProps.value.mandatory ? children[0]?.index : undefined
  }
})

</script>

<template>
  <section-header :node="modelValue" />
  <v-expansion-panels
    v-model="openPanels"
    v-bind="panelsProps"
  >
    <v-expansion-panel
      v-for="{ child, index } of visibleChildren"
      :key="child.key"
      :value="index"
    >
      <v-expansion-panel-title>
        <v-icon
          v-if="child.validated && (child.error || child.childError)"
          start
          color="error"
          :icon="statefulLayout.options.icons.alert"
        />
        {{ child.layout.title ?? child.layout.label }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-container fluid>
          <child-subtitle :model-value="child" />
          <v-row>
            <node
              v-for="grandChild of isSection(child) ? child.children : [child]"
              :key="grandChild.fullKey"
              :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
              :stateful-layout="statefulLayout"
            />
          </v-row>
        </v-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style>
.vjsf-node-expansion-panels .v-expansion-panel-text__wrapper {
  padding: 0;
}
</style>
