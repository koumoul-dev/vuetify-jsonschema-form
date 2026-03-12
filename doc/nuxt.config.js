// https://www.the-koi.com/projects/how-to-set-up-a-project-with-nuxt3-and-vuetify3-with-a-quick-overview/
import path from 'path'
import { defineNuxtConfig } from 'nuxt/config'
import dependencyWatcher from 'vite-plugin-dependency-watcher' // cf https://github.com/vitejs/vite/issues/4533
import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'
import colors from 'vuetify/lib/util/colors.js'
import examples from './examples/index.js'

const targetURL = new URL(process.env.TARGET || 'http://localhost:3133/')

const packageNames = ['@json-layout/core', '@json-layout/vocabulary', '@json-layout/examples', '@koumoul/vjsf']
const packagePaths = packageNames.map(name => path.resolve(process.cwd(), '../node_modules', name))

const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({

  modules: [
    '@nuxtjs/sitemap',
    ['@nuxt/eslint', {
      config: { stylistic: true },
    }],
    'vuetify-nuxt-module',
  ],

  plugins: [
    // { src: '~/plugins/highlight.js', ssr: false },
    // { src: '~/plugins/mask.js', ssr: false },
    // { src: '~/plugins/tiptap-vuetify.js', ssr: false }
  ],
  ssr: !isDev,

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
      script: [
        { src: targetURL.pathname + 'webmcp-local-relay/embed.js' },
      ],
    },
  },
  css: ['vuetify/styles'],

  site: {
    name: 'VJSF - Documentation',
    url: targetURL.origin,
  },
  runtimeConfig: {
    public: {
      targetURL: targetURL.href,
    },
  },

  // cf https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
  build: {
    transpile: ['vuetify'],
  },

  compatibilityDate: '2024-07-22',

  vite: {
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

  vuetify: {
    vuetifyOptions: {
      directives: true,
      icons: { defaultSet: 'mdi' },
      defaults: {
        global: {
          density: 'comfortable',
        },
      },
      theme: {
        defaultTheme: 'dark',
        themes: {
          light: {
            dark: false,
            colors: {
              primary: colors.cyan.darken1,
              accent: colors.cyan.accent3,
            },
          },
          dark: {
            dark: true,
            colors: {
              background: '#212121',
              // surface: '#000000',
              primary: colors.cyan.accent2,
            },
            variables: {
              'border-opacity': 0.5,
            },
          },
        },
      },
    },
  },
})
