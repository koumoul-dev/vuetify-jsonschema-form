<script>
import { VSelect } from 'vuetify/components/VSelect'
import { defineComponent, h, computed, toRef, watch } from 'vue'
import { useDefaults } from 'vuetify'
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
    useDefaults({}, 'VjsfSelect')
    const avatarProps = useCompDefaults('VjsfSelectItem-VAvatar', { rounded: false, size: 'small' })

    const { getItems, selectProps, selectSlots, localData } = useSelectNode(toRef(props, 'modelValue'), props.statefulLayout, avatarProps.value, 'v-select')

    const fieldProps = computed(() => {
      const fieldProps = { ...selectProps.value }
      fieldProps.loading = getItems.loading.value
      fieldProps.items = getItems.items.value
      fieldProps.modelValue = localData.value
      return fieldProps
    })

    watch(() => fieldProps.value.items, () => console.log(fieldProps.value.items))

    // @ts-ignore
    return () => h(VSelect, fieldProps.value, selectSlots.value)
  }
})

</script>
