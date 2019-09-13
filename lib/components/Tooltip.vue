<template>
  <v-tooltip v-if="htmlDescription" v-model="show" left :open-on-hover="false" :open-on-click="false" content-class="vjsf-tooltip">
    <template v-slot:activator="{on}">
      <v-icon @click="show = !show">
        {{ options.icons.info }}
      </v-icon>
    </template>
    <div :style="`max-width: ${maxWidth}px`" v-html="htmlDescription" />
  </v-tooltip>
</template>

<script>
export default {
  props: ['htmlDescription', 'options'],
  data() {
    return {
      show: false,
      maxWidth: 200
    }
  },
  mounted() {
    if (!this.htmlDescription) return
    this.maxWidth = this.$el.getBoundingClientRect().left - 80
  }
}
</script>

<style lang="css" scoped>
</style>
