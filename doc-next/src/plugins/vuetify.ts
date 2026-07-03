import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify as _createVuetify } from 'vuetify'
import { vuetifyTheme } from '../theme'

export function createVuetify () {
  return _createVuetify({
    ssr: true,
    icons: { defaultSet: 'mdi' },
    theme: vuetifyTheme,
  })
}
