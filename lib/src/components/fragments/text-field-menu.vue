<script setup>
import { VMenu } from 'vuetify/components/VMenu'
import { VTextField } from 'vuetify/components/VTextField'
import { computed, ref, toRef } from 'vue'
import useField from '../../composables/use-node.js'

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
  readonly: {
    /** @type import('vue').PropType<boolean> */
    type: Boolean,
    default: true
  },
  placeholder: {
    /** @type import('vue').PropType<string | null> */
    type: String,
    default: null
  }
})

const emits = defineEmits(['blur'])

const { inputProps, skeleton, compProps, data } = useField(
  toRef(props, 'modelValue'), props.statefulLayout, { isMainComp: false, bindData: false }
)

const fieldProps = computed(() => {
  const fieldProps = { ...inputProps.value }
  fieldProps.clearable = fieldProps.clearable ?? !skeleton.value.required
  if (props.placeholder) fieldProps.placeholder = props.placeholder
  fieldProps['onClick:clear'] = () => {
    props.statefulLayout.input(props.modelValue, null)
  }
  fieldProps.readonly = props.readonly
  return fieldProps
})

const menuProps = computed(() => {
  return {
    ...compProps.value,
    zIndex: 3000, // vuetify zIndex stacking is buggy (for example https://github.com/vuetifyjs/vuetify/issues/16251)
    closeOnContentClick: false,
    disabled: true
  }
})

const textField = ref(null)
const menuOpened = defineModel('menuOpened', { type: Boolean, default: false })
const formattedValue = defineModel('formattedValue', { type: String, default: null })

</script>

<template>
  <v-text-field
    ref="textField"
    v-bind="fieldProps"
    :model-value="formattedValue ?? data"
    @click:control="e => {menuOpened = !menuOpened; e.stopPropagation()}"
    @update:model-value="v => formattedValue = v"
    @blur="emits('blur')"
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
