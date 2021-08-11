// Some util functions around select components preparation to reduce size of the component
import { deepEqual } from 'fast-equals'

const selectUtils = {}
export default selectUtils

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

// add the current value to the select items so that they can be displayed
selectUtils.fillSelectItems = (fullSchema, value, selectItems, itemKey, returnObject) => {
  if (!value) return
  if (fullSchema.type === 'array') {
    value.map(item => item).reverse().forEach(val => {
      const valueItem = returnObject ? val : { [itemKey]: val }
      if (!selectItems.find(selectItem => matchItem(selectItem, valueItem, itemKey))) {
        selectItems.push(valueItem)
      }
    })
  } else {
    const valueItem = returnObject ? value : { [itemKey]: value }
    if (!selectItems.find(selectItem => matchItem(selectItem, valueItem, itemKey))) {
      selectItems.push(valueItem)
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
