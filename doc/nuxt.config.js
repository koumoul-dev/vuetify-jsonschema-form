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
    theme: {
      themes: {
        light: {
          primary: colors.blue.darken1,
          accent: colors.blue.accent4
        }
      }
    }
  },
  router: {
    base: process.env.BASE || '/',
    // cf https://toor.co/blog/nuxtjs-smooth-scrolling-with-hash-links/
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
          })
      }

      if (to.hash) {
        const el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
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
  }
}
