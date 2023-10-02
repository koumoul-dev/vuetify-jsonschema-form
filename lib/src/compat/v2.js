import ajvModule from 'ajv'
import rfdc from 'rfdc'
import addFormats from 'ajv-formats'
import { resolveRefs } from '@json-layout/core'

// @ts-ignore
const Ajv = /** @type {typeof ajvModule.default} */ (ajvModule)

const clone = rfdc()

const processFragment = (/** @type {import("ajv").SchemaObject} */schema) => {
  if (!schema.layout) {
    schema.layout = {}
    if (schema['x-display']) {
      schema.layout.comp = schema['x-display']
      delete schema['x-display']
    }

    if (schema.format === 'hexcolor') {
      schema.layout.comp = 'color-picker'
      delete schema.format
    }

    if (schema['x-props']) {
      schema.layout.props = schema['x-props']
      delete schema['x-props']
    }

    if (Object.keys(schema.layout).length === 1 && 'comp' in schema.layout) {
      schema.layout = schema.layout.comp
    }
  }

  if (schema.type === 'object') {
    if (schema.properties) {
      for (const propertyKey of Object.keys(schema.properties)) {
        processFragment(schema.properties[propertyKey])
      }
    }
    if (schema.allOf) {
      for (const item of schema.allOf) processFragment(item)
    }
    if (schema.oneOf) {
      for (const item of schema.oneOf) processFragment(item)
    }
    if (schema.anyOf) {
      for (const item of schema.anyOf) processFragment(item)
    }
  }

  if (schema.type === 'array' && schema.items) {
    if (Array.isArray(schema.items)) {
      for (const item of schema.items) processFragment(item)
    } else {
      processFragment(schema.items)
    }
  }
}

/**
 *
 * @param {object} _schema
 * @param {import("ajv").default} [_ajv]
 * @param {string} lang
 * @returns
 */
export function v2compat (_schema, _ajv, lang = 'en') {
  let ajv = _ajv
  if (!ajv) {
    /** @type {import('ajv').Options} */
    const ajvOpts = { strict: false, allErrors: true }
    const newAjv = new Ajv(ajvOpts)
    addFormats.default(newAjv)
    ajv = newAjv
  }

  const schema = /** @type {import("ajv").SchemaObject} */ (clone(_schema))
  schema.$id = schema.$id ?? '_jl'
  resolveRefs(schema, ajv, lang)
  processFragment(schema)
  return schema
}
