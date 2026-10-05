import { computed, inject, ref, watch } from 'vue'

/**
 * A child hidden by a "if" expression is kept in the state tree as a "none" node, so are the
 * children with an explicit "none" layout. The containers that render one header per child
 * (tabs, vertical-tabs, expansion-panels, stepper) must skip them, otherwise the section takes
 * an empty clickable slot in the header.
 *
 * The index in the full children array is kept alongside the child: hidden children keep their
 * slot in the state tree so these indexes are stable, and they are the values a schema uses to
 * preselect a section through layout.props.modelValue.
 *
 * @template {{layout: {comp: string}}} T
 * @param {() => readonly T[]} getChildren
 * @returns {import('vue').ComputedRef<{child: T, index: number}[]>}
 */
export function useVisibleChildren (getChildren) {
  return computed(() => getChildren()
    .map((child, index) => ({ child, index }))
    .filter(({ child }) => child.layout.comp !== 'none'))
}

/**
 * Track the index of the selected child of a container, and fallback on the first visible one
 * when the selected child becomes hidden (the header would show no selection at all, while the
 * window would keep displaying a section).
 *
 * The stateful layout keeps the open child of tabs, vertical-tabs and stepper containers: the
 * assistant's form tools read it and open the section they write in. The container follows its
 * choice, and tells it the person's.
 *
 * @param {import('vue').ComputedRef<{index: number}[]>} visibleChildren
 * @param {unknown} initialIndex the index preselected by layout.props.modelValue, if any
 * @param {() => { fullKey: string }} [getNode] the container node
 * @param {{ activateSection?: (node: any, index: number) => void }} [statefulLayout]
 * @returns {import('vue').Ref<number | undefined>}
 */
export function useActiveChildIndex (visibleChildren, initialIndex, getNode, statefulLayout) {
  const isVisible = (/** @type {unknown} */index) => visibleChildren.value.some(visible => visible.index === index)
  const activeSections = /** @type {import('vue').ShallowRef<Record<string, number>> | null} */(inject(Symbol.for('vjsf:active-sections'), null))
  const chosen = () => getNode ? activeSections?.value[getNode().fullKey] : undefined
  const initial = isVisible(chosen()) ? chosen() : (isVisible(initialIndex) ? initialIndex : visibleChildren.value[0]?.index)
  const activeIndex = ref(/** @type {number | undefined} */(initial))
  watch(visibleChildren, (children) => {
    if (!children.some(visible => visible.index === activeIndex.value)) activeIndex.value = children[0]?.index
  })
  if (getNode && statefulLayout && typeof statefulLayout.activateSection === 'function') {
    watch(chosen, (index) => {
      if (index !== undefined && index !== activeIndex.value && isVisible(index)) activeIndex.value = index
    })
    watch(activeIndex, (index) => {
      if (index !== undefined && index !== chosen()) statefulLayout.activateSection?.(getNode(), index)
    })
  }
  return activeIndex
}
