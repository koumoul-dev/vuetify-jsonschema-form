<script>
import { VAutocomplete } from 'vuetify/components/VAutocomplete'
import { useDefaults } from 'vuetify'
import { defineComponent, computed, h } from 'vue'
import { getSelectProps, getSelectSlots } from '../../utils/index.js'
import useGetItems from '../../composables/use-get-items.js'

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
    useDefaults({}, 'VjsfAutocomplete')

    const getItems = useGetItems(props)

    const fieldProps = computed(() => {
      const fieldProps = getSelectProps(props.modelValue, props.statefulLayout)
      fieldProps.noFilter = true
      fieldProps['onUpdate:search'] = (/** @type string */searchValue) => {
        getItems.search.value = searchValue
      }
      fieldProps.items = getItems.items.value
      fieldProps.loading = getItems.loading.value
      return fieldProps
    })

    // @ts-ignore
    return () => h(VAutocomplete, fieldProps.value, getSelectSlots(props.modelValue, props.statefulLayout, getItems))
  }
})

</script>
