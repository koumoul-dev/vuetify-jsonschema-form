import { computed, h } from 'vue'
import useField from './use-node.js'
import useGetItems from './use-get-items.js'
import SelectItem from '../components/fragments/select-item.vue'
import SelectSelection from '../components/fragments/select-selection.vue'
import useZIndexStack from './use-z-index-stack.js'

/**
 * specialized use of useFieldProps shared between select and autocomplete components
 * @param {import('vue').Ref<import('../types.js').VjsfSelectNode>} nodeRef
 * @param {import('../types.js').VjsfStatefulLayout} statefulLayout
 * @param {any} avatarProps
 * @param {'v-autocomplete' | 'v-select'} cssPrefix
 */
export default function (nodeRef, statefulLayout, avatarProps, cssPrefix) {
  const layout = computed(() => nodeRef.value.layout)

  const { inputProps, options, skeleton, localData, compSlots } = useField(nodeRef, statefulLayout, { layoutPropsMap: ['multiple', 'placeholder'], bindData: false })
  const getItems = useGetItems(nodeRef, statefulLayout)
  const zIndex = useZIndexStack(() => nodeRef.value.fullKey)

  const selectProps = computed(() => {
    const props = { ...inputProps.value }

    if (options.value.readOnly) {
      props.menuProps = { modelValue: false }
    } else {
      props.menuProps = { zIndex: zIndex.value }
    }
    props.clearable = props.clearable ?? !skeleton.value.required
    props.valueComparator = (/** @type {any} */a, /** @type {any} */b) => {
      const aKey = typeof a === 'object' ? statefulLayout.prepareSelectItem(nodeRef.value, a).key : a
      const bKey = typeof b === 'object' ? statefulLayout.prepareSelectItem(nodeRef.value, b).key : b
      return aKey === bKey
    }
    props['onUpdate:modelValue'] = (/** @type string */value) => {
      // fix some weird case where vuetify only keep the title property of an unknown item
      if (Array.isArray(value) && Array.isArray(nodeRef.value.data)) {
        for (let i = 0; i < nodeRef.value.data.length; i++) {
          if (typeof nodeRef.value.data[i] === 'object' && typeof value[i] === 'string') {
            value[i] = nodeRef.value.data[i]
          }
        }
      }

      const newData = (Array.isArray(value) && nodeRef.value.layout.separator) ? value.join(/** @type {string} */(nodeRef.value.layout.separator)) : value
      localData.value = newData
      return statefulLayout.input(nodeRef.value, newData)
    }
    props.onBlur = () => statefulLayout.blur(nodeRef.value)
    return props
  })

  // shared between select and autocomplete components
  const selectSlots = computed(() => {
    const slots = { ...compSlots.value }
    if (!slots.item) {
      slots.item = (/** @type {any} */ context) => h(SelectItem, {
        multiple: layout.value.multiple,
        itemProps: context.props,
        item: context.item.raw,
        avatarProps
      })
    }
    if (!slots.selection) {
      slots.selection = (/** @type {any} */ context) => h(SelectSelection, {
        multiple: layout.value.multiple,
        last: layout.value.multiple && context.index === nodeRef.value.data.length - 1,
        item: getItems.prepareSelectedItem(context.item.raw, context.item.value),
        avatarProps,
        cssPrefix
      })
    }
    return slots
  })

  return { localData, inputProps, selectProps, compSlots, selectSlots, getItems }
}
