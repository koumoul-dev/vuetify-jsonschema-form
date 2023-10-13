import { describe, it, assert } from 'vitest'
import Ajv from 'ajv'
import { v2compat } from '../src/compat/v2'
import { compile as compileLayout } from '@json-layout/core'

describe('schema compatibility function', () => {
  it('should transform simple schemas', () => {
    const schema = v2compat({ type: 'string', 'x-display': 'textarea' }, new Ajv())
    assert.deepEqual(schema, { type: 'string', $id: '_jl', layout: 'textarea' })
    assert.ok(compileLayout(schema))
  })

  it('should transform a complex select', () => {
    const schema = v2compat({
      type: 'object',
      properties: {
        objectContext: {
          type: 'object',
          title: 'I\'m an object with values from the context',
          'x-fromData': 'context.objectItems',
          'x-itemKey': 'val',
          'x-itemTitle': 'label'
        }
      }
    })
    assert.equal(schema.properties.objectContext.layout.comp, 'select')
    assert.ok(schema.properties.objectContext.layout.getItems)
    assert.equal(schema.properties.objectContext.layout.getItems.expr, 'context.objectItems')
    assert.ok(compileLayout(schema))
  })
})
