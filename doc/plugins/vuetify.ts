import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.cyan.darken1,
            accent: colors.cyan.accent3
          }
        },
        dark: {
          dark: true,
          colors: {
            surface: colors.cyan.darken4,
            primary: colors.cyan.lighten2
          }
        }
      }
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
