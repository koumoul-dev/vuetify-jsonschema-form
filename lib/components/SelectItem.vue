<template>
  <div>
    <v-list-tile-content v-if="options.vuetifyVersion === 1">
      <v-list-tile-title>{{ title }}</v-list-tile-title>
    </v-list-tile-content>
    <v-list-item-content v-else>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </v-list-item-content>
  </div>
</template>

<script>
export default {
  props: ['title', 'options']
}
</script>

<style lang="css" scoped>
</style>
