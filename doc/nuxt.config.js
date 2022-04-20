import colors from 'vuetify/lib/util/colors'
const path = require('path')

module.exports = {
  ssr: false,
  build: {
    transpile: [/@koumoul/, 'tiptap-vuetify', /lib/],
    extend (config, ctx) {
      // Include the compiler version of Vue so that we can compile examples templates
      config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
      // force resolving in doc/node_modules event when importing from ../lib
      config.resolve.modules = [path.join(__dirname, 'node_modules'), 'node_modules']
    }
  },
  modules: [
    '@nuxtjs/axios'
  ],
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  plugins: [
    { src: '~/plugins/highlight.js', ssr: false },
    { src: '~/plugins/mask.js', ssr: false },
    { src: '~/plugins/tiptap-vuetify.js', ssr: false }
  ],
  vuetify: {
    // uncomment to test mdiSvg support
    /* defaultAssets: {
      icons: false
    },
    icons: {
      iconfont: 'mdiSvg'
    }, */
    theme: {
      themes: {
        light: {
          primary: colors.cyan.base,
          accent: colors.cyan.accent3
        }
      }
    }
  },
  router: {
    base: process.env.BASE || '/'
  },
  head: {
    title: 'vjsf - Documentation',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `vjsf - Documentation` },
      { hid: 'robots', name: 'robots', content: 'noindex' }
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
}
