import MiniSearch from 'minisearch'
import type { SearchDocument } from '../../build/search-doc'

export interface SearchResult {
  id: string
  title: string
  path: string
  category: string
  score: number
}

export function createSearcher (docs: SearchDocument[]) {
  const ms = new MiniSearch<SearchDocument>({
    fields: ['title', 'headings', 'content'],
    storeFields: ['title', 'category', 'path', 'headings'],
  })
  ms.addAll(docs)

  return {
    search (query: string): SearchResult[] {
      const q = query.trim()
      if (!q) return []
      const v2Query = /\bv2\b|compat/i.test(q)
      return ms.search(q, {
        boost: { title: 5, headings: 2, content: 1 },
        fuzzy: 0.2,
        prefix: true,
        boostDocument: (_id, _term, doc: any) => {
          // D14: v2-compat is low-weight by default, lifted when explicitly sought.
          if (doc?.category === 'v2-compat') return v2Query ? 1.5 : 0.2
          return 1
        },
      }).map(r => ({
        id: String(r.id),
        title: r.title,
        path: r.path,
        category: r.category,
        score: r.score,
      }))
    },
  }
}
