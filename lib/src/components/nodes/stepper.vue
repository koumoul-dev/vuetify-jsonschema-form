<script setup>
import { ref, computed } from 'vue'
import { VStepper, VStepperHeader, VStepperItem, VStepperWindow, VStepperWindowItem, VStepperActions } from 'vuetify/components/VStepper'
import { VContainer, VRow, VSpacer } from 'vuetify/components/VGrid'
import { VBtn } from 'vuetify/components/VBtn'
import { VDivider } from 'vuetify/components/VDivider'
import { isSection } from '@json-layout/core/state'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'
import ChildSubtitle from '../fragments/child-subtitle.vue'
import { useDefaults } from 'vuetify'

useDefaults({}, 'VjsfStepper')

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStepperNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

const step = ref(0)

const firstErrorIndex = computed(() => {
  const index = props.modelValue.children.findIndex(child => child.validated && !!(child.error || child.childError))
  return index === -1 ? props.modelValue.children.length : index
})

const goNext = () => {
  const child = props.modelValue.children[step.value]
  props.statefulLayout.validateNodeRecurse(child)
  if (!(child.error || child.childError)) step.value++
}
</script>

<template>
  <section-header :node="modelValue" />
  <v-stepper v-model="step">
    <v-stepper-header>
      <template
        v-for="(child, i) of modelValue.children"
        :key="child.key"
      >
        <v-stepper-item
          :value="i"
          :title="/** @type {string | undefined} */(child.layout.title ?? child.layout.label)"
          :error="child.validated && !!(child.error || child.childError)"
          :complete="child.validated && !(child.error || child.childError)"
          :editable="i <= firstErrorIndex"
        />
        <v-divider />
      </template>
    </v-stepper-header>
    <v-stepper-window>
      <v-stepper-window-item
        v-for="(child) of modelValue.children"
        :key="child.key"
      >
        <v-container
          fluid
          class="pa-0"
        >
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
      </v-stepper-window-item>
    </v-stepper-window>
    <v-stepper-actions>
      <template #prev>
        <v-btn
          v-if="step > 0"
          variant="text"
          @click="step--"
        >
          Back
        </v-btn>
      </template>
      <template #next>
        <v-spacer />
        <v-btn
          v-if="step < modelValue.children.length - 1"
          variant="flat"
          color="primary"
          @click="goNext"
        >
          Next
        </v-btn>
      </template>
    </v-stepper-actions>
  </v-stepper>
</template>
