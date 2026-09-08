import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
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
  wrapper.updateData = async (data) => {
    statefulLayout.data = data
    stateTree.value = statefulLayout.stateTree
    await wrapper.setProps({ modelValue: stateTree.value })
    await nextTick()
    await nextTick()
  }
  return wrapper
}

// a section hidden by a layout "if" expression is kept in the state tree as a "none"
// node, the containers that render one header per child have to skip it
const schema = (comp) => ({
  type: 'object',
  layout: comp,
  allOf: [
    {
      title: 'Section 1',
      properties: { str1: { type: 'string' } }
    },
    {
      title: 'Section 2',
      layout: { if: 'rootData.showSection2' },
      properties: { str2: { type: 'string' } }
    },
    {
      title: 'Section 3',
      properties: { str3: { type: 'string' } }
    }
  ],
  properties: {
    showSection2: { type: 'boolean', layout: 'none' }
  }
})

describe('containers with a header per child', () => {
  it('should not render a tab for a section hidden by a "if" expression', async () => {
    const shown = await mountForm(schema('tabs'), { showSection2: true })
    expect(shown.findAll('.v-tab').map(t => t.text())).toEqual(['Section 1', 'Section 2', 'Section 3'])

    const hidden = await mountForm(schema('tabs'), { showSection2: false })
    expect(hidden.findAll('.v-tab').map(t => t.text())).toEqual(['Section 1', 'Section 3'])
  })

  it('should select another tab when the active one becomes hidden', async () => {
    const wrapper = await mountForm(schema('tabs'), { showSection2: true })
    await wrapper.findAll('.v-tab')[1].trigger('click')
    expect(wrapper.find('.v-tab--selected').text()).toBe('Section 2')

    await wrapper.updateData({ showSection2: false })
    expect(wrapper.findAll('.v-tab').map(t => t.text())).toEqual(['Section 1', 'Section 3'])
    expect(wrapper.find('.v-tab--selected').text()).toBe('Section 1')
  })

  it('should not render a vertical tab for a section hidden by a "if" expression', async () => {
    const hidden = await mountForm(schema('vertical-tabs'), { showSection2: false })
    expect(hidden.findAll('.v-tab').map(t => t.text())).toEqual(['Section 1', 'Section 3'])
  })

  it('should not render an expansion panel for a section hidden by a "if" expression', async () => {
    const hidden = await mountForm(schema('expansion-panels'), { showSection2: false })
    expect(hidden.findAll('.v-expansion-panel-title').map(t => t.text())).toEqual(['Section 1', 'Section 3'])
  })
})
