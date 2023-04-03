import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vjsf',
      fileName: 'vjsf'
    },
    rollupOptions: {
      external: ['vue', 'vuetify', 'ajv'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
