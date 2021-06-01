<template>
  <v-container>
    <h1 class="display-1 mb-4">
      {{ title }}
    </h1>
    <p>
      The 2.x major version does not introduce actual breaking changes in the API. But the implementation of events and reactivity was changed in important ways.
    </p>
    <p>
      <ul>
        <li>better implementation of v-model by not mutating the value parameter and instead creating clones for each input event (better for clarity and side-effects)</li>
        <li>prevent triggering duplicate input events (better for performance and clarity)</li>
        <li>a change event is always triggered after the corresponding input event (better if you want to automatically validate the form on each change)</li>
      </ul>
    </p>
    <p>
      When upgrading you should focus on checking that the way you integrate vjsf is in line with these changes. In our experience a very straightforward implementation using v-model and either a validate button or listening to change events for validation should work better than it used to.
    </p>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: '1.x to 2.x'
  }),
  head() {
    return {
      title: 'vjsf - ' + this.title
    }
  }
}
</script>

<style lang="css" scoped>
</style>
