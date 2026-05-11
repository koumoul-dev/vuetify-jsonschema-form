import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'

// happy-dom has no real layout, so useElementSize() reports a 0 width forever and
// vjsf never initializes its StatefulLayout (see use-vjsf.js initStatefulLayout).
// Emulate a real browser by reporting 0 on the first render then a real width on the
// next tick, which is what triggers the StatefulLayout init and the webmcp watcher.
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
const { default: Vjsf } = await import('../src/webmcp.js')

const vuetify = createVuetify()

/**
 * Minimal navigator.modelContext stub mimicking @mcp-b/webmcp-polyfill semantics:
 * registering an already-registered tool name throws "Tool already registered: <name>".
 */
function installModelContextStub () {
  const tools = new Map()
  const ctx = {
    /** @param {{ name: string }} tool */
    registerTool (tool) {
      if (tools.has(tool.name)) throw new Error(`Tool already registered: ${tool.name}`)
      tools.set(tool.name, tool)
      return { update () {}, unregister () { tools.delete(tool.name) } }
    },
    /** @param {string} name */
    unregisterTool (name) { tools.delete(name) },
    provideContext () {},
    _tools: tools
  }
  // @ts-ignore - augment the happy-dom navigator
  globalThis.navigator.modelContext = ctx
  return ctx
}

const flush = async () => {
  for (let i = 0; i < 8; i++) await nextTick()
  await Promise.resolve()
}

const schema = { type: 'object', properties: { name: { type: 'string' }, age: { type: 'integer' } } }

const mountForm = () => mount(Vjsf, {
  props: { schema, modelValue: {}, prefixName: 'editLine_' },
  global: { plugins: [vuetify] }
})

describe('vjsf webmcp tool lifecycle', () => {
  /** @type {ReturnType<typeof installModelContextStub>} */
  let ctx
  beforeEach(() => { ctx = installModelContextStub() })
  afterEach(() => { delete (/** @type any */(globalThis.navigator)).modelContext })

  it('registers tools on mount and unregisters them on unmount', async () => {
    const wrapper = mountForm()
    await flush()
    expect([...ctx._tools.keys()]).toContain('editLine_getData')

    wrapper.unmount()
    await flush()
    expect([...ctx._tools.keys()]).toEqual([])
  })

  it('does not throw "Tool already registered" when remounting (editing successive lines)', async () => {
    const w1 = mountForm()
    await flush()
    w1.unmount()
    await flush()

    const w2 = mountForm()
    await flush()
    expect([...ctx._tools.keys()]).toContain('editLine_getData')
    w2.unmount()
    await flush()
  })
})
