// Hand-written descriptions for the layout-keyword reference page. The
// *structure* (which groups, properties and components exist) comes from
// @json-layout/vocabulary at build time (layout-vocabulary.ts); this file only
// carries the prose. The build fails on keys unknown to the vocabulary (stale
// docs), and vocabulary entries missing here render with a "not documented
// yet" marker — so bumping the vocabulary surfaces new annotations on the page
// without breaking anything.
//
// Descriptions are rendered with v-html: inline `<code>` is fine, but use the
// structured `see` field for internal links (router-link handles the base
// path, raw <a href="/..."> would not).

export interface LayoutPropDescription {
  description: string
  see?: { to: string, label: string }
  /** Produced by schema normalization rather than written in `layout`. */
  computed?: boolean
}

export interface LayoutGroupDescription {
  title: string
  props: Record<string, LayoutPropDescription>
}

export interface LayoutComponentDescription {
  description: string
  page?: { to: string, label: string }
  props?: Record<string, LayoutPropDescription>
}

const seeDynamicData = { to: '/behavior/dynamic-data', label: 'dynamic data' }
const seeSelect = { to: '/components/select', label: 'select' }
const seeSlots = { to: '/behavior/slots', label: 'slots' }
const seeVuetify = { to: '/behavior/vuetify-integration', label: 'Vuetify integration' }
const seeTextField = { to: '/components/text-field', label: 'text field' }
const seeNumber = { to: '/components/number', label: 'number' }
const seeBoolean = { to: '/components/boolean', label: 'boolean' }
const seeDateTime = { to: '/components/date-time', label: 'date & time' }
const seeSections = { to: '/components/sections', label: 'sections' }
const seeTabs = { to: '/components/tabs-stepper-panels', label: 'tabs, stepper & panels' }
const seeLists = { to: '/components/lists', label: 'lists' }
const seeListActions = { to: '/components/list-actions', label: 'list actions' }
const seeSelectionGroups = { to: '/components/selection-groups', label: 'selection groups' }
const seeCombined = { to: '/components/combined-schemas', label: 'combined schemas' }

export const groupDescriptions: Record<string, LayoutGroupDescription> = {
  base: {
    title: 'Every component',
    props: {
      if: {
        description: 'Conditionally renders the node from a JS expression — a purely visual condition, independent of schema validation.',
        see: { to: '/components/combined-schemas', label: 'combined schemas' },
      },
      options: {
        description: 'Overrides runtime options for this node and its children.',
        see: { to: '/behavior/options', label: 'options' },
      },
      getOptions: {
        description: 'Expression variant of <code>options</code>: computes the overrides dynamically.',
        see: { to: '/behavior/options', label: 'options' },
      },
      defaultData: {
        description: 'Static default value applied while the node\'s data is empty or missing (per the <code>defaultOn</code> option) — the layout counterpart of the schema\'s <code>default</code>.',
        see: { to: '/behavior/validation#default-values', label: 'validation' },
      },
      getDefaultData: {
        description: 'Computes a default value from an expression while the node\'s data is empty.',
        see: { to: '/behavior/dynamic-data#computed-default-values', label: 'dynamic data' },
      },
      constData: {
        description: 'Forces the node\'s data to a constant value — the layout counterpart of the schema\'s <code>const</code> keyword.',
        see: { to: '/behavior/dynamic-data#constant-data', label: 'dynamic data' },
      },
      getConstData: {
        description: 'Expression variant of <code>constData</code>: the node\'s data always follows the expression\'s result.',
        see: { to: '/behavior/dynamic-data#constant-data', label: 'dynamic data' },
      },
      transformData: {
        description: 'Expression applied to the node\'s data every time it changes, transforming what gets stored.',
        see: { to: '/behavior/dynamic-data#transforming-entered-data', label: 'dynamic data' },
      },
      nullable: {
        computed: true,
        description: 'Derived from a type union with <code>"null"</code> (e.g. <code>type: ["string", "null"]</code>): emptying the field stores <code>null</code> instead of removing the property.',
        see: { to: '/behavior/validation#nullable-values', label: 'validation' },
      },
      help: {
        description: 'Help text (markdown) shown in a tooltip behind an info button next to the field — the schema\'s <code>description</code> lands here by default (<code>useDescription</code> option).',
      },
      warning: {
        computed: true,
        description: 'Set from the schema\'s <code>deprecated: true</code> (with the <code>useDeprecated</code> option): turns the help tooltip into a warning.',
      },
      cols: {
        description: 'Grid width of the node, out of 12 columns — a number or a responsive object (<code>{ "sm": 6, "lg": 4 }</code>).',
        see: { to: '/components/grid', label: 'grid' },
      },
      props: {
        description: 'Extra props forwarded as-is to the rendered Vuetify component.',
        see: seeVuetify,
      },
      getProps: {
        description: 'Expression variant of <code>props</code>: computes the forwarded props dynamically.',
        see: seeVuetify,
      },
      slots: {
        description: 'Injects custom content (text, markdown or a named Vue slot) before, after or inside the node.',
        see: seeSlots,
      },
    },
  },
  simple: {
    title: 'Simple (non-composite) components',
    props: {
      label: {
        description: 'Overrides the field\'s label (schema <code>title</code> or property key by default); an empty string removes it.',
        see: seeTextField,
      },
      hint: {
        description: 'Hint text displayed under the field, like Vuetify\'s <code>hint</code> prop.',
        see: seeVuetify,
      },
    },
  },
  composite: {
    title: 'Composite components',
    props: {
      title: {
        description: 'Heading displayed above the group; <code>null</code> removes the title coming from the schema.',
        see: seeSections,
      },
      subtitle: {
        description: 'Secondary line displayed under the title.',
        see: seeSections,
      },
      children: {
        description: 'Reorders and regroups the object\'s properties, mixing property keys and nested layout definitions.',
        see: seeSections,
      },
    },
  },
  focusable: {
    title: 'Focusable components',
    props: {
      autofocus: {
        description: 'Focuses the field as soon as the form is rendered.',
      },
    },
  },
  'items-based': {
    title: 'Items-based components (selection controls)',
    props: {
      items: {
        description: 'Static list of selectable items (strings or <code>{ "title": ..., "value": ... }</code> objects), replacing the schema\'s <code>enum</code>/<code>oneOf</code>.',
        see: seeSelect,
      },
      getItems: {
        description: 'Computes the items from an expression or an HTTP fetch.',
        see: seeDynamicData,
      },
    },
  },
  'multiple-compat': {
    title: 'Array-compatible components',
    props: {
      multiple: {
        computed: true,
        description: 'Derived from a <code>type: "array"</code> schema (or a string with <code>separator</code>): the component accepts several values.',
        see: seeSelect,
      },
      separator: {
        description: 'On a string schema, splits and joins the value on this separator so a multi-select edits a single delimited string.',
        see: { to: '/components/select#separator-joined-strings', label: 'select' },
      },
    },
  },
}

export const componentDescriptions: Record<string, LayoutComponentDescription> = {
  none: {
    description: 'Renders nothing while keeping the node alive — combine with the schema\'s <code>const</code> to hide fixed technical values.',
  },
  slot: {
    description: 'Replaces the node\'s rendering with content you provide from the Vue app.',
    page: seeSlots,
  },
  'composite-slot': {
    description: 'A slot that also renders the node\'s children — wraps a group of properties in custom markup.',
    page: seeSlots,
  },
  section: {
    description: 'The default rendering of an object: children stacked under an optional title.',
    page: seeSections,
  },
  tabs: {
    description: 'Object children split into horizontal tabs.',
    page: seeTabs,
  },
  'vertical-tabs': {
    description: 'Object children split into vertical tabs.',
    page: seeTabs,
  },
  'expansion-panels': {
    description: 'Object children split into expansion panels.',
    page: seeTabs,
  },
  stepper: {
    description: 'Object children presented as sequential steps.',
    page: seeTabs,
  },
  card: {
    description: 'Object children wrapped in a <code>v-card</code>, with the title as its header.',
    page: seeSections,
  },
  list: {
    description: 'The default rendering of an array of objects: an editable list of items.',
    page: seeLists,
    props: {
      title: { description: 'Heading displayed above the list.' },
      listEditMode: {
        description: 'How items are edited: <code>inline</code>, <code>inline-single</code> (one item at a time), <code>menu</code> or <code>dialog</code>.',
        see: seeLists,
      },
      listActions: {
        description: 'The actions offered on items; remove entries to restrict editing.',
        see: seeListActions,
      },
      clipboardKey: {
        description: 'Namespace for copy/paste between lists — items can only be pasted into lists sharing the same key.',
        see: seeListActions,
      },
      itemTitle: {
        description: 'Expression computing the title displayed for each item.',
        see: seeLists,
      },
      itemSubtitle: {
        description: 'Expression computing the subtitle displayed for each item.',
        see: seeLists,
      },
      itemCopy: {
        description: 'Expression transforming an item when it is duplicated (e.g. to reset a unique id).',
        see: seeListActions,
      },
      indexed: {
        computed: true,
        description: 'Derived from an object schema with <code>patternProperties</code>: the object is edited as a list of key + value entries, and this holds the allowed key patterns.',
        see: seeLists,
      },
      messages: {
        description: 'Overrides the labels of the list\'s actions (<code>addItem</code>, <code>delete</code>, <code>edit</code>...).',
        see: seeLists,
      },
    },
  },
  'text-field': {
    description: 'Single-line text input (<code>v-text-field</code>), the default for plain strings.',
    page: seeTextField,
    props: {
      placeholder: { description: 'Placeholder text shown while the field is empty.' },
    },
  },
  textarea: {
    description: 'Multi-line text input (<code>v-textarea</code>).',
    page: seeTextField,
    props: {
      placeholder: { description: 'Placeholder text shown while the field is empty.' },
      rows: { description: 'Number of visible text rows.' },
    },
  },
  'number-field': {
    description: 'Numeric input (<code>v-number-input</code>), the default for numbers and integers.',
    page: seeNumber,
    props: {
      step: { description: 'Increment applied by the up/down controls (defaults from the schema\'s <code>multipleOf</code>).' },
      min: { description: 'Lower bound (defaults from the schema\'s <code>minimum</code>).' },
      max: { description: 'Upper bound (defaults from the schema\'s <code>maximum</code>).' },
      precision: { description: 'Number of decimal places accepted.' },
      placeholder: { description: 'Placeholder text shown while the field is empty.' },
    },
  },
  checkbox: {
    description: 'The default rendering of a boolean.',
    page: seeBoolean,
  },
  switch: {
    description: 'A boolean as a <code>v-switch</code>.',
    page: seeBoolean,
  },
  slider: {
    description: 'A number as a <code>v-slider</code>.',
    page: seeNumber,
    props: {
      step: { description: 'Increment between selectable values (defaults from the schema\'s <code>multipleOf</code>).' },
      min: { description: 'Lower bound (defaults from the schema\'s <code>minimum</code>).' },
      max: { description: 'Upper bound (defaults from the schema\'s <code>maximum</code>).' },
    },
  },
  'date-picker': {
    description: 'Date selection in a calendar menu, the default for <code>format: "date"</code> strings.',
    page: seeDateTime,
    props: {
      min: { description: 'Earliest selectable date.' },
      max: { description: 'Latest selectable date.' },
      format: { description: 'Format of the stored string: <code>date</code> or <code>date-time</code>.' },
    },
  },
  'date-time-picker': {
    description: 'Date and time selection, the default for <code>format: "date-time"</code> strings.',
    page: seeDateTime,
    props: {
      min: { description: 'Earliest selectable date-time.' },
      max: { description: 'Latest selectable date-time.' },
    },
  },
  'time-picker': {
    description: 'Time selection, the default for <code>format: "time"</code> strings.',
    page: seeDateTime,
    props: {
      min: { description: 'Earliest selectable time.' },
      max: { description: 'Latest selectable time.' },
    },
  },
  'color-picker': {
    description: 'Color selection, the default for <code>format: "hexcolor"</code> strings.',
    page: { to: '/components/color', label: 'color' },
  },
  select: {
    description: 'Closed-list selection (<code>v-select</code>), the default for <code>enum</code>/<code>oneOf</code> schemas.',
    page: seeSelect,
    props: {
      placeholder: { description: 'Placeholder text shown while nothing is selected.' },
    },
  },
  autocomplete: {
    description: 'Select with text search (<code>v-autocomplete</code>) — automatic past 20 items or with a searchable <code>getItems</code>.',
    page: seeSelect,
    props: {
      placeholder: { description: 'Placeholder text shown while nothing is selected.' },
    },
  },
  combobox: {
    description: 'Free text input with suggestions (<code>v-combobox</code>) — values outside the items are allowed.',
    page: seeSelect,
    props: {
      placeholder: { description: 'Placeholder text shown while the field is empty.' },
    },
  },
  'number-combobox': {
    description: 'A combobox restricted to numeric values.',
    page: seeNumber,
    props: {
      placeholder: { description: 'Placeholder text shown while the field is empty.' },
      step: { description: 'Increment between suggested values.' },
      min: { description: 'Lower bound of the accepted values.' },
      max: { description: 'Upper bound of the accepted values.' },
    },
  },
  'checkbox-group': {
    description: 'Multiple selection as a group of checkboxes.',
    page: seeSelectionGroups,
  },
  'switch-group': {
    description: 'Multiple selection as a group of switches.',
    page: seeSelectionGroups,
  },
  'radio-group': {
    description: 'Single selection as radio buttons.',
    page: seeSelectionGroups,
  },
  'file-input': {
    description: 'File selection (<code>v-file-input</code>); the picked file is stored in the form data.',
    page: { to: '/components/file', label: 'file' },
    props: {
      accept: { description: 'Restricts the selectable file types (native <code>accept</code> attribute, e.g. <code>image/*</code>).' },
      placeholder: { description: 'Placeholder text shown while no file is selected.' },
    },
  },
  'one-of-select': {
    description: 'The selector rendered above a <code>oneOf</code> to pick the active subschema.',
    page: seeCombined,
    props: {
      emptyData: {
        description: 'When switching branches, remove only the properties of the previous branch instead of clearing the whole node\'s data.',
      },
      autocomplete: {
        description: 'Render the branch selector as an autocomplete instead of a select.',
      },
      oneOfItems: {
        description: 'The items of the branch selector, normally derived from each branch\'s <code>title</code>.',
      },
    },
  },
}
