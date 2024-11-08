import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import ejs from 'ejs'
import { compile as compileLayout } from '@json-layout/core'
import { serialize as serializeCompiledLayout } from '@json-layout/core/src/compile/serialize'
import { childIsCompObject, isCompObject, isSwitchStruct } from '@json-layout/vocabulary'
import { getFullOptions } from './options.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const template = readFileSync(path.join(__dirname, 'v-jsf-compiled.vue.ejs'), 'utf8')

/**
 *
 * @param {Set<string>} comps
 * @param {import('@json-layout/vocabulary').NormalizedLayout} layout
 */
function listComps (comps, layout) {
  if (isCompObject(layout)) {
    comps.add(layout.comp)
    if (layout.children) {
      for (const child of /** @type {import('@json-layout/vocabulary').Children} */(layout.children)) {
        if (childIsCompObject(child)) {
          listComps(comps, child)
        }
      }
    }
  } else if (isSwitchStruct(layout)) {
    for (const switchCase of layout.switch) {
      listComps(comps, switchCase)
    }
  }
}

/**
 * @param {object} schema
 * @param {import('../../lib/src/types.js').PartialVjsfCompileOptions} [options]
 * @param {string} [baseImport]
 * @returns {Promise<string>}
 */
export async function compile (schema, options = {}, baseImport = '@koumoul/vjsf') {
  const fullOptions = getFullOptions(options)
  /** @type {Record<string, string>} */
  const pluginsImportsByName = {}
  for (const pluginImport of fullOptions.pluginsImports) {
    const componentInfo = /** @type {import('@json-layout/vocabulary').ComponentInfo} */((await import(pluginImport + '/info.js')).default)
    fullOptions.components = fullOptions.components ?? {}
    fullOptions.components[componentInfo.name] = componentInfo
    pluginsImportsByName[componentInfo.name] = pluginImport
  }
  const compiledLayout = compileLayout(schema, { ...fullOptions, code: true })
  const compiledLayoutCode = serializeCompiledLayout(compiledLayout)
  /** @type Set<string> */
  const comps = new Set([])
  for (const layout of Object.values(compiledLayout.normalizedLayouts)) {
    listComps(comps, layout)
  }
  comps.delete('none')

  /** @type {Record<string, any>} */
  const pluginsComponents = {}

  const compImports = [...comps].map(comp => {
    const compName = comp.replace(/-/g, '') + 'Node'
    let compImport = `${baseImport}/components/nodes/${comp}.vue`
    if (pluginsImportsByName[comp]) {
      compImport = `${pluginsImportsByName[comp]}/node.vue`
      pluginsComponents[comp] = fullOptions.components?.[comp]
    }
    return {
      comp,
      compName,
      compImport
    }
  })

  const code = ejs.render(template, { compiledLayoutCode, compImports, baseImport, pluginsComponents })
  return code
}
