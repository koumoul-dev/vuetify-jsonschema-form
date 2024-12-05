import pluginVue from 'eslint-plugin-vue'
import neostandard from 'neostandard'

export default [
  { ignores: ['node_modules/', 'doc/', '**/*.ts', 'app-examples/', 'plugins/img-cropper/'] },
  ...neostandard({ ts: true }),
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off'
    }
  }
]
