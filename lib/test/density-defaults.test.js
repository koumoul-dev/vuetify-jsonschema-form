import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { VDefaultsProvider } from 'vuetify/components/VDefaultsProvider'
import { compile, StatefulLayout } from '@json-layout/core'
import Tree from '../src/components/tree.vue'
import { nodeComponents } from '../src/components/nodes/index.js'
import { defaultIcons } from '../src/options.js'

const vuetify = createVuetify()

async function mountForm (schema, initialData = {}) {
  const compiledLayout = compile(schema)
  const statefulLayout = new StatefulLayout(
    compiledLayout,
    compiledLayout.skeletonTrees[compiledLayout.mainTree],
    {
      debounceInputMs: 0,
      width: 1000,
      density: 'comfortable',
      nodeComponents,
      icons: defaultIcons,
      onData: () => {},
      onUpdate: () => {},
      onAutofocus: () => {}
    },
    initialData
  )
  const stateTree = shallowRef(statefulLayout.stateTree)
  const wrapper = mount(Tree, {
    props: { modelValue: stateTree.value, statefulLayout },
    global: { plugins: [vuetify] }
  })
  await nextTick()
  await nextTick()
  return wrapper
}

// count the defaults providers that actually provide something, a disabled provider
// does not chain a mergeDeep of the vuetify defaults
const activeProviders = (wrapper) => wrapper.findAllComponents(VDefaultsProvider).filter(c => !c.props().disabled)

describe('density defaults providers', () => {
  it('should only provide the density once when all nodes share the form density', async () => {
    const wrapper = await mountForm({
      type: 'object',
      properties: {
        str1: { type: 'string' },
        str2: { type: 'string' },
        obj1: {
          type: 'object',
          properties: { str3: { type: 'string' } }
        }
      }
    })
    expect(wrapper.findAll('.vjsf-node').length).toBeGreaterThan(3)
    expect(activeProviders(wrapper).length).toBe(1)
    // the form density is applied to the fields
    expect(wrapper.find('.vjsf-node-text-field .v-input--density-comfortable').exists()).toBe(true)
  })

  it('should provide the density again on nodes that override it', async () => {
    const wrapper = await mountForm({
      type: 'object',
      properties: {
        str1: { type: 'string' },
        obj1: {
          type: 'object',
          layout: { options: { density: 'compact' } },
          properties: { str2: { type: 'string' } }
        }
      }
    })
    expect(activeProviders(wrapper).length).toBe(2)
    // the override applies to the section content, the sibling keeps the form density
    expect(wrapper.find('.vjsf-node-section .v-input--density-compact').exists()).toBe(true)
    expect(wrapper.find('.v-input--density-comfortable').exists()).toBe(true)
  })
})
