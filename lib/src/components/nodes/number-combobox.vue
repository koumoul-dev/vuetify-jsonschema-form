<script>
import { defineComponent, h, computed, shallowRef, ref } from 'vue'
import { VCombobox } from 'vuetify/components'
import { getInputProps, getCompSlots } from '../../utils/index.js'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfComboboxNode> */
      type: Object,
      required: true
    },
    statefulLayout: {
      /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
      type: Object,
      required: true
    }
  },
  setup (props) {
    /** @type import('vue').Ref<import('@json-layout/vocabulary').SelectItems> */
    const items = shallowRef(props.modelValue.layout.items ?? [])
    /** @type import('vue').Ref<boolean> */
    const loading = ref(false)

    /** @type import('@json-layout/core').StateTree | null */
    let lastStateTree = null
    /** @type Record<string, any> | null */
    let lastContext = null

    const hasItems = computed(() => {
      return !!(props.modelValue.layout.items || props.modelValue.layout.getItems)
    })

    const refresh = async () => {
      if (props.modelValue.layout.items) return
      if (props.statefulLayout.stateTree === lastStateTree && props.statefulLayout.options.context === lastContext) return
      lastStateTree = props.statefulLayout.stateTree
      lastContext = props.statefulLayout.options.context ?? null
      if (hasItems.value) {
        loading.value = true
        items.value = await props.statefulLayout.getItems(props.modelValue)
        loading.value = false
      }
    }

    if (!props.modelValue.layout.items) {
      refresh()
    }

    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout, ['step', 'min', 'max'])
      fieldProps.type = 'number'
      fieldProps.loading = loading.value
      if (hasItems.value) fieldProps.items = items.value
      if (props.modelValue.options.readOnly) fieldProps.menuProps = { modelValue: false }
      if (props.modelValue.layout.multiple) {
        fieldProps.multiple = true
        fieldProps.chips = true
        fieldProps.closableChips = true
      }
      fieldProps['onUpdate:menu'] = () => refresh()
      fieldProps['onUpdate:modelValue'] = (/** @type string[] */value) => props.statefulLayout.input(props.modelValue, value && value.map(Number))
      return fieldProps
    })
    const fieldSlots = computed(() => getCompSlots(props.modelValue, props.statefulLayout))

    // @ts-ignore
    return () => h(VCombobox, fieldProps.value, fieldSlots.value)
  }
})

</script>
