<script>
// @ts-nocheck

import { isTextSlot, isMarkdownSlot, isNameSlot } from '@json-layout/vocabulary'
import { h } from 'vue'

export default {
  props: {
    layoutSlot: {
      /** @type import('vue').PropType<import('@json-layout/vocabulary').Slot> */
      type: Object,
      required: true
    },
    node: {
      /** @type import('vue').PropType<import('../../types.js').VjsfNode> */
      type: Object,
      required: true
    },
    statefulLayout: {
      /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
      type: Object,
      required: true
    },
    tag: {
      /** @type import('vue').PropType<string> */
      type: String,
      default: null
    }
  },
  render () {
    const renderTag = this.tag ?? (isTextSlot(this.layoutSlot) ? 'p' : 'div')

    if (isTextSlot(this.layoutSlot)) {
      return h(renderTag, this.layoutSlot.text)
    }
    if (isMarkdownSlot(this.layoutSlot)) {
      return h(renderTag, { innerHTML: this.layoutSlot.markdown })
    }
    if (isNameSlot(this.layoutSlot)) {
      if (!this.statefulLayout.options.vjsfSlots[this.layoutSlot.name]) {
        console.error(`vjsf: layout references a code slot "${this.layoutSlot.name}" that was not provided.`)
      } else {
        const slotContext = {
          node: this.node,
          statefulLayout: this.statefulLayout
        }
        if (this.layoutSlot.props) Object.assign(slotContext, this.layoutSlot.props)
        return h(renderTag, this.statefulLayout.options.vjsfSlots[this.layoutSlot.name](slotContext))
      }
    }
    return null
  }
}
</script>
