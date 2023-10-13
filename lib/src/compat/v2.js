import ajvModule from 'ajv'
import rfdc from 'rfdc'
import addFormats from 'ajv-formats'
import { resolveRefs } from '@json-layout/core'

// @ts-ignore
const Ajv = /** @type {typeof ajvModule.default} */ (ajvModule)

const clone = rfdc()

const processFragment = (/** @type {import("ajv").SchemaObject} */schema) => {
  if (!schema.layout) {
    /** @type import('@json-layout/vocabulary').PartialCompObject */
    const layout = {}
    if (schema['x-display']) {
      layout.comp = schema['x-display']
      delete schema['x-display']
    }

    if (schema.format === 'hexcolor') {
      layout.comp = 'color-picker'
      delete schema.format
    }

    if (schema['x-props']) {
      layout.props = schema['x-props']
      delete schema['x-props']
    }

    if (schema['x-fromData']) {
      layout.comp = 'select'
      layout.getItems = { expr: schema['x-fromData'] }
      if (schema['x-itemKey']) layout.getItems.itemKey = `data["${schema['x-itemKey']}"]`
      if (schema['x-itemTitle']) layout.getItems.itemTitle = `data["${schema['x-itemTitle']}"]`
      if (schema['x-itemValue']) layout.getItems.itemValue = `data["${schema['x-itemValue']}"]`
      if (schema['x-itemsProp']) layout.getItems.itemsResults = `data["${schema['x-itemsProp']}"]`
      delete schema['x-fromData']
      delete schema['x-itemKey']
      delete schema['x-itemTitle']
      delete schema['x-itemValue']
      delete schema['x-itemsProp']
    }

    // compact the layout keyword if possible
    if (Object.keys(layout).length === 1 && 'comp' in layout) {
      schema.layout = layout.comp
    } else if (Object.keys(layout).length > 0) {
      schema.layout = layout
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
