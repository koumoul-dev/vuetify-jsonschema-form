import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import Markdown from 'unplugin-vue-markdown/vite'
import VueRouter from 'unplugin-vue-router/vite'
import anchor from 'markdown-it-anchor'
import attrs from 'markdown-it-attrs'

// Base path for GitHub Pages versioned subpaths (wired fully in the deploy phase).
const base = process.env.TARGET ? new URL(process.env.TARGET).pathname : '/'

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
    includedRoutes (paths) {
      // Pre-render every static route (no dynamic :params in this site yet).
      return paths.filter(p => !p.includes(':'))
    },
  },
})
