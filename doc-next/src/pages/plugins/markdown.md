---
title: Markdown
description: "A rich markdown editor built on EasyMDE, via layout: markdown"
nav:
  order: 2
---

# Markdown

`@koumoul/vjsf-markdown` renders a `type: "string"` schema as a rich
markdown editor built on
[EasyMDE](https://github.com/Ionaru/easy-markdown-editor): a toolbar
(bold, italic, headings, quotes, lists, links, images, tables), an
undo/redo pair, and a live preview toggle. The stored value is always
the raw markdown source text.

## Install

```bash
npm install @koumoul/vjsf-markdown
```

See [using a plugin](/plugins/introduction#using-a-plugin) for wiring it
up at build time (`pluginsImports`) or runtime (`options.plugins`).

## Default

<VjsfDemo demo="demo-markdown/default" />

```json
{ "type": "string", "title": "Content", "layout": "markdown" }
```

## Customizing EasyMDE

Options are forwarded to the underlying `EasyMDE` instance through
`pluginsOptions.markdown.easyMDEOptions` (only available at runtime — see
[using a plugin](/plugins/introduction#using-a-plugin)):

<VjsfDemo demo="demo-markdown/easymde-options" />

```js
const options = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {
      easyMDEOptions: { minHeight: '150px', maxHeight: '150px' },
    },
  },
}
```

Any [EasyMDE configuration option](https://github.com/Ionaru/easy-markdown-editor#configuration)
can go here; it is merged on top of the toolbar/behavior VJSF configures
by default.

## Internationalization

The toolbar's tooltips and the link/image/table snippets it inserts are
translatable. They ship with English, French, Dutch and German
translations and follow the same `options.locale` used everywhere else
in VJSF (see [i18n](/behavior/i18n)); override individual strings with
`modelValue.messages` if needed. The available keys are:

`bold`, `italic`, `heading`, `quote`, `unorderedList`, `orderedList`,
`createLink`, `insertImage`, `createTable`, `preview`, `mdeGuide`, `undo`,
`redo`, and the snippet pairs `mdeLink1`/`mdeLink2`, `mdeImg1`/`mdeImg2`,
`mdeTable1`/`mdeTable2` (the text inserted around the cursor when
creating a link/image/table).

## CommonJS dependency

EasyMDE is published as CommonJS. As with other CommonJS dependencies
(see [compilation](/behavior/compilation#commonjs-dependencies)), Vite
needs to be told about it:

```js
export default defineConfig({
  optimizeDeps: {
    include: ['easymde'],
  },
})
```

## Related

- [Writing a plugin](/plugins/introduction#writing-a-plugin) — the
  `info` flags this plugin sets (`shouldDebounce`, `emitsBlur`,
  `focusable`) and what each one means.
- [Options](/behavior/options) — `updateOn`, `debounceInputMs`, `locale`.
