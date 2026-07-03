<script setup lang="ts">
// Reads a browser-only API on setup — would crash during Node pre-render
// if not guarded by <ClientOnly>.
const ua = window.navigator.userAgent
</script>

<template>
  <v-alert type="info" data-client-probe>Client rendered: {{ ua }}</v-alert>
</template>
