import colors from 'vuetify/lib/util/colors'

module.exports = {
  mode: 'spa',
  build: {
    transpile: [/\.\.\//],
    extend(config, ctx) {
      // Include the compiler version of Vue so that we can compile examples templates
      config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
    }
  },
  modules: [
    '@nuxtjs/axios'
  ],
  plugins: [
    { src: '~/plugins/highlight.js', ssr: false }
  ],
  buildModules: ['@nuxtjs/vuetify'],
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
    ]
  }
}
