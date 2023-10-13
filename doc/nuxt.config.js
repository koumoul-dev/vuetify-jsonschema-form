// https://www.the-koi.com/projects/how-to-set-up-a-project-with-nuxt3-and-vuetify3-with-a-quick-overview/
import { resolve } from 'path'
import vuetify from 'vite-plugin-vuetify'
import { defineNuxtConfig } from 'nuxt/config'

// import colors from 'vuetify/lib/util/colors'
// import path from 'path'

const targetURL = new URL(process.env.TARGET || 'http://localhost:3133/')

export default defineNuxtConfig({
  ssr: false,
  css: ['vuetify/styles'],
  build: {
    transpile: [/vuetify/, /@koumoul/]
  },
  vite: {
    server: {
      fs: {
        // necessary to work with npm links
        allow: [resolve('../../json-layout')]
      }
    }
  },
  modules: [
    // '@nuxtjs/sitemap'
    // @ts-ignore
    (_, nuxt) => nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(vuetify()))
  ],
  plugins: [
    // { src: '~/plugins/highlight.js', ssr: false },
    // { src: '~/plugins/mask.js', ssr: false },
    // { src: '~/plugins/tiptap-vuetify.js', ssr: false }
  ],
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
    baseURL: targetURL.pathname
  },
  meta: {
    title: 'VJSF - Documentation',
    meta: [
      { name: 'description', content: 'VJSF - Documentation' }
    ],
    link: [{
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@koumoul/data-fair-search-widget@0/dist/search-widget.css'
    }],
    script: [{
      src: 'https://cdn.jsdelivr.net/npm/@koumoul/data-fair-search-widget@0.1.7/dist/search-widget.js',
      async: true
    }]
  }
})
