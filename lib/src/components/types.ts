import {
  StatefulLayoutOptions,
  StateNode,
  CheckboxNode,
  ColorPickerNode,
  DatePickerNode,
  DateTimePickerNode,
  TabsNode,
  ExpansionPanelsNode,
  ListNode,
  NumberFieldNode,
  OneOfSelectNode,
  SectionNode,
  SelectNode,
  SliderNode,
  SwitchNode,
  TextFieldNode,
  TextareaNode,
  VerticalTabsNode,
  CompileOptions
} from '@json-layout/core'

export type Density = 'default' | 'comfortable' | 'compact'

export type VjsfOptions = StatefulLayoutOptions & CompileOptions & {
  density: Density,
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
  errorAlertProps: Record<string, unknown>,
  vjsfSlots: Record<string, () => unknown>,
}

export type VjsfNode = Omit<StateNode, 'options'> & {options: VjsfOptions}
export type VjsfTabsNode = Omit<TabsNode, 'options'> & {options: VjsfOptions}
export type VjsfCheckboxNode = Omit<CheckboxNode, 'options'> & {options: VjsfOptions}
export type VjsfColorPickerNode = Omit<ColorPickerNode, 'options'> & {options: VjsfOptions}
export type VjsfDatePickerNode = Omit<DatePickerNode, 'options'> & {options: VjsfOptions}
export type VjsfDateTimePickerNode = Omit<DateTimePickerNode, 'options'> & {options: VjsfOptions}
export type VjsfExpansionPanelsNode = Omit<ExpansionPanelsNode, 'options'> & {options: VjsfOptions}
export type VjsfListNode = Omit<ListNode, 'options'> & {options: VjsfOptions}
export type VjsfNumberFieldNode = Omit<NumberFieldNode, 'options'> & {options: VjsfOptions}
export type VjsfOneOfSelectNode = Omit<OneOfSelectNode, 'options'> & {options: VjsfOptions}
export type VjsfSectionNode = Omit<SectionNode, 'options'> & {options: VjsfOptions}
export type VjsfSelectNode = Omit<SelectNode, 'options'> & {options: VjsfOptions}
export type VjsfSliderNode = Omit<SliderNode, 'options'> & {options: VjsfOptions}
export type VjsfSwitchNode = Omit<SwitchNode, 'options'> & {options: VjsfOptions}
export type VjsfTextFieldNode = Omit<TextFieldNode, 'options'> & {options: VjsfOptions}
export type VjsfTextareaNode = Omit<TextareaNode, 'options'> & {options: VjsfOptions}
export type VjsfVerticalTabsNode = Omit<VerticalTabsNode, 'options'> & {options: VjsfOptions}
