import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { compile, StatefulLayout } from '@json-layout/core'
import Tree from '../src/components/tree.vue'
import { nodeComponents } from '../src/components/nodes/index.js'
import { defaultIcons } from '../src/options.js'

const vuetify = createVuetify()

/**
 * Mount a tree component with a statefulLayout and return helpers
 */
async function mountForm (schema, initialData = {}) {
  const compiledLayout = compile(schema)
  const renderCounts = new Map()

  const statefulLayout = new StatefulLayout(
    compiledLayout,
    compiledLayout.skeletonTrees[compiledLayout.mainTree],
    {
      debounceInputMs: 0,
      width: 1000,
      nodeComponents,
      icons: defaultIcons,
      onData: () => {},
      onUpdate: () => {},
      onAutofocus: () => {}
    },
    initialData
  )

  // Attach render counter so node.vue can find it
  statefulLayout._renderCounts = renderCounts

  const stateTree = shallowRef(statefulLayout.stateTree)

  const wrapper = mount(Tree, {
    props: {
      modelValue: stateTree.value,
      statefulLayout
    },
    global: {
      plugins: [vuetify]
    }
  })

  // Wait for initial render to complete
  await nextTick()
  await nextTick()

  return {
    statefulLayout,
    stateTree,
    renderCounts,
    wrapper,
    async updateInput (node, value) {
      statefulLayout.input(node, value)
      stateTree.value = statefulLayout.stateTree
      await wrapper.setProps({ modelValue: stateTree.value })
      await nextTick()
      await nextTick()
    }
  }
}

describe('render performance - Vue re-render counting', () => {
  it('should document re-render counts when a single field changes (flat schema)', async () => {
    // Flat schema: all fields are direct children of root section
    // json-layout preserves references for unchanged siblings in this case
    const schema = {
      type: 'object',
      properties: {
        str1: { type: 'string' },
        str2: { type: 'string' },
        str3: { type: 'string' },
        str4: { type: 'string' },
        str5: { type: 'string' },
        str6: { type: 'string' }
      }
    }

    const initialData = { str1: 'v1', str2: 'v2', str3: 'v3', str4: 'v4', str5: 'v5', str6: 'v6' }

    const { statefulLayout, renderCounts, updateInput } = await mountForm(schema, initialData)

    // Record which nodes exist after mount
    const allKeys = [...renderCounts.keys()]
    console.log('Nodes after mount:', allKeys)
    expect(allKeys.length).toBeGreaterThanOrEqual(7) // root section + 6 fields

    // Reset counters after initial render
    for (const key of renderCounts.keys()) {
      renderCounts.set(key, 0)
    }

    // First input to settle validation state
    const root = statefulLayout.stateTree.root
    await updateInput(root.children[0], 'first_change')

    // Reset again after validation settles
    for (const key of renderCounts.keys()) {
      renderCounts.set(key, 0)
    }

    // Second input: now only the changed field's reference should differ
    const root2 = statefulLayout.stateTree.root
    await updateInput(root2.children[0], 'second_change')

    // Verify json-layout structural sharing works for flat schema
    const root3 = statefulLayout.stateTree.root
    expect(root2.children[1]).toBe(root3.children[1]) // str2 same reference
    expect(root2.children[0]).not.toBe(root3.children[0]) // str1 new reference

    // Document the render counts
    const counts = Object.fromEntries(renderCounts)
    console.log('Re-render counts after changing str1 (validation settled):')
    console.log(JSON.stringify(counts, null, 2))

    const reRenderedNodes = [...renderCounts.entries()].filter(([, count]) => count > 0)
    const unchangedNodes = [...renderCounts.entries()].filter(([, count]) => count === 0)

    console.log(`\nTotal nodes: ${renderCounts.size}`)
    console.log(`Re-rendered: ${reRenderedNodes.length} nodes: ${reRenderedNodes.map(([k]) => k).join(', ')}`)
    console.log(`Unchanged: ${unchangedNodes.length} nodes: ${unchangedNodes.map(([k]) => k).join(', ')}`)

    // Assert that the test infrastructure works
    expect(renderCounts.get(root2.children[0].fullKey)).toBeGreaterThanOrEqual(0)

    // BASELINE DOCUMENTATION:
    // - IDEAL: only str1 + root section re-render (2 nodes)
    // - CURRENT: depends on how Vue propagates prop changes through node.vue
    //
    // Root cause of excess re-renders: node.vue receives the full node object
    // as `modelValue` prop. Even when json-layout preserves child references,
    // the root section's reference always changes, so section.vue's template
    // re-evaluates. Whether child node.vue instances also re-render depends on
    // whether Vue detects that the individual child prop reference hasn't changed.
    //
    // The container component computed decomposition (section.vue, card.vue, etc.)
    // helps by wrapping `children` in a computed, so that unchanged children arrays
    // don't trigger v-for re-evaluation.
    //
    // FUTURE FIX OPTIONS:
    // - Key-based node lookup (nodes access state by key, not by parent reference)
    // - provide/inject for state distribution
    // - Shallow comparison in node.vue to skip re-render when content hasn't changed
  })

  it('should document re-render counts with sectioned schema', async () => {
    // With sections, json-layout does NOT preserve references for section children
    // because sections hold the parent data reference which always changes.
    // This means ALL nodes re-render on every change.
    const schema = {
      type: 'object',
      layout: [
        { title: 'Section A', children: ['a1', 'a2'] },
        { title: 'Section B', children: ['b1', 'b2'] }
      ],
      properties: {
        a1: { type: 'string' },
        a2: { type: 'string' },
        b1: { type: 'string' },
        b2: { type: 'string' }
      }
    }

    const { statefulLayout, renderCounts, updateInput } = await mountForm(
      schema, { a1: 'x', a2: 'y', b1: 'z', b2: 'w' }
    )

    // Settle validation
    const root = statefulLayout.stateTree.root
    await updateInput(root.children[0].children[0], 'first')

    // Reset counters
    for (const key of renderCounts.keys()) {
      renderCounts.set(key, 0)
    }

    // Change a1
    const root2 = statefulLayout.stateTree.root
    await updateInput(root2.children[0].children[0], 'second')

    const counts = Object.fromEntries(renderCounts)
    console.log('Sectioned schema re-render counts:')
    console.log(JSON.stringify(counts, null, 2))

    const reRendered = [...renderCounts.entries()].filter(([, count]) => count > 0)
    console.log(`Re-rendered: ${reRendered.length}/${renderCounts.size} nodes`)

    // With the computed decomposition fixes in container components,
    // the template work inside each container is reduced even though
    // all node.vue instances still re-render.
  })
})
