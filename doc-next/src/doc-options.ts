// Re-exports the generic options catalogue from `@json-layout/core` and
// appends the vjsf-specific options (defaults taken from lib/src/options.js
// and lib/src/types.ts).
import { runtimeOptions as jlRuntimeOptions, compileOptions as jlCompileOptions } from '@json-layout/core/utils/doc-options'
import { defaultIcons } from '@koumoul/vjsf'
import type { DocOptions } from '@json-layout/core/utils/doc-options'

// Presentation extras consumed by OptionsList.vue on top of the upstream
// entries: column headers for the values table, and a title for the
// collapsed panel wrapping long value catalogues (messages, icons).
export type DocOption = DocOptions[number] & {
  valuesHeaders?: [string, string]
  valuesTitle?: string
}

// `@json-layout/core`'s doc-options data misnames these two entries; the real
// runtime keys are listDialogWidth/listMenuWidth (upstream bug, see BUGS.md).
const RENAMED_KEYS: Record<string, string> = {
  listDialogOptions: 'listDialogWidth',
  listMenuOptions: 'listMenuWidth',
}

// Cross-links appended to the upstream descriptions (rendered with v-html).
const SEE_ALSO: Record<string, string> = {
  validateOn: '<a href="/behavior/validation">validation</a>',
  initialValidation: '<a href="/behavior/validation">validation</a>',
  updateOn: '<a href="/behavior/validation">validation</a>',
  debounceInputMs: '<a href="/behavior/validation">validation</a>',
  defaultOn: '<a href="/behavior/validation">validation</a>',
  removeAdditional: '<a href="/behavior/validation">validation</a>',
  locale: '<a href="/behavior/i18n">internationalization</a>',
  messages: '<a href="/behavior/i18n">internationalization</a>',
  xI18n: '<a href="/behavior/i18n">internationalization</a>',
}

function adapt (option: DocOptions[number]): DocOption {
  const adapted: DocOption = { ...option }
  if (adapted.key in RENAMED_KEYS) adapted.key = RENAMED_KEYS[adapted.key]
  if (adapted.key === 'messages') {
    // The option itself defaults to "no override", but a bare `default: {}`
    // chip reads as "there are no default messages" — the real defaults are
    // the selected locale's full message set, listed in the values table.
    delete adapted.default
    adapted.description = 'Overrides for the built-in locale messages. The defaults come from the selected <code>locale</code> and every key is translated in the 4 built-in locales; overwrite only the keys you want to change.'
    adapted.valuesHeaders = ['Key', 'Default message (en)']
    adapted.valuesTitle = 'Default messages'
  }
  if (SEE_ALSO[adapted.key]) adapted.description += ` See ${SEE_ALSO[adapted.key]}.`
  return adapted
}

export const compileOptions: DocOption[] = jlCompileOptions.map(adapt)

export const runtimeOptions: DocOption[] = [
  ...jlRuntimeOptions.map(adapt),
  {
    key: 'icons',
    description: 'The icons used in Vjsf components. You can overwrite only the keys you want to change.',
    values: defaultIcons,
    valuesHeaders: ['Key', 'Default icon'],
    valuesTitle: 'Default icons',
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
