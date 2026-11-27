import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    // jsdom rather than happy-dom (used by the lib tests): DOMPurify does not work with happy-dom
    // (it reads nodeName through the Element prototype getter, missing there) and drops content
    environment: 'jsdom',
    setupFiles: ['./test/setup.js'],
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
  }
})
