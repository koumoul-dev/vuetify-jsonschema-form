/** @type import("../types.js").PartialVjsfCompileOptions */
export const defaultOptions = {
  pluginsImports: ['@koumoul/vjsf-markdown'],
  components: {}
}

/**
 *
 * @param {import("../types.js").PartialVjsfCompileOptions} options
 * @returns
 */
export const getFullOptions = (options) => {
  const fullOptions = { ...defaultOptions }
  return /** @type import('../types.js').VjsfCompileOptions */ (fullOptions)
}
