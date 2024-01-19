/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelize } from 'vue'

// NOTE: in a previous draft we used to have this in options,
// but it was not very flexible and not very easy to use, user defined props should be managed
// by a combination of layout.props, layout.getProps and vuetify defaults provider (https://vuetifyjs.com/en/components/defaults-providers/#usage)
const defaultProps = {
  fieldProps: {},
  fieldPropsCompact: {
    density: 'compact',
    hideDetails: 'auto'
  },
  fieldPropsComfortable: {
    density: 'comfortable'
  },
  fieldPropsReadOnly: { hideDetails: 'auto', variant: 'plain' },
  fieldPropsSummary: { hideDetails: true },
  textfieldProps: {},
  textfieldPropsReadOnly: {},
  textareaProps: {},
  textareaPropsReadOnly: {},
  // it is not very common to show an error below checkboxes and switches and without hide-details=auto they take a lot of space
  checkboxProps: { hideDetails: 'auto' },
  checkboxPropsReadOnly: {},
  switchProps: { hideDetails: 'auto' },
  switchPropsReadOnly: {}
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
 * @param {boolean} isMainComp
 * @returns {Record<string, any>}
 */
export function getInputProps (node, statefulLayout, layoutPropsMap, isMainComp = true) {
  const options = node.options
  /** @type {(Record<string, any> | undefined)[]} */
  const propsLevels = [defaultProps.fieldProps]
  if (options.density === 'comfortable') propsLevels.push(defaultProps.fieldPropsComfortable)
  if (options.density === 'compact') propsLevels.push(defaultProps.fieldPropsCompact)
  if (node.options.readOnly) propsLevels.push(defaultProps.fieldPropsReadOnly)
  if (isMainComp) {
    propsLevels.push(/** @type Record<string, any> | undefined */(options[`${node.layout.comp}Props`]))
    if (node.options.readOnly) propsLevels.push(/** @type Record<string, any> | undefined */(options[`${node.layout.comp}PropsReadOnly`]))
    if (node.props) propsLevels.push(node.props)
  }

  const fullProps = mergePropsLevels(propsLevels)

  fullProps.label = node.layout.label
  if (node.error && node.validated) {
    fullProps.errorMessages = node.error
  }
  fullProps.modelValue = node.data
  if (node.options.readOnly) {
    fullProps.disabled = true
    fullProps.class.push('vjsf-input--readonly')
  }
  if (node.autofocus) {
    fullProps.class.push('vjsf-input--autofocus')
  }

  if (layoutPropsMap) {
    for (const propMap of layoutPropsMap) {
      if (typeof propMap === 'string') fullProps[propMap] = node.layout[propMap]
      else fullProps[propMap[0]] = node.layout[propMap[1]]
    }
  }

  if (isMainComp) {
    fullProps['onUpdate:modelValue'] = (/** @type string */value) => statefulLayout.input(node, value)
    fullProps.onBlur = () => statefulLayout.blur(node)
  }

  return fullProps
}

// calculate the props of components that are not of the field category
/**
 * @param {import('@json-layout/core').StateNode} node
 * @param {string} comp
 * @param {boolean} isMainComp
 * @returns {Record<string, any>}
 */
export function getCompProps (node, comp, isMainComp = true) {
  const options = /** @type import('../types.js').VjsfOptions */(node.options)
  /** @type {(Record<string, any> | undefined)[]} */
  const propsLevels = [{ density: options.density }]
  propsLevels.push(/** @type Record<string, any> | undefined */(options[`${comp}Props`]))
  if (node.options.readOnly) propsLevels.push(/** @type Record<string, any> | undefined */(options[`${comp}PropsReadOnly`]))
  if (isMainComp) propsLevels.push(node.layout.props)
  const fullProps = mergePropsLevels(propsLevels)
  if (isMainComp) fullProps.modelValue = node.data
  return fullProps
}
