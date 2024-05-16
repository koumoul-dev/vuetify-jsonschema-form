import { shallowRef, ref, computed } from 'vue'
import { moveArrayItem } from '../utils/index.js'

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

  const sortableArray = shallowRef(array)

  const hovered = ref(-1)
  const draggable = ref(-1)
  const dragging = ref(-1)

  hovered.value = 1

  const itemBind = (/** @type {number} */itemIndex) => ({
    // hover the item
    onMouseenter: () => {
      hovered.value = itemIndex
    },
    onMouseleave: () => {
      hovered.value = -1
    },

    // drag the item
    onDragstart: () => {
      dragging.value = itemIndex
    },
    onDragover: () => {
      sortableArray.value = moveArrayItem(sortableArray.value, dragging.value, itemIndex)
      dragging.value = itemIndex
    },
    onDragend: () => {
      hovered.value = itemIndex
      dragging.value = -1
      callback()
    }
  })

  const handleBind = (/** @type {number} */itemIndex) => ({
    // hover the handle
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
    hovered,
    draggable,
    dragging,
    itemBind,
    handleBind
  }
}
