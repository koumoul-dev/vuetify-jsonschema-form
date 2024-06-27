<script>
import { VAutocomplete } from 'vuetify/components'
import { useDefaults } from 'vuetify'
import { defineComponent, computed, h } from 'vue'
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
    useDefaults({}, 'VjsfAutocomplete')
    const getItems = useGetItems(props)

    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout, ['multiple'])
      if (props.modelValue.options.readOnly) fieldProps.menuProps = { modelValue: false }
      fieldProps.noFilter = true
      fieldProps['onUpdate:search'] = (/** @type string */searchValue) => {
        getItems.search.value = searchValue
      }
      fieldProps.items = getItems.items.value
      fieldProps.loading = getItems.loading.value
      fieldProps.clearable = fieldProps.clearable ?? !props.modelValue.skeleton.required
      return fieldProps
    })

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
          item: getItems.prepareSelectedItem(context.item.raw, context.item.value)
        })
      }
      return slots
    })

    // @ts-ignore
    return () => h(VAutocomplete, fieldProps.value, fieldSlots.value)
  }
})

</script>
