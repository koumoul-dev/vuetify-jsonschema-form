import { runtimeOptions as jlRuntimeOptions, compileOptions as jlCompileOptions } from '@json-layout/core/utils/doc-options'
import { defaultIcons } from '@koumoul/vjsf'

/** @type {import('@json-layout/core/utils/doc-options').DocOptions} */
export const compileOptions = [
  ...jlCompileOptions,
]

/** @type {import('@json-layout/core/utils/doc-options').DocOptions} */
export const runtimeOptions = [
  ...jlRuntimeOptions,
  {
    key: 'icons',
    description: 'The icons used in Vjsf components. You can overwrite only the keys you want to change.',
    default: {},
    values: defaultIcons,
  },
  {
    key: 'confirmDeleteItem',
    description: 'If active the action to delete an item in a list is protected by a small confirmation step.',
    default: true,
  },
]
