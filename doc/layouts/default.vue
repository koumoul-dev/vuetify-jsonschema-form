<template>
  <v-app>
    <v-navigation-drawer permanent app dark>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          vjsf
        </v-list-item-title>
      </v-list-item>
      <v-divider />

      <v-list dense shaped>
        <v-subheader>EXAMPLES</v-subheader>
        <v-list-item v-for="example in examples" :key="example.id" :to="{name: 'examples', hash: '#' + example.id}">
          <v-list-item-title>{{ example.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-footer absolute>
        <v-spacer />
        <span class="caption">Maintained by&nbsp;<a href="https://koumoul.com">Koumoul</a></span>
      </v-footer>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>

const examples = require('~/examples')

export default {
  data: () => ({ examples })
}

</script>

<style>
</style>
