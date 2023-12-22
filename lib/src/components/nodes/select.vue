<script>
import { VSelect } from 'vuetify/components'
import { defineComponent, h, computed, ref, shallowRef } from 'vue'
import { getInputProps, getCompSlots } from '../../utils/index.js'
import SelectItem from '../fragments/select-item.vue'
import SelectSelection from '../fragments/select-selection.vue'

export default defineComponent({
  props: {
    modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfSelectNode> */
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
    const items = shallowRef([])
    /** @type import('vue').Ref<boolean> */
    const loading = ref(false)

    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout, ['multiple'])
      if (props.modelValue.options.readOnly) fieldProps.menuProps = { modelValue: false }
      fieldProps.loading = loading.value
      fieldProps.items = items.value
      fieldProps['onUpdate:menu'] = refresh
      return fieldProps
    })

    /** @type import('@json-layout/core').StateTree | null */
    let lastStateTree = null
    /** @type Record<string, any> | null */
    let lastContext = null

    const refresh = async () => {
      if (props.statefulLayout.stateTree === lastStateTree && props.statefulLayout.options.context === lastContext) return
      lastStateTree = props.statefulLayout.stateTree
      lastContext = props.statefulLayout.options.context ?? null
      loading.value = true
      items.value = await props.statefulLayout.getItems(props.modelValue)
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
    return () => h(VSelect, fieldProps.value, fieldSlots.value)
  }
})

</script>
