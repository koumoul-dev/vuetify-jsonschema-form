/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelize } from 'vue'

/**
 * @param {(Record<string, any> | undefined)[]} propsLevels
 * @returns Record<string, any>
 */
export function mergePropsLevels (propsLevels) {
  /** @type Record<string, any> */
  const fullProps = {}
  for (const propsLevel of propsLevels) {
    if (propsLevel) {
      for (const key of Object.keys(propsLevel)) {
        fullProps[camelize(key)] = propsLevel[key]
      }
    }
  }
  return fullProps
}

// calculate the props of a field/input type component (text fields, etc)
// isMainComp is used to determine if this input component is also the main rendered component or if is mostly a wrapper (date picker, etc.)
/**
 * @param {import('@json-layout/core').StateNode} node
 * @param {import('@json-layout/core').StatefulLayout} statefulLayout
 * @param {boolean} isMainComp
 * @returns {Record<string, any>}
 */
export function getInputProps (node, statefulLayout, isMainComp = true) {
  const options = /** @type import('../components/types.js').VjsfOptions */(node.options)
  /** @type {(Record<string, any> | undefined)[]} */
  const propsLevels = [options.fieldProps]
  if (options.density === 'comfortable') propsLevels.push(options.fieldPropsComfortable)
  if (options.density === 'compact') propsLevels.push(options.fieldPropsCompact)
  if (node.options.readOnly) propsLevels.push(options.fieldPropsReadOnly)
  if (isMainComp) {
    propsLevels.push(/** @type Record<string, any> | undefined */(options[`${node.layout.comp}Props`]))
    if (node.options.readOnly) propsLevels.push(/** @type Record<string, any> | undefined */(options[`${node.layout.comp}PropsReadOnly`]))
    propsLevels.push(node.layout.props)
  }

  const fullProps = mergePropsLevels(propsLevels)

  fullProps.label = node.layout.label
  if (node.error && node.validated) {
    fullProps.errorMessages = node.error
  }
  fullProps.modelValue = node.data
  if (node.options.readOnly) {
    fullProps.disabled = true
    fullProps.class = 'vjsf-input--readonly'
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
  const options = /** @type import('../components/types.js').VjsfOptions */(node.options)
  /** @type {(Record<string, any> | undefined)[]} */
  const propsLevels = [{ density: options.density }]
  propsLevels.push(/** @type Record<string, any> | undefined */(options[`${comp}Props`]))
  if (node.options.readOnly) propsLevels.push(/** @type Record<string, any> | undefined */(options[`${comp}PropsReadOnly`]))
  if (isMainComp) propsLevels.push(node.layout.props)
  const fullProps = mergePropsLevels(propsLevels)
  if (isMainComp) fullProps.modelValue = node.data
  return fullProps
}
