import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors.mjs'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    locale: {
      // locale: 'fr',
    },
    ssr: true,
    defaults: {
      global: {
        density: 'comfortable',
      },
      /*
      VjsfTextField: {
        VTextField: { variant: 'outlined' },
      },
      VTimePicker: { format: '24hr' },
      */
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
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})
