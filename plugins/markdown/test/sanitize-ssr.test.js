// @vitest-environment node
import { it, expect } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import { MarkdownEditor } from '../src/index.js'

// DOMPurify is only loaded once mounted, so the server rendering leaves the readOnly content empty
// (an unsanitized HTML in the server response would run before the hydration)
it('does not render unsanitized HTML server side', async () => {
  const app = createSSRApp({
    render: () => h(MarkdownEditor, { label: 'Description', readOnly: true, modelValue: '# Title\n\n<img src=x onerror="alert(1)">' })
  })
  app.use(createVuetify())
  const html = await renderToString(app)
  expect(html).toContain('vjsf-markdown-content')
  expect(html).not.toContain('onerror')
  expect(html).not.toContain('<img')
})
