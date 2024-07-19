<script>
import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader'
import { VInput } from 'vuetify/components/VInput'
import { VLabel } from 'vuetify/components/VLabel'
import { VCheckbox } from 'vuetify/components/VCheckbox'
import { VSwitch } from 'vuetify/components/VSwitch'
import { defineComponent, h, computed } from 'vue'
import { getInputProps, getCompSlots } from '../../utils/index.js'
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
    const getItems = useGetItems(props)

    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout)
      fieldProps.class.push('v-radio-group') // reuse some styles from radio-group
      fieldProps.class.push('vjsf-selection-group')
      return fieldProps
    })

    const fieldSlots = computed(() => {
      const slots = getCompSlots(props.modelValue, props.statefulLayout)

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
              if (props.modelValue.layout.multiple) {
                modelValue = props.modelValue.data?.includes(item.value)
              } else {
                modelValue = props.modelValue.data === item.value
              }
              checkboxes.push(h(props.type === 'switch' ? VSwitch : VCheckbox, {
                label: item.title,
                hideDetails: true,
                key: item.key,
                modelValue,
                onClick: () => {
                  let newValue
                  if (props.modelValue.layout.multiple) {
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

    // @ts-ignore
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
