/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelize } from 'vue'

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

// calculate the props of a field/input type component (text fields, etc)
// isMainComp is used to determine if this input component is also the main rendered component or if is mostly a wrapper (date picker, etc.)
/**
 * @param {import('../types.js').VjsfNode} node
 * @param {import('../types.js').VjsfStatefulLayout} statefulLayout
 * @param {(string | [string, string])[]} [layoutPropsMap]
 * @param {boolean} [isMainComp]
 * @returns {Record<string, any>}
 */
export function getInputProps (node, statefulLayout, layoutPropsMap, isMainComp = true) {
  const options = node.options
  /** @type {(Record<string, any> | undefined)[]} */
  const propsLevels = []
  if (options.density === 'compact') propsLevels.push(defaultProps.fieldPropsCompact)
  if (node.options.readOnly) propsLevels.push(defaultProps.fieldPropsReadOnly)
  if (isMainComp && node.props) propsLevels.push(node.props)

  const fullProps = mergePropsLevels(propsLevels)

  fullProps.label = node.layout.label
  if (node.error && node.validated) {
    fullProps.errorMessages = node.error
  }
  fullProps.modelValue = (typeof node.data === 'string' && node.layout.separator) ? node.data.split(/** @type {string} */(node.layout.separator)) : node.data
  if (node.options.readOnly) {
    fullProps.disabled = true
    fullProps.class.push('vjsf-input--readonly')
  }
  if (node.autofocus) {
    fullProps.class.push('vjsf-input--autofocus')
  }

  if (layoutPropsMap) {
    for (const propMap of layoutPropsMap) {
      if (typeof propMap === 'string') {
        if (propMap in node.layout) fullProps[propMap] = node.layout[propMap]
      } else {
        if (propMap[1] in node.layout) fullProps[propMap[0]] = node.layout[propMap[1]]
      }
    }
  }

  if (isMainComp) {
    fullProps['onUpdate:modelValue'] = (/** @type string */value) => {
      return statefulLayout.input(node, (Array.isArray(value) && node.layout.separator) ? value.join(/** @type {string} */(node.layout.separator)) : value)
    }
    fullProps.onBlur = () => statefulLayout.blur(node)
  }

  return fullProps
}

// calculate the props of components that are not of the field category
/**
 * @param {import('@json-layout/core').StateNode} node
 * @param {boolean} isMainComp
 * @returns {Record<string, any>}
 */
export function getCompProps (node, isMainComp = true) {
  const options = /** @type import('../types.js').VjsfOptions */(node.options)
  /** @type {(Record<string, any> | undefined)[]} */
  const propsLevels = [{ density: options.density }]
  if (isMainComp) propsLevels.push(node.layout.props)
  const fullProps = mergePropsLevels(propsLevels)
  return fullProps
}

/**
 * shared between select and autocomplete components
 * @param {import('../types.js').VjsfNode} node
 * @param {import('../types.js').VjsfStatefulLayout} statefulLayout
 * @returns {Record<string, any>}
 */
export function getSelectProps (node, statefulLayout) {
  const fullProps = getInputProps(node, statefulLayout, ['multiple'], false)
  if (node.options.readOnly) fullProps.menuProps = { modelValue: false }
  fullProps.clearable = fullProps.clearable ?? !node.skeleton.required
  fullProps.valueComparator = (/** @type {any} */a, /** @type {any} */b) => {
    const aKey = typeof a === 'object' ? statefulLayout.prepareSelectItem(node, a).key : a
    const bKey = typeof b === 'object' ? statefulLayout.prepareSelectItem(node, b).key : b
    return aKey === bKey
  }
  fullProps['onUpdate:modelValue'] = (/** @type string */value) => {
    // fix some weird case where vuetify only keep the title property of an unknown item
    if (Array.isArray(value) && Array.isArray(node.data)) {
      for (let i = 0; i < node.data.length; i++) {
        if (typeof node.data[i] === 'object' && typeof value[i] === 'string') {
          value[i] = node.data[i]
        }
      }
    }

    return statefulLayout.input(node, (Array.isArray(value) && node.layout.separator) ? value.join(/** @type {string} */(node.layout.separator)) : value)
  }
  fullProps.onBlur = () => statefulLayout.blur(node)
  return fullProps
}
