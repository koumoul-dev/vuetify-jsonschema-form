<script>
import SelectionGroup from '../fragments/selection-group.vue'
import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfCheckboxGroupNode> */
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
    // @ts-ignore
    return () => {
      return h(SelectionGroup, {
        modelValue: props.modelValue,
        statefulLayout: props.statefulLayout,
        type: 'checkbox'
      })
    }
  }
})

</script>

<style>
.vjsf-node-checkbox-group .v-selection-control-group .v-checkbox .v-selection-control {
  min-height: auto;
}
</style>
