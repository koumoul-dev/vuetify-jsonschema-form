---
title: File
description: The file input component, what actually lands in the form data, and its current limitations
nav:
  order: 15
  subsection: Fields
---

# File

Like the color picker, there is no schema-driven trigger for a file
input — no `contentMediaType`/`contentEncoding` keyword switches a
`type: "string"` schema to a file picker on its own (that was a v2
convention; it doesn't carry over). You have to opt in explicitly with
`layout: "file-input"`, which renders a Vuetify `v-file-input`.

## Default

<VjsfDemo demo="demo-file/default" expanded />

**What actually lands in the data:** once a file is picked, the field's
value is the native browser
[`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object
itself — not a data URL, not a `{ name, size, type }` descriptor. A
`File` doesn't serialize to a JSON string, so:

- If you inspect the data as JSON (as the demos on this site do), the
  field shows up as an empty object `{}` — `File` only exposes `name`,
  `size`, etc. as prototype getters, which `JSON.stringify` ignores.
- Declaring the property as `type: "string"` (the natural-looking
  schema) does **not** actually match the runtime value, so once a file
  is selected the field reports a `must be string` validation error.
  This is expected: don't rely on full-schema validation passing for a
  file field, and plan to read/convert the actual `File` yourself
  (e.g. building a `FormData` for submission, or converting it to a
  data URL) rather than through the JSON Schema data alone.

## Restricting accepted types

`accept` is forwarded to the underlying input, the same as the native
HTML attribute:

<VjsfDemo demo="demo-file/accept" expanded />

## Multiple files

Setting the property's `type` to `"array"` instead of `"string"` (still
with `layout: "file-input"`) is accepted by the schema, and is in fact
the only case where an array property without an `items` schema is
allowed at all. In the current version, though, this isn't functional
yet: the underlying component logs `File input doesn't support multiple
inputs yet` and only ever captures a single file, wrapped in a
one-element array. Stick to single-file uploads (`type: "string"`) until
multiple-file support lands.

## Images

For image uploads specifically, with cropping built in, see
[plugins/img-cropper](/plugins/img-cropper).

## Related

- [`useTitle`, `useDescription`](/behavior/options) — the same
  annotation surfacing described on the
  [text field](/components/text-field#hints-and-labels) page applies to
  file inputs too.
- [`layout.props`](/behavior/vuetify-integration#passing-props-with-layout.props) —
  how extra props like `accept` are forwarded as-is to the underlying
  Vuetify component.
