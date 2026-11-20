import { it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { MarkdownEditor } from '../src/index.js'

const vuetify = createVuetify()

afterEach(() => { vi.restoreAllMocks() })

/**
 * @param {import('@vue/test-utils').VueWrapper} wrapper
 */
const waitForEasyMDE = async (wrapper) => {
  for (let i = 0; i < 100; i++) {
    if (wrapper.element.parentElement?.querySelector('.editor-toolbar')) return
    await new Promise(resolve => setTimeout(resolve, 20))
  }
  throw new Error('EasyMDE was not rendered')
}

// EasyMDE puts a keydown listener on document, its closure keeps the whole editor in memory
it('removes the document listeners of EasyMDE when unmounted or re-initialized', async () => {
  const added = vi.spyOn(document, 'addEventListener')
  const removed = vi.spyOn(document, 'removeEventListener')
  const keydownCalls = (/** @type {import('vitest').MockInstance} */spy) => spy.mock.calls.filter(c => c[0] === 'keydown').map(c => c[1])

  const wrapper = mount(MarkdownEditor, { props: { label: 'Description', modelValue: '# Title' }, global: { plugins: [vuetify] }, attachTo: document.body })
  await waitForEasyMDE(wrapper)
  // a config change re-initializes the editor
  await wrapper.setProps({ locale: 'fr' })
  for (let i = 0; i < 100 && keydownCalls(added).length < 2; i++) await new Promise(resolve => setTimeout(resolve, 20))
  wrapper.unmount()

  expect(keydownCalls(added).length).toBe(2)
  expect(keydownCalls(removed)).toEqual(keydownCalls(added))
})

it('uses the icons given in the options instead of the default ones', async () => {
  const wrapper = mount(MarkdownEditor, { props: { label: 'Description', icons: { formatBold: 'M0,0H1Z' } }, global: { plugins: [vuetify] }, attachTo: document.body })
  await waitForEasyMDE(wrapper)
  const toolbar = /** @type {Element} */(wrapper.element.parentElement?.querySelector('.editor-toolbar'))
  expect(toolbar.querySelector('button.bold path')?.getAttribute('d')).toBe('M0,0H1Z')
  expect(toolbar.querySelector('button.italic path')?.getAttribute('d')).toBe('M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z')
  wrapper.unmount()
})
