import { readFileSync } from 'node:fs'
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

// Base path for GitHub Pages versioned subpaths (wired fully in the deploy phase).
const base = process.env.TARGET ? new URL(process.env.TARGET).pathname : '/'

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

export default defineConfig({
  base,
  plugins: [
    // Must come before `vue()`/`Markdown()`: it only *discovers* `.vue`/`.md`
    // files under `src/pages` as routes (generating `vue-router/auto-routes`
    // + `typed-router.d.ts`); it does not transform file content, so it does
    // not fight with `Markdown()` over ownership of `.md`.
    VueRouter({ extensions: ['.vue', '.md'], dirs: ['src/pages'] }),
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      exposeFrontmatter: true,
      markdownItSetup (md) {
        md.use(anchor, { permalink: anchor.permalink.headerLink() })
        md.use(attrs)
      },
    }),
    navData(),
    // `styles` is left at its default (`true`): vite-plugin-vuetify@2.1.3's
    // `styles: { configFile: false }` shape from the brief crashes (it calls
    // `path.isAbsolute(false)`, expecting a config file path string). We have
    // no custom Sass config, so the default (no style-pipeline plugin, plain
    // `import 'vuetify/styles'` in src/plugins/vuetify.ts) is correct anyway.
    vuetify({ autoImport: true }),
  ],
  ssr: {
    // Vuetify ships untranspiled ESM; keep it in the SSR bundle.
    noExternal: ['vuetify'],
  },
  ssgOptions: {
    // 'nested' emits dist/about/index.html (not dist/about.html) so routes
    // resolve cleanly on static hosts without extension rewriting.
    dirStyle: 'nested',
    includedRoutes (paths) {
      // Pre-render every static route (no dynamic :params in this site yet).
      return paths.filter(p => !p.includes(':'))
    },
  },
})
