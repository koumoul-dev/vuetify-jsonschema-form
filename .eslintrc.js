module.exports = {
  root: true,
  env: {
    browser: true
  },
  "globals": {
    "expect": true
  },
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
    "plugin:vue/essential",
    "eslint:recommended",
    "standard",
    "plugin:vue/recommended",
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  plugins: ['jest'],
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
    "vue/no-v-html": "off",
    "vue/multi-word-component-names": "off",
    "node/no-deprecated-api": "off",
    "vue/no-mutating-props": "off",
    "vue/require-prop-types": "off",
    "vue/no-useless-template-attributes": "off",
    "vue/singleline-html-element-content-newline": "off"
  }
}