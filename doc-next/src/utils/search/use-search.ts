import { ref, shallowRef } from 'vue'
import { createSearcher, type SearchResult } from './searcher'
import type { SearchDocument } from './search-doc'

let searcher: ReturnType<typeof createSearcher> | null = null
let loading: Promise<void> | null = null

async function ensureIndex () {
  if (searcher) return
  if (!loading) {
    loading = fetch(`${import.meta.env.BASE_URL}search-index.json`)
      .then(r => r.json() as Promise<SearchDocument[]>)
      .then(docs => { searcher = createSearcher(docs) })
      .catch(err => { loading = null; throw err })
  }
  await loading
}

export function useSearch () {
  const query = ref('')
  const results = shallowRef<SearchResult[]>([])

  async function run () {
    await ensureIndex()
    results.value = searcher ? searcher.search(query.value) : []
  }

  return { query, results, run }
}
