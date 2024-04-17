/** @type import("../types.js").PartialVjsfCompileOptions */
export const defaultOptions = {
  nodeComponentImports: {
    markdown: '@koumoul/vjsf-markdown'
  }
}

/**
 *
 * @param {import("../types.js").PartialVjsfCompileOptions} options
 * @returns
 */
export const getFullOptions = (options) => {
  const fullOptions = {
    ...defaultOptions,
    nodeComponentImports: { ...defaultOptions.nodeComponentImports, ...options.nodeComponentImports }
  }
  return /** @type import('../types.js').VjsfCompileOptions */ (fullOptions)
}
