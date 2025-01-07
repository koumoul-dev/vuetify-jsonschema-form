<script>
import { VAutocomplete } from 'vuetify/components/VAutocomplete'
import { useDefaults } from 'vuetify'
import { defineComponent, computed, h, toRef } from 'vue'
import useSelectNode from '../../composables/use-select-node.js'
import useCompDefaults from '../../composables/use-comp-defaults.js'

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
    const avatarProps = useCompDefaults('VjsfSelectItem-VAvatar', { rounded: false, size: 'small' })

    const { getItems, selectProps, selectSlots, localData } = useSelectNode(toRef(props, 'modelValue'), props.statefulLayout, avatarProps.value)

    const fieldProps = computed(() => {
      const fieldProps = { ...selectProps.value }
      fieldProps.noFilter = true
      fieldProps['onUpdate:search'] = (/** @type string */searchValue) => {
        getItems.search.value = searchValue
      }
      fieldProps.items = getItems.items.value
      fieldProps.loading = getItems.loading.value
      fieldProps.modelValue = localData.value
      return fieldProps
    })

    // @ts-ignore
    return () => h(VAutocomplete, fieldProps.value, selectSlots.value)
  }
})

</script>
