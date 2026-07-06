import { readFileSync } from 'node:fs'
import { relative } from 'node:path'
import matter from 'gray-matter'

export interface SearchDocument {
  id: string
  title: string
  category: string
  path: string
  headings: string[]
  content: string
}

export function extractHeadings (body: string): string[] {
  const withoutFences = body.replace(/```[\s\S]*?```/g, '')
  const out: string[] = []
  const re = /^#{2,3}\s+(.+?)\s*$/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(withoutFences)) !== null) {
    out.push(m[1].replace(/`([^`]+)`/g, '$1').replace(/\{[^}]*\}/g, '').trim())
  }
  return out
}

export function stripMarkdown (body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, ' ')          // code fences
    .replace(/`[^`]+`/g, m => m.replace(/`/g, '')) // inline code
    .replace(/^#{1,6}\s+/gm, '')               // heading markers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')   // links -> text
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // emphasis
    .replace(/<[^>]+>/g, ' ')                   // html/vue tags
    .replace(/\s+/g, ' ')                       // normalize
    .trim()
}

function routeFromRel (rel: string): string {
  const r = '/' + rel.replace(/\\/g, '/').replace(/\.md$/, '').replace(/\/index$/, '')
  return r === '/index' || r === '/' ? '/' : r
}

// Demos have no reliable per-demo anchor to deep-link to: they're embedded under
// markdown headings whose ids come from markdown-it-anchor's heading-text slug
// (vite.config.ts), not the demo id, so a search hit just links to the demo
// collection's page (`route`) as a whole rather than a `#fragment` inside it.
export function exampleToSearchDoc (ex: { id: string, title: string, description?: string, schema: unknown }, route: string, categoryId: string, id: number): SearchDocument {
  return {
    id: `ex-${id}`,
    title: ex.title,
    category: categoryId,
    path: route,
    headings: [],
    content: stripMarkdown(ex.description ?? '').slice(0, 5000),
  }
}

export function toSearchDoc (file: string, id: number, pagesDir: string): SearchDocument {
  const rel = relative(pagesDir, file)
  const raw = readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const category = typeof data.category === 'string' ? data.category : (rel.includes('/') ? rel.split('/')[0] : 'guide')
  return {
    id: String(id),
    title: typeof data.title === 'string' ? data.title : rel.replace(/\.md$/, ''),
    category,
    path: routeFromRel(rel),
    headings: extractHeadings(content),
    content: stripMarkdown(content).slice(0, 5000),
  }
}
