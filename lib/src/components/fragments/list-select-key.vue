<script>
import { VAutocomplete } from 'vuetify/components/VAutocomplete'
import { VSelect } from 'vuetify/components/VSelect'
import { defineComponent, h, computed, toRef } from 'vue'
import { useDefaults } from 'vuetify'
import useSelectNode from '../../composables/use-select-node.js'
import useCompDefaults from '../../composables/use-comp-defaults.js'
import { mergePropsLevels } from '../../composables/use-node.js'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    },
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
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    useDefaults({}, 'VjsfListSelectKey')
    const vSelectProps = useCompDefaults('VjsfIndexedList-VSelect', { variant: 'outlined', class: 'mt-2' })
    const avatarProps = useCompDefaults('VjsfSelectItem-VAvatar', { rounded: false, size: 'small' })

    // @ts-ignore
    const { getItems, selectProps, selectSlots } = useSelectNode(toRef(props, 'listNode'), props.statefulLayout, avatarProps.value, 'v-select')

    const fixedSelectProps = computed(() => {
      const fixedSelectProps = { ...selectProps.value }
      delete fixedSelectProps.hint
      fixedSelectProps.label = props.listNode.messages.addItem
      return fixedSelectProps
    })

    const fieldProps = computed(() => {
      const fieldProps = mergePropsLevels([vSelectProps.value, fixedSelectProps.value])
      fieldProps.loading = getItems.loading.value
      fieldProps.items = getItems.items.value
      delete fieldProps.clearable
      delete fieldProps['onBlur']
      fieldProps.rules = props.rules
      fieldProps.active = false
      if (props.modelValue) fieldProps.modelValue = props.modelValue
      else delete fieldProps.modelValue
      fieldProps['onUpdate:modelValue'] = (/** @type string */value) => {
        if (value) emit('update:modelValue', value)
      }
      return fieldProps
    })

    const fieldSlots = computed(() => {
      const fieldSlots = { ...selectSlots.value }
      delete fieldSlots.selection
      return fieldSlots
    })

    // @ts-ignore
    return () => h(getItems.items.value.length > 20 ? VAutocomplete : VSelect, fieldProps.value, fieldSlots.value)
  }
})

</script>
