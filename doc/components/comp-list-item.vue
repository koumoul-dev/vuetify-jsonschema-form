<template>
  <v-list-item class="my-2 px-2">
    <v-list-item-title>
      <strong>{{ comp.name }}</strong>
    </v-list-item-title>
    <v-list-item-subtitle
      class="my-2"
    >
      <p
        v-if="compCharacteristics.length"
        class="mb-2"
      >
        {{ compCharacteristics.join(' - ') }}
      </p>

      <comp-schema
        v-if="comp.schema"
        :schema="comp.schema"
        name="specific properties"
      />
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script setup>
import { VListItem, VListItemTitle, VListItemSubtitle } from 'vuetify/components'
import { computed } from 'vue'

const { comp } = defineProps({
  comp: {
    /** @type {import('vue').PropType<import('@json-layout/vocabulary').ComponentInfo>} */
    type: Object,
    required: true
  }
})

const compCharacteristics = computed(() => {
  if (comp.name === 'none') return []
  /** @type {string[]} */
  const characteristics = []
  if (comp.composite) characteristics.push('composite')
  else characteristics.push('simple')
  if (comp.itemsBased) characteristics.push('items based')
  if (comp.multipleCompat) characteristics.push('array compatible')
  if (comp.focusable) characteristics.push('focusable')
  if (comp.emitsBlur) characteristics.push('emits blur event')
  if (comp.emitsBlur) characteristics.push('emits blur event')
  if (comp.shouldDebounce) characteristics.push('can be debounced')
  return characteristics
})
</script>
