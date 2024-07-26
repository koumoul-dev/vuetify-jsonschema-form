<script>
import { VSelect } from 'vuetify/components/VSelect'
import { defineComponent, h, computed } from 'vue'
import { getSelectProps, getSelectSlots } from '../../utils/index.js'
import useGetItems from '../../composables/use-get-items.js'

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

    const getItems = useGetItems(props)

    const fieldProps = computed(() => {
      const fieldProps = getSelectProps(props.modelValue, props.statefulLayout)
      fieldProps.loading = getItems.loading.value
      fieldProps.items = getItems.items.value
      return fieldProps
    })

    // @ts-ignore
    return () => h(VSelect, fieldProps.value, getSelectSlots(props.modelValue, props.statefulLayout, getItems))
  }
})

</script>
