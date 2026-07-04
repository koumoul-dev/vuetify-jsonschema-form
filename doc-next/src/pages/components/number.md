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

<VjsfDemo demo="demo-number/number-vs-integer" />

```json
{
  "weight": { "type": "number", "title": "Weight (number)" },
  "quantity": { "type": "integer", "title": "Quantity (integer)" }
}
```

## minimum, maximum & multipleOf

The standard JSON Schema numeric keywords are validated the same way as
any other constraint — errors are shown inline, timed by `validateOn`
(see [validation](/behavior/validation)). The field below only accepts
multiples of 5 between 0 and 100; it starts out with an invalid value
(`42`) to show the message immediately:

<VjsfDemo demo="demo-number/validation" />

```json
{
  "type": "number",
  "title": "Between 0 and 100, multiple of 5",
  "minimum": 0,
  "maximum": 100,
  "multipleOf": 5
}
```

## layout: slider

Setting `layout` to `"slider"` renders a Vuetify `v-slider` instead. It
reads `minimum`/`maximum` from the schema for its range:

<VjsfDemo demo="demo-number/slider" />

```json
{
  "type": "number",
  "title": "Volume",
  "layout": "slider",
  "minimum": 0,
  "maximum": 10
}
```

## Related

- [`useTitle`, `useDescription`, `useDefault`, `useExamples`](/behavior/options) —
  the same annotation surfacing described on the
  [text field](/components/text-field#hints-and-labels) page applies to
  number fields too.
- [`validateOn`, `initialValidation`](/behavior/validation) — when
  numeric validation errors are actually displayed.
