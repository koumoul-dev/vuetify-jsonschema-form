<template>
  <v-tooltip v-if="htmlDescription" v-model="show" left :open-on-hover="false" :open-on-click="false">
    <template v-slot:activator="{on}">
      <v-icon @click="show = !show">
        info
      </v-icon>
    </template>
    <div class="vjsf-tooltip" v-html="htmlDescription" />
  </v-tooltip>
</template>

<script>
export default {
  props: ['htmlDescription'],
  data() {
    return { show: false }
  }
}
</script>

<style lang="css" scoped>
</style>
