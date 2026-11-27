import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createVuetify } from 'vuetify'
import { marked } from 'marked'
import { MarkdownEditor } from '../src/index.js'

const vuetify = createVuetify()

// markdown is user data: it may come from another user than the one displaying it
const maliciousMarkdown = [
  '# Title',
  'Hi <img src=x onerror="alert(1)">',
  '<details open ontoggle="alert(1)"><summary>s</summary>x</details>',
  '[md link](javascript:alert(1))',
  '<a href="javascript:alert(1)">raw link</a>',
  '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
  '<script>alert(1)</script>',
  '<svg><animate onbegin="alert(1)" attributeName="x" dur="1s"/></svg>',
  '<object data="javascript:alert(1)"></object>'
].join('\n\n')

// regular content that must not be altered by the sanitization
const benignMarkdown = `# Heading 1

## Heading *2*

Some **bold**, _italic_, ~~strike~~, \`inline code\` and an autolink https://example.com.
A line break
in the same paragraph.

- item 1
  - nested item
- [link](https://example.com "with title")
- [relative link](./page#anchor) and [mailto](mailto:someone@example.com)

1. first
2. second

- [x] done task
- [ ] todo task

> a quote
> on 2 lines

\`\`\`js
const a = '<b>not html</b>'
\`\`\`

| Left | Center | Right |
|:-----|:------:|------:|
| a    | b      | c     |

![image](https://example.com/img.png "image title")
![data image](data:image/png;base64,iVBORw0KGgo=)

---

Raw HTML: <span style="color: red">red</span>, <sup>sup</sup>, <kbd>Ctrl</kbd>, <u>underline</u><br>
<div align="center"><a href="https://example.com" title="t" target="_blank">centered link</a></div>

<details><summary>Summary</summary>Hidden content</details>

Entities: &copy; &lt;tag&gt; &amp;
`

/**
 * @param {Element} root
 */
const findDangerousNodes = (root) => {
  /** @type {string[]} */
  const found = []
  for (const el of root.querySelectorAll('*')) {
    const tag = el.tagName.toLowerCase()
    if (['script', 'iframe', 'object', 'embed', 'animate'].includes(tag)) found.push(`<${tag}>`)
    for (const attr of el.attributes) {
      if (attr.name.startsWith('on')) found.push(`${tag}[${attr.name}]`)
      if (['href', 'src', 'srcdoc', 'data', 'action', 'xlink:href'].includes(attr.name) && /^\s*javascript:/i.test(attr.value)) found.push(`${tag}[${attr.name}=javascript:]`)
      if (attr.name === 'srcdoc') found.push(`${tag}[srcdoc]`)
    }
  }
  return found
}

/**
 * normalize an HTML string through the DOM, to compare it with a rendered element
 * @param {string} html
 */
const normalizeHtml = (html) => {
  const template = document.createElement('template')
  template.innerHTML = html
  return template.innerHTML
}

/** @type {import('@vue/test-utils').VueWrapper[]} */
const wrappers = []

/**
 * @param {Record<string, any>} props
 */
const mountEditor = async (props) => {
  const wrapper = mount(MarkdownEditor, {
    props: { label: 'Description', ...props },
    global: { plugins: [vuetify] },
    attachTo: document.body
  })
  wrappers.push(wrapper)
  await nextTick()
  return wrapper
}

/**
 * wait for the lazy loaded EasyMDE instance to be rendered
 * @param {import('@vue/test-utils').VueWrapper} wrapper
 */
const waitForEasyMDE = async (wrapper) => {
  for (let i = 0; i < 100; i++) {
    if (wrapper.element.parentElement?.querySelector('.editor-toolbar')) return
    await new Promise(resolve => setTimeout(resolve, 20))
  }
  throw new Error('EasyMDE was not rendered')
}

/**
 * wait for the readOnly content, rendered once DOMPurify is lazy loaded
 * @param {import('@vue/test-utils').VueWrapper} wrapper
 */
const readOnlyContent = async (wrapper) => {
  for (let i = 0; i < 100; i++) {
    const content = /** @type {HTMLElement} */(wrapper.find('.vjsf-markdown-content > div').element)
    if (content.innerHTML) return content
    await new Promise(resolve => setTimeout(resolve, 20))
  }
  throw new Error('readOnly content was not rendered')
}

/**
 * @param {import('@vue/test-utils').VueWrapper} wrapper
 */
const openPreview = async (wrapper) => {
  await waitForEasyMDE(wrapper)
  const root = /** @type {HTMLElement} */(wrapper.element.parentElement)
  const button = /** @type {HTMLButtonElement} */(root.querySelector('.editor-toolbar button.preview'))
  button.click()
  await nextTick()
  return /** @type {HTMLElement} */(root.querySelector('.editor-preview'))
}

afterEach(() => {
  while (wrappers.length) wrappers.pop()?.unmount()
})

describe('markdown sanitization', () => {
  describe('readOnly rendering', () => {
    it('removes scripts, event handlers and javascript: urls', async () => {
      const wrapper = await mountEditor({ modelValue: maliciousMarkdown, readOnly: true })
      const content = await readOnlyContent(wrapper)
      expect(content.querySelector('h1')?.textContent).toBe('Title')
      expect(findDangerousNodes(content)).toEqual([])
    })

    it('keeps regular markdown unchanged', async () => {
      const wrapper = await mountEditor({ modelValue: benignMarkdown, readOnly: true })
      const content = await readOnlyContent(wrapper)
      expect(content.innerHTML).toBe(normalizeHtml(/** @type {string} */(marked.parse(benignMarkdown))))
    })

    it('updates the rendering when the data changes', async () => {
      const wrapper = await mountEditor({ modelValue: '# First', readOnly: true })
      await readOnlyContent(wrapper)
      await wrapper.setProps({ modelValue: '# Second <img src=x onerror="alert(1)">' })
      const content = /** @type {HTMLElement} */(wrapper.find('.vjsf-markdown-content > div').element)
      expect(content.querySelector('h1')?.textContent).toBe('Second ')
      expect(findDangerousNodes(content)).toEqual([])
    })

    it('renders the content from the first render once DOMPurify is loaded', async () => {
      await readOnlyContent(await mountEditor({ modelValue: '# First', readOnly: true }))
      const wrapper = mount(MarkdownEditor, { props: { label: 'Description', modelValue: '# Second', readOnly: true }, global: { plugins: [vuetify] } })
      wrappers.push(wrapper)
      expect(wrapper.find('.vjsf-markdown-content h1').text()).toBe('Second')
    })
  })

  describe('editor preview', () => {
    it('removes scripts, event handlers and javascript: urls', async () => {
      const wrapper = await mountEditor({ modelValue: maliciousMarkdown })
      const preview = await openPreview(wrapper)
      expect(preview.querySelector('h1')?.textContent).toBe('Title')
      expect(findDangerousNodes(preview)).toEqual([])
    })

    it('is still sanitized when the application passes its own renderingConfig', async () => {
      const wrapper = await mountEditor({ modelValue: maliciousMarkdown, easyMdeOptions: { renderingConfig: { singleLineBreaks: false } } })
      const preview = await openPreview(wrapper)
      expect(preview.querySelector('h1')?.textContent).toBe('Title')
      expect(findDangerousNodes(preview)).toEqual([])
    })

    it('lets the application provide its own sanitizer', async () => {
      const wrapper = await mountEditor({ modelValue: '# Title', easyMdeOptions: { renderingConfig: { sanitizerFunction: () => '<p>custom</p>' } } })
      const preview = await openPreview(wrapper)
      expect(preview.textContent).toBe('custom')
    })
  })
})
