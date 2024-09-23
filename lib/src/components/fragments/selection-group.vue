<script>
import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader'
import { VInput } from 'vuetify/components/VInput'
import { VLabel } from 'vuetify/components/VLabel'
import { VCheckbox } from 'vuetify/components/VCheckbox'
import { VSwitch } from 'vuetify/components/VSwitch'
import { defineComponent, h, computed, toRef } from 'vue'
import useField from '../../composables/use-node.js'
import useGetItems from '../../composables/use-get-items.js'

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
    },
    type: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const nodeRef = toRef(props, 'modelValue')
    const getItems = useGetItems(nodeRef, props.statefulLayout)
    const { inputProps, compSlots, localData, layout } = useField(nodeRef, props.statefulLayout, { bindData: false })

    const fieldProps = computed(() => {
      const fieldProps = { ...inputProps.value }
      fieldProps.class.push('v-radio-group') // reuse some styles from radio-group
      fieldProps.class.push('vjsf-selection-group')
      return fieldProps
    })

    const fieldSlots = computed(() => {
      const slots = { ...compSlots.value }

      if (!slots.default) {
        slots.default = () => {
          /** @type {import('vue').VNode[]} */
          const children = [h(VLabel, { text: fieldProps.value.label })]
          if (getItems.loading.value) {
            children.push(h(VSkeletonLoader, { type: 'chip' }))
          } else {
            /** @type {import('vue').VNode[]} */
            const checkboxes = []
            for (const item of getItems.items.value) {
              let modelValue = false
              if (layout.value.multiple) {
                modelValue = localData.value?.includes(item.value)
              } else {
                modelValue = localData.value === item.value
              }
              checkboxes.push(h(props.type === 'switch' ? VSwitch : VCheckbox, {
                label: item.title,
                hideDetails: true,
                key: item.key,
                modelValue,
                onClick: () => {
                  let newValue
                  if (layout.value.multiple) {
                    newValue = props.modelValue.data ? [...props.modelValue.data] : []
                    if (newValue.includes(item.value)) {
                      newValue = newValue.filter((/** @type {any} */v) => v !== item.value)
                    } else {
                      newValue.push(item.value)
                    }
                  } else {
                    if (props.modelValue.data === item.value) {
                      newValue = undefined
                    } else {
                      newValue = item.value
                    }
                  }
                  props.statefulLayout.input(props.modelValue, newValue)
                }
              }))
            }
            children.push(h('div', { class: 'v-selection-control-group' }, checkboxes))
          }
          return children
        }
      }

      return slots
    })

    return () => {
      return h(VInput, fieldProps.value, fieldSlots.value)
    }
  }
})

</script>

<style>
.vjsf-selection-group .v-selection-control-group>.v-input .v-selection-control {
  min-height: auto;
}
</style>
