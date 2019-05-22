// Some util functions around select components preparation to reduce size of the Property component

const selectUtils = {}
export default selectUtils

// from raw data to items usable in select components
selectUtils.getSelectItems = (rawSelectItems, fullSchema, modelWrapper, modelKey, itemKey) => {
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
        if (item[key] !== undefined) filteredItem[key] = item[key]
      })
      selectItems.push(filteredItem)
    })
  } else {
    rawSelectItems.forEach(item => selectItems.push(item))
  }
  return selectItems
}

const matchItem = (selectItem, item, itemKey) => {
  if ([null, undefined].includes(selectItem)) return false
  if ([null, undefined].includes(item)) return false
  const selectItemStr = JSON.stringify(typeof selectItem === 'object' ? selectItem[itemKey] : selectItem)
  const itemStr = JSON.stringify(typeof item === 'object' ? item[itemKey] : item)
  return selectItemStr === itemStr
}

selectUtils.fillSelectItems = (fullSchema, modelWrapper, modelKey, selectItems, itemKey) => {
  const model = modelWrapper[modelKey]
  if (!model) return
  if (fullSchema.type === 'array') {
    model.map(item => item).reverse().forEach(item => {
      if (!selectItems.find(selectItem => matchItem(selectItem, item, itemKey))) {
        selectItems.push(item)
      }
    })
  } else if (!selectItems.find(selectItem => matchItem(selectItem, model, itemKey))) {
    selectItems.push(model)
  }
}

selectUtils.fillList = (fullSchema, modelWrapper, modelKey, selectItems, itemKey) => {
  const model = modelWrapper[modelKey]
  if (!model || !selectItems.length) return
  // Prefill the lists (not actual select component, but an array instead)
  selectItems.forEach(selectItem => {
    if (!model.find(modelItem => matchItem(selectItem, modelItem, itemKey))) {
      model.push(selectItem)
    }
  })
  // also remove deprecated items
  model.forEach((item, i) => {
    if (!selectItems.find(selectItem => matchItem(selectItem, item, itemKey))) {
      model[i] = null
    }
  })
  modelWrapper[modelKey] = modelWrapper[modelKey].filter(item => !!item)
}
