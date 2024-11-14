import NodeSlot from '../components/fragments/node-slot.vue'
import { computed, camelize, watch, ref, h } from 'vue'

// NOTE: in a previous draft we used to have this in options,
// but it was not very flexible and not very easy to use, user defined props should be managed
// by a combination of layout.props, layout.getProps and vuetify defaults provider (https://vuetifyjs.com/en/components/defaults-providers/#usage)
const defaultProps = {
  fieldPropsCompact: {
    hideDetails: 'auto'
  },
  fieldPropsReadOnly: { hideDetails: 'auto', variant: 'plain' },
  fieldPropsSummary: { hideDetails: true }
}

/**
 * @param {(Record<string, any> | undefined)[]} propsLevels
 * @returns {Record<string, any> & {class: string[]}}
 */
export function mergePropsLevels (propsLevels) {
  /** @type {Record<string, any> & {class: string[]}} */
  const fullProps = { class: [] }
  for (const propsLevel of propsLevels) {
    if (propsLevel) {
      for (const key of Object.keys(propsLevel)) {
        if (key === 'class') {
          // a small convention for merging/overwriting classes:
          // a class defined as a simple string overwrites the previous ones
          // a class defined as an array is merged with the previous ones
          if (Array.isArray(propsLevel.class)) fullProps.class = fullProps.class.concat(propsLevel.class)
          else fullProps.class = [propsLevel.class]
        } else {
          fullProps[camelize(key)] = propsLevel[key]
        }
      }
    }
  }
  return fullProps
}

/**
 * @param {import('vue').Ref<import('../types.js').VjsfNode>} nodeRef
 * @param {import('../types.js').VjsfStatefulLayout} statefulLayout
 * @param {{isMainComp?: boolean, bindData?: boolean, layoutPropsMap?: (string | [string, string])[]}} [opts]
 */
export default function (nodeRef, statefulLayout, opts = {}) {
  if (opts.bindData === undefined) opts.bindData = true
  if (opts.isMainComp === undefined) opts.isMainComp = true

  // we access vjsfNode properties through computeds so that the parts without mutations do not trigger reactivity
  // this is to leverage the immutability provided by immer in json-layout
  const options = computed(() => nodeRef.value.options)
  const skeleton = computed(() => nodeRef.value.skeleton)
  const layout = computed(() => nodeRef.value.layout)
  const data = computed(() => nodeRef.value.data)
  const error = computed(() => nodeRef.value.error)
  const validated = computed(() => nodeRef.value.validated)
  const nodeProps = computed(() => nodeRef.value.props)
  const autofocus = computed(() => nodeRef.value.autofocus)
  const children = computed(() => nodeRef.value.children)

  const preparedData = computed(() => {
    return (typeof data.value === 'string' && layout.value.separator) ? data.value.split(/** @type {string} */(layout.value.separator)) : data.value
  })

  // modelValue is not a straight computed, but is separated in a ref because the change in json-layout can be delayed
  // depending on the debounceInputMs option
  const localData = ref()
  watch(preparedData, (data) => { localData.value = data }, { immediate: true })

  // calculate the props of a field/input type component (text fields, etc)
  // isMainComp is used to determine if this input component is also the main rendered component or if is mostly a wrapper (date picker, etc.)
  const inputProps = computed(() => {
    /** @type {(Record<string, any> | undefined)[]} */
    const propsLevels = []
    if (options.value.density === 'compact') propsLevels.push(defaultProps.fieldPropsCompact)
    if (options.value.readOnly) propsLevels.push(defaultProps.fieldPropsReadOnly)
    if (opts.isMainComp && nodeProps.value) propsLevels.push(nodeProps.value)

    const fullProps = mergePropsLevels(propsLevels)

    fullProps.label = layout.value.label
    if (error.value && validated.value) {
      fullProps.errorMessages = error.value
    }
    if (options.value.readOnly) {
      fullProps.disabled = true
      fullProps.class.push('vjsf-input--readonly')
    }
    if (autofocus.value) {
      fullProps.class.push('vjsf-input--autofocus')
    }

    if (opts.layoutPropsMap) {
      for (const propMap of opts.layoutPropsMap) {
        if (typeof propMap === 'string') {
          if (propMap in layout.value) fullProps[propMap] = layout.value[propMap]
        } else {
          if (propMap[1] in layout.value) fullProps[propMap[0]] = layout.value[propMap[1]]
        }
      }
    }

    if (opts.bindData) {
      fullProps['onUpdate:modelValue'] = (/** @type string */value) => {
        const newData = (Array.isArray(value) && layout.value.separator) ? value.join(/** @type {string} */(layout.value.separator)) : value
        localData.value = newData
        return statefulLayout.input(nodeRef.value, newData)
      }
    }
    fullProps.onBlur = () => statefulLayout.blur(nodeRef.value)

    return fullProps
  })

  // calculate the props of components that are not of the field category
  const compProps = computed(() => {
    /** @type {(Record<string, any> | undefined)[]} */
    const propsLevels = [{ density: options.value.density }]
    if (opts.isMainComp) propsLevels.push(layout.value.props)
    const fullProps = mergePropsLevels(propsLevels)
    return fullProps
  })

  // calculate the slots of components
  const compSlots = computed(() => {
    if (!layout.value.slots) return {}
    /** @type {Record<string, any>} */
    const slots = {}
    for (const [key, layoutSlot] of Object.entries(layout.value.slots)) {
      slots[key] = () => h(NodeSlot, { layoutSlot, node: nodeRef.value, statefulLayout })
    }
    return slots
  })

  return { localData, inputProps, compProps, compSlots, options, skeleton, layout, data, children }
}
