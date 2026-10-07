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

const schema = {
  type: 'object',
  layout: { comp: 'tabs', children: [{ title: 'Général', children: ['title'] }, { title: 'Apparence', children: ['color'] }] },
  properties: { title: { type: 'string' }, color: { type: 'string' } }
}

const mountForm = async () => {
  /** @type {any} */
  let statefulLayout
  const wrapper = mount(Vjsf, {
    props: {
      schema,
      modelValue: { title: 'a', color: 'b' },
      options: { locale: 'fr' },
      'onUpdate:state': (/** @type {any} */state) => { statefulLayout = state }
    },
    global: { plugins: [vuetify] }
  })
  await flush()
  return { wrapper, layout: () => statefulLayout }
}

const selectedTab = (/** @type {any} */wrapper) => wrapper.find('.v-tab--selected').text()

// The open tab lived in the component only: the assistant's form tools could neither say which
// tab the person saw nor show them the field they had just changed.
describe('open sections', () => {
  it('opens the tab the stateful layout opens', async () => {
    const { wrapper, layout } = await mountForm()
    expect(selectedTab(wrapper)).toBe('Général')
    const root = layout().stateTree.root
    layout().activateSection(root, 1)
    await flush()
    expect(selectedTab(wrapper)).toBe('Apparence')
  })

  it('tells the stateful layout which tab the person opens', async () => {
    const { wrapper, layout } = await mountForm()
    await wrapper.findAll('.v-tab')[1].trigger('click')
    await flush()
    expect(layout().activeSectionIndex(layout().stateTree.root)).toBe(1)
  })
})
