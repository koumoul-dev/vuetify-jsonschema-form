---
title: AI agents
description: Documentation formats for coding agents, checking a schema without a browser, and letting in-page agents fill a VJSF form
nav:
  order: 3
---

# AI agents

## Reading this documentation

Every page of this site is also published as Markdown: add `.md` to the
page path (`/components/select.md` for `/components/select`). In these
files each example is written out as JSON code blocks: its schema, then its
options and initial data when it has any.

- [`llms.txt`](/llms.txt) lists every page with a link to its Markdown
  version and a one-line summary.
- [`llms-full.txt`](/llms-full.txt) concatenates all the pages in one file.
- [`schemas/layout-keyword.json`](/schemas/layout-keyword.json) is the JSON
  schema of the `layout` keyword, the one the
  [playground](/editor) uses to validate and autocomplete it.

When asking an agent to write a schema, point it to `llms.txt` and to the
[pitfalls](/behavior/pitfalls) page: the most common mistakes (vjsf 2
`x-*` keywords, `enumNames`, invalid `layout` values) fail without an
error in the rendered form.

## Checking a schema in Node

VJSF compiles schemas with `@json-layout/core`, which also runs in Node.
Compiling a schema there reports invalid `layout` values, and building the
form state shows the component each property resolves to:

```js
import { compile } from '@json-layout/core/compile'
import { StatefulLayout } from '@json-layout/core/state'

const compiled = compile(schema, { xI18n: true })
// invalid layout values, keyed by schema pointer
console.log(compiled.validationErrors)

const form = new StatefulLayout(compiled, compiled.skeletonTrees[compiled.mainTree], { width: 1000 }, data)
for (const node of form.stateTree.root.children ?? []) {
  console.log(node.key, node.layout.comp)
}
```

Pass the same compile options as the application (`locale`, `xI18n`,
`ajvOptions`...), and a `width` to evaluate the breakpoints the form will
see.

## Letting agents fill a form

`@koumoul/vjsf/webmcp` exports a variant of the `vjsf` component that
registers the form through the browser's `navigator.modelContext`
([WebMCP](https://github.com/webmachinelearning/webmcp)). In-page agents
discover it as a set of tools to read the form, change values, navigate
tabs and lists, and read validation errors.

```vue
<script setup>
import Vjsf from '@koumoul/vjsf/webmcp'
</script>

<template>
  <vjsf v-model="data" :schema="schema" prefix-name="profile_" data-title="user profile" />
</template>
```

- `prefixName` prefixes every tool name, so several forms on a page do not
  collide.
- `dataTitle` names the edited document in the tool descriptions (default
  `form`).
- A string `x-agent-guide` at the root of the schema is published with the
  tools as a guide: what the fields of this kind of document mean and how
  to fill them.
- Agents read the same help as users: a field's `description` and
  `layout.help`. A `$comment` is never shown to them.

With [build-time compilation](/behavior/compilation#build-time-compilation),
the `webmcp` compile option generates the same variant.
