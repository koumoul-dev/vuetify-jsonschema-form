import { provide, inject, ref, computed } from 'vue'

const globalClipboardKey = Symbol('vjsf:clipboard')

export const createClipboard = () => {
  const store = {}
  provide(globalClipboardKey, store)
}

/**
 * @param {() => string} keyGetter
 */
export default function (keyGetter) {
  const store = inject(globalClipboardKey)
  return computed({
    get () {
      const key = keyGetter()
      store[key] = store[key] ?? ref(null)
      return store[key].value
    },
    set (value) {
      const key = keyGetter()
      store[key] = store[key] ?? ref(null)
      store[key].value = value
    }
  })
}
