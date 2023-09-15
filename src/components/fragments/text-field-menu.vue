<script setup lang="ts">
import { StateNode } from '@json-layout/core'
import { VMenu, VTextField } from 'vuetify/components'
import { computed, ref } from 'vue'
import { getCompProps, getInputProps } from '../nodes/utils'

const props = defineProps<{ modelValue: StateNode }>()

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
    @click:control="e => {menuOpened = !menuOpened; e.stopPropagation()}"
  />
  <v-menu
    v-if="textField"
    v-bind="menuProps"
    v-model="menuOpened"
    :activator="textField"
  >
    <slot :close="() => menuOpened = false" />
  </v-menu>
</template>
