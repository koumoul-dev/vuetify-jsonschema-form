<script>
import { defineComponent, h, computed, toRef } from 'vue'
import { VCheckbox } from 'vuetify/components/VCheckbox'
import useNode from '../../composables/use-node.js'
import { useDefaults } from 'vuetify'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfCheckboxNode> */
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
    useDefaults({}, 'VjsfCheckbox')

    const { inputProps, localData, compSlots } = useNode(toRef(props, 'modelValue'), props.statefulLayout)

    const fullProps = computed(() => {
      const fullProps = { ...inputProps.value }
      // it is not very common to show an error below checkboxes and switches and without hide-details=auto they take a lot of space
      if (!('hideDetails' in inputProps)) fullProps.hideDetails = 'auto'
      fullProps.modelValue = localData.value
      return fullProps
    })

    return () => h(VCheckbox, fullProps.value, compSlots.value)
  }
})

</script>
