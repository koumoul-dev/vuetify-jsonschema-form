import { describe, it, expect } from 'vitest'
import { pageToMarkdown, type MarkdownContext } from './to-markdown'

const ctx: MarkdownContext = {
  mdLink: href => 'https://example.org/' + href.slice(1).replace(/(#|$)/, '.md$1'),
  findDemo: () => ({ example: { id: 'enum', title: 'Items from enum', schema: { type: 'string', enum: ['a'] }, options: { density: 'compact' } }, v2compat: false }),
  vocabulary: { groups: [], components: [] },
  compileOptions: [],
  runtimeOptions: [],
  messages: {},
}

const source = `---
title: Select
description: Select components
---

# Select

See [dynamic data](/behavior/dynamic-data#get-items).

<v-alert type="warning" variant="outlined">
  Do not use <code>x-display</code>.
</v-alert>

<VjsfDemo demo="demo-select/enum" expanded />

\`\`\`vue
<VjsfDemo demo="kept-as-is" />
\`\`\`
`

describe('pageToMarkdown', () => {
  const page = pageToMarkdown(source, ctx)

  it('keeps the frontmatter apart', () => {
    expect(page.title).toBe('Select')
    expect(page.description).toBe('Select components')
  })

  it('points internal links to the markdown pages', () => {
    expect(page.body).toContain('[dynamic data](https://example.org/behavior/dynamic-data.md#get-items)')
  })

  it('turns alerts into quotes and demos into JSON blocks', () => {
    expect(page.body).toContain('> **Warning:** Do not use `x-display`.')
    expect(page.body).toContain('**Example: Items from enum**')
    expect(page.body).toContain('"enum": [\n    "a"\n  ]')
    expect(page.body).toContain('Options:\n\n```json\n{\n  "density": "compact"\n}\n```')
  })

  it('leaves code fences untouched', () => {
    expect(page.body).toContain('```vue\n<VjsfDemo demo="kept-as-is" />\n```')
  })
})
