<script>
import { VSelect } from 'vuetify/components/VSelect'
import { defineComponent, h, computed, toRef } from 'vue'
import useSelectNode from '../../composables/use-select-node.js'

import { useDefaults } from 'vuetify'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfSelectNode> */
      type: Object,
      required: true
    },
    statefulLayout: {
      /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
      type: Object,
      required: true
    }
  },
  setup (props) {
    useDefaults({}, 'VjsfSelect')

    const { getItems, selectProps, selectSlots } = useSelectNode(toRef(props, 'modelValue'), props.statefulLayout)

    const fieldProps = computed(() => {
      const fieldProps = { ...selectProps.value }
      fieldProps.loading = getItems.loading.value
      fieldProps.items = getItems.items.value
      return fieldProps
    })

    // @ts-ignore
    return () => h(VSelect, fieldProps.value, selectSlots.value)
  }
})

</script>
