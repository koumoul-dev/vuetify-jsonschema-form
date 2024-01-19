<template>
  <v-card variant="flat">
    <v-list
      :lines="false"
    >
      <v-divider />
      <template
        v-for="option in options"
        :key="option.key"
      >
        <v-list-item class="my-2 px-2">
          <v-list-item-title>
            {{ option.key }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ option.description }}
          </v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="option.values"
            class="my-2"
          >
            <p
              v-for="value in Object.keys(option.values)"
              :key="value"
              class="pl-4"
            >
              <strong>{{ value }}: </strong>
              <span v-text="option.values[value]" />
            </p>
          </v-list-item-subtitle>
        </v-list-item>
        <v-divider />
      </template>
    </v-list>
  </v-card>
</template>

<script setup>
import { VCard, VList, VListItem, VListItemTitle, VListItemSubtitle, VDivider } from 'vuetify/components'
defineProps({
  options: {
    /** @type {import('vue').PropType<import('@json-layout/core/utils/doc-options').DocOptions>} */
    type: Array,
    required: true
  }
})
</script>
