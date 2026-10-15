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
const schema = (layout) => ({
  type: 'object',
  layout,
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

const titles = (wrapper, selector) => wrapper.findAll(selector).map(item => item.text())
const stepperBtn = (wrapper, label) => wrapper.findAll('.v-stepper-actions .v-btn').find(btn => btn.text() === label)

describe('containers with a header per child', () => {
  it('should not render a tab for a section hidden by a "if" expression', async () => {
    const shown = await mountForm(schema('tabs'), { showSection2: true })
    expect(titles(shown, '.v-tab')).toEqual(['Section 1', 'Section 2', 'Section 3'])

    const hidden = await mountForm(schema('tabs'), { showSection2: false })
    expect(titles(hidden, '.v-tab')).toEqual(['Section 1', 'Section 3'])
  })

  it('should select another tab when the active one becomes hidden', async () => {
    const wrapper = await mountForm(schema('tabs'), { showSection2: true })
    await wrapper.findAll('.v-tab')[1].trigger('click')
    expect(wrapper.find('.v-tab--selected').text()).toBe('Section 2')

    await wrapper.updateData({ showSection2: false })
    expect(titles(wrapper, '.v-tab')).toEqual(['Section 1', 'Section 3'])
    expect(wrapper.find('.v-tab--selected').text()).toBe('Section 1')
  })

  it('should not render a vertical tab for a section hidden by a "if" expression', async () => {
    const hidden = await mountForm(schema('vertical-tabs'), { showSection2: false })
    expect(titles(hidden, '.v-tab')).toEqual(['Section 1', 'Section 3'])
  })

  it('should not render an expansion panel for a section hidden by a "if" expression', async () => {
    const hidden = await mountForm(schema('expansion-panels'), { showSection2: false })
    expect(titles(hidden, '.v-expansion-panel-title')).toEqual(['Section 1', 'Section 3'])
  })

  it('should not render a step for a section hidden by a "if" expression', async () => {
    const hidden = await mountForm(schema('stepper'), { showSection2: false })
    expect(titles(hidden, '.v-stepper-item')).toEqual(['Section 1', 'Section 3'])
  })
})

// the value of a tab/panel/step is the index of the child in the full children array, hidden
// children keep their slot in the state tree so these indexes are stable and a schema can use
// them to preselect a section
describe('containers preselecting a child through layout.props', () => {
  it('should open the tab designated by layout.props.modelValue', async () => {
    const wrapper = await mountForm(schema({ comp: 'tabs', props: { modelValue: 1 } }), { showSection2: true })
    expect(wrapper.find('.v-tab--selected').text()).toBe('Section 2')
    // the tab bar and the window agree, and the selection is still interactive
    expect(wrapper.find('.v-window-item--active').text()).toContain('str2')
    await wrapper.findAll('.v-tab')[2].trigger('click')
    expect(wrapper.find('.v-tab--selected').text()).toBe('Section 3')
  })

  it('should ignore a layout.props.modelValue designating a hidden section', async () => {
    const wrapper = await mountForm(schema({ comp: 'tabs', props: { modelValue: 1 } }), { showSection2: false })
    expect(wrapper.find('.v-tab--selected').text()).toBe('Section 1')
  })

  it('should open the expansion panel designated by layout.props.modelValue', async () => {
    const wrapper = await mountForm(schema({ comp: 'expansion-panels', props: { modelValue: 1 } }), { showSection2: true })
    expect(titles(wrapper, '.v-expansion-panel--active')).toEqual(['Section 2str2str2'])
    // the panels stay interactive, the preselection is only an initial value
    await wrapper.findAll('.v-expansion-panel-title')[2].trigger('click')
    expect(titles(wrapper, '.v-expansion-panel--active')).toEqual(['Section 3str3str3'])
  })
})

describe('expansion panels with a hidden open panel', () => {
  it('should open another panel when "mandatory" is set', async () => {
    const layout = { comp: 'expansion-panels', props: { mandatory: true, modelValue: 1 } }
    const wrapper = await mountForm(schema(layout), { showSection2: true })
    expect(titles(wrapper, '.v-expansion-panel--active')).toEqual(['Section 2str2str2'])

    await wrapper.updateData({ showSection2: false })
    expect(titles(wrapper, '.v-expansion-panel--active')).toEqual(['Section 1str1str1'])
  })

  it('should simply close it when "mandatory" is not set', async () => {
    const wrapper = await mountForm(schema({ comp: 'expansion-panels', props: { modelValue: 1 } }), { showSection2: true })
    await wrapper.updateData({ showSection2: false })
    expect(titles(wrapper, '.v-expansion-panel--active')).toEqual([])
  })
})

describe('stepper navigation around hidden steps', () => {
  it('should skip a hidden step when going forward', async () => {
    const wrapper = await mountForm(schema('stepper'), { showSection2: false })
    expect(wrapper.find('.v-stepper-item--selected').text()).toBe('Section 1')

    await stepperBtn(wrapper, 'Next').trigger('click')
    expect(wrapper.find('.v-stepper-item--selected').text()).toBe('Section 3')
    // Section 3 is the last visible step, there is nothing left to go to
    expect(stepperBtn(wrapper, 'Next')).toBeUndefined()
  })

  it('should skip a hidden step when going backward', async () => {
    const wrapper = await mountForm(schema('stepper'), { showSection2: false })
    await stepperBtn(wrapper, 'Next').trigger('click')
    expect(wrapper.find('.v-stepper-item--selected').text()).toBe('Section 3')

    await stepperBtn(wrapper, 'Back').trigger('click')
    expect(wrapper.find('.v-stepper-item--selected').text()).toBe('Section 1')
  })
})
