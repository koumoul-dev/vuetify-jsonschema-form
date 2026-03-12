import NodeSection from './section.vue'
import NodeTextField from './text-field.vue'
import NodeTextarea from './textarea.vue'
import NodeCheckbox from './checkbox.vue'
import NodeSwitch from './switch.vue'
import NodeNumberField from './number-field.vue'
import NodeSlider from './slider.vue'
import NodeDatePicker from './date-picker.vue'
import NodeTimePicker from './time-picker.vue'
import NodeDateTimePicker from './date-time-picker.vue'
import NodeColorPicker from './color-picker.vue'
import NodeSelect from './select.vue'
import NodeAutocomplete from './autocomplete.vue'
import NodeRadioGroup from './radio-group.vue'
import NodeCheckboxGroup from './checkbox-group.vue'
import NodeSwitchGroup from './switch-group.vue'
import NodeOneOfSelect from './one-of-select.vue'
import NodeTabs from './tabs.vue'
import NodeVerticalTabs from './vertical-tabs.vue'
import NodeCombobox from './combobox.vue'
import NodeNumberCombobox from './number-combobox.vue'
import NodeExpansionPanels from './expansion-panels.vue'
import NodeStepper from './stepper.vue'
import NodeList from './list.vue'
import NodeFileInput from './file-input.vue'
import NodeCard from './card.vue'

/** @type {Record<string, import('vue').Component>} */
export const nodeComponents = {
  section: NodeSection,
  'text-field': NodeTextField,
  textarea: NodeTextarea,
  checkbox: NodeCheckbox,
  switch: NodeSwitch,
  'number-field': NodeNumberField,
  slider: NodeSlider,
  'date-picker': NodeDatePicker,
  'time-picker': NodeTimePicker,
  'date-time-picker': NodeDateTimePicker,
  'color-picker': NodeColorPicker,
  select: NodeSelect,
  autocomplete: NodeAutocomplete,
  'radio-group': NodeRadioGroup,
  'checkbox-group': NodeCheckboxGroup,
  'switch-group': NodeSwitchGroup,
  'one-of-select': NodeOneOfSelect,
  tabs: NodeTabs,
  'vertical-tabs': NodeVerticalTabs,
  'expansion-panels': NodeExpansionPanels,
  stepper: NodeStepper,
  list: NodeList,
  combobox: NodeCombobox,
  'number-combobox': NodeNumberCombobox,
  'file-input': NodeFileInput,
  card: NodeCard
}
