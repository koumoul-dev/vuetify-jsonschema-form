import propsSlots from './props-slots.js'
// import embedDefaults from './embed-defaults.js'
import extraDefaults from './extra-defaults.js'

/** @type {import("../types.js").VJSFExamplesCategory} */
const vuetifyExamples = {
  id: 'vuetify',
  title: 'Vuetify integration',
  description: `VJSF integrates closely with Vuetify to provide rich features.
  
Please note that these features are tied to implementation details and small breaking changes may occur even in minor versions.

Many things are not covered yet, feel free to discuss additions in github issues.`,
  examples: [propsSlots, extraDefaults]
}

export default vuetifyExamples
