import { ref, watch, computed } from 'vue'
import { moveArrayItem } from '../utils/arrays.js'

/**
 * @template T
 * @param {T[]} array
 * @param {() => void} callback
 * @returns
 */
export default function useDnd (array, callback) {
  const activeDnd = computed(() => {
    // cf https://ultimatecourses.com/blog/feature-detect-javascript-drag-drop-api
    if (!('draggable' in document.createElement('div'))) return false
    // cf https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
    if (window.matchMedia('(pointer: coarse)').matches) return false
    return true
  })

  const sortableArray = ref(array)
  // @ts-ignore
  watch(() => array, (array) => { sortableArray.value = array })

  const draggable = ref(-1)
  const dragging = ref(-1)

  const itemBind = (/** @type {number} */itemIndex) => ({
    onDragstart: () => {
      dragging.value = itemIndex
    },
    onDragover: () => {
      sortableArray.value = moveArrayItem(sortableArray.value, dragging.value, itemIndex)
      dragging.value = itemIndex
    },
    onDragend: () => {
      dragging.value = -1
      callback()
    }
  })

  const handleBind = (/** @type {number} */itemIndex) => ({
    onMouseover () {
      draggable.value = itemIndex
    },
    onMouseout () {
      draggable.value = -1
    }
  })

  return {
    activeDnd,
    sortableArray,
    draggable,
    itemBind,
    handleBind
  }
}
