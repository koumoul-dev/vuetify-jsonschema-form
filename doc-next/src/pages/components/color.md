---
title: Color
description: The color picker component and the hex/rgba string it stores
nav:
  order: 14
  subsection: Fields
---

# Color

There is no schema annotation (no `format`, no `contentEncoding`) that
triggers a color picker on its own — a `type: "string"` schema always
renders as a plain `v-text-field` unless you explicitly set `layout` to
`"color-picker"`. Doing so renders a Vuetify `v-color-input`: a text
field with a color swatch pip that opens a full color picker on click.

## Default

<VjsfDemo demo="demo-color/default" expanded />

The stored value is a hex color string, e.g. `"#C80000"`. If you lower
the picker's alpha slider below 1, the value gains a two-digit alpha
suffix instead, e.g. `"#C8000080"`.

## Swatches

The picker's canvas, sliders and hex/rgba/hsla format toggle all come
from Vuetify's `v-color-picker`, so anything that component accepts can
be forwarded through `layout.props.pickerProps`. For example, replacing
the gradient canvas with a fixed palette of swatches:

<VjsfDemo demo="demo-color/swatches" expanded />

## Related

- [`useTitle`, `useDescription`, `useDefault`](/behavior/options) — the
  same annotation surfacing described on the
  [text field](/components/text-field#hints-and-labels) page applies to
  the color picker too.
- [`layout.props`](/behavior/vuetify-integration#passing-props-with-layout.props) —
  how extra props are forwarded as-is to the underlying Vuetify
  component, as used above for `pickerProps`.
