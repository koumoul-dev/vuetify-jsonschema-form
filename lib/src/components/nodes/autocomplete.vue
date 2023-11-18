<script>
import { VAutocomplete } from 'vuetify/components'
import { defineComponent, computed, ref, shallowRef, h } from 'vue'
import { getInputProps } from '../../utils/props.js'
import { getCompSlots } from '../../utils/slots.js'
import SelectItem from '../fragments/select-item.vue'
import SelectSelection from '../fragments/select-selection.vue'

export default defineComponent({
  props: {
    modelValue: {
    /** @type import('vue').PropType<import('../types.js').VjsfSelectNode> */
      type: Object,
      required: true
    },
    statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
      type: Object,
      required: true
    }
  },
  setup (props) {
    /** @type import('vue').ShallowRef<import('@json-layout/vocabulary').SelectItems> */
    const items = shallowRef([])
    /** @type import('vue').Ref<boolean> */
    const loading = ref(false)
    /** @type import('vue').Ref<string> */
    const search = ref('')

    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout, ['multiple'])
      if (props.modelValue.options.readOnly) fieldProps.menuProps = { modelValue: false }
      fieldProps.noFilter = true
      fieldProps['onUpdate:search'] = (/** @type string */searchValue) => {
        search.value = searchValue
        refresh()
      }
      fieldProps['onUpdate:menu'] = refresh
      fieldProps.items = items.value
      fieldProps.loading = loading.value
      return fieldProps
    })

    /** @type import('@json-layout/core').StateTree | null */
    let lastStateTree = null
    /** @type Record<string, any> | null */
    let lastContext = null
    /** @type string */
    let lastSearch = ''

    const refresh = async () => {
      if (props.statefulLayout.stateTree === lastStateTree && props.statefulLayout.options.context === lastContext && search.value === lastSearch) return
      loading.value = true
      items.value = await props.statefulLayout.getItems(props.modelValue, search.value)
      lastStateTree = props.statefulLayout.stateTree
      lastContext = props.statefulLayout.options.context ?? null
      lastSearch = search.value
      loading.value = false
    }

    if (!props.modelValue.layout.items) {
      refresh()
    }

    const fieldSlots = computed(() => {
      const slots = getCompSlots(props.modelValue, props.statefulLayout)
      if (!slots.item) {
        slots.item = (/** @type {any} */ context) => h(SelectItem, {
          multiple: props.modelValue.layout.multiple,
          itemProps: context.props,
          item: context.item.raw
        })
      }
      if (!slots.selection) {
        slots.selection = (/** @type {any} */ context) => h(SelectSelection, {
          multiple: props.modelValue.layout.multiple,
          last: props.modelValue.layout.multiple && context.index === props.modelValue.data.length - 1,
          item: context.item.raw
        })
      }
      return slots
    })

    // @ts-ignore
    return () => h(VAutocomplete, fieldProps.value, fieldSlots.value)
  }
})

</script>

<template>
  <v-select
    v-bind="fieldProps"
  />
</template>
