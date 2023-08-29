import { readFileSync } from 'fs'
import path from 'path'
import ejs from 'ejs'
import { compile as compileLayout } from '@json-layout/core'
import { serialize as serializeCompiledLayout } from '@json-layout/core/src/compile/serialize'
import { isCompObject, isSwitch } from '@json-layout/vocabulary'

const template = readFileSync(path.join(__dirname, 'v-jsf-compiled.vue.ejs'), 'utf8')

export function compile (schema: object, baseImport = '@koumoul/vjsf/src/components') {
  const compiledLayout = compileLayout(schema, { code: true })
  const compiledLayoutCode = serializeCompiledLayout(compiledLayout)
  const comps = new Set<string>([])
  for (const layout of Object.values(compiledLayout.normalizedLayouts)) {
    if (isCompObject(layout)) comps.add(layout.comp)
    if (isSwitch(layout)) {
      for (const switchCase of layout.switch) comps.add(switchCase.comp)
    }
  }
  const code = ejs.render(template, { compiledLayoutCode, comps, baseImport })
  return code
}
