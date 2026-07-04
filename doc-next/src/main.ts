import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import './styles.css'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { createVuetify } from './plugins/vuetify'
import VjsfDemo from './components/VjsfDemo.vue'
import OptionsList from './components/OptionsList.vue'
import I18nMessages from './components/I18nMessages.vue'

// Note: `ClientOnly` is not registered here — `ViteSSG()` registers it as a
// global component automatically (its `registerComponents` option defaults
// to `true`), and `vite-ssg@28` does not export `ClientOnly` from its public
// entry point for manual (re-)registration.
export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(createVuetify())
  // Registered globally so markdown pages (compiled by unplugin-vue-markdown)
  // can use `<VjsfDemo demo="collection-id/demo-id" />` with no imports.
  app.component('VjsfDemo', VjsfDemo)
  // Same rationale: the options.md page uses `<OptionsList type="compile" />`
  // / `<OptionsList type="runtime" />` without an import.
  app.component('OptionsList', OptionsList)
  // Same rationale: the i18n.md page uses `<I18nMessages />` without an import.
  app.component('I18nMessages', I18nMessages)
})
