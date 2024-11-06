import { runtimeOptions as jlRuntimeOptions, compileOptions as jlCompileOptions } from '@json-layout/core/utils/doc-options'
// import { defaultOptions } from '@koumoul/vjsf/components/options'

/** @type {import('@json-layout/core/utils/doc-options').DocOptions} */
export const compileOptions = [
  ...jlCompileOptions
]

/** @type {import('@json-layout/core/utils/doc-options').DocOptions} */
export const runtimeOptions = [
  ...jlRuntimeOptions,
  {
    key: 'iconset',
    description: `Overwrite the icons used in Vjsf components.
    
By default @koumoul/vjsf/iconsets/mdi is used, you can replace it with @koumoul/vjsf/iconsets/mdi-svg if the mdi icon font is not loaded.`
  }
]
