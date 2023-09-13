<script setup lang="ts">
import { StatefulLayout, type SwitchNode } from '@json-layout/core'
import { VSwitch } from 'vuetify/components'
import { computed } from 'vue'
import { fullFieldProps } from './utils'

const props = defineProps<{ modelValue: SwitchNode, statefulLayout: StatefulLayout }>()

const fieldProps = computed(() =>
  fullFieldProps(props.modelValue)
)
</script>

<template>
  <v-switch
    v-bind="fieldProps"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
  />
</template>
