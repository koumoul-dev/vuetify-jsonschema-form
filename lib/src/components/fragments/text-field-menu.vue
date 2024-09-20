<script setup>
import { VMenu } from 'vuetify/components/VMenu'
import { VTextField } from 'vuetify/components/VTextField'
import { computed, ref, toRef } from 'vue'
import useField from '../../composables/use-field.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  },
  formattedValue: {
    /** @type import('vue').PropType<string | null> */
    type: String,
    default: null
  }
})

const { inputProps, skeleton, compProps, data } = useField(
  toRef(props, 'modelValue'), props.statefulLayout, { isMainComp: false, bindData: false }
)

const fieldProps = computed(() => {
  const fieldProps = { ...inputProps.value }
  fieldProps.readonly = true
  fieldProps.clearable = fieldProps.clearable ?? !skeleton.value.required
  fieldProps['onClick:clear'] = () => {
    props.statefulLayout.input(props.modelValue, null)
  }
  return fieldProps
})

const menuProps = computed(() => {
  const menuProps = { ...compProps.value }
  menuProps.closeOnContentClick = false
  menuProps.disabled = true
  return menuProps
})

const textField = ref(null)
const menuOpened = defineModel('menuOpened', { type: Boolean, default: false })

</script>

<template>
  <v-text-field
    ref="textField"
    v-bind="fieldProps"
    :model-value="formattedValue ?? data"
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
