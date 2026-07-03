import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import './styles.css'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { createVuetify } from './plugins/vuetify'

// Note: `ClientOnly` is not registered here — `ViteSSG()` registers it as a
// global component automatically (its `registerComponents` option defaults
// to `true`), and `vite-ssg@28` does not export `ClientOnly` from its public
// entry point for manual (re-)registration.
export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(createVuetify())
})
