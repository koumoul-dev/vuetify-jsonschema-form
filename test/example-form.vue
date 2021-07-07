<template>
  <v-form ref="form" v-model="valid">
    <slot :model-wrapper="modelWrapper" :options="options" :schema="schema" :log-event="logEvent" />
  </v-form>
</template>

<script>

export default {
  props: {
    modelWrapper: { type: Object, required: true },
    schema: { type: Object, required: true },
    options: { type: Object, required: true },
    logEvent: { type: Function, required: true }
  },
  data: () => ({
    valid: false
  })
}
</script>

<style lang="css" scoped>
</style>
