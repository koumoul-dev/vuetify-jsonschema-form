import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import './styles.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import { vuetifyTheme } from './utils/theme'
import VjsfDemo from './components/VjsfDemo.vue'
import OptionsList from './components/OptionsList.vue'
import I18nMessages from './components/I18nMessages.vue'
import CopyAnchor from './components/CopyAnchor.vue'
import LayoutPropsTable from './components/LayoutPropsTable.vue'
import LayoutCompCatalogue from './components/LayoutCompCatalogue.vue'

// `ClientOnly` is not registered here — ViteSSG() registers it globally itself.
export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(createVuetify({ ssr: true, icons: { defaultSet: 'mdi' }, theme: vuetifyTheme }))
  // Registered globally so markdown pages (compiled by unplugin-vue-markdown)
  // can use them without imports. CopyAnchor is injected into every heading
  // by the markdown-it-anchor permalink in vite.config.ts.
  app.component('VjsfDemo', VjsfDemo)
  app.component('OptionsList', OptionsList)
  app.component('I18nMessages', I18nMessages)
  app.component('CopyAnchor', CopyAnchor)
  app.component('LayoutPropsTable', LayoutPropsTable)
  app.component('LayoutCompCatalogue', LayoutCompCatalogue)
})
