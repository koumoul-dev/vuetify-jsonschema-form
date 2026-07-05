---
title: Image cropper
description: "An image picker built on layout: img-cropper, with accept/placeholder props and its File-based data shape"
nav:
  order: 3
---

# Image cropper

`@koumoul/vjsf-img-cropper` renders a `type: "string"` schema as an
image picker restricted to image files by default. Like the built-in
[file](/components/file) component, it flags its node with
`isFileInput`, so VJSF knows the value is a browser `File`, not a plain
JSON value.

## Install

```bash
npm install @koumoul/vjsf-img-cropper
```

See [using a plugin](/plugins/introduction#using-a-plugin) for wiring it
up at build time (`pluginsImports`) or runtime (`options.plugins`).

## Default

<VjsfDemo demo="demo-img-cropper/default" expanded />

## accept and placeholder

Both come from the plugin's `info.schema`, so they are set directly on
`layout` (next to `comp`), not under `layout.props`. `accept` defaults to
`image/*`:

<VjsfDemo demo="demo-img-cropper/accept-placeholder" expanded />

## What lands in the data

Picking a file stores the native
[`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object
as the field's value — same as the [file](/components/file#default)
component. The `isFileInput` flag on the plugin's `info` is what makes
this safe: it tells VJSF's state layer to serialize that `File` as
`{ name, size, type }` for validation/summary purposes, instead of
either failing to serialize it at all or reporting a `must be string`
error against the declared `type: "string"`. Plan to read the actual
`File` yourself downstream (e.g. building a `FormData` for upload).

## Related

- [File](/components/file) — the built-in, non-image-specific
  equivalent, and more detail on the `File` data caveat.
- [Writing a plugin](/plugins/introduction#writing-a-plugin) — the
  `isFileInput` and `schema` flags this plugin relies on.
