import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { markRaw, nextTick } from 'vue'
import { createVuetify } from 'vuetify'

// @ts-ignore
import { compile, StatefulLayout } from '@json-layout/core'

import Tree from '../src/components/tree.vue'
import DateTimePicker from '../src/components/nodes/date-time-picker.vue'
import { nodeComponents } from '../src/components/nodes'
import { defaultIcons } from '../src'

const vuetify = createVuetify()
const paris = 'Europe/Paris'

async function mountDateTimeForm(initialData?: any) {
    const schema = {
        type: 'object',
        properties: {
            dt: { type: 'string', format: 'date-time', title: 'Date Time' }
        }
    }

    const compiledLayout = compile(schema)
    const options = {
        nodeComponents: markRaw({ ...nodeComponents }),
        icons: defaultIcons,
    };

    const layout = new StatefulLayout(
        compiledLayout,
        compiledLayout.skeletonTrees[compiledLayout.mainTree],
        options,
        initialData
    )

    const wrapper = mount(Tree, {
        props: { modelValue: layout.stateTree, statefulLayout: layout },
        global: { plugins: [vuetify] }
    })

    return { wrapper, layout }
}

function getUpdateHandler(component: any, prop: 'datePickerProps' | 'timePickerProps') {
    // @ts-ignore
    return component.vm.$.setupState[prop]['onUpdate:modelValue']
}

describe('date-time-picker component', () => {

    it('preserves time when date changes across DST boundary', async () => {
        if (process.env.TZ !== paris) return

        const { wrapper, layout } = await mountDateTimeForm({
            dt: '2020-03-01T14:30:00+01:00'
        })

        const picker = wrapper.findComponent(DateTimePicker)
        expect(picker.exists()).toBe(true)

        const updateDate = getUpdateHandler(picker, 'datePickerProps')
        updateDate(new Date(2020, 4, 1)) // May 1st

        const value = layout.stateTree.root.children[0].data
        expect(value).toBe('2020-05-01T14:30:00+02:00')
    })

    it('preserves date when updating time part', async () => {
        if (process.env.TZ !== paris) return

        const { wrapper, layout } = await mountDateTimeForm({
            dt: '2020-06-15T14:30:00+02:00'
        })

        const picker = wrapper.findComponent(DateTimePicker)
        const updateTime = getUpdateHandler(picker, 'timePickerProps')

        updateTime('16:45')

        expect(layout.stateTree.root.children[0].data).toContain('2020-06-15T16:45:00+02:00')
    })
})
