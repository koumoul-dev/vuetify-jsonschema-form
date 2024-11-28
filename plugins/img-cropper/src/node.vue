<script>
import { defineComponent, h, computed, onMounted, ref, onUnmounted, watch, toRef } from 'vue'
import { VFileInput } from 'vuetify/components/VFileInput'
import { VMenu } from 'vuetify/components/VMenu'
import useNode from '@koumoul/vjsf/composables/use-node.js'
import { useDefaults } from 'vuetify'

/** @typedef {{fileImage: string}} VjsfImgCropperIcons */
/** @typedef {{icons?: Partial<VjsfImgCropperIcons>}} VjsfImgCropperOptions */
/** @typedef {import('@koumoul/vjsf/types.js').VjsfNode & {data: string | undefined | null}} VjsfImgCropperNode */

export default defineComponent({
  props: {
    modelValue: {
      /** @type {VjsfImgCropperNode} */
      type: Object,
      required: true
    },
    statefulLayout: {
      /** @type {import('vue').PropType<import('@koumoul/vjsf/types.js').VjsfStatefulLayout>} */
      type: Object,
      required: true
    }
  },
  setup (props) {
    useDefaults({}, 'VjsfImgCropper')

    const { inputProps, localData, compSlots } = useNode(
      toRef(props, 'modelValue'), props.statefulLayout, { layoutPropsMap: ['placeholder', 'accept'] }
    )
    const menuOpened = ref(false)

    // @ts-ignore
    return () => {
      const fileInput = h(VFileInput, { accept: 'image/*', ...inputProps.value, modelValue: localData.value }, compSlots.value)
      if (menuOpened.value) {
        const menu = h(VMenu, {})
        return [fileInput, menu]
      } else {
        return [fileInput]
      }
    }
  }
})

/* <v-menu
    v-if="textField"
    v-bind="menuProps"
    v-model="menuOpened"
    class="vjsf-text-field-menu"
    :activator="textField"
  >
    <slot :close="() => menuOpened = false" />
  </v-menu> */
</script>

<style>
.vjsf-node-text-field.vjsf-readonly.vjsf-summary input {
  text-overflow: ellipsis;
}
</style>
