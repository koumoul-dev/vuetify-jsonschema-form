import { defaultIcons } from '@koumoul/vjsf'
import { buildDocOptions, type DocOption } from './doc-options-catalog'

export type { DocOption } from './doc-options-catalog'

// descriptions are rendered with v-html, their internal links need the base path
const withBase = (option: DocOption): DocOption => ({ ...option, description: option.description.replace(/href="\//g, `href="${import.meta.env.BASE_URL}`) })

const options = buildDocOptions(defaultIcons)
export const compileOptions = options.compileOptions.map(withBase)
export const runtimeOptions = options.runtimeOptions.map(withBase)
