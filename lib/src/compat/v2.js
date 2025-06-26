import ajvModule from 'ajv'
import addFormats from 'ajv-formats'
import { resolveLocaleRefs, clone } from '@json-layout/core'
import { isPartialGetItemsObj } from '@json-layout/vocabulary'

// @ts-ignore
const Ajv = /** @type {typeof ajvModule.default} */ (ajvModule)

const expressionKeyMappings = {
  modelRoot: 'rootData',
  root: 'rootData',
  model: 'data',
  value: 'data'
}

/**
 * @param {string} expression
 * @returns {string}
 */
const fixSimpleExpression = (expression) => {
  // looks like a simple expression is missing the data. prefix
  if (expression.match(/^[a-z.0-9]*$/i) && !['data', 'context', 'rootData', 'parent'].some(key => expression.startsWith(key + '.'))) {
    expression = 'rootData.' + expression
  }
  // replace a array item referenced with dot notation to bracket notation
  expression = expression.replace(/(.*)\.(\d+)(.*)/, '$1[$2]$3')
  return expression
}

/**
 *
 * @param {string} expression
 * @param {'js-eval' | 'js-tpl'} [type]
 * @returns {{type: 'js-eval' | 'js-tpl', expr: string, pure: boolean}}
 */
const fixExpression = (expression, type = 'js-eval') => {
  let expr = expression
  let pure = true

  if (expr.includes('parent.value')) {
    pure = false
    expr = expr.replace(/parent\.value/g, 'parent.data')
  }

  for (const [key, value] of Object.entries(expressionKeyMappings)) {
    expr = expr.replace(new RegExp(`${key}\\.`, 'g'), value + '.')
  }
  if (type === 'js-eval') {
    expr = fixSimpleExpression(expr)
  }
  if (type === 'js-tpl') {
    for (const expressionMatch of expr.matchAll(/\{(.*?)\}/g)) {
      if (expressionMatch[1] !== 'q') expr = expr.replace(expressionMatch[0], '${' + fixSimpleExpression(expressionMatch[1]) + '}')
    }
  }

  if (expr.includes('rootData')) {
    pure = false
  }

  return { type, expr, pure }
}

/**
 *
 * @param {import("ajv").SchemaObject} schema
 * @param {(schemaId: string, ref: string) => [any, string, string]} getJSONRef
 * @param {string} schemaId
 * @param {any[]} processed
 */
const processFragment = (schema, getJSONRef, schemaId, processed) => {
  if (processed.includes(schema)) return
  processed.push(schema)
  if (schema.$ref) {
    const [refFragment, refSchemaId] = getJSONRef(schemaId, schema.$ref)
    processFragment(refFragment, getJSONRef, refSchemaId, processed)
  }
  if (!schema.layout) {
    /** @type import('@json-layout/vocabulary').PartialCompObject */
    const layout = {}

    if (schema.separator || schema['x-separator']) {
      layout.separator = schema.separator || schema['x-separator']
      delete schema.separator
      delete schema['x-separator']
    }

    if (schema['x-display'] === 'icon' && (schema.enum || schema.items?.enum)) {
      layout.getItems = { itemIcon: schema['x-itemIcon'] || 'data.value' }
      delete schema['x-display']
    }

    if (schema['x-display']) {
      let display = schema['x-display']
      if (display === 'radio') display = 'radio-group'
      if (display === 'checkbox' && schema.type !== 'boolean') display = 'checkbox-group'
      if (display === 'switch' && schema.type !== 'boolean') display = 'switch-group'
      if (display === 'hidden') display = 'none'
      if (schema.allOf && schema.properties) {
        const children = []
        for (const key of Object.keys(schema.properties)) {
          children.push(key)
        }
        const allOfChild = {
          comp: display,
          children: /** @type string[] */([])
        }
        for (let i = 0; i < schema.allOf.length; i++) {
          allOfChild.children.push('$allOf-' + i)
        }
        children.push(allOfChild)
        layout.children = children
      } else {
        layout.comp = display
      }
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
      layout.getItems = fixExpression(schema['x-fromData'])
      delete schema['x-fromData']
    }

    if (schema['x-if']) {
      layout.if = fixExpression(schema['x-if'])
      delete schema['x-if']
    }

    if (schema['x-fromUrl']) {
      const url = schema['x-fromUrl']
      layout.getItems = { url: fixExpression(url, 'js-tpl') }
      delete schema['x-fromUrl']
    }
    if (layout.getItems && isPartialGetItemsObj(layout.getItems)) {
      if (schema['x-itemKey']) layout.getItems.itemKey = `data["${schema['x-itemKey']}"]`
      if (schema['x-itemTitle']) layout.getItems.itemTitle = `data["${schema['x-itemTitle']}"]`
      if (schema['x-itemValue']) layout.getItems.itemValue = `data["${schema['x-itemValue']}"]`
      if (schema['x-itemIcon']) layout.getItems.itemIcon = `data["${schema['x-itemIcon']}"]`
      if (schema['x-itemsProp']) layout.getItems.itemsResults = `data["${schema['x-itemsProp']}"]`
      delete schema['x-itemKey']
      delete schema['x-itemTitle']
      delete schema['x-itemValue']
      delete schema['x-itemsProp']
    }

    if (schema['x-cols']) {
      layout.cols = schema['x-cols']
    }

    if (schema['x-options']?.hideInArrayItem && !layout.if) {
      layout.if = '!summary'
    }

    if (schema.type === 'array' && schema.items && !layout.getItems) {
      if (!Array.isArray(schema.items)) {
        layout.comp = 'list'
        if (schema['x-itemTitle']) layout.itemTitle = `data["${schema['x-itemTitle']}"]`
        else {
          // vjsf 2 implicitly used a title property as an item title in lists
          if (schema.items.properties?.title || schema.items.allOf?.some((/** @type {any} */ ao) => ao.properties?.title)) {
            layout.itemTitle = 'data.title'
          }
        }
      }
    }

    // compact the layout keyword if possible
    if (Object.keys(layout).length === 1 && 'comp' in layout) {
      schema.layout = layout.comp
    } else if (Object.keys(layout).length > 0) {
      schema.layout = layout
    }
  }

  if (schema.properties) {
    for (const propertyKey of Object.keys(schema.properties)) {
      processFragment(schema.properties[propertyKey], getJSONRef, schemaId, processed)
    }
  }

  if (schema.allOf) {
    for (const item of schema.allOf) processFragment(item, getJSONRef, schemaId, processed)
  }

  if (schema.oneOf) {
    if (!schema.oneOfLayout) {
      const constPropertyKey = Object.keys(schema.oneOf[0]?.properties || {})
        .find(key => !!schema.oneOf[0]?.properties[key].const)
      if (constPropertyKey) {
        const constProperty = schema.oneOf[0]?.properties[constPropertyKey]
        if (constProperty?.title) schema.oneOfLayout = { label: constProperty.title }
        if (schema.required && Array.isArray(schema.required)) {
          schema.required = schema.required.filter(key => key !== constPropertyKey)
        }
      }
    }
    for (const item of schema.oneOf) processFragment(item, getJSONRef, schemaId, processed)
  }

  if (schema.anyOf) {
    for (const item of schema.anyOf) processFragment(item, getJSONRef, schemaId, processed)
  }

  if (schema.type === 'array' && schema.items) {
    if (Array.isArray(schema.items)) {
      for (const item of schema.items) processFragment(item, getJSONRef, schemaId, processed)
    } else {
      processFragment(schema.items, getJSONRef, schemaId, processed)
    }
  }
  if (schema.dependencies) {
    for (const key of Object.keys(schema.dependencies)) {
      processFragment(schema.dependencies[key], getJSONRef, schemaId, processed)
    }
  }
  if (schema.if) {
    if (schema.then) processFragment(schema.then, getJSONRef, schemaId, processed)
    if (schema.else) processFragment(schema.else, getJSONRef, schemaId, processed)
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
  const getJSONRef = resolveLocaleRefs(schema, ajv, lang)
  /** @type {any[]} */
  const processed = []
  processFragment(schema, getJSONRef, schema.$id, processed)
  return schema
}
