import { inject, computed } from 'vue'

// inspired by https://github.com/vuetifyjs/vuetify/blob/27b4b1e52060b6bee13a290a4829f935f1bd9c05/packages/vuetify/src/composables/defaults.ts#L92
/**
 *
 * @param {string} name
 * @param {Record<string, any> | null} [localDefaults]
 * @returns {import('vue').ComputedRef<Record<string, any>>}
 */
export default function useCompDefaultProps (name, localDefaults = null) {
  /** @type {import('vue').Ref<import('vuetify').DefaultsInstance> | undefined} */
  const defaults = inject(Symbol.for('vuetify:defaults'))
  if (!defaults) throw new Error('[vjsf] Could not find defaults instance')
  return computed(() => {
    const componentDefaults = defaults.value?.[name] ?? {}
    if (!localDefaults) return componentDefaults
    return { ...componentDefaults, ...localDefaults }
  })
}
