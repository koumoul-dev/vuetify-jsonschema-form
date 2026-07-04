// Re-exports the generic options catalogue from `@json-layout/core` and
// appends the vjsf-specific options (defaults taken from lib/src/options.js
// and lib/src/types.ts).
import { runtimeOptions as jlRuntimeOptions, compileOptions as jlCompileOptions } from '@json-layout/core/utils/doc-options'
import { defaultIcons } from '@koumoul/vjsf'
import type { DocOptions } from '@json-layout/core/utils/doc-options'

export const compileOptions: DocOptions = [
  ...jlCompileOptions,
]

// `@json-layout/core`'s doc-options data misnames these two entries; the real
// runtime keys are listDialogWidth/listMenuWidth (upstream bug, see BUGS.md).
const RENAMED_KEYS: Record<string, string> = {
  listDialogOptions: 'listDialogWidth',
  listMenuOptions: 'listMenuWidth',
}

export const runtimeOptions: DocOptions = [
  ...jlRuntimeOptions.map(option => (option.key in RENAMED_KEYS)
    ? { ...option, key: RENAMED_KEYS[option.key] }
    : option),
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
