import { shallowRef, onScopeDispose, toValue } from 'vue'
import { WebMCP } from '@json-layout/core/webmcp'

/**
 * @param {{ prefixName?: import('vue').MaybeRefOrGetter<string | null | undefined>, dataTitle?: import('vue').MaybeRefOrGetter<string | null | undefined>, schema: import('vue').MaybeRefOrGetter<object> }} options
 */
export function useWebMCP (options) {
  /** @type import('vue').ShallowRef<WebMCP | null> */
  const webMCP = shallowRef(null)

  /**
   * @param {import('@json-layout/core').StatefulLayout} statefulLayout
   */
  function onStateUpdate (statefulLayout) {
    if (webMCP.value) webMCP.value.unregisterTools()
    webMCP.value = new WebMCP(
      /** @type {import('@json-layout/core').StatefulLayout} */(/** @type {unknown} */(statefulLayout)),
      { prefixName: toValue(options.prefixName) ?? undefined, dataTitle: toValue(options.dataTitle) ?? undefined, schema: toValue(options.schema) }
    )
    webMCP.value.registerTools()
  }

  onScopeDispose(() => {
    if (webMCP.value) webMCP.value.unregisterTools()
  })

  return { onStateUpdate }
}
