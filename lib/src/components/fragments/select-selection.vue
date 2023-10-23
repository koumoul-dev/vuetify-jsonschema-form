<script setup>
// cf https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VSelect/VSelect.tsx#L453

import VSelectItemIcon from './select-item-icon.vue'

defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  last: {
    type: Boolean,
    default: false
  },
  item: {
    /** @type import('vue').PropType<import('@json-layout/vocabulary').SelectItem> */
    type: Object,
    required: true
  }
})
</script>

<template>
  <span class="v-select__selection-text">
    <v-select-item-icon
      v-if="item.icon"
      :icon="item.icon"
    />
    {{ item.title }}
    <span
      v-if="multiple && !last"
      class="v-select__selection-comma"
    >,</span>
  </span>
</template>
