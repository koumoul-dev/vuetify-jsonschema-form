import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'

// happy-dom has no real layout: report a real width on the next tick so vjsf
// initializes its StatefulLayout (same emulation as webmcp.test.js).
vi.mock('@vueuse/core', async (importOriginal) => {
  /** @type any */
  const actual = await importOriginal()
  const { ref: vref, nextTick: vnextTick } = await import('vue')
  return {
    ...actual,
    useElementSize: () => {
      const width = vref(0)
      vnextTick(() => { width.value = 1000 })
      return { width, height: vref(0) }
    }
  }
})

const { mount } = await import('@vue/test-utils')
const { createVuetify } = await import('vuetify')
const { default: Vjsf } = await import('../src/index.js')

const vuetify = createVuetify()

const flush = async () => {
  for (let i = 0; i < 8; i++) await nextTick()
  await Promise.resolve()
}

// The button that opens a list row's actions (edit, duplicate, delete…) was an icon with no
// name: a judged simulation's person, the assistant guiding them, and a screen reader could
// not point to it.
describe('list item actions', () => {
  it('names the button that opens the actions of a row', async () => {
    const wrapper = mount(Vjsf, {
      props: {
        schema: { type: 'array', items: { type: 'object', properties: { title: { type: 'string' } } }, layout: { listEditMode: 'inline-single' } },
        modelValue: [{ title: 'a' }],
        options: { locale: 'fr' }
      },
      global: { plugins: [vuetify] }
    })
    await flush()
    // the actions button shows on the hovered row, as for a person
    await wrapper.find('.v-list-item').trigger('mouseenter')
    await flush()
    const buttons = wrapper.findAll('button')
    const named = buttons.filter(b => b.attributes('title') === 'Actions')
    expect(named.length, wrapper.html().slice(0, 2000)).toBe(1)
  })
})
