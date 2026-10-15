---
title: Number
description: The components rendered for number and integer schemas, their validation keywords, and the slider variant
nav:
  order: 11
  subsection: Fields
---

# Number

A schema with `type: "number"` or `type: "integer"` renders as a Vuetify
`v-number-input` (the `number-field` component), with its up/down
spinner buttons.

## type: number vs type: integer

Both types render the same `v-number-input` component; the difference is
in how it accepts keystrokes: for `number` you can freely type a decimal
point, but for `integer` the input filters it out as you type — entering
`1.5` in the field below silently produces `15`, rather than a validation
error, since the schema never actually receives a fractional value:

<VjsfDemo demo="demo-number/number-vs-integer" expanded />

## minimum, maximum & multipleOf

The standard JSON Schema numeric keywords are validated the same way as
any other constraint — errors are shown inline, timed by `validateOn`
(see [validation](/behavior/validation)). The field below only accepts
multiples of 5 between 0 and 100; it starts out with an invalid value
(`42`) to show the message immediately:

<VjsfDemo demo="demo-number/validation" expanded />

## layout: slider

Setting `layout` to `"slider"` renders a Vuetify `v-slider` instead. It
reads `minimum`/`maximum` from the schema for its range, and the step
between values is set with `layout.step` — a first-class layout key,
not a `layout.props` passthrough (it defaults to `1` when the type is
`integer`):

<VjsfDemo demo="demo-number/slider" expanded />

## A slider label on its own line

By default the slider's label sits *inline*, to the left of the track. On
a narrow layout that leaves little room for the slider itself and the
label wraps awkwardly. A slider is a *simple* component, so its label is
the `layout.label` key — setting it to an empty string drops that inline
label, and a [`before` slot](/behavior/slots) puts the title on its own
line *above* the track instead (a string slot is rendered as Markdown, so
no template is needed). The same schema forwards `thumb-label` and
`show-ticks` straight to the `v-slider` through `layout.props` (see
[Vuetify integration](/behavior/vuetify-integration)), while `step`
remains the first-class `layout` key from the previous section:

<VjsfDemo demo="demo-number/slider-label-before" expanded />

## Related

- [`useTitle`, `useDescription`, `useDefault`, `useExamples`](/behavior/options) —
  the same annotation surfacing described on the
  [text field](/components/text-field#hints-and-labels) page applies to
  number fields too.
- [`validateOn`, `initialValidation`](/behavior/validation) — when
  numeric validation errors are actually displayed.
