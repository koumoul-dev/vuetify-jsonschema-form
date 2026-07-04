---
title: Properties & selects
description: V2-compat demos covering basic property types, selects, comboboxes and files
nav:
  order: 11
  subsection: V2 compatibility
---

# Properties & selects

The demos below are the "single properties" examples from the VJSF v2
documentation, each schema converted through
[`v2compat()`](/migration/v2-compat).

## Basic types

All basic types are supported: string, number, integer, boolean.

<VjsfDemo demo="demo-v2-properties/basic" />

## Dates

<v-alert type="warning" variant="outlined" class="mb-4">
  The "date-time" format is not supported yet.
</v-alert>

Date and date-time formats are rendered using Vuetify's date and time
pickers. Formatting and the pickers themselves depend heavily on the
`locale` option.

<VjsfDemo demo="demo-v2-properties/date-picker" />

## Colors

The `hexcolor` format (or the `x-display=color-picker` annotation) displays
a color picker. You can customize it with the `colorPickerProps` option or
the `x-props` annotation.

<VjsfDemo demo="demo-v2-properties/colors" />

## Selects

Enums, `oneOf`s with const values and the `x-fromData` annotation all
produce select fields. Arrays render as multi-value selects. Past a
certain number of items the select is replaced by an autocomplete, unless
you force a select with `x-display=select`. The `selectAll` option adds a
"select all" action to multi-value selects.

<VjsfDemo demo="demo-v2-properties/select" />

## Selects from HTTP

Selects can be filled from the results of an HTTP request, injecting
context values in the URL. Including `{q}` in the URL turns the select
into an autocomplete.

<VjsfDemo demo="demo-v2-properties/select-http" />

## Selects with icons

<v-alert type="warning" variant="outlined" class="mb-4">
  The "icon" display has no v4 equivalent; that property falls back to a default component below.
</v-alert>

Icon values can be selected in several ways: by code, by SVG value, or by
URL. Possible values can come from enums, `oneOf`s, or HTTP requests.

<VjsfDemo demo="demo-v2-properties/select-icons" />

## Comboboxes

Anything that can be represented as a select can also be a combobox, to
let the user enter extra values: replace `enum` with `examples`, replace a
constraining `oneOf` with an `anyOf` that has one open item, or add
`x-display=combobox` on properties using `x-fromUrl`/`x-fromData`.

<VjsfDemo demo="demo-v2-properties/combobox" />

## Selection controls

Selects can be replaced by radio, checkbox and switch groups using the
`x-display` annotation with values `radio`, `checkbox` and `switch`.

<VjsfDemo demo="demo-v2-properties/selection-controls" />

## Files

A string property renders as a file upload when it has a `contentMediaType`
attribute or the `x-display=file` annotation. An object property can also
be rendered as a file upload, with `name`/`type`/`size`/`lastModified`
subproperties filled from the uploaded file's metadata.

<VjsfDemo demo="demo-v2-properties/files" />

## Markdown editor (beta)

Markdown content can be edited using the `x-display=markdown` annotation,
integrating [EasyMDE](https://github.com/Ionaru/easy-markdown-editor).

<VjsfDemo demo="demo-v2-properties/markdown-editor" />
