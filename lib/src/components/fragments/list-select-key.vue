<script>
import { VSelect } from 'vuetify/components/VSelect'
import { defineComponent, h, computed, toRef } from 'vue'
import { useDefaults } from 'vuetify'
import useSelectNode from '../../composables/use-select-node.js'
import useCompDefaults from '../../composables/use-comp-defaults.js'

export default defineComponent({
  props: {
    listNode: {
      /** @type import('vue').PropType<import('../../types.js').VjsfListNode> */
      type: Object,
      required: true
    },
    statefulLayout: {
      /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
      type: Object,
      required: true
    },
    rules: {
      /** @type import('vue').PropType<((v: string) => boolean)[]> */
      type: Array,
      required: true
    }
  },
  emits: ['onUpdate:modelValue'],
  setup (props, { emit }) {
    useDefaults({}, 'VjsfListSelectKey')
    const vSelectProps = useCompDefaults('VjsfSelectItem-VSelect', { variant: 'outlined' })
    const avatarProps = useCompDefaults('VjsfSelectItem-VAvatar', { rounded: false, size: 'small' })

    // @ts-ignore
    const { getItems, selectProps, selectSlots } = useSelectNode(toRef(props, 'listNode'), props.statefulLayout, avatarProps.value, 'v-select')

    const fieldProps = computed(() => {
      const fieldProps = { ...vSelectProps.value, ...selectProps.value }
      fieldProps.label = props.listNode.messages.addItem
      fieldProps.loading = getItems.loading.value
      fieldProps.items = getItems.items.value
      delete fieldProps.modelValue
      delete fieldProps.clearable
      delete fieldProps['onBlur']
      fieldProps.rules = props.rules
      fieldProps.active = false
      fieldProps['onUpdate:modelValue'] = (/** @type string */value) => {
        emit('onUpdate:modelValue', value)
      }
      return fieldProps
    })

    const fieldSlots = computed(() => {
      const fieldSlots = { ...selectSlots.value }
      delete fieldSlots.selection
      return fieldSlots
    })

    // @ts-ignore
    return () => h(VSelect, fieldProps.value, fieldSlots.value)
  }
})

</script>
