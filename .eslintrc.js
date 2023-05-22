module.exports = {
  root: true,
  env: {},
  extends: [
    'standard',
    'typescript',
    'plugin:vue/vue3-recommended'
  ],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  }
}
