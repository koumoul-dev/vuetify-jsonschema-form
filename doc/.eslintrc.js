module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "standard",
    "plugin:vue/recommended"
  ],
  "rules": {
    "vue/no-v-html": "off",
    "vue/multi-word-component-names": "off",
    "node/no-deprecated-api": "off",
    "vue/no-mutating-props": "off",
    "vue/require-prop-types": "off",
    "vue/no-useless-template-attributes": "off",
    "vue/singleline-html-element-content-newline": "off"
  }
}