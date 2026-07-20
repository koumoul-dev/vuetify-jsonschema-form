import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'

// happy-dom has no real layout, so useElementSize() reports a 0 width forever and
// vjsf never initializes its StatefulLayout (see use-vjsf.js initStatefulLayout).
// Emulate a real browser by reporting 0 on the first render then a real width on the
// next tick, which is what triggers the StatefulLayout init.
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
const { default: Vjsf } = await import('../src/components/vjsf.vue')
const { default: equal } = await import('fast-deep-equal')

const vuetify = createVuetify()

const flush = async () => {
  for (let i = 0; i < 8; i++) await nextTick()
  await Promise.resolve()
}

const schema = { type: 'object', properties: { str1: { type: 'string' }, str2: { type: 'string' } } }

describe('options object identity', () => {
  it('should not rebuild the state tree when a new but equivalent options object is passed', async () => {
    const options = { density: 'comfortable', context: { some: 'data' } }
    const wrapper = mount(Vjsf, {
      props: { schema, modelValue: { str1: 'a' }, options },
      global: { plugins: [vuetify] }
    })
    await flush()

    const updates = wrapper.emitted('update:state')
    expect(updates?.length).toBeGreaterThan(0)
    const statefulLayout = updates[updates.length - 1][0]
    const stateTree = statefulLayout.stateTree

    // a parent re-render typically produces a new options object with the same content
    await wrapper.setProps({ options: { density: 'comfortable', context: { some: 'data' } } })
    await flush()
    expect(statefulLayout.stateTree).toBe(stateTree)

    // a real change must still be applied
    await wrapper.setProps({ options: { density: 'compact', context: { some: 'data' } } })
    await flush()
    expect(statefulLayout.stateTree).not.toBe(stateTree)
    expect(statefulLayout.stateTree.root.options.density).toBe('compact')
  })

  // the options comparison relies on fast-deep-equal comparing functions by reference
  // (same reference equal, different references not equal) and plain data deeply
  it('should compare functions by reference and plain data deeply', () => {
    const fn = () => {}
    expect(equal({ a: 1, b: { c: [1, 2] }, fn }, { a: 1, b: { c: [1, 2] }, fn })).toBe(true)
    expect(equal({ fn }, { fn: () => {} })).toBe(false)
  })
})
