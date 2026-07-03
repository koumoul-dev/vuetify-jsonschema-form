import { describe, it, expect } from 'vitest'
import { extractHeadings, stripMarkdown, exampleToSearchDoc } from './search-doc'

describe('extractHeadings', () => {
  it('pulls h2/h3 text, ignoring h1 and code fences', () => {
    const md = '# Title\n\n## Setup\n\ntext\n\n### Options `x`\n\n```\n## not a heading\n```\n'
    expect(extractHeadings(md)).toEqual(['Setup', 'Options x'])
  })
})

describe('stripMarkdown', () => {
  it('reduces markdown/code/links to plain searchable text', () => {
    const md = '# T\n\nUse `vjsf` with a [link](/x) and **bold**.\n\n```js\nconst a = 1\n```\n'
    const out = stripMarkdown(md)
    expect(out).toContain('Use vjsf with a link and bold')
    expect(out).not.toContain('```')
    expect(out).not.toContain('const a = 1')
    expect(out).not.toContain('#')
  })
})

describe('exampleToSearchDoc', () => {
  it('maps an example to a SearchDocument with category + route', () => {
    const doc = exampleToSearchDoc(
      { id: 'string', title: 'Strings', description: 'A **text** field', schema: {} } as any,
      'simple-properties', 500)
    expect(doc.path).toBe('/simple-properties/string')
    expect(doc.category).toBe('simple-properties')
    expect(doc.title).toBe('Strings')
    expect(doc.content).toContain('A text field') // markdown stripped
    expect(doc.content).not.toContain('**')
  })
})
