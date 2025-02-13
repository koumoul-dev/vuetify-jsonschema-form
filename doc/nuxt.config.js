// https://www.the-koi.com/projects/how-to-set-up-a-project-with-nuxt3-and-vuetify3-with-a-quick-overview/
import path from 'path'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { defineNuxtConfig } from 'nuxt/config'
import dependencyWatcher from 'vite-plugin-dependency-watcher' // cf https://github.com/vitejs/vite/issues/4533
import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'
import examples from './examples/index.js'

// import colors from 'vuetify/lib/util/colors'
// import path from 'path'

const targetURL = new URL(process.env.TARGET || 'http://localhost:3133/')

const packageNames = ['@json-layout/core', '@json-layout/vocabulary', '@json-layout/examples', '@koumoul/vjsf']
const packagePaths = packageNames.map(name => path.resolve(process.cwd(), '../node_modules', name))

export default defineNuxtConfig({

  modules: [
    // '@nuxtjs/sitemap'
    // @ts-ignore
    (_, nuxt) => nuxt.hooks.hook('vite:extendConfig', (config) => {
      // we disable autoImport because we want to be warned of missing imports in vjsf
      config.plugins.push(vuetify({ autoImport: false }))
    }),
    ['@nuxt/eslint', {
      config: { stylistic: true },
    }],
  ],

  plugins: [
    // { src: '~/plugins/highlight.js', ssr: false },
    // { src: '~/plugins/mask.js', ssr: false },
    // { src: '~/plugins/tiptap-vuetify.js', ssr: false }
  ],
  ssr: false,

  // sitemap: {
  //   hostname: targetURL.origin
  // },
  /* vuetify: {
    theme: {
      themes: {
        light: {
          primary: colors.cyan.base,
          accent: colors.cyan.accent3
        }
      }
    }
  }, */
  app: {
    baseURL: targetURL.pathname,
    head: {
      title: 'VJSF - Documentation',
      meta: [
        { name: 'description', content: 'VJSF - Documentation' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: targetURL.pathname + 'favicon.ico' },
      ],
    },
  },
  css: ['vuetify/styles'],

  compatibilityDate: '2024-07-22',

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    optimizeDeps: {
      include: commonjsDeps,
    },
    plugins: [
      // @ts-ignore
      dependencyWatcher(packagePaths, packageNames),
    ],
  },

  hooks: {
    async 'nitro:config'(config) {
      for (const examplesCategory of examples) {
        config.prerender?.routes?.push(`/${examplesCategory.id}`)
        for (const example of examplesCategory.examples) {
          config.prerender?.routes?.push(`/${examplesCategory.id}/${example.id}`)
        }
      }
    },
  },
})
