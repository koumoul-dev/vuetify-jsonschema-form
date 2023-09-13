/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelize } from 'vue'
import { StateNode } from '@json-layout/core'
import { VjsfOptions } from '../options'

const densityBaseProps = {
  compact: {
    density: 'compact',
    hideDetails: 'auto'
  },
  comfortable: {
    density: 'comfortable'
  },
  default: {}
}

export function fullFieldProps (node: StateNode) {
  const options = node.options as VjsfOptions
  const propsLevels: (Record<string, any> | undefined)[] = [
    densityBaseProps[options.density ?? 'default'],
    options.fieldProps
  ]
  if (node.options.readOnly) propsLevels.push(options.fieldPropsReadOnly)
  propsLevels.push(options[`${node.layout.comp}Props`] as Record<string, any> | undefined)
  if (node.options.readOnly) propsLevels.push(options[`${node.layout.comp}PropsReadOnly`] as Record<string, any> | undefined)
  propsLevels.push(node.layout.props)

  const fullProps: any = {}
  for (const propsLevel of propsLevels) {
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
