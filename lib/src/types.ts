import type { Component, Slots } from 'vue'

import type { ComponentInfo } from '@json-layout/vocabulary'

import {
  StatefulLayout,
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
  RadioGroupNode,
  CheckboxGroupNode,
  SwitchGroupNode,
  SliderNode,
  SwitchNode,
  TextFieldNode,
  TextareaNode,
  VerticalTabsNode,
  StepperNode,
  ComboboxNode,
  FileInputNode,
  CardNode,
  CompileOptions
} from '@json-layout/core'

export type Density = 'default' | 'comfortable' | 'compact'

export type Plugin = {
  info: ComponentInfo,
  nodeComponent: Component
}

export type VjsfIcons = {
  add: string
  alert: string
  calendar: string
  clock: string
  close: string
  delete: string
  duplicate: string
  edit: string
  infoSymbol: string
  menu: string
  sort: string
  sortUp: string
  sortDown: string
}

// these options used to contain many possibilities to override props in various components
// this was unmaintainable and has been removed, customization of components should be done via slots
// and defaults providers
export type VjsfStatefulLayoutOptions = Partial<StatefulLayoutOptions> & {
  vjsfSlots: Slots,
  nodeComponents: Record<string, Component>,
  plugins: Plugin[],
  pluginsOptions: Record<string, unknown>,
  icons: VjsfIcons
}

export type VjsfCompileOptions = Partial<CompileOptions> & {
  pluginsImports: string[]
}
export type PartialVjsfCompileOptions = Partial<VjsfCompileOptions>

export type VjsfOptions = PartialVjsfCompileOptions & VjsfStatefulLayoutOptions
export type PartialVjsfOptions = PartialVjsfCompileOptions & Partial<Omit<VjsfStatefulLayoutOptions, 'width' | 'vjsfSlots' | 'onData' | 'onUpdate' | 'onAutofocus'>>
export type FullVjsfNodeOptions = Required<VjsfOptions>

export type VjsfStatefulLayout = Omit<StatefulLayout, 'options'> & {options: VjsfStatefulLayoutOptions}

export type VjsfNode = Omit<StateNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfTabsNode = Omit<TabsNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfCheckboxNode = Omit<CheckboxNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfColorPickerNode = Omit<ColorPickerNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfDatePickerNode = Omit<DatePickerNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfDateTimePickerNode = Omit<DateTimePickerNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfExpansionPanelsNode = Omit<ExpansionPanelsNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfListNode = Omit<ListNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfNumberFieldNode = Omit<NumberFieldNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfOneOfSelectNode = Omit<OneOfSelectNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfSectionNode = Omit<SectionNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfSelectNode = Omit<SelectNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfRadioGroupNode = Omit<RadioGroupNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfCheckboxGroupNode = Omit<CheckboxGroupNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfSwitchGroupNode = Omit<SwitchGroupNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfSliderNode = Omit<SliderNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfSwitchNode = Omit<SwitchNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfTextFieldNode = Omit<TextFieldNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfTextareaNode = Omit<TextareaNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfVerticalTabsNode = Omit<VerticalTabsNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfStepperNode = Omit<StepperNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfComboboxNode = Omit<ComboboxNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfFileInputNode = Omit<FileInputNode, 'options'> & {options: FullVjsfNodeOptions}
export type VjsfCardNode = Omit<CardNode, 'options'> & {options: FullVjsfNodeOptions}
