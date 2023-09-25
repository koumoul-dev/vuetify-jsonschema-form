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
})
