import { describe, it, expect } from 'vitest'
import { buildLayoutVocabulary } from './layout-vocabulary'

describe('layout vocabulary reference data', () => {
  const { doc, undocumented } = buildLayoutVocabulary()

  it('extracts the 6 common-property groups', () => {
    expect(doc.groups.map(g => g.key)).toEqual(['base', 'simple', 'composite', 'focusable', 'items-based', 'multiple-compat'])
    const base = doc.groups[0]
    // `comp` is documented in the page prose, not as a table row
    expect(base.props.map(p => p.name)).not.toContain('comp')
    expect(base.props.map(p => p.name)).toContain('cols')
    expect(base.props.find(p => p.name === 'transformData')?.type).toBe('expression')
  })

  it('derives group applicability from the components characteristics', () => {
    const composite = doc.groups.find(g => g.key === 'composite')
    expect(composite?.appliesTo).toContain('section')
    expect(composite?.appliesTo).not.toContain('text-field')
    const multiple = doc.groups.find(g => g.key === 'multiple-compat')
    expect(multiple?.appliesTo).toContain('select')
  })

  it('extracts every standard component with its specific properties', () => {
    expect(doc.components.length).toBeGreaterThanOrEqual(29)
    const list = doc.components.find(c => c.name === 'list')
    expect(list?.props.map(p => p.name)).toContain('listEditMode')
    expect(list?.characteristics).toContain('items based')
  })

  // A failure here means @json-layout/vocabulary gained annotations that
  // layout-keyword-descriptions.ts does not describe yet. The site still
  // builds (the new entries render with a "not documented yet" marker) —
  // add the missing descriptions to fix this test.
  it('describes every vocabulary entry', () => {
    expect(undocumented).toEqual([])
  })
})
