import { provide, inject, ref, computed } from 'vue'

const globalClipboardKey = Symbol('vjsf:clipboard')

export const createClipboard = () => {
  // if already provided on parent, do not re-create
  if (inject(globalClipboardKey, null)) return
  const store = {}
  provide(globalClipboardKey, store)
}

/**
 * @param {() => string} keyGetter
 */
export default function (keyGetter) {
  const store = inject(globalClipboardKey)
  if (!store) throw new Error('useClipboard called without prior createClipboard')
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
