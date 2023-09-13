import { StatefulLayoutOptions } from '@json-layout/core'

export type VjsfOptions = StatefulLayoutOptions & {
  density: 'default' | 'comfortable' | 'compact',
  fieldProps: Record<string, unknown>,
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

export const defaultOptions = (options: Partial<VjsfOptions>): Partial<VjsfOptions> => {
  return {
    // matches the density prop found in many vuetify components
    density: 'default',
    titleDepth: 4,
    fieldProps: options.density === 'compact' ? { hideDetails: 'auto', density: options.density ?? 'default' } : { density: options.density ?? 'default' },
    fieldPropsReadOnly: { hideDetails: 'auto', variant: 'plain' },
    textfieldProps: {},
    textfieldPropsReadOnly: {},
    textareaProps: {},
    textareaPropsReadOnly: {},
    // it is not very common to show an error below checkboxes and switches and without hide-details=auto they take a lot of space
    checkboxProps: options.density === 'compact' ? {} : { hideDetails: 'auto' },
    checkboxPropsReadOnly: {},
    switchProps: options.density === 'compact' ? {} : { hideDetails: 'auto' },
    switchPropsReadOnly: {}
  }
}
