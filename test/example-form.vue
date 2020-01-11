<template>
  <v-form ref="form" v-model="valid">
    <slot :model="model" :options="options" :schema="schema" />
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
  })
}
</script>

<style lang="css" scoped>
</style>
