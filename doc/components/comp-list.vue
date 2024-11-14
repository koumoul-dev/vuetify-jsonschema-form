<template>
  <v-card variant="flat">
    <v-list
      :lines="false"
    >
      <v-divider />
      <template
        v-for="comp in components"
        :key="comp.name"
      >
        <comp-list-item :comp="comp" />
        <v-divider />
      </template>
    </v-list>
  </v-card>
</template>

<script setup>
import { VCard, VList, VDivider } from 'vuetify/components'

defineProps({
  components: {
    /** @type {import('vue').PropType<import('@json-layout/vocabulary').ComponentInfo[]>} */
    type: Array,
    required: true
  }
})

</script>
