import { StatefulLayout, produceCompileOptions } from '@json-layout/core'
import { inject, toRaw, shallowRef, computed, ref, watch, useSlots } from 'vue'
import { useElementSize } from '@vueuse/core'
import { getFullOptions } from '../components/options.js'
import { registeredNodeComponents } from '../utils/index.js'
import { setAutoFreeze } from 'immer'

// immer freezing is disabled because it is not compatible with Vue 3 reactivity
setAutoFreeze(false)

export const emits = {
  /**
   * @arg {any} data
  */
  'update:modelValue': (data) => true,
  /**
   * @arg {import('../types.js').VjsfStatefulLayout} state
  */
  'update:state': (state) => true
}

/**
 * @param {import('vue').Ref<Object>} schema
 * @param {import('vue').Ref<any>} modelValue
 * @param {import('vue').Ref<import("../types.js").PartialVjsfOptions | null>} options
 * @param {Record<string, import('vue').Component>} nodeComponents
 * @param {any} emit
 * @param {typeof import('@json-layout/core').compile} [compile]
 * @param {import('vue').Ref<import('@json-layout/core').CompiledLayout>} [precompiledLayout]
 */
export const useVjsf = (schema, modelValue, options, nodeComponents, emit, compile, precompiledLayout) => {
  const el = ref(null)
  const { width } = useElementSize(el)

  /** @type import('vue').ShallowRef<import('../types.js').VjsfStatefulLayout | null> */
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

  const fullOptions = computed(() => getFullOptions(options.value, form, width.value, slots, { ...nodeComponents, ...toRaw(registeredNodeComponents.value) }))

  // do not use a simple computed here as we want to prevent recompiling the layout when the options are the same
  /** @type {import('vue').Ref<import('@json-layout/core').PartialCompileOptions>} */
  const compileOptions = ref({})
  watch(fullOptions, (newOptions) => {
    if (precompiledLayout?.value) return
    const newCompileOptions = produceCompileOptions(compileOptions.value, newOptions)
    if (newCompileOptions !== compileOptions.value) compileOptions.value = newCompileOptions
  }, { immediate: true })

  const compiledLayout = computed(() => {
    if (precompiledLayout?.value) return precompiledLayout?.value
    if (!compile) throw new Error('compile function is not available')
    const compiledLayout = compile(schema.value, compileOptions.value)
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

    // @ts-ignore
    const _statefulLayout = /** @type {import('../types.js').VjsfStatefulLayout} */(new StatefulLayout(
      toRaw(compiledLayout.value),
      toRaw(compiledLayout.value.skeletonTree),
      toRaw(fullOptions.value),
      toRaw(modelValue.value)
    ))
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

  // case where options are updated from outside
  watch(fullOptions, (newOptions) => {
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

  // case where schema or compile options are updated from outside
  watch(compiledLayout, (newCompiledLayout) => {
    initStatefulLayout()
  })

  return { el, statefulLayout, stateTree }
}
