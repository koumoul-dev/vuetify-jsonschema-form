import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import './styles.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { createVuetify } from './plugins/vuetify'
import ClientProbe from './components/ClientProbe.vue'

const routes = [
  { path: '/', component: () => import('./pages/index.md') },
]

// Note: `ClientOnly` is not registered here — `ViteSSG()` registers it as a
// global component automatically (its `registerComponents` option defaults
// to `true`), and `vite-ssg@28` does not export `ClientOnly` from its public
// entry point for manual (re-)registration. `ClientProbe` (this app's own
// browser-only component) is registered explicitly, as any consumer-defined
// component must be.
export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(createVuetify())
  app.component('ClientProbe', ClientProbe)
})
