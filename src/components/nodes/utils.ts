/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelize } from 'vue'
import { StateNode } from '@json-layout/core'

export function fullFieldProps (node: StateNode) {
  const propsLevels = [
    node.options?.fieldProps
  ]
  if (node.options.readOnly) propsLevels.push(node.options?.fieldPropsReadOnly)
  propsLevels.push(node.options?.[`${node.layout.comp}Props`])
  if (node.options.readOnly) propsLevels.push(node.options?.[`${node.layout.comp}PropsReadOnly`])
  propsLevels.push(node.layout.props)
  const fullProps: any = {}
  for (const propsLevel of propsLevels as Record<string, any>[]) {
    if (propsLevel) {
      for (const key of Object.keys(propsLevel)) {
        fullProps[camelize(key)] = propsLevel[key]
      }
    }
  }
  fullProps.label = node.layout.label
  if (node.error) fullProps.errorMessages = node.error
  fullProps.modelValue = node.data
  if (node.options.readOnly) {
    // fullProps.readOnly = true
    fullProps.disabled = true
    // fullProps.style = 'pointer-events: none'
    fullProps.class = 'vjsf-field--readonly'
  }

  return fullProps
}
