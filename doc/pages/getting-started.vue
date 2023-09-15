<template>
  <v-container>
    <h1 class="display-1 mb-4">
      {{ title }}
    </h1>
    TODO
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: 'Getting started'
  }),
  head () {
    return {
      title: 'vjsf - ' + this.title
    }
  }
}
</script>

<style lang="css" scoped>
.v-sheet.codeblock {
  margin-top: 6px;
  margin-bottom: 18px;
  padding: 8px 8px 2px 8px;
}
.v-sheet.codeblock code {
  background: none;
  box-shadow: none;
}
.v-sheet.codeblock code::before {
  content: "";
}
</style>
