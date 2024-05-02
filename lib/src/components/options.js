/** @type {import("../types.js").PartialVjsfOptions} */
export const defaultOptions = {
  nodeComponents: {},
  plugins: [],
  pluginsOptions: {}
}

/**
 *
 * @param {Partial<import("../types.js").VjsfOptions> | null} options
 * @param {any} form
 * @param {number} width
 * @param {import("vue").Slots} slots
 * @param {Record<string, import('vue').Component>} defaultNodeComponents
 * @returns
 */
export const getFullOptions = (options, form, width, slots, defaultNodeComponents) => {
  const components = options?.components ?? {}
  const nodeComponents = { ...defaultNodeComponents, ...options?.nodeComponents }
  if (options?.plugins) {
    for (const plugin of options.plugins) {
      components[plugin.info.name] = plugin.info
      nodeComponents[plugin.info.name] = plugin.nodeComponent
    }
  }

  const fullOptions = {
    ...defaultOptions,
    readOnly: !!(form && (form.isDisabled.value || form.isReadonly.value)),
    ...options,
    context: options?.context ? JSON.parse(JSON.stringify(options.context)) : {},
    width: Math.round(width ?? 0),
    vjsfSlots: { ...slots },
    components,
    nodeComponents
  }
  return /** @type import('../types.js').VjsfOptions */ (fullOptions)
}
