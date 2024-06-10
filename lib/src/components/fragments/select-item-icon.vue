<script>
// cf https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VSelect/VSelect.tsx#L374

import { defineComponent, h, computed } from 'vue'
import { VIcon } from 'vuetify/components'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const isUrl = computed(() => props.icon.startsWith('http://') || props.icon.startsWith('https://'))
    const isSVG = computed(() => props.icon.startsWith('<?xml') || props.icon.startsWith('<svg'))
    return () => {
      if (isUrl.value) {
        return h('img', { src: props.icon, style: 'height:100%;width:100%;' })
      } else if (isSVG.value) {
        return h('div', { innerHTML: props.icon.replace('<svg ', '<svg class="v-icon__svg" '), class: 'v-icon' })
      } else {
        return h(VIcon, null, () => props.icon)
      }
    }
  }
})
</script>
