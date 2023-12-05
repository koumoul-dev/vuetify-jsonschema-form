/**
 * @template T
 * @param {T[]} array
 * @param {number} fromIndex
 * @param {number} toIndex
 * @return {T[]}
 */
export function moveArrayItem (array, fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex === -1 || toIndex === -1) return array
  const newArray = [...array]
  const element = newArray[fromIndex]
  newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, element)
  return newArray
}
