<script setup lang="ts">
import { StateNode } from '@json-layout/core'
import { VMenu, VTextField } from 'vuetify/components'
import { computed, ref } from 'vue'
import { getCompProps, getInputProps } from '../../utils/props.js'

const props = defineProps<{ modelValue: StateNode, formattedValue: string | null | undefined }>()

const fieldProps = computed(() => {
  const fieldProps = getInputProps(props.modelValue, false)
  fieldProps.readonly = true
  return fieldProps
})

const menuProps = computed(() => {
  const menuProps = getCompProps(props.modelValue, 'menu', false)
  menuProps.closeOnContentClick = false
  menuProps.disabled = true
  return menuProps
})

const textField = ref(null)
const menuOpened = ref<boolean>(false)

</script>

<template>
  <v-text-field
    ref="textField"
    v-bind="fieldProps"
    :model-value="formattedValue ?? modelValue.data"
    @click:control="e => {menuOpened = !menuOpened; e.stopPropagation()}"
  >
    <template #prepend-inner>
      <slot name="prepend-inner" />
    </template>
  </v-text-field>
  <v-menu
    v-if="textField"
    v-bind="menuProps"
    v-model="menuOpened"
    class="vjsf-text-field-menu"
    :activator="textField"
  >
    <slot :close="() => menuOpened = false" />
  </v-menu>
</template>

<style>
.vjsf-text-field-menu .v-sheet.v-color-picker {
  overflow-x: hidden;
}
</style>
