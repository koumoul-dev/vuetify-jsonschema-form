/** @type {import('./types.js').VjsfIcons} */
export const defaultIcons = {
  // as much as possible with use standard vuetify aliases
  add: '$plus',
  calendar: '$calendar',
  close: '$close',
  edit: '$edit',
  sortDown: '$sortDesc',
  sortUp: '$sortAsc',
  // codes are copied from here https://raw.githubusercontent.com/Templarian/MaterialDesign-JS/refs/heads/master/mdi.js
  alert: 'svg:M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z',
  clock: 'svg:M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z',
  delete: 'svg:M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
  duplicate: 'svg:M11,17H4A2,2 0 0,1 2,15V3A2,2 0 0,1 4,1H16V3H4V15H11V13L15,16L11,19V17M19,21V7H8V13H6V7A2,2 0 0,1 8,5H19A2,2 0 0,1 21,7V21A2,2 0 0,1 19,23H8A2,2 0 0,1 6,21V19H8V21H19Z',
  infoSymbol: 'svg:M11 9H13V7H11V9M11 17H13V11H11V17Z',
  menu: 'svg:M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z',
  sort: 'svg:M17.45,17.55L12,23L6.55,17.55L7.96,16.14L11,19.17V4.83L7.96,7.86L6.55,6.45L12,1L17.45,6.45L16.04,7.86L13,4.83V19.17L16.04,16.14L17.45,17.55Z'
}

export const defaultOptions = {
  nodeComponents: {},
  plugins: [],
  pluginsOptions: {}
}

/**
 *
 * @param {Partial<import("./types.js").VjsfOptions> | null} options
 * @param {any} form
 * @param {number} width
 * @param {Record<string, unknown> | undefined} globalDefaults
 * @param {import("vue").Slots} slots
 * @param {Record<string, import('vue').Component>} defaultNodeComponents
 * @param {(data: any) => void} onData
 * @param {(statefulLayout: import('@json-layout/core').StatefulLayout) => void} onUpdate
 * @param {(key: string) => void} onAutofocus
 * @returns
 */
export const getFullOptions = (options, form, width, globalDefaults, slots, defaultNodeComponents, onData, onUpdate, onAutofocus) => {
  const components = { ...options?.components }
  const nodeComponents = { ...defaultNodeComponents, ...options?.nodeComponents }
  if (options?.plugins) {
    for (const plugin of options.plugins) {
      components[plugin.info.name] = plugin.info
      nodeComponents[plugin.info.name] = plugin.nodeComponent
    }
  }
  const icons = { ...options?.icons, ...defaultIcons }

  /** @type {import('./types.js').VjsfOptions} */
  const fullOptions = {
    ...defaultOptions,
    readOnly: !!(form && (form.isDisabled.value || form.isReadonly.value)),
    density: /** @type {import("./types.js").VjsfOptions['density']} */(globalDefaults?.density),
    ...options,
    onData,
    onUpdate,
    onAutofocus,
    context: options?.context ? JSON.parse(JSON.stringify(options.context)) : {},
    width: Math.round(width ?? 0),
    vjsfSlots: { ...slots },
    components,
    nodeComponents,
    icons
  }
  return fullOptions
}
