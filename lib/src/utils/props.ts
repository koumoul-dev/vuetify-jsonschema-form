/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelize } from 'vue'
import { StateNode } from '@json-layout/core'
import { VjsfOptions } from '../components/options.js'

export function mergePropsLevels (propsLevels: (Record<string, any> | undefined)[]): Record<string, any> {
  const fullProps: Record<string, any> = {}
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
export function getInputProps (node: StateNode, isMainComp = true) {
  const options = node.options as VjsfOptions
  const propsLevels: (Record<string, any> | undefined)[] = [options.fieldProps]
  if (options.density === 'comfortable') propsLevels.push(options.fieldPropsComfortable)
  if (options.density === 'compact') propsLevels.push(options.fieldPropsCompact)
  if (node.options.readOnly) propsLevels.push(options.fieldPropsReadOnly)
  if (isMainComp) {
    propsLevels.push(options[`${node.layout.comp}Props`] as Record<string, any> | undefined)
    if (node.options.readOnly) propsLevels.push(options[`${node.layout.comp}PropsReadOnly`] as Record<string, any> | undefined)
    propsLevels.push(node.layout.props)
  }

  const fullProps = mergePropsLevels(propsLevels)

  fullProps.label = node.layout.label
  if (node.error) fullProps.errorMessages = node.error
  fullProps.modelValue = node.data
  if (node.options.readOnly) {
    fullProps.disabled = true
    fullProps.class = 'vjsf-input--readonly'
  }

  return fullProps
}

// calculate the props of components that are not of the field category
export function getCompProps (node: StateNode, comp: string, isMainComp = true) {
  const options = node.options as VjsfOptions
  const propsLevels: (Record<string, any> | undefined)[] = [{ density: options.density }]
  propsLevels.push(options[`${comp}Props`] as Record<string, any> | undefined)
  if (node.options.readOnly) propsLevels.push(options[`${comp}PropsReadOnly`] as Record<string, any> | undefined)
  if (isMainComp) propsLevels.push(node.layout.props)
  const fullProps = mergePropsLevels(propsLevels)
  if (isMainComp) fullProps.modelValue = node.data
  return fullProps
}
