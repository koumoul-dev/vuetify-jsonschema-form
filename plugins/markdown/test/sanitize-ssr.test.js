// @vitest-environment node
import { it, expect } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import { MarkdownEditor } from '../src/index.js'

// without a DOM DOMPurify cannot sanitize and returns its input untouched,
// the server rendering must not contain the raw HTML
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
