import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, relative, resolve } from 'node:path'
import fg from 'fast-glob'
import { describe, it, expect } from 'vitest'
import { slugify } from './slugify'
import { buildLayoutVocabulary } from '../reference/layout-vocabulary'

// emitted by markdown-export-plugin.ts
const generated = ['/llms.txt', '/llms-full.txt', '/schemas/layout-keyword.json']
const pagesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../pages')
const files = fg.sync('**/*.md', { cwd: pagesDir })
const sources = new Map(files.map(f => ['/' + f.replace(/\.md$/, ''), readFileSync(resolve(pagesDir, f), 'utf8').replace(/```[\s\S]*?```/g, '')]))

function anchors (route: string): Set<string> {
  const ids = [...sources.get(route)!.matchAll(/^#{2,6}\s+(.+?)\s*$/gm)]
    .map(m => slugify(m[1].replace(/`/g, '').replace(/\{[^}]*\}/g, '')))
  if (route === '/behavior/layout-keyword') {
    const { doc } = buildLayoutVocabulary()
    ids.push(...doc.groups.flatMap(g => g.props.map(p => `${g.key}-${p.name}`)), ...doc.components.map(c => `comp-${c.name}`))
  }
  return new Set(ids)
}

describe('internal page links', () => {
  for (const [route, source] of sources) {
    it(`resolve from ${relative('/', route)}`, () => {
      const broken = [...source.matchAll(/\]\(([^)\s]+)\)/g)]
        .map(m => m[1])
        .filter(href => href.startsWith('/') || href.startsWith('#'))
        .filter(href => {
          const [path, hash] = href.split('#')
          const target = path ? path.replace(/\/$/, '') || '/' : route
          if (generated.includes(target)) return false
          if (target === '/' || target === '/editor') return !!hash
          if (!sources.has(target)) return true
          return !!hash && !anchors(target).has(hash)
        })
      expect(broken).toEqual([])
    })
  }
})
