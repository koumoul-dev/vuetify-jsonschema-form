<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="markdown-block"
    v-html="$markdown(content)"
  />
</template>

<script>
export default {
  props: {
    content: { type: String, required: true }
  }
}
</script>

<style lang="css">
.markdown-block p:not(:last-child), .markdown-block pre:not(:last-child) {
  margin-bottom: 20px;
}
.markdown-block ul {
  margin-left: 28px;
  margin-bottom: 16px;
}
</style>
