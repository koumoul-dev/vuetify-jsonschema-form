import { StatefulLayoutOptions } from '@json-layout/core'

export type VjsfOptions = StatefulLayoutOptions & {
  density: 'default' | 'comfortable' | 'compact',
  fieldProps: Record<string, unknown>,
  fieldPropsCompact: Record<string, unknown>,
  fieldPropsComfortable: Record<string, unknown>,
  fieldPropsReadOnly: Record<string, unknown>,
  textfieldProps: Record<string, unknown>,
  textfieldPropsReadOnly: Record<string, unknown>,
  textareaProps: Record<string, unknown>,
  textareaPropsReadOnly: Record<string, unknown>,
  checkboxProps: Record<string, unknown>,
  checkboxPropsReadOnly: Record<string, unknown>,
  switchProps: Record<string, unknown>,
  switchPropsReadOnly: Record<string, unknown>,
}

export const defaultOptions: Partial<VjsfOptions> = {
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
  switchPropsReadOnly: {}
}
