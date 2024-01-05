import { ref } from 'vue'

/** @type {import('vue').Ref<Record<string, import('vue').Component>>} */
export const registeredNodeComponents = ref({})

/**
 * @param {string} name
 * @param {import('vue').Component} component
 */
export function registerNodeComponent (name, component) {
  console.log('vjsf - register plugin node component', name)
  registeredNodeComponents.value[name] = component
}
