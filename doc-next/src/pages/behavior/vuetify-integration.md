---
title: Vuetify integration
description: Picking the Vuetify component rendered by each node with layout.comp, passing it props with layout.props, and styling every form at once with Vuetify defaults
nav:
  order: 3
---

# Vuetify integration

Every node of a VJSF form is rendered by a Vuetify component: a plain
string property becomes a `v-text-field`, a number a `v-number-input`,
an object a section laid out with `v-row`... Three knobs control this
rendering: choosing the component (`layout.comp`), passing props to it
(`layout.props`), and styling all forms at once at the application
level (Vuetify defaults).

## Choosing the component with layout.comp

Each schema type has a default component, and `layout.comp` switches
the node to any other component compatible with the data. For example a
number property, rendered as a `v-number-input` by default, can become
a slider:

<VjsfDemo demo="demo-vuetify-integration/comp" expanded hide-data />

When `comp` is the only key you set, the object wrapper can be dropped:
a string `layout` is the shorthand for `{ "comp": ... }`. These two
schemas are strictly equivalent:

<v-row>
<v-col cols="12" md="6">

```json
{
  "type": "number",
  "layout": { "comp": "slider" }
}
```

</v-col>
<v-col cols="12" md="6">

```json
{
  "type": "number",
  "layout": "slider"
}
```

</v-col>
</v-row>

The available values are listed in the [catalogue below](#components-catalogue),
and each component has its own documentation page in the *Components*
section of this doc.

## Passing props with layout.props

`layout.props` is forwarded as-is to the underlying Vuetify component.
There is no VJSF-specific list of accepted props: anything the Vuetify
component supports (see for example the
[v-text-field API](https://vuetifyjs.com/en/api/v-text-field/)) can be
passed. Keys can be written in camelCase or kebab-case, like in a Vue
template:

<VjsfDemo demo="demo-vuetify-integration/props" expanded hide-data />

Props set this way win over the ones VJSF derives from its own
[options](/behavior/options) (`density`, `readOnly`...), but a few
props computed from the schema and the form state — the label, hint,
model value and error messages — are managed by VJSF itself and cannot
be overwritten here (use `layout.label` / `layout.hint` instead).

To compute props dynamically from the form's state, `layout.getProps`
accepts an [expression](/behavior/expressions) returning the same kind
of object.

## Styling globally with Vuetify defaults

A one-off tweak belongs in the schema with `layout.props`; a styling
convention shared by all your forms belongs in
[Vuetify defaults](https://vuetifyjs.com/en/features/global-configuration/).
Every VJSF node registers itself in the defaults system under its own
alias — `VjsfTextField`, `VjsfSlider`... ([catalogue below](#components-catalogue)) —
so a defaults entry can target the Vuetify components rendered inside a
given node type. Nest the inner Vuetify component's name under the
alias:

```js
import { createVuetify } from 'vuetify'

createVuetify({
  defaults: {
    // every text field of every VJSF form, outlined
    VjsfTextField: {
      VTextField: { variant: 'outlined' }
    }
  }
})
```

The same object can be scoped to a subtree of your application with a
[v-defaults-provider](https://vuetifyjs.com/en/components/defaults-providers/) —
that is exactly what this demo does (see its *Vuetify defaults* tab):

<VjsfDemo demo="demo-vuetify-integration/defaults" expanded hide-data />

Beyond the per-component aliases:

- `Vjsf` targets the root component, `VjsfNode` every node whatever its
  type.
- Standard Vuetify defaults (`global`, `VTextField`, ...) also apply
  inside forms, like anywhere else in your application.
- A few *compound* keys target one specific internal part of a
  composite component; they take the props directly, without nesting
  (second table below).

## Components catalogue

Every `layout.comp` value, the main Vuetify component(s) it renders,
and the defaults alias it registers:

| `layout.comp` | renders | defaults alias |
| --- | --- | --- |
| `text-field` | [v-text-field](https://vuetifyjs.com/en/api/v-text-field/) | `VjsfTextField` |
| `textarea` | [v-textarea](https://vuetifyjs.com/en/api/v-textarea/) | `VjsfTextArea` |
| `number-field` | [v-number-input](https://vuetifyjs.com/en/api/v-number-input/) | `VjsfNumberField` |
| `slider` | [v-slider](https://vuetifyjs.com/en/api/v-slider/) | `VjsfSlider` |
| `checkbox` | [v-checkbox](https://vuetifyjs.com/en/api/v-checkbox/) | `VjsfCheckbox` |
| `switch` | [v-switch](https://vuetifyjs.com/en/api/v-switch/) | `VjsfSwitch` |
| `select` | [v-select](https://vuetifyjs.com/en/api/v-select/) | `VjsfSelect` |
| `autocomplete` | [v-autocomplete](https://vuetifyjs.com/en/api/v-autocomplete/) | `VjsfAutocomplete` |
| `combobox` | [v-combobox](https://vuetifyjs.com/en/api/v-combobox/) | `VjsfCombobox` |
| `number-combobox` | [v-combobox](https://vuetifyjs.com/en/api/v-combobox/) | `VjsfCombobox` |
| `one-of-select` | [v-select](https://vuetifyjs.com/en/api/v-select/) (v-autocomplete with `layout.autocomplete`) | `VjsfOneOfSelect` |
| `date-picker` | [v-date-picker](https://vuetifyjs.com/en/api/v-date-picker/) in a text-field menu | `VjsfDatePicker` |
| `date-time-picker` | v-date-picker + v-time-picker in a text-field menu | `VjsfDatePicker` |
| `time-picker` | [v-time-picker](https://vuetifyjs.com/en/api/v-time-picker/) in a text-field menu | `VjsfTimePicker` |
| `color-picker` | [v-color-input](https://vuetifyjs.com/en/api/v-color-input/) | `VjsfColorPicker` |
| `file-input` | [v-file-input](https://vuetifyjs.com/en/api/v-file-input/) | `VjsfFileInput` |
| `radio-group` | [v-radio-group](https://vuetifyjs.com/en/api/v-radio-group/) | `VjsfRadioGroup` |
| `checkbox-group` | one [v-checkbox](https://vuetifyjs.com/en/api/v-checkbox/) per item | `VjsfCheckboxGroup` |
| `switch-group` | one [v-switch](https://vuetifyjs.com/en/api/v-switch/) per item | `VjsfSwitchGroup` |
| `section` | [v-row](https://vuetifyjs.com/en/api/v-row/) | `VjsfSection` |
| `card` | [v-card](https://vuetifyjs.com/en/api/v-card/) | `VjsfCard` |
| `tabs` | [v-tabs](https://vuetifyjs.com/en/api/v-tabs/) + v-window | `VjsfTabs` |
| `vertical-tabs` | [v-tabs](https://vuetifyjs.com/en/api/v-tabs/) + v-window | `VjsfVerticalTabs` |
| `expansion-panels` | [v-expansion-panels](https://vuetifyjs.com/en/api/v-expansion-panels/) | `VjsfExpansionPanels` |
| `stepper` | [v-stepper](https://vuetifyjs.com/en/api/v-stepper/) | `VjsfStepper` |
| `list` | [v-list](https://vuetifyjs.com/en/api/v-list/), v-card, v-menu / v-dialog | `VjsfList` |

The compound keys, taking props directly (no nesting):

| key | targets |
| --- | --- |
| `VjsfTabs-VSheet` / `VjsfVerticalTabs-VSheet` | the sheet framing a tabs section's content |
| `VjsfList-VCard` / `VjsfList-VList` / `VjsfList-VListItem` | the chrome of an editable list |
| `VjsfList-Edit-VMenu` / `VjsfList-Edit-VDialog` / `VjsfList-Edit-VDialog-VSheet` | the menu / dialog editing a list item |
| `VjsfOneOfSelect-VAvatar` / `VjsfSelectItem-VAvatar` | the avatars shown in select items |
| `VjsfIndexedList-VSelect` | the key select of an indexed list (`patternProperties`) |

## Related

- [Options](/behavior/options) — VJSF's own options, overridable per
  node with `layout.options`, as opposed to the Vuetify props covered
  here.
- [Expressions](/behavior/expressions) — `layout.getProps` and the
  other dynamic layout expressions.
- [Slots](/behavior/slots) — injecting content around or instead of a
  node when props are not enough.
