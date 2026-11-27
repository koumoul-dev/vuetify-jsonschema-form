import { it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createVuetify } from 'vuetify'
import { MarkdownEditor } from '../src/index.js'

const vuetify = createVuetify()

afterEach(() => { vi.restoreAllMocks(); document.body.innerHTML = '' })

const sleep = (/** @type {number} */ms) => new Promise(resolve => setTimeout(resolve, ms))

const mountEditor = (/** @type {Record<string, any>} */props, /** @type {any[]} */errors) => mount(MarkdownEditor, {
  props: { label: 'Description', modelValue: '# Title', ...props },
  global: { plugins: [vuetify], config: { errorHandler: (err) => { errors.push(err) } } },
  attachTo: document.body
})

const waitFor = async (/** @type {() => boolean} */cond) => {
  for (let i = 0; i < 100; i++) {
    if (cond()) return
    await sleep(20)
  }
  throw new Error('condition not met')
}
const toolbarCount = () => document.querySelectorAll('.editor-toolbar').length

it('does not fail when unmounted while EasyMDE is loading', async () => {
  const errors = /** @type {any[]} */([])
  const consoleError = vi.spyOn(console, 'error')
  const wrapper = mountEditor({}, errors)
  wrapper.unmount()
  await sleep(300)
  expect(errors).toEqual([])
  expect(consoleError).not.toHaveBeenCalled()
})

it('does not fail when switched to readOnly while EasyMDE is loading', async () => {
  const errors = /** @type {any[]} */([])
  const consoleError = vi.spyOn(console, 'error')
  const wrapper = mountEditor({}, errors)
  await wrapper.setProps({ readOnly: true })
  await sleep(300)
  expect(errors).toEqual([])
  expect(consoleError).not.toHaveBeenCalled()
  expect(toolbarCount()).toBe(0)
  wrapper.unmount()
})

it('renders the editor when switched from readOnly to editable', async () => {
  const errors = /** @type {any[]} */([])
  const wrapper = mountEditor({ readOnly: true }, errors)
  await nextTick()
  await wrapper.setProps({ readOnly: false })
  await waitFor(() => toolbarCount() === 1)
  expect(errors).toEqual([])
  wrapper.unmount()
})

it('removes the editor and stops emitting when switched to readOnly', async () => {
  const errors = /** @type {any[]} */([])
  const wrapper = mountEditor({}, errors)
  await waitFor(() => toolbarCount() === 1)
  await wrapper.setProps({ readOnly: true })
  await sleep(50)
  expect(errors).toEqual([])
  expect(document.querySelectorAll('.EasyMDEContainer').length).toBe(0)
  expect(document.querySelector('.vjsf-markdown-content h1')?.textContent).toBe('Title')
  wrapper.unmount()
})

it('keeps a single editor when re-initialized while EasyMDE is loading', async () => {
  const errors = /** @type {any[]} */([])
  const wrapper = mountEditor({}, errors)
  await wrapper.setProps({ locale: 'fr' })
  await waitFor(() => toolbarCount() >= 1)
  await sleep(100)
  expect(errors).toEqual([])
  expect(toolbarCount()).toBe(1)
  expect(document.querySelector('.editor-toolbar button.preview')?.getAttribute('title')).toContain('Aperçu')
  wrapper.unmount()
})
