<script setup>

import { VListSubheader } from 'vuetify/components/VList'
import VSelectItemIcon from './select-item-icon.vue'

defineProps({
  item: {
    /** @type import('vue').PropType<import('@json-layout/vocabulary').SelectItemHeader> */
    type: Object,
    required: true
  },
  avatarProps: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <v-list-subheader>
    <v-select-item-icon
      v-if="typeof item.icon === 'string'"
      :icon="item.icon"
      :avatar-props="avatarProps"
    />
    {{ item.title }}
  </v-list-subheader>
</template>
