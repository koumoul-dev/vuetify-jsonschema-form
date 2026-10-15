import { describe, it, expect } from 'vitest'
import { buildVjsfMetaSchema } from './build-meta-schema'

const draftFixture = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://json-schema.org/draft-07/schema#',
  type: ['object', 'boolean'],
  properties: {
    type: { anyOf: [] },
    properties: { additionalProperties: { $ref: '#' } },
  },
}
const layoutFixture = {
  $id: 'https://json-layout.github.io/layout-keyword',
  $defs: {
    'layout-keyword': { anyOf: [{ $ref: '#/$defs/comp-name' }] },
    'comp-name': { type: 'string' },
  },
}

describe('buildVjsfMetaSchema', () => {
  const meta = buildVjsfMetaSchema(draftFixture, layoutFixture)

  it('keeps the draft-07 properties and adds layout', () => {
    expect(meta.properties.type).toEqual(draftFixture.properties.type)
    expect(meta.properties.layout).toEqual({ $ref: '#/$defs/layout-keyword' })
  })
  it('grafts the layout keyword $defs at the root', () => {
    expect(meta.$defs['comp-name']).toEqual({ type: 'string' })
  })
  it('drops the remote $id/$schema so nothing tries to resolve them', () => {
    expect(meta.$id).toBeUndefined()
    expect(meta.$schema).toBeUndefined()
  })
  it('does not mutate its inputs', () => {
    expect(draftFixture.properties).not.toHaveProperty('layout')
    expect(layoutFixture).toHaveProperty('$id')
  })
})
