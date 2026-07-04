---
title: Validation
description: How and when VJSF validates form data, emits it, and applies defaults
nav:
  order: 3
---

# Validation

Form data is always validated as it changes: the underlying JSON schema
(processed with Ajv) is the source of truth for what is valid. The
options on this page do not turn validation on or off; they control when
errors are *shown* to the user, when new data is *emitted* by the form,
and how default and extra data is *managed*. All of them are runtime
options, so they can be overwritten per-node with `layout.options`.

## When errors are shown

`validateOn` controls when a form input's validation errors are actually
displayed, independently of when the data is validated. Try typing an
invalid name or email in each of these three demos, which only differ by
this option:

<VjsfDemo demo="demo-validation/validate-on-input" />
<VjsfDemo demo="demo-validation/validate-on-blur" />
<VjsfDemo demo="demo-validation/validate-on-submit" />

## Initial validation

`initialValidation` complements `validateOn`: it controls whether form
inputs are validated as soon as the form is initialized, before the user
has touched anything. The default, `withData`, only validates inputs
that already have data. This demo is seeded with an invalid email and a
missing required name, and uses `initialValidation: "always"` so both
errors are visible immediately:

<VjsfDemo demo="demo-validation/initial-validation" />

## When data is emitted

`updateOn` controls when the form emits its updated data through
`v-model`: `input` (the default) emits on every keystroke, debounced by
`debounceInputMs` (300ms by default) so consumers are not flooded with
updates; `blur` only emits once the user leaves a field. Switching to
`blur` is useful when the consuming code reacts to every data change
(auto-save, expensive computations, etc.) and you would rather it run
once per field than on every keystroke.

## Default values

`defaultOn` controls when the schema's `default` metadata is applied to
the form data:

- `never`: default data is never used
- `missing`: applied when the property is not defined in the data at all
- `empty` (default): applied when the property is undefined *or* empty
  (empty string, empty object, etc.)

## Additional & readOnly properties

`removeAdditional` controls what happens to data present in the model
but not declared in the schema:

| Value | Behavior |
| --- | --- |
| `true` (alias `"unknown"`) | Remove all additional properties |
| `"error"` (default) | Remove only the additional properties that cause a validation error |
| `false` (alias `"none"`) | Never remove additional properties |

This demo's schema declares `additionalProperties: false` and is seeded
with an extra `legacy` property; with `removeAdditional: true` it is
stripped from the data as soon as the form loads (check the Data tab):

<VjsfDemo demo="demo-validation/remove-additional" />

`readOnlyPropertiesMode` controls how properties marked `readOnly: true`
in the schema are handled. `show` (the default) renders them
(non-editable); `hide` removes them from the form but keeps their value
in the data; `remove` both hides them and strips them from the data.
This demo sets `readOnlyPropertiesMode: "hide"` on a schema with a
readOnly `id` property:

<VjsfDemo demo="demo-validation/read-only-modes" />
