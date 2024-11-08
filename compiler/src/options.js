export const defaultOptions = {
  // pluginsImports: ['@koumoul/vjsf-markdown']
  pluginsImports: []
}

/**
 *
 * @param {import("./types.js").PartialVjsfCompilerOptions} options
 * @returns
 */
export const getFullOptions = (options) => {
  /** @type {import('./types.js').VjsfCompilerOptions} */
  const fullOptions = { ...defaultOptions, ...options }
  return fullOptions
}
