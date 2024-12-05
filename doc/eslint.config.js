import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['/components/compiled'],
  rules: {
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
  },
})
