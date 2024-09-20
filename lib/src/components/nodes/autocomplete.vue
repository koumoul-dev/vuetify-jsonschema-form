<script>
import { VAutocomplete } from 'vuetify/components/VAutocomplete'
import { useDefaults } from 'vuetify'
import { defineComponent, computed, h, toRef } from 'vue'
import useSelectField from '../../composables/use-select-field.js'

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

    const { getItems, inputProps, selectProps, compSlots, selectSlots, localData } = useSelectField(toRef(props, 'modelValue'), props.statefulLayout)

    const fieldProps = computed(() => {
      const fieldProps = { ...inputProps.value, ...selectProps.value }
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
    return () => h(VAutocomplete, fieldProps.value, { ...compSlots.value, ...selectSlots.value })
  }
})

</script>
