<template>
  <v-app>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { VApp, VMain } from 'vuetify/components'
</script>
