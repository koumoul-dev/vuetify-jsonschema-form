<template>
  <v-form ref="form" v-model="valid">
    <slot :model="model" :options="options" :schema="schema" :log-event="logEvent" />
  </v-form>
</template>

<script>

export default {
  props: {
    model: { type: Object, required: true },
    schema: { type: Object, required: true },
    options: { type: Object, required: true }
  },
  data: () => ({
    valid: false
  }),
  methods: {
    logEvent() {}
  }
}
</script>

<style lang="css" scoped>
</style>
