import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'

// happy-dom has no real layout, so the root element reports a 0 width forever and
// vjsf never initializes its StatefulLayout (see use-vjsf.js initStatefulLayout).
// Emulate a real browser by reporting 0 on the first render then a real width on the
// next tick, which is what triggers the StatefulLayout init.
vi.mock('@vueuse/core', async (importOriginal) => {
  /** @type any */
  const actual = await importOriginal()
  const { nextTick: vnextTick } = await import('vue')
  return {
    ...actual,
    useResizeObserver: (/** @type any */_target, /** @type any */callback) => {
      vnextTick(() => callback([{ contentRect: { width: 1000 } }]))
    }
  }
})
// resizes are applied in the next frame, run them synchronously
vi.stubGlobal('requestAnimationFrame', (/** @type any */cb) => cb())

const { mount } = await import('@vue/test-utils')
const { createVuetify } = await import('vuetify')
const { default: Vjsf } = await import('../src/components/vjsf.vue')

const vuetify = createVuetify()

const flush = async () => {
  for (let i = 0; i < 8; i++) await nextTick()
  await Promise.resolve()
}

// the values of the selected concept, read from one same URL (cf catalog-melodi)
const schema = {
  type: 'object',
  properties: {
    selectedConcept: { type: 'string' },
    selectedValue: {
      type: 'string',
      layout: {
        comp: 'autocomplete',
        getItems: {
          url: 'http://test.com/range',
          itemsResults: '(data.range.find(c => c.code === parent.data.selectedConcept)?.values || [])',
          itemTitle: 'item.label',
          itemValue: 'item.code'
        }
      }
    }
  }
}
const range = { range: [{ code: 'A', values: [{ code: 'a1', label: 'A 1' }] }, { code: 'B', values: [{ code: 'b1', label: 'B 1' }] }] }

describe('items reshaped from other data', () => {
  it('should follow the other data without a new request', async () => {
    let fetches = 0
    const wrapper = mount(Vjsf, {
      props: { schema, modelValue: { selectedConcept: 'A' }, options: { fetch: async () => { fetches++; return range } } },
      global: { plugins: [vuetify] }
    })
    await flush()
    const autocomplete = wrapper.findComponent({ name: 'VAutocomplete' })
    expect(autocomplete.props('items').map((/** @type any */i) => i.value)).toEqual(['a1'])

    await wrapper.setProps({ modelValue: { selectedConcept: 'B' } })
    await flush()
    expect(autocomplete.props('items').map((/** @type any */i) => i.value)).toEqual(['b1'])
    expect(fetches).toBe(1)
  })
})
