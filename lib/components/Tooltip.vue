<template>
  <v-tooltip v-if="htmlDescription" left>
    <template v-slot:activator="{on}">
      <v-icon v-on="on">
        info
      </v-icon>
    </template>
    <div class="vjsf-tooltip" v-html="htmlDescription" />
  </v-tooltip>
</template>

<script>
export default {
  props: ['htmlDescription']
}
</script>

<style lang="css" scoped>
</style>
