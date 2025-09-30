// vuetify zIndex stacking is buggy (for example https://github.com/vuetifyjs/vuetify/issues/16251)
// we try to work around this in this composable

import { provide, inject } from 'vue'

const symbol = Symbol.for('vjsf:z-index-stack')

/**
 * @param {string} fullKey
 */
export default (fullKey) => {
  const currentZIndex = inject(symbol, { zIndex: 3000, fullKey, initial: true })
  const newZIndex = currentZIndex.zIndex + 10
  if (currentZIndex.initial || fullKey.length > currentZIndex.fullKey.length) {
    provide(symbol, { zIndex: newZIndex, fullKey })
  }
  return newZIndex
}
