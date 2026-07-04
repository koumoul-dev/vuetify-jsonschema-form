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
import fg from 'fast-glob'
import matter from 'gray-matter'
import { searchIndexPlugin } from './build/search-index-plugin'
import { examplesLayoutsPlugin } from './build/examples-layouts-plugin'

// Base path for GitHub Pages versioned subpaths (wired fully in the deploy phase).
const base = process.env.TARGET ? new URL(process.env.TARGET).pathname : '/'

// Build-time app metadata surfaced in the nav-drawer footer (see
// src/build-info.ts). The version is the published library version; the commit
// hash is best-effort (blank when built outside a git checkout).
const requireJson = createRequire(import.meta.url)
const appVersion = requireJson('../lib/package.json').version as string
let commitHash = ''
try {
  commitHash = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
} catch { /* not a git checkout — leave blank */ }

const pagesDir = resolve(dirname(fileURLToPath(import.meta.url)), 'src/pages')

// Generates nav data at build time by reading each page's frontmatter
// directly from disk (never importing the page modules). This avoids the
// Rollup `MISSING_EXPORT` error that a `import.meta.glob(..., { import: 'nav' })`
// approach hits in production builds when a page has no `nav:` frontmatter
// key (see doc-next/src/nav/use-nav.ts).
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
          // Return the invalidated virtual module (plus the file's own
          // affected modules) so Vite pushes an HMR update to the client;
          // invalidating alone marks it stale server-side but never tells
          // the browser to re-fetch (Vite's documented handleHotUpdate
          // return contract).
          return [mod, ...ctx.modules]
        }
      }
    },
  }
}

// The playground's Schema tab autocompletes/validates against the vjsf
// meta-schema (draft-07 + the `layout` keyword). The layout-keyword schema
// lives in @json-layout/vocabulary, whose exports map only exposes
// src/index.js — so resolve that entry and read the schema file sitting next
// to it from disk at build time.
function layoutKeywordSchema () {
  const virtualId = 'virtual:layout-keyword-schema'
  const resolvedId = '\0' + virtualId
  return {
    name: 'doc-next-layout-keyword-schema',
    resolveId (id: string) { if (id === virtualId) return resolvedId },
    load (id: string) {
      if (id !== resolvedId) return
      // `@json-layout/vocabulary`'s exports map only declares an `import`
      // condition (no `require`), so `requireJson.resolve` (Node's CJS
      // resolver) throws `ERR_PACKAGE_PATH_NOT_EXPORTED`. `import.meta.resolve`
      // is the ESM-aware resolver and honors that `import` condition.
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
    // Must come before `vue()`/`Markdown()`: it only *discovers* `.vue`/`.md`
    // files under `src/pages` as routes (generating `vue-router/auto-routes`
    // + `typed-router.d.ts`); it does not transform file content, so it does
    // not fight with `Markdown()` over ownership of `.md`.
    // `dirs` isn't in unplugin-vue-router's typed Options (it happens to match
    // the default `src/pages`); cast to keep it explicit without a type error.
    VueRouter({ extensions: ['.vue', '.md'], dirs: ['src/pages'] } as Parameters<typeof VueRouter>[0]),
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      exposeFrontmatter: true,
      markdownItSetup (md) {
        // `level: 2` skips the page-title h1 (only h2+ get an id + the
        // hover "#" permalink, matching the Vuetify docs). `placement:
        // 'before'` renders the "#" to the left of the heading text; it is
        // hidden until hover via `.header-anchor` styles in src/styles.css.
        // Cast to any: markdown-it-anchor/-attrs are typed against
        // @types/markdown-it, structurally incompatible with the markdown-exit
        // MarkdownIt that unplugin-vue-markdown passes here.
        const mit = md as any
        mit.use(anchor, {
          level: 2,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            placement: 'before',
            ariaHidden: true,
          }),
        })
        mit.use(attrs)
      },
    }),
    navData(),
    layoutKeywordSchema(),
    searchIndexPlugin(pagesDir),
    examplesLayoutsPlugin(),
    // `styles` is left at its default (`true`): vite-plugin-vuetify@2.1.3's
    // `styles: { configFile: false }` shape from the brief crashes (it calls
    // `path.isAbsolute(false)`, expecting a config file path string). We have
    // no custom Sass config, so the default (no style-pipeline plugin, plain
    // `import 'vuetify/styles'` in src/plugins/vuetify.ts) is correct anyway.
    vuetify({ autoImport: true }),
  ],
  server: {
    // `editor-sandbox.html` is embedded in a `sandbox="allow-scripts"`
    // iframe (deliberately WITHOUT `allow-same-origin`), so it runs with an
    // opaque ("null") origin. Its `<script type="module">` tags are
    // therefore fetched in CORS mode with an `Origin: null` header; Vite's
    // default dev-server CORS policy only reflects same-host origins, which
    // never matches "null", so the sandbox's own scripts fail to load with
    // ERR_FAILED unless CORS is opened up. `cors: true` (browserify `cors`
    // defaults) answers every request with `Access-Control-Allow-Origin: *`,
    // which is required to satisfy an opaque-origin fetch. Production
    // hosting (GitHub Pages) already sends this header on every response, so
    // this only changes local dev/preview behavior. `preview.cors` inherits
    // this same setting.
    cors: true,
  },
  ssr: {
    // Vuetify ships untranspiled ESM; keep it in the SSR bundle.
    noExternal: ['vuetify'],
  },
  optimizeDeps: {
    // VJSF's dependency chain (via @json-layout/core) pulls in AJV and a
    // handful of packages that ship as CommonJS; pre-bundling them avoids
    // Vite dev-server "does not provide an export named ..." interop errors
    // the first time the sandbox entry (editor-sandbox.html) is loaded.
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
    // 'nested' emits dist/about/index.html (not dist/about.html) so routes
    // resolve cleanly on static hosts without extension rewriting.
    dirStyle: 'nested',
    includedRoutes (paths: string[]) {
      // Every route is now a static page or a hand-written dynamic-content
      // page (no more `[category].vue` catch-all), so just drop any
      // leftover `:param` placeholder paths and pre-render the rest.
      return paths.filter((p: string) => !p.includes(':'))
    },
  },
})
