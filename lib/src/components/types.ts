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
