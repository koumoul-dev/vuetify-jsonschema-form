module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
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
    'space-before-function-paren': 0
  }
}
