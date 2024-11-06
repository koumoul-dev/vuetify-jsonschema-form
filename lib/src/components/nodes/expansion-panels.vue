<script setup>
import { toRef } from 'vue'
import { VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText } from 'vuetify/components/VExpansionPanel'
import { VContainer, VRow } from 'vuetify/components/VGrid'
import { VIcon } from 'vuetify/components/VIcon'
import { isSection } from '@json-layout/core'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'
import ChildSubtitle from '../fragments/child-subtitle.vue'
import useNode from '../../composables/use-node.js'
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

</script>

<template>
  <section-header :node="modelValue" />
  <v-expansion-panels v-bind="compProps">
    <v-expansion-panel
      v-for="(child, i) of modelValue.children"
      :key="child.key"
      :value="i"
    >
      <v-expansion-panel-title>
        <v-icon
          v-if="child.validated && (child.error || child.childError)"
          color="error"
          class="mr-2"
          :icon="statefulLayout.options.icons.alert"
        />
        {{ child.layout.title ?? child.layout.label }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-container fluid>
          <child-subtitle :model-value="child" />
          <v-row :dense="modelValue.options?.density === 'compact' || modelValue.options?.density === 'comfortable'">
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
