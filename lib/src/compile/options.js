export const defaultOptions = {
  pluginsImports: ['@koumoul/vjsf-markdown']
}

/**
 *
 * @param {import("../types.js").PartialVjsfCompileOptions} options
 * @returns
 */
export const getFullOptions = (options) => {
  /** @type {import('../types.js').VjsfCompileOptions} */
  const fullOptions = { ...defaultOptions, ...options }
  return fullOptions
}
