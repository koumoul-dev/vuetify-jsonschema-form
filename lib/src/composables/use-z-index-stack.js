// vuetify zIndex stacking is buggy (for example https://github.com/vuetifyjs/vuetify/issues/16251)
// we try to work around this in this composable

import { provide, inject, computed } from 'vue'

const symbol = Symbol.for('vjsf:z-index-stack')

/**
 * @param {() => string} keyGetter
 */
export default (keyGetter) => {
  return computed(() => {
    const fullKey = keyGetter()
    const currentZIndex = inject(symbol, { zIndex: 3000, fullKey })
    const newZIndex = currentZIndex.zIndex + 10
    if (fullKey.length > currentZIndex.fullKey.length) {
      provide(symbol, { zIndex: newZIndex, fullKey })
    }
    return newZIndex
  })
}
