import { describe, it, expect } from 'vitest'
import { parseCode, formatCode } from './code'

describe('parseCode', () => {
  it('parses strict JSON', () => {
    expect(parseCode('{"a": 1}', 'json')).toEqual({ a: 1 })
  })
  it('tolerates JS-style objects in json mode (JSON5)', () => {
    expect(parseCode('{ a: 1, /* comment */ b: "x", }', 'json')).toEqual({ a: 1, b: 'x' })
  })
  it('parses YAML', () => {
    expect(parseCode('a: 1\nb: x', 'yaml')).toEqual({ a: 1, b: 'x' })
  })
  it('returns {} for blank input in both modes', () => {
    expect(parseCode('', 'json')).toEqual({})
    expect(parseCode('  \n', 'yaml')).toEqual({})
  })
  it('throws on invalid input', () => {
    expect(() => parseCode('{ a: ', 'json')).toThrow()
    expect(() => parseCode('a: [', 'yaml')).toThrow()
  })
})

describe('formatCode', () => {
  it('formats strict JSON with 2-space indent', () => {
    expect(formatCode({ a: 1 }, 'json')).toBe('{\n  "a": 1\n}')
  })
  it('formats YAML', () => {
    expect(formatCode({ a: 1, b: 'x' }, 'yaml')).toBe('a: 1\nb: x\n')
  })
  it('round-trips json -> yaml -> json', () => {
    const value = { type: 'object', properties: { name: { type: 'string' } } }
    const yamlText = formatCode(value, 'yaml')
    expect(parseCode(yamlText, 'yaml')).toEqual(value)
    const jsonText = formatCode(parseCode(yamlText, 'yaml'), 'json')
    expect(parseCode(jsonText, 'json')).toEqual(value)
  })
  it('stringifies undefined/null without throwing', () => {
    expect(formatCode(null, 'json')).toBe('null')
    expect(formatCode(undefined, 'json')).toBe('null')
  })
})
