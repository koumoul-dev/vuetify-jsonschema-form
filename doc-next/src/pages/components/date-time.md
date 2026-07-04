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

Renders a `date-time-picker`: a read-only input that opens a dialog
combining the calendar with a clock, one after the other, for `en` this
corresponds to the `keyboardDateTime` message:

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

All three components accept `min`/`max` through `layout.props`, using the
same string format as the field itself. Out-of-range days (or times) are
disabled in the picker rather than merely rejected after the fact:

<VjsfDemo demo="demo-date-time/min-max" />

```json
{
  "type": "string",
  "format": "date",
  "title": "Book a slot (1 to 10 July 2026)",
  "layout": {
    "comp": "date-picker",
    "props": { "min": "2026-07-01", "max": "2026-07-10" }
  }
}
```

## Related options

- [`keyboardDate`, `keyboardDateTime`](/behavior/i18n#overridable-messages) —
  the messages controlling each locale's keyboard-entry format; see
  [internationalization](/behavior/i18n) for the full list and how to
  override them.
- [`useTitle`, `useDescription`, `useDefault`](/behavior/options) — the
  same annotation surfacing described on the
  [text field](/components/text-field#hints-and-labels) page applies to
  these pickers too.
