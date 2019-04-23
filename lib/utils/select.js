// Some util functions around select components preparation to reduce size of the Property component

// from raw data to items usable in select components
exports.getSelectItems = (rawSelectItems, fullSchema, modelWrapper, modelKey, itemKey) => {
  const selectItems = []

  if (!rawSelectItems) {
    // nothing to do
  } else if (
    (fullSchema.type === 'object' && fullSchema.properties && Object.keys(fullSchema.properties).length) ||
    (fullSchema.type === 'array' && fullSchema.items && fullSchema.items.type === 'object' && fullSchema.items.properties && Object.keys(fullSchema.items.properties).length)
  ) {
    const keys = fullSchema.properties.map(p => p.key)
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

  // always propose the existing values so they can be unchecked
  const model = modelWrapper[modelKey]
  const matchItem = (selectItem, item) => {
    const selectItemStr = JSON.stringify(typeof selectItem === 'object' ? selectItem[itemKey] : selectItem)
    const itemStr = JSON.stringify(typeof item === 'object' ? item[itemKey] : item)
    return selectItemStr === itemStr
  }
  if (model) {
    if (fullSchema.type === 'array') {
      model.reverse().forEach(item => {
        if (!selectItems.find(selectItem => matchItem(selectItem, item))) {
          selectItems.push(item)
        }
      })
    } else if (!selectItems.find(selectItem => matchItem(selectItem, model))) {
      selectItems.push(model)
    }
  }
  return selectItems
}
