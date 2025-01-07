<script>
// cf https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VSelect/VSelect.tsx#L374

import { defineComponent, h, computed } from 'vue'
import { VIcon } from 'vuetify/components/VIcon'
import { VAvatar, VImg } from 'vuetify/components'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    avatarProps: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const isUrl = computed(() => props.icon.startsWith('http://') || props.icon.startsWith('https://'))
    const isSVG = computed(() => props.icon.startsWith('<?xml') || props.icon.startsWith('<svg'))
    return () => {
      if (isUrl.value) {
        return h(VAvatar, props.avatarProps, () => h(VImg, { src: props.icon }))
      } else if (isSVG.value) {
        return h('div', { innerHTML: props.icon.replace('<svg ', '<svg class="v-icon__svg" '), class: 'v-icon' })
      } else {
        return h(VIcon, null, () => props.icon)
      }
    }
  }
})
</script>
