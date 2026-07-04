---
title: Date & time
description: The pickers rendered for date, date-time and time string formats
nav:
  order: 13
  subsection: Fields
---

# Date & time

A `type: "string"` schema with a `format` of `"date"`, `"date-time"` or
`"time"` renders one of three Vuetify picker components, each storing an
RFC 3339 string in the form data.

## format: date

Renders a `date-picker`: a text input that accepts typed keyboard entry
(the placeholder and expected format come from the `keyboardDate` i18n
message, `MM/DD/YYYY` in the default `en` locale — see
[internationalization](/behavior/i18n#overridable-messages)) and also
opens a calendar on focus:

<VjsfDemo demo="demo-date-time/date" />

```json
{ "type": "string", "format": "date", "title": "Due date" }
```

The stored value is a plain date, e.g. `"2026-07-04"`.

## format: date-time

Renders a `date-time-picker`: a read-only input (no keyboard entry) that
opens a dialog combining the calendar with a clock, one after the other.
The field displays the selected value formatted by Vuetify's date
adapter (its `fullDateTime` format):

<VjsfDemo demo="demo-date-time/date-time" />

```json
{ "type": "string", "format": "date-time", "title": "Appointment" }
```

The stored value includes the time and a timezone offset, e.g.
`"2026-07-04T00:00:00+02:00"`.

## format: time

Renders a `time-picker`: a read-only input that opens an analog clock
dialog:

<VjsfDemo demo="demo-date-time/time" />

```json
{ "type": "string", "format": "time", "title": "Opening time" }
```

## Restricting the range

Use `formatMinimum`/`formatMaximum` to constrain the value itself:

```json
{
  "type": "string",
  "format": "date",
  "formatMinimum": "2026-07-01",
  "formatMaximum": "2026-07-10"
}
```

This is the schema-idiomatic way to do it and validates the data no
matter where the value comes from (typed entry, a pasted value, or data
loaded from elsewhere) — not only through the picker. Its current
limitation: the calendar itself does not grey out out-of-range days for
this constraint alone, unlike `number`/`integer` fields (whose
`layout: slider` UI does read `minimum`/`maximum`). An out-of-range day
can still be picked; it only surfaces a validation error afterwards.

To also constrain the picker UI, pass `min`/`max` through `layout.props`,
using the same string format as the field itself:

```json
{
  "layout": {
    "comp": "date-picker",
    "props": { "min": "2026-07-01", "max": "2026-07-10" }
  }
}
```

`layout.props` only affects the calendar/clock display — it disables
out-of-range days in the UI but does not validate anything by itself, so
a value set outside that range some other way is not rejected.

For a complete result, combine both with matching values: the calendar
greys out out-of-range days, and the value is also validated regardless
of how it got there. The demo below seeds an out-of-range value
(`"2026-07-15"`) to show the validation error immediately, alongside the
disabled days once the calendar is opened:

<VjsfDemo demo="demo-date-time/min-max" />

```json
{
  "type": "string",
  "format": "date",
  "title": "Book a slot (1 to 10 July 2026)",
  "formatMinimum": "2026-07-01",
  "formatMaximum": "2026-07-10",
  "layout": {
    "comp": "date-picker",
    "props": { "min": "2026-07-01", "max": "2026-07-10" }
  }
}
```

## Related

- [`keyboardDate`](/behavior/i18n#overridable-messages) — the message
  used as the `date-picker`'s placeholder (its keyboard-entry format);
  see [internationalization](/behavior/i18n) for the full message
  catalogue and how to override it.
- [`useTitle`, `useDescription`, `useDefault`](/behavior/options) — the
  same annotation surfacing described on the
  [text field](/components/text-field#hints-and-labels) page applies to
  these pickers too.
