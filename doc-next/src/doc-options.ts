// Ports the old doc's `doc/assets/doc-options.js`: re-export the generic
// options catalogue from `@json-layout/core` and append the vjsf-specific
// options (the ones only meaningful once JSON Layout is wrapped by Vjsf's
// Vue component). Defaults below are taken from `lib/src/options.js`
// (`defaultOptions`, `defaultIcons`) and `lib/src/types.ts`
// (`VjsfStatefulLayoutOptions`).
import { runtimeOptions as jlRuntimeOptions, compileOptions as jlCompileOptions } from '@json-layout/core/utils/doc-options'
import { defaultIcons } from '@koumoul/vjsf'
import type { DocOptions } from '@json-layout/core/utils/doc-options'

export const compileOptions: DocOptions = [
  ...jlCompileOptions,
]

export const runtimeOptions: DocOptions = [
  ...jlRuntimeOptions,
  {
    key: 'icons',
    description: 'The icons used in Vjsf components. You can overwrite only the keys you want to change.',
    default: {},
    values: defaultIcons,
  },
  {
    key: 'confirmDeleteItem',
    description: 'If active, deleting an item from a list is protected by a small confirmation step.',
    default: true,
  },
  {
    key: 'plugins',
    description: 'A list of Vjsf plugins to register (e.g. <code>@koumoul/vjsf-markdown</code>), adding new component types usable from the schema.',
    default: [],
  },
  {
    key: 'pluginsOptions',
    description: 'Options passed to the registered plugins, keyed by plugin name.',
    default: {},
  },
  {
    key: 'nodeComponents',
    description: 'Overrides for the Vue components used to render each node type. You can overwrite only the keys you want to change.',
    default: {},
  },
]
