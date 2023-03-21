import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({ ssr: false })
  nuxtApp.vueApp.use(vuetify)
})
