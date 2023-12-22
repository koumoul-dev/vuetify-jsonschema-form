/** @type {Record<string, import('vue').Component>} */
export const registeredNodeComponents = {}

/**
 * @param {string} name
 * @param {import('vue').Component} component
 */
export function registerNodeComponent (name, component) {
  registeredNodeComponents[name] = component
}
