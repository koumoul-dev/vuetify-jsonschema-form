import fg from 'fast-glob'
import { toSearchDoc } from './search-doc'

export function searchIndexPlugin (pagesDir: string) {
  const fileName = 'search-index.json'
  let isSsr = false

  function build (): string {
    const files = fg.sync('**/*.md', { cwd: pagesDir, absolute: true })
      .filter(f => !/\/_[^/]*\.md$/.test(f)) // skip underscore-prefixed
      .sort()
    const docs = files.map((f, i) => toSearchDoc(f, i, pagesDir))
    return JSON.stringify(docs)
  }

  return {
    name: 'doc-next-search-index',
    configResolved (c: any) { isSsr = !!c.build?.ssr },
    configureServer (server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if ((req.url || '').split('?')[0] === '/' + fileName) {
          res.setHeader('Content-Type', 'application/json')
          res.end(build())
          return
        }
        next()
      })
    },
    generateBundle (this: any) {
      if (isSsr) return // only emit on the client build, not the SSR pre-render pass
      this.emitFile({ type: 'asset', fileName, source: build() })
    },
  }
}
