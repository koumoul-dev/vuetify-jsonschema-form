import { StatefulLayout } from '@json-layout/core'
import { inject, toRaw, shallowRef, computed, ref, watch, useSlots } from 'vue'
import { useElementSize } from '@vueuse/core'
import { getFullOptions } from '../components/options.js'

export const emits = {
  /**
   * @arg {any} data
  */
  'update:modelValue': (data) => true,
  /**
   * @arg {StatefulLayout} state
  */
  'update:state': (state) => true
}

/**
 * @param {import('vue').Ref<Object>} schema
 * @param {import('vue').Ref<any>} modelValue
 * @param {import('vue').Ref<import("../components/types.js").PartialVjsfOptions>} options
 * @param {any} emit
 * @param {typeof import('@json-layout/core').compile} [compile]
 * @param {import('vue').Ref<import('@json-layout/core').CompiledLayout>} [precompiledLayout]
 */
export const useVjsf = (schema, modelValue, options, emit, compile, precompiledLayout) => {
  const el = ref(null)
  const { width } = useElementSize(el)

  /** @type import('vue').ShallowRef<StatefulLayout | null> */
  const statefulLayout = shallowRef(null)
  /** @type import('vue').ShallowRef<import('@json-layout/core').StateTree | null> */
  const stateTree = shallowRef(null)

  // cf https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/composables/form.ts
  const form = inject(Symbol.for('vuetify:form'))
  if (form) {
    form.register({
      id: 'vjsf', // TODO: a unique random id ?
      validate: () => {
        statefulLayout.value?.validate()
        return statefulLayout.value?.errors
      },
      reset: () => statefulLayout.value?.resetValidation(), // TODO: also empty the data ?
      resetValidation: () => statefulLayout.value?.resetValidation()
    })
  }

  const slots = useSlots()

  const fullOptions = computed(() => getFullOptions(options.value, form, width.value, slots))

  const compiledLayout = computed(() => {
    if (precompiledLayout?.value) return precompiledLayout?.value
    if (!compile) throw new Error('compile function is not available')
    const compiledLayout = compile(schema.value, fullOptions.value)
    return compiledLayout
  })

  const onStatefulLayoutUpdate = () => {
    if (!statefulLayout.value) return
    stateTree.value = statefulLayout.value.stateTree
    emit('update:modelValue', statefulLayout.value.data)
    emit('update:state', statefulLayout.value)
    if (form) {
      // cf https://vuetifyjs.com/en/components/forms/#validation-state
      if (statefulLayout.value.valid) form.update('vjsf', true, [])
      else if (statefulLayout.value.hasHiddenError) form.update('vjsf', null, [])
      else form.update('vjsf', false, [])
    }
  }

  const initStatefulLayout = () => {
    if (!width.value) return
    const _statefulLayout = new StatefulLayout(
      toRaw(compiledLayout.value),
      toRaw(compiledLayout.value.skeletonTree),
      toRaw(fullOptions.value),
      toRaw(modelValue.value)
    )
    statefulLayout.value = _statefulLayout
    onStatefulLayoutUpdate()
    _statefulLayout.events.on('update', () => {
      onStatefulLayoutUpdate()
    })
    emit('update:state', _statefulLayout)
    _statefulLayout.events.on('autofocus', () => {
      if (!el.value) return
      // @ts-ignore
      const autofocusNodeElement = el.value.querySelector('.vjsf-input--autofocus')
      if (autofocusNodeElement) {
        const autofocusInputElement = autofocusNodeElement.querySelector('input') ?? autofocusNodeElement.querySelector('textarea:not([style*="display: none"]')
        if (autofocusInputElement) autofocusInputElement.focus()
      }
    })
  }

  watch(fullOptions, (newOptions) => {
    // in case of runtime compilation the watch on compiledLayout will be triggered
    if (!precompiledLayout?.value) return

    if (statefulLayout.value) {
      statefulLayout.value.options = newOptions
    } else {
      initStatefulLayout()
    }
  })

  // case where data is updated from outside
  watch(modelValue, (newData) => {
    if (statefulLayout.value && statefulLayout.value.data !== newData) statefulLayout.value.data = toRaw(newData)
  })

  // case where schema is updated from outside
  watch(compiledLayout, (newCompiledLayout) => {
    initStatefulLayout()
  })

  return { el, statefulLayout, stateTree }
}
