import rfdc from 'rfdc'
import type Ajv from 'ajv'
import { type SchemaObject } from 'json-schema-traverse'

import { resolveRefs } from '@json-layout/core'

const clone = rfdc()

const processFragment = (schema: SchemaObject) => {
  if (!schema.layout) {
    schema.layout = {}
    if (schema['x-display']) {
      schema.layout.comp = schema['x-display']
      delete schema['x-display']
    }

    if (schema.format === 'hexcolor') {
      schema.layout.comp = 'color-picker'
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

export function v2compat (_schema: object, ajv: Ajv, lang = 'en') {
  const schema = <SchemaObject>clone(_schema)
  schema.$id = schema.$id ?? '_jl'
  resolveRefs(schema, ajv, lang)
  processFragment(schema)
  return schema
}
