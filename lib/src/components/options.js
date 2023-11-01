/** @type import("./types.js").PartialVjsfOptions */
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
  textfieldProps: {},
  textfieldPropsReadOnly: {},
  textareaProps: {},
  textareaPropsReadOnly: {},
  // it is not very common to show an error below checkboxes and switches and without hide-details=auto they take a lot of space
  checkboxProps: { hideDetails: 'auto' },
  checkboxPropsReadOnly: {},
  switchProps: { hideDetails: 'auto' },
  switchPropsReadOnly: {},
  errorAlertProps: { type: 'error', variant: 'tonal' }
}
