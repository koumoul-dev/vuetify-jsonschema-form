/** @type {import("../types.js").PartialVjsfOptions} */
export const defaultOptions = {
  errorAlertProps: { type: 'error', variant: 'tonal' },
  easyMDEOptions: {},
  nodeComponents: {}
}

/**
 *
 * @param {Partial<import("../types.js").VjsfOptions> | null} options
 * @param {any} form
 * @param {number} width
 * @param {import("vue").Slots} slots
 * @param {Record<string, import('vue').Component>} nodeComponents
 * @returns
 */
export const getFullOptions = (options, form, width, slots, nodeComponents) => {
  const fullOptions = {
    ...defaultOptions,
    readOnly: !!(form && (form.isDisabled.value || form.isReadonly.value)),
    ...options,
    context: options?.context ? JSON.parse(JSON.stringify(options.context)) : {},
    width: Math.round(width ?? 0),
    vjsfSlots: { ...slots },
    nodeComponents: { ...nodeComponents, ...options?.nodeComponents }
  }
  return /** @type import('../types.js').VjsfOptions */ (fullOptions)
}
