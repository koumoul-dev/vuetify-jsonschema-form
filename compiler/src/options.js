export const defaultOptions = {
  pluginsImports: ['@koumoul/vjsf-markdown']
}

/**
 *
 * @param {import("../../lib/src/types.js").PartialVjsfCompileOptions} options
 * @returns
 */
export const getFullOptions = (options) => {
  /** @type {import('../../lib/src/types.js').VjsfCompileOptions} */
  const fullOptions = { ...defaultOptions, ...options }
  return fullOptions
}
