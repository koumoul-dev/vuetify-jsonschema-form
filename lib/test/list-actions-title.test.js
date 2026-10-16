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

describe('list item headers', () => {
  // the header and the overlaid actions are decided for the whole list: an item whose title
  // evaluates to nothing keeps the same layout as its siblings instead of a narrower content
  it('gives every item a header as soon as the list has an item title', async () => {
    const wrapper = mount(Vjsf, {
      props: {
        schema: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' } } }, layout: { itemTitle: 'item.name', listEditMode: 'inline' } },
        modelValue: [{ name: 'a' }, {}]
      },
      global: { plugins: [vuetify] }
    })
    await flush()
    const items = wrapper.findAll('.vjsf-list-item')
    expect(items.length).toBe(2)
    for (const item of items) {
      expect(item.classes()).toContain('vjsf-list-item--overlaid-actions')
      expect(item.find('.vjsf-list-item__header').exists()).toBe(true)
    }
  })

  // indexed lists are activated by key in json-layout, activating by index left the fields read-only
  it('makes an indexed item editable from its menu', async () => {
    const wrapper = mount(Vjsf, {
      props: {
        schema: { type: 'object', properties: { idx: { type: 'object', title: 'Indexed', patternProperties: { '.*': { type: 'object', properties: { v: { type: 'string' } } } } } } },
        modelValue: { idx: { k1: { v: 'a' } } }
      },
      // happy-dom has no visualViewport for the menu overlay positioning, render its content in place
      global: { plugins: [vuetify], stubs: { VMenu: { inheritAttrs: false, template: '<div><slot /></div>' } } }
    })
    await flush()
    await wrapper.find('.vjsf-list-item').trigger('mouseenter')
    await flush()
    await wrapper.find('button[title="Actions"]').trigger('click')
    await flush()
    const edit = wrapper.findAll('.v-list-item').find(i => i.text() === 'Edit')
    expect(edit).toBeDefined()
    await edit?.trigger('click')
    await flush()
    expect(wrapper.find('.vjsf-list-item input').attributes('disabled')).toBeUndefined()
  })
})
