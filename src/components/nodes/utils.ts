/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateNode } from '@json-layout/core'

export function fullFieldProps (propsLevels: any[], node: StateNode) {
  const fullProps: any = {}
  for (const propsLevel of propsLevels) Object.assign(fullProps, propsLevel)
  fullProps.label = node.layout.label
  fullProps.errorMessages = node.error
  fullProps.modelValue = node.data
  fullProps.disabled = node.options.readOnly
  return fullProps
}
