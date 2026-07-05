import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, relative } from 'node:path'
import { defineConfig, type HmrContext } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import Markdown from 'unplugin-vue-markdown/vite'
import VueRouter from 'unplugin-vue-router/vite'
import anchor from 'markdown-it-anchor'
import attrs from 'markdown-it-attrs'
import { createHighlighter } from 'shiki'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { searchIndexPlugin } from './build/search-index-plugin'
import { examplesLayoutsPlugin } from './build/examples-layouts-plugin'

// Base path for GitHub Pages versioned subpaths.
const base = process.env.TARGET ? new URL(process.env.TARGET).pathname : '/'

// Build-time metadata shown in the nav-drawer footer (src/build-info.ts).
const requireJson = createRequire(import.meta.url)
const appVersion = requireJson('../lib/package.json').version as string
let commitHash = ''
try {
  commitHash = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
} catch { /* not a git checkout — leave blank */ }

const pagesDir = resolve(dirname(fileURLToPath(import.meta.url)), 'src/pages')

// Exposes each page's frontmatter as `virtual:nav-data`, read directly from
// disk: importing the page modules instead would hit Rollup MISSING_EXPORT
// errors for pages without a `nav:` frontmatter key.
function navData () {
  const virtualId = 'virtual:nav-data'
  const resolvedId = '\0' + virtualId
  return {
    name: 'doc-next-nav-data',
    resolveId (id: string) { if (id === virtualId) return resolvedId },
    load (id: string) {
      if (id !== resolvedId) return
      const files = fg.sync('**/*.md', { cwd: pagesDir, absolute: true })
      const entries = files.map(file => ({
        path: '/src/pages/' + relative(pagesDir, file).replace(/\\/g, '/'),
        frontmatter: matter(readFileSync(file, 'utf8')).data,
      }))
      return `export default ${JSON.stringify(entries)}`
    },
    // rebuild nav when a page's frontmatter changes in dev
    handleHotUpdate (ctx: HmrContext) {
      if (ctx.file.startsWith(pagesDir) && ctx.file.endsWith('.md')) {
        const mod = ctx.server.moduleGraph.getModuleById('\0virtual:nav-data')
        if (mod) {
          ctx.server.moduleGraph.invalidateModule(mod)
          // returning the module is what pushes the HMR update to the client
          return [mod, ...ctx.modules]
        }
      }
    },
  }
}

// The playground's Schema tab autocompletes/validates against the vjsf
// meta-schema (draft-07 + the `layout` keyword). The layout-keyword schema
// file is not exposed by @json-layout/vocabulary's exports map, so read it
// from disk next to the package's resolved entry.
function layoutKeywordSchema () {
  const virtualId = 'virtual:layout-keyword-schema'
  const resolvedId = '\0' + virtualId
  return {
    name: 'doc-next-layout-keyword-schema',
    resolveId (id: string) { if (id === virtualId) return resolvedId },
    load (id: string) {
      if (id !== resolvedId) return
      // import.meta.resolve honors the package's ESM-only exports map (CJS resolve throws)
      const indexPath = fileURLToPath(import.meta.resolve('@json-layout/vocabulary'))
      const schemaPath = resolve(dirname(indexPath), 'layout-keyword/schema.json')
      return `export default ${readFileSync(schemaPath, 'utf8')}`
    },
  }
}

export default defineConfig({
  base,
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  plugins: [
    // Discovers .vue/.md files under src/pages as routes (before vue()/Markdown(),
    // which own the content transforms).
    VueRouter({ extensions: ['.vue', '.md'], dirs: ['src/pages'] } as Parameters<typeof VueRouter>[0]),
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      exposeFrontmatter: true,
      // Maps each page's frontmatter (title/description) into the document
      // <head> via @unhead/vue; the preprocess only adds the ' - VJSF' suffix.
      headEnabled: true,
      frontmatterPreprocess (frontmatter, options, _id, defaultHeadProcess) {
        const head = defaultHeadProcess(frontmatter, options) ?? {}
        if (frontmatter.title) head.title = `${frontmatter.title} - VJSF`
        return { head, frontmatter }
      },
      async markdownItSetup (md) {
        // Code fences are highlighted at build time (pages are compiled by
        // this plugin), so shiki adds zero runtime weight. one-dark-pro is
        // the same palette as the playground's CodeMirror one-dark theme and
        // CodeBlock.vue's token colors.
        const highlighter = await createHighlighter({
          themes: ['one-dark-pro'],
          langs: ['bash', 'js', 'json', 'ts', 'vue'],
        })
        md.options.highlight = (code, lang) => highlighter.codeToHtml(code, {
          // 'text' (always available) still produces the styled block for
          // fences with no language tag.
          lang: highlighter.getLoadedLanguages().includes(lang) ? lang : 'text',
          theme: 'one-dark-pro',
          transformers: [{
            // Drop the theme's inline pre style (bg/fg) and reuse the global
            // .code-block chrome (src/styles.css) so markdown fences and the
            // examples' source panes read as the same block.
            pre (node) {
              delete node.properties.style
              this.addClassToHast(node, 'code-block')
            },
          }],
        })
        // Markdown tables render as <v-table> (auto-imported by
        // vite-plugin-vuetify like any component in these compiled pages):
        // thead/tbody land in the slot, inside the <table> that v-table
        // renders. Vuetify's border/rounded utility classes replace any
        // custom table CSS.
        md.renderer.rules.table_open = () => '<v-table hover class="border rounded my-4">\n'
        md.renderer.rules.table_close = () => '</v-table>\n'
        // h2+ headings get an id (markdown-it-anchor) plus a hover copy-link
        // button: the custom permalink appends a <CopyAnchor> tag that compiles
        // to the globally-registered component (src/main.ts).
        const mit = md as any
        mit.use(anchor, {
          level: 2,
          permalink (slug: string, _opts: unknown, state: any, idx: number) {
            // push an html_inline child so the tag survives into the compiled template
            const token = new state.Token('html_inline', '', 0)
            token.content = `<CopyAnchor id="${slug}"></CopyAnchor>`
            state.tokens[idx + 1].children.push(token)
          },
        })
        mit.use(attrs)
      },
    }),
    navData(),
    layoutKeywordSchema(),
    searchIndexPlugin(pagesDir),
    examplesLayoutsPlugin(),
    vuetify({ autoImport: true }),
  ],
  server: {
    // editor-sandbox.html runs in a sandboxed iframe without allow-same-origin,
    // so its module scripts are fetched with an opaque ("null") origin and the
    // dev server must answer those CORS requests. GitHub Pages already sends
    // Access-Control-Allow-Origin: * in production.
    cors: true,
  },
  ssr: {
    // Vuetify ships untranspiled ESM; keep it in the SSR bundle.
    noExternal: ['vuetify'],
  },
  optimizeDeps: {
    // CommonJS deps in VJSF's chain (via @json-layout/core); pre-bundling them
    // avoids dev-server ESM interop errors when the sandbox entry loads.
    include: [
      'ajv', 'ajv/dist/2019.js', 'ajv-formats', 'ajv-formats/dist/formats.js',
      'ajv-i18n', 'ajv-errors', 'debug', 'fast-deep-equal',
      'immer', 'yaml', 'json5',
    ],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(dirname(fileURLToPath(import.meta.url)), 'index.html'),
        sandbox: resolve(dirname(fileURLToPath(import.meta.url)), 'editor-sandbox.html'),
      },
    },
  },
  ssgOptions: {
    // 'nested' emits dist/about/index.html so routes resolve on static hosts
    // without extension rewriting.
    dirStyle: 'nested',
    includedRoutes (paths: string[]) {
      // Page-less group directories (e.g. /behavior with no index.md) get an
      // auto-generated componentless parent route that vite-ssg would prerender
      // as a blank page — drop those paths, plus any ':param' placeholders.
      const groupDirs = fg.sync('*', { cwd: pagesDir, onlyDirectories: true })
        .filter(dir => !fg.sync('index.md', { cwd: resolve(pagesDir, dir) }).length)
      return paths.filter((p: string) => !p.includes(':') && !groupDirs.includes(p.replace(/^\//, '')))
    },
  },
})
