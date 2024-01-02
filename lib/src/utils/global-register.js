import { ref } from 'vue'

/** @type {import('vue').Ref<Record<string, import('vue').Component>>} */
export const registeredNodeComponents = ref({})

/**
 * @param {string} name
 * @param {import('vue').Component} component
 */
export function registerNodeComponent (name, component) {
  registeredNodeComponents.value[name] = component
}
