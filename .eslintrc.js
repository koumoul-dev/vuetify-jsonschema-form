module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
    // https://github.com/vuejs/eslint-plugin-vue,
     'plugin:vue/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // This rule is required because atom vue-format package remove the space
    'space-before-function-paren': 0,
    // Turn off vuejs rules, not because ther are not good, but mostly because
    // they are very present in initial code base.. Maybe we should clean that up someday..
    'vue/max-attributes-per-line': 'off',
    'vue/require-prop-types': 'off',
    'no-new': 'off',
    'vue/no-v-html': 'off'
  }
}
