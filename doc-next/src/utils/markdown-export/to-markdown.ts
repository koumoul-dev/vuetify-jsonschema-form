import matter from 'gray-matter'
import type { Example } from '../../demos/types'
import type { LayoutPropDoc, LayoutVocabularyDoc } from '../../reference/types'
import type { DocOption } from '../doc-options-catalog'

export interface MarkdownContext {
  /** Link to the markdown version of an internal route ('/behavior/i18n' + optional '#hash'). */
  mdLink: (route: string) => string
  findDemo: (key: string) => { example: Example, v2compat: boolean }
  vocabulary: LayoutVocabularyDoc
  compileOptions: DocOption[]
  runtimeOptions: DocOption[]
  messages: Record<string, Record<string, string>>
}

export interface MarkdownPage {
  title: string
  description?: string
  body: string
}

const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': '\'', nbsp: ' ' }

export function htmlToMarkdown (html: string, ctx: Pick<MarkdownContext, 'mdLink'>): string {
  return html
    .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/g, '**$2**')
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/g, '*$2*')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_m, href: string, text: string) => `[${text}](${href.startsWith('/') ? ctx.mdLink(href) : href})`)
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_m, e: string) => entities[e])
    .trim()
}

const cell = (text: string) => text.replace(/\n+/g, ' ').replace(/\|/g, '\\|')

function json (value: unknown): string {
  return '```json\n' + JSON.stringify(value, null, 2) + '\n```'
}

function attr (tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1]
}

export function demoToMarkdown (key: string, ctx: MarkdownContext): string {
  const { example, v2compat } = ctx.findDemo(key)
  const out = [`**Example: ${example.title}**${v2compat ? ' (a vjsf 2 schema, rendered with the `v2compat` compile option)' : ''}`]
  if (example.description) out.push(example.description)
  if (example.warning) out.push(`> **Warning:** ${example.warning}`)
  out.push('Schema:', json(example.schema))
  if (example.options !== undefined) out.push('Options:', json(example.options))
  if (example.data !== undefined) out.push('Initial data:', json(example.data))
  if (example.vuetifyDefaults) out.push('Vuetify defaults:', json(example.vuetifyDefaults))
  if (example.slotsCode) out.push('Slots:', '```vue\n' + example.slotsCode.trim() + '\n```')
  return out.join('\n\n')
}

function propsTable (props: LayoutPropDoc[], ctx: MarkdownContext): string {
  const rows = props.map(p => {
    const desc = [p.computed ? '*Computed, not written in `layout`.*' : '', htmlToMarkdown(p.description ?? 'Not documented yet.', ctx)]
    if (p.see) desc.push(`See [${p.see.label}](${ctx.mdLink(p.see.to)}).`)
    return `| \`${p.name}\` | ${cell(p.type)} | ${cell(desc.filter(Boolean).join(' '))} |`
  })
  return ['| Property | Type | Description |', '|---|---|---|', ...rows].join('\n')
}

export function layoutGroupToMarkdown (groupKey: string, ctx: MarkdownContext): string {
  const group = ctx.vocabulary.groups.find(g => g.key === groupKey)
  if (!group) throw new Error(`unknown layout group "${groupKey}"`)
  const out = []
  if (group.appliesTo.length) out.push(`Applies to: ${group.appliesTo.map(c => `\`${c}\``).join(', ')}.`)
  out.push(propsTable(group.props, ctx))
  return out.join('\n\n')
}

export function layoutComponentsToMarkdown (ctx: MarkdownContext): string {
  return ctx.vocabulary.components.map(comp => {
    const out = [`#### \`${comp.name}\``]
    if (comp.characteristics.length) out.push(`Characteristics: ${comp.characteristics.join(', ')}.`)
    const desc = htmlToMarkdown(comp.description ?? 'Not documented yet.', ctx)
    out.push(comp.page ? `${desc} Documented on the [${comp.page.label}](${ctx.mdLink(comp.page.to)}) page.` : desc)
    if (comp.props.length) out.push(propsTable(comp.props, ctx))
    return out.join('\n\n')
  }).join('\n\n')
}

export function optionsToMarkdown (type: string, ctx: MarkdownContext): string {
  const options = type === 'compile' ? ctx.compileOptions : ctx.runtimeOptions
  return options.map(o => {
    const out = [`- \`${o.key}\`${o.default !== undefined ? ` (default: \`${JSON.stringify(o.default)}\`)` : ''}: ${htmlToMarkdown(o.description, ctx)}`]
    if (o.values && o.key !== 'messages') {
      const values = Object.entries(o.values).map(([k, v]) => `\`${k}\`: \`${typeof v === 'string' ? v : JSON.stringify(v)}\``)
      out.push(`  ${o.valuesTitle ?? 'Values'}: ${values.join(', ')}.`)
    }
    if (o.key === 'messages') out.push('  The default messages are listed on the [internationalization](' + ctx.mdLink('/behavior/i18n') + ') page.')
    return out.join('\n')
  }).join('\n')
}

export function messagesToMarkdown (ctx: MarkdownContext): string {
  const locales = Object.keys(ctx.messages)
  const keys = Object.keys(ctx.messages.en ?? {})
  return [
    `| Key | ${locales.join(' | ')} |`,
    `|---|${locales.map(() => '---').join('|')}|`,
    ...keys.map(k => `| \`${k}\` | ${locales.map(l => cell(String(ctx.messages[l][k] ?? ''))).join(' | ')} |`),
  ].join('\n')
}

const singleTag = /^\s*<(VjsfDemo|LayoutPropsTable|LayoutCompCatalogue|OptionsList|I18nMessages)\b[^>]*>\s*$/

function renderComponent (tag: string, ctx: MarkdownContext): string {
  const name = tag.match(/<(\w+)/)![1]
  if (name === 'VjsfDemo') return demoToMarkdown(attr(tag, 'demo')!, ctx)
  if (name === 'LayoutPropsTable') return layoutGroupToMarkdown(attr(tag, 'group-key')!, ctx)
  if (name === 'LayoutCompCatalogue') return layoutComponentsToMarkdown(ctx)
  if (name === 'OptionsList') return optionsToMarkdown(attr(tag, 'type')!, ctx)
  return messagesToMarkdown(ctx)
}

/**
 * Turns a doc page's source (markdown + the few Vue components pages use) into
 * plain markdown: demos become JSON code blocks, generated reference tables
 * become markdown tables, internal links point to the other .md pages.
 */
export function pageToMarkdown (source: string, ctx: MarkdownContext): MarkdownPage {
  const { data, content } = matter(source)
  const lines = content.split('\n')
  const out: string[] = []
  let fence: string | null = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const fenceMatch = line.match(/^\s*(```+|~~~+)/)
    if (fence) {
      out.push(line)
      if (fenceMatch && fenceMatch[1].startsWith(fence)) fence = null
      continue
    }
    if (fenceMatch) {
      fence = fenceMatch[1]
      out.push(line)
      continue
    }
    if (/^\s*<script\b/.test(line)) {
      while (i < lines.length && !/<\/script>/.test(lines[i])) i++
      continue
    }
    if (singleTag.test(line)) {
      out.push(renderComponent(line, ctx))
      // a demo with live slot content: its code is in the example's slotsCode
      if (!/\/>\s*$/.test(line)) {
        const name = line.match(/<(\w+)/)![1]
        while (i < lines.length && !lines[i].includes(`</${name}>`)) i++
      }
      continue
    }
    const alert = line.match(/^\s*<v-alert\b([^>]*)>(.*)$/)
    if (alert) {
      const kind = attr(alert[1], 'type') === 'warning' ? 'Warning' : 'Note'
      const inner = [alert[2]]
      while (!inner[inner.length - 1].includes('</v-alert>') && i + 1 < lines.length) inner.push(lines[++i])
      const text = htmlToMarkdown(inner.join('\n').replace('</v-alert>', ''), ctx).replace(/\s*\n\s*/g, ' ')
      out.push(`> **${kind}:** ${text}`)
      continue
    }
    if (/^\s*<\/?v-(row|col)\b[^>]*>\s*$/.test(line)) continue
    out.push(line
      .replace(/\]\((\/[^)\s]*)\)/g, (_m, href: string) => `](${ctx.mdLink(href)})`)
      .replace(/<(i|em)>([^<]*)<\/\1>/g, '*$2*'))
  }
  const body = out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
  return { title: data.title ?? '', description: data.description, body }
}
