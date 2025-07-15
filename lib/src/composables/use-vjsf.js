import { useDefaults, useLocale } from 'vuetify'
import { StatefulLayout } from '@json-layout/core/state'
import { inject, toRaw, shallowRef, computed, ref, watch, useSlots, getCurrentInstance, nextTick } from 'vue'
import { useElementSize } from '@vueuse/core'
import { getFullOptions } from '../options.js'
import { setAutoFreeze } from 'immer'
import Debug from 'debug'

const debug = Debug('vjsf:use-vjsf')

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
 * @param {typeof import('@json-layout/core/compile').compile} [compile]
 * @param {typeof import('@json-layout/core/compile').produceCompileOptions} [produceCompileOptions]
 * @param {import('vue').Ref<import('@json-layout/core').CompiledLayout>} [precompiledLayout]
 */
export const useVjsf = (schema, modelValue, options, nodeComponents, emit, compile, produceCompileOptions, precompiledLayout) => {
  const el = ref(null)

  useDefaults({}, 'Vjsf')
  /** @type {import('vuetify').DefaultsInstance} */
  const defaults = (inject(Symbol.for('vuetify:defaults')))?.value
  debug('provided defaults', defaults)

  // TODO: apply a debounce to width ?
  const { width } = useElementSize(el)

  /** @type import('vue').ShallowRef<import('../types.js').VjsfStatefulLayout | null> */
  const statefulLayout = shallowRef(null)
  /** @type import('vue').ShallowRef<import('@json-layout/core').StateTree | null> */
  const stateTree = shallowRef(null)

  // cf https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/composables/form.ts
  /** @type {any | null} */
  const form = inject(Symbol.for('vuetify:form'), null)
  const formMemberId = `vjsf-${Math.random().toString(36).substring(2, 9)}`
  if (form) {
    form.register({
      id: formMemberId,
      validate: () => {
        statefulLayout.value?.validate()
        return statefulLayout.value?.errors || []
      },
      reset: () => statefulLayout.value?.resetValidation(), // TODO: also empty the data ?
      resetValidation: () => statefulLayout.value?.resetValidation(),
      vm: getCurrentInstance()
    })
  } else {
    console.warn('Vjsf should be wrapped in VForm')
  }

  const slots = useSlots()

  /* Callbacks from json layout stateful layout */
  /**
   * @param {import('@json-layout/core').StatefulLayout} statefulLayout
   */
  const onStatefulLayoutUpdate = (statefulLayout) => {
    debug('onStatefulLayoutUpdate', statefulLayout)
    if (!statefulLayout) return
    stateTree.value = statefulLayout.stateTree
    debug('  -> emit update:state')
    emit('update:state', statefulLayout)
    if (form) {
      // cf https://vuetifyjs.com/en/components/forms/#validation-state
      if (statefulLayout.valid) form.update(formMemberId, true, [])
      else if (statefulLayout.hasHiddenError) form.update(formMemberId, null, [])
      else form.update(formMemberId, false, [])
    }
  }
  /**
   * @param {any} data
   */
  const onDataUpdate = async (data) => {
    debug('onDataUpdate', data)
    await nextTick() // necessary for form validation to be applied before emitting new data
    debug('  -> emit update:modelValue')
    emit('update:modelValue', data)
  }
  const onAutofocus = () => {
    if (!el.value) return
    // @ts-ignore
    const autofocusNodeElement = el.value.querySelector('.vjsf-input--autofocus')
    debug('onAutofocus', autofocusNodeElement)
    if (autofocusNodeElement) {
      const autofocusInputElement = autofocusNodeElement.querySelector('input') ?? autofocusNodeElement.querySelector('textarea:not([style*="display: none"]')
      if (autofocusInputElement) autofocusInputElement.focus()
    }
  }

  const locale = useLocale()

  const fullOptions = computed(() => getFullOptions(options.value, form, width.value, locale.current.value, defaults?.global, slots, { ...nodeComponents }, onDataUpdate, onStatefulLayoutUpdate, onAutofocus))

  // do not use a simple computed here as we want to prevent recompiling the layout when the options are the same
  /** @type {import('vue').Ref<import('@json-layout/core').PartialCompileOptions>} */
  const compileOptions = ref({})
  watch(fullOptions, (newOptions) => {
    if (precompiledLayout?.value) return
    if (!produceCompileOptions) throw new Error('produceCompileOptions function is not available')
    const newCompileOptions = produceCompileOptions(compileOptions.value, newOptions)
    if (newCompileOptions !== compileOptions.value) {
      debug('new compileOptions', newCompileOptions)
      compileOptions.value = newCompileOptions
    }
  }, { immediate: true })

  const compiledLayout = computed(() => {
    if (precompiledLayout?.value) return precompiledLayout?.value
    if (!compile) throw new Error('compile function is not available')
    const compiledLayout = compile(schema.value, compileOptions.value)
    return compiledLayout
  })

  const initStatefulLayout = () => {
    if (!width.value) return
    // @ts-ignore
    statefulLayout.value = /** @type {import('../types.js').VjsfStatefulLayout} */(new StatefulLayout(
      toRaw(compiledLayout.value),
      toRaw(compiledLayout.value.skeletonTrees[compiledLayout.value.mainTree]),
      toRaw(fullOptions.value),
      toRaw(modelValue.value)
    ))
  }

  // case where options are updated from outside
  watch(fullOptions, (newOptions) => {
    debug('watch fullOptions', fullOptions)
    if (statefulLayout.value) {
      debug('  -> update statefulLayout options')
      statefulLayout.value.options = toRaw(newOptions)
    } else {
      debug('  -> init statefulLayout')
      initStatefulLayout()
    }
  })

  // case where data is updated from outside
  watch(modelValue, (newData) => {
    const rawData = toRaw(newData)
    if (statefulLayout.value && statefulLayout.value.data !== rawData) {
      debug('modelValue changed from outside', rawData)
      debug('  -> update statefulLayout data')
      statefulLayout.value.data = toRaw(rawData)
    }
  })

  // case where schema or compile options are updated from outside
  watch(compiledLayout, (newCompiledLayout) => {
    debug('watch compiledLayout', newCompiledLayout)
    debug('  -> init statefulLayout')
    initStatefulLayout()
  })

  return { el, statefulLayout, stateTree }
}
