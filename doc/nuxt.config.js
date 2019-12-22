import colors from 'vuetify/lib/util/colors'

module.exports = {
  build: {
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
    theme: {
      themes: {
        light: {
          primary: colors.lightGreen.darken1,
          accent: colors.lightGreen.accent4
        }
      }
    }
  },
  head: {
    title: 'vuetify-jsonschema-form - documentation',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `vuetify-jsonschema-form - documentation` },
      { hid: 'robots', name: 'robots', content: 'noindex' }
    ]
  },
  hooks: {
    build: {
      templates(params) {
        console.log('BIM', params)
      }
    }
  }
}
