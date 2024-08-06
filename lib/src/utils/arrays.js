/**
 * @param {any[] | Record<string, any>} data
 * @param {number} fromIndex
 * @param {number} toIndex
 * @return {any[] | Record<string, any>}
 */
export function moveDataItem (data, fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex === -1 || toIndex === -1) return data
  if (!Array.isArray(data) && typeof data === 'object') return moveObjectItem(data, fromIndex, toIndex)
  return moveArrayItem(data, fromIndex, toIndex)
}

/**
 * @param {any[]} data
 * @param {number} fromIndex
 * @param {number} toIndex
 * @return {any[]}
 */
export function moveArrayItem (data, fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex === -1 || toIndex === -1) return data
  // @ts-ignore
  if (!Array.isArray(data) && typeof data === 'object') return moveObjectItem(data, fromIndex, toIndex)
  const newArray = [...data]
  const element = newArray[fromIndex]
  newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, element)
  return newArray
}

/**
 * @param {Record<string, any>} data
 * @param {number} fromIndex
 * @param {number} toIndex
 * @return {Record<string, any>}
 */
export function moveObjectItem (data, fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex === -1 || toIndex === -1) return data
  const newKeys = /** @type {string[] } */(moveArrayItem(Object.keys(data), fromIndex, toIndex))
  /** @type {Record<string, any>} */
  const newData = {}
  for (const key of newKeys) {
    newData[key] = data[key]
  }
  console.log(newData)
  return newData
}
