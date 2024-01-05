/** @type import("../types.js").PartialVjsfOptions */
export const defaultOptions = {
  // matches the density prop found in many vuetify components
  density: 'default',
  titleDepth: 2,
  fieldProps: {},
  fieldPropsCompact: {
    density: 'compact',
    hideDetails: 'auto'
  },
  fieldPropsComfortable: {
    density: 'comfortable'
  },
  fieldPropsReadOnly: { hideDetails: 'auto', variant: 'plain' },
  fieldPropsSummary: { hideDetails: true },
  textfieldProps: {},
  textfieldPropsReadOnly: {},
  textareaProps: {},
  textareaPropsReadOnly: {},
  // it is not very common to show an error below checkboxes and switches and without hide-details=auto they take a lot of space
  checkboxProps: { hideDetails: 'auto' },
  checkboxPropsReadOnly: {},
  switchProps: { hideDetails: 'auto' },
  switchPropsReadOnly: {},
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
