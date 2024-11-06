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

export type VjsfIconSet = {
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
  iconset: VjsfIconSet
}

export type VjsfCompileOptions = Partial<CompileOptions> & {
  pluginsImports: string[]
}
export type PartialVjsfCompileOptions = Partial<VjsfCompileOptions>

export type VjsfOptions = PartialVjsfCompileOptions & VjsfStatefulLayoutOptions
export type PartialVjsfOptions = Partial<Omit<VjsfOptions, 'width' | 'vjsfSlots' | 'onData' | 'onUpdate' | 'onAutofocus'>>

export type VjsfStatefulLayout = Omit<StatefulLayout, 'options'> & {options: VjsfStatefulLayoutOptions}

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
export type VjsfRadioGroupNode = Omit<RadioGroupNode, 'options'> & {options: VjsfOptions}
export type VjsfCheckboxGroupNode = Omit<CheckboxGroupNode, 'options'> & {options: VjsfOptions}
export type VjsfSwitchGroupNode = Omit<SwitchGroupNode, 'options'> & {options: VjsfOptions}
export type VjsfSliderNode = Omit<SliderNode, 'options'> & {options: VjsfOptions}
export type VjsfSwitchNode = Omit<SwitchNode, 'options'> & {options: VjsfOptions}
export type VjsfTextFieldNode = Omit<TextFieldNode, 'options'> & {options: VjsfOptions}
export type VjsfTextareaNode = Omit<TextareaNode, 'options'> & {options: VjsfOptions}
export type VjsfVerticalTabsNode = Omit<VerticalTabsNode, 'options'> & {options: VjsfOptions}
export type VjsfStepperNode = Omit<StepperNode, 'options'> & {options: VjsfOptions}
export type VjsfComboboxNode = Omit<ComboboxNode, 'options'> & {options: VjsfOptions}
export type VjsfFileInputNode = Omit<FileInputNode, 'options'> & {options: VjsfOptions}
export type VjsfCardNode = Omit<CardNode, 'options'> & {options: VjsfOptions}
