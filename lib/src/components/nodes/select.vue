<script>
import { VSelect } from 'vuetify/components'
import { defineComponent, h, computed } from 'vue'
import { getInputProps, getCompSlots } from '../../utils/index.js'
import useGetItems from '../../composables/use-get-items.js'
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
    const getItems = useGetItems(props)

    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout, ['multiple'])
      if (props.modelValue.options.readOnly) fieldProps.menuProps = { modelValue: false }
      fieldProps.loading = getItems.loading.value
      fieldProps.items = getItems.items.value
      fieldProps.clearable = fieldProps.clearable ?? !props.modelValue.skeleton.required
      return fieldProps
    })

    const fieldSlots = computed(() => {
      const slots = getCompSlots(props.modelValue, props.statefulLayout)
      if (!slots.item) {
        slots.item = (/** @type {any} */ context) => h(SelectItem, {
          multiple: props.modelValue.layout.multiple,
          itemProps: context.props,
          item: context.item
        })
      }
      if (!slots.selection) {
        slots.selection = (/** @type {any} */ context) => {
          return h(SelectSelection, {
            multiple: props.modelValue.layout.multiple,
            last: props.modelValue.layout.multiple && context.index === props.modelValue.data.length - 1,
            item: context.item
          })
        }
      }
      return slots
    })

    // @ts-ignore
    return () => h(VSelect, fieldProps.value, fieldSlots.value)
  }
})

</script>
