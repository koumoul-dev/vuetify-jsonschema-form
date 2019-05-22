<template>
  <v-avatar tile size="26" class="mr-2">
    <img v-if="value.startsWith('http://') || value.startsWith('https://')" :src="value" style="height:100%;width:100%;">
    <div v-else-if="value.startsWith('<?xml') || value.startsWith('<svg')" v-html="value" />
    <v-icon v-else>
      {{ value }}
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style lang="css" scoped>
</style>
