import { readFileSync } from 'node:fs'
import { relative } from 'node:path'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { i18n } from '@json-layout/core'
import { findDemo } from '../../demos'
import { buildLayoutVocabulary } from '../../reference/layout-vocabulary'
import { readLayoutKeywordSchema } from '../../reference/layout-keyword-schema'
import { buildDocOptions } from '../doc-options-catalog'
import { buildNav } from '../nav/build-nav'
import { pageToMarkdown, type MarkdownContext } from './to-markdown'

const routeOf = (rel: string) => '/' + rel.replace(/\\/g, '/').replace(/\.md$/, '').replace(/\/index$/, '')

/**
 * Builds the agent-oriented outputs: one .md per page next to its HTML,
 * llms.txt (index), llms-full.txt (every page), the layout keyword schema and,
 * when the public URL is known (TARGET), sitemap.xml.
 */
export function buildMarkdownExport (pagesDir: string, base: string, version: string, target?: string): Record<string, string> {
  const siteUrl = target?.replace(/\/?$/, '/')
  const prefix = siteUrl ?? base
  const mdPath = (route: string) => (route === '/' ? 'index' : route.replace(/^\/|\/$/g, '')) + '.md'
  const htmlUrl = (route: string) => prefix + (route === '/' ? '' : route.replace(/^\/|\/$/g, '') + '/')
  const files = fg.sync('**/*.md', { cwd: pagesDir, absolute: true }).filter(f => !/\/_[^/]*\.md$/.test(f))
  const routes = new Set(files.map(f => routeOf(relative(pagesDir, f))))
  // generated files (llms.txt...) and pages without markdown source (home, playground) keep their own URL
  const mdLink = (href: string) => {
    const [route, hash] = href.split('#')
    if (/\.[a-z]+$/.test(route)) return prefix + route.slice(1)
    return (routes.has(route) ? prefix + mdPath(route) : htmlUrl(route)) + (hash ? '#' + hash : '')
  }

  const { compileOptions, runtimeOptions } = buildDocOptions()
  const ctx: MarkdownContext = {
    mdLink,
    findDemo,
    vocabulary: buildLayoutVocabulary().doc,
    compileOptions,
    runtimeOptions,
    messages: i18n as unknown as Record<string, Record<string, string>>,
  }

  const nav = buildNav(files.map(f => ({
    path: '/src/pages/' + relative(pagesDir, f).replace(/\\/g, '/'),
    frontmatter: matter(readFileSync(f, 'utf8')).data,
  })))
  const pages = new Map(files.map(f => {
    const route = routeOf(relative(pagesDir, f))
    return [route, pageToMarkdown(readFileSync(f, 'utf8'), ctx)]
  }))

  const out: Record<string, string> = {}
  for (const [route, page] of pages) {
    const front = ['---', `title: ${JSON.stringify(page.title)}`]
    if (page.description) front.push(`description: ${JSON.stringify(page.description)}`)
    front.push(`url: ${htmlUrl(route)}`, '---', '')
    out[mdPath(route)] = front.join('\n') + '\n' + page.body
  }

  const listed = nav.groups.map(g => ({ title: g.title, routes: g.items.map(i => i.to).filter(r => pages.has(r)) }))
  out['llms.txt'] = [
    '# VJSF',
    '',
    `> Vuetify JSON Schema Form (\`@koumoul/vjsf\` ${version}): a Vue 3 component built on Vuetify that renders a JSON schema as a form and outputs valid data. Rendering is driven by standard JSON Schema keywords plus one extra keyword, \`layout\`, interpreted by its core library JSON Layout.`,
    '',
    'Notes for agents:',
    '',
    '- Every page below is available as Markdown at the linked `.md` URL. Examples are included as JSON code blocks: the schema, then the options and initial data when the example has any.',
    `- [llms-full.txt](${prefix}llms-full.txt) concatenates every page.`,
    `- The \`layout\` keyword is described by a JSON schema: [layout-keyword.json](${prefix}schemas/layout-keyword.json).`,
    '- vjsf 2 `x-*` keywords (`x-display`, `x-fromUrl`, `x-if`...) are silently ignored by vjsf 3 and later: write `layout` instead, or use the `v2compat` compile option (see Migration).',
    `- To try a schema, open the [playground](${htmlUrl('/editor')}).`,
    ...listed.flatMap(g => ['', `## ${g.title}`, '', ...g.routes.map(r => {
      const p = pages.get(r)!
      return `- [${p.title}](${prefix}${mdPath(r)})${p.description ? ': ' + p.description : ''}`
    })]),
    '',
  ].join('\n')

  out['llms-full.txt'] = listed.flatMap(g => g.routes)
    .map(r => `<!-- source: ${htmlUrl(r)} -->\n\n${pages.get(r)!.body}`)
    .join('\n---\n\n')

  out['schemas/layout-keyword.json'] = readLayoutKeywordSchema()

  if (siteUrl) {
    const routes = ['/', ...listed.flatMap(g => g.routes), '/editor']
    out['sitemap.xml'] = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...routes.map(r => `  <url><loc>${htmlUrl(r)}</loc></url>`),
      '</urlset>',
      '',
    ].join('\n')
  }
  return out
}

export function markdownExportPlugin (pagesDir: string, base: string, version: string, target?: string) {
  let isSsr = false
  return {
    name: 'doc-next-markdown-export',
    configResolved (c: any) { isSsr = !!c.build?.ssr },
    generateBundle (this: any) {
      if (isSsr) return // only emit on the client build, not the SSR pre-render pass
      for (const [fileName, source] of Object.entries(buildMarkdownExport(pagesDir, base, version, target))) {
        this.emitFile({ type: 'asset', fileName, source })
      }
    },
  }
}
