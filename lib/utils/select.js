// Some util functions around select components preparation to reduce size of the component
import { deepEqual } from 'fast-equals'

const selectUtils = {}
export default selectUtils

selectUtils.fetchRawItems = async (fullOptions, fullSchema, fromUrl, q) => {
  const url = fromUrl.replace('{q}', encodeURIComponent(q || ''))
  const res = await fullOptions.httpLib.get(url, fullOptions.httpOptions)
  const body = res.data || res.body
  const items = fullSchema['x-itemsProp'] ? body[fullSchema['x-itemsProp']] : body
  if (!Array.isArray(items)) throw new Error(`Result of http fetch ${url} is not an array`)
  return items
}

// from raw data to items usable in select components
selectUtils.getSelectItems = (rawSelectItems, fullSchema, itemKey, itemIcon) => {
  const selectItems = []

  if (!rawSelectItems) {
    // nothing to do
  } else if (
    (fullSchema.type === 'object' && fullSchema.properties && Object.keys(fullSchema.properties).length) ||
    (fullSchema.type === 'array' && fullSchema.items && fullSchema.items.type === 'object' && fullSchema.items.properties && Object.keys(fullSchema.items.properties).length)
  ) {
    const keys = fullSchema.properties ? fullSchema.properties.map(p => p.key) : Object.keys(fullSchema.items.properties)
    rawSelectItems.forEach(item => {
      const filteredItem = {}
      keys.forEach(key => {
        if (item[key] !== undefined) {
          filteredItem[key] = item[key]
          // special case as seen in _prefilled_array_wrong_type.js
          const property = fullSchema.properties ? fullSchema.properties.find(p => p.key === key) : fullSchema.items.properties[key]
          if (property.type === 'string') filteredItem[key] = '' + filteredItem[key]
        }
      })
      selectItems.push(filteredItem)
    })
  } else {
    rawSelectItems.forEach(item => {
      if (typeof item === 'object') {
        selectItems.push(item)
      } else {
        const itemObject = { [itemKey]: item }
        if (itemIcon) itemObject[itemIcon] = item
        selectItems.push(itemObject)
      }
    })
  }
  return selectItems
}

const matchItem = (selectItem, item, itemKey) => {
  if ([null, undefined].includes(selectItem)) return false
  if ([null, undefined].includes(item)) return false
  return deepEqual(selectItem[itemKey], item[itemKey])
}

// TODO: this is not very rigorous because we have no way of knowing that the stored value will be properly
// matched with a simple "q" params.. but it kinda gets the job done.. let's think about it some more at some point in the future
const missingValuesCache = []
const fetchMissingValue = async (fullOptions, fullSchema, itemKey, fromUrl, value) => {
  const valueFromCache = missingValuesCache.find(cv => deepEqual(cv.key, [itemKey, fromUrl, value]))
  if (valueFromCache) return valueFromCache.result || value
  const rawItems = await selectUtils.fetchRawItems(fullOptions, fullSchema, fromUrl, value[itemKey])
  const result = rawItems.find(item => matchItem(item, value, itemKey))
  missingValuesCache.push({ key: [itemKey, fromUrl, value], result })
  return result || value
}

// add the current value to the select items so that they can be displayed
selectUtils.fillSelectItems = async (fullOptions, fullSchema, value, selectItems, itemKey, itemTitle, fromUrl, returnObject) => {
  if (!value) return
  if (Array.isArray(value)) {
    for (let val of value.map(item => item).reverse()) {
      if (!returnObject) val = { [itemKey]: val }
      if (!selectItems.find(selectItem => matchItem(selectItem, val, itemKey))) {
        if (!returnObject && fromUrl) val = await fetchMissingValue(fullOptions, fullSchema, itemKey, fromUrl, val)
        selectItems.push(val)
      }
    }
  } else {
    if (!returnObject) value = { [itemKey]: value }
    if (!selectItems.find(selectItem => matchItem(selectItem, value, itemKey))) {
      if (!returnObject && fromUrl) value = await fetchMissingValue(fullOptions, fullSchema, itemKey, fromUrl, value)
      selectItems.push(value)
    }
  }
}

selectUtils.fillList = (fullSchema, value, selectItems, itemKey) => {
  if (!value) return
  if (!selectItems.length) return []
  value = [...value]
  // Prefill the lists (not actual select component, but an array instead)
  selectItems.forEach(selectItem => {
    if (!value.find(modelItem => matchItem(selectItem, modelItem, itemKey))) {
      value.push(selectItem)
    }
  })
  // also remove deprecated items
  value.forEach((item, i) => {
    if (!selectItems.find(selectItem => matchItem(selectItem, item, itemKey))) {
      value[i] = null
    }
  })
  return value.filter(item => !!item)
}

selectUtils.isOneOfSelect = (fullSchema) => {
  if (!fullSchema) return
  if (fullSchema.type === 'array' && fullSchema.items && ['string', 'integer', 'number'].includes(fullSchema.items.type) && (fullSchema.items.oneOf || fullSchema.items.anyOf)) return true
  if (['string', 'integer', 'number'].includes(fullSchema.type) && fullSchema.oneOf && fullSchema.oneOf[0] && fullSchema.oneOf[0].const !== undefined) return true
  if (['string', 'integer', 'number'].includes(fullSchema.type) && fullSchema.anyOf && fullSchema.anyOf[0] && fullSchema.anyOf[0].const !== undefined) return true
  return false
}

// get an object title if x-itemTitles is defined, handle direct values or values matched to a label through a oneOf/anyof
selectUtils.getObjectTitle = (item, itemTitle, fullSchema) => {
  if (!itemTitle) return null
  const titlePropertySchema = fullSchema.items && fullSchema.items.properties && fullSchema.items.properties[itemTitle]
  if (titlePropertySchema) {
    const oneOfSelect = selectUtils.isOneOfSelect(titlePropertySchema)
    if (oneOfSelect) {
      const of = titlePropertySchema.anyOf || titlePropertySchema.oneOf
      const ofItem = of.find(ofItem => ofItem.const === item[itemTitle] || (ofItem.enum && ofItem.enum[0] === item[itemTitle]))
      if (ofItem) return ofItem.title
    }
  }

  if (fullSchema.items && (fullSchema.items.oneOf || fullSchema.items.anyOf)) {
    const of = fullSchema.items.oneOf || fullSchema.items.anyOf
    const props = of[0].properties
    const key = Object.keys(props).find(p => !!props[p].const)
    const ofItem = of.find(ofItem => ofItem.properties[key].const === item[itemTitle])
    if (ofItem) return ofItem.title
  }
  return item[itemTitle]
}
