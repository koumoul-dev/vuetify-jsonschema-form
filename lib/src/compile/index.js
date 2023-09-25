import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import ejs from 'ejs'
import { compile as compileLayout } from '@json-layout/core'
import { serialize as serializeCompiledLayout } from '@json-layout/core/src/compile/serialize'
import { isCompObject, isSwitchStruct } from '@json-layout/vocabulary'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const template = readFileSync(path.join(__dirname, 'v-jsf-compiled.vue.ejs'), 'utf8')

/**
 * @param {object} schema
 * @param {string} baseImport
 * @returns {string}
 */
export function compile (schema, baseImport = '@koumoul/vjsf/components') {
  const compiledLayout = compileLayout(schema, { code: true })
  const compiledLayoutCode = serializeCompiledLayout(compiledLayout)
  /** @type Set<string> */
  const comps = new Set([])
  for (const layout of Object.values(compiledLayout.normalizedLayouts)) {
    if (isCompObject(layout)) comps.add(layout.comp)
    if (isSwitchStruct(layout)) {
      for (const switchCase of layout.switch) comps.add(switchCase.comp)
    }
  }
  comps.delete('none')
  const code = ejs.render(template, { compiledLayoutCode, comps, baseImport })
  return code
}
