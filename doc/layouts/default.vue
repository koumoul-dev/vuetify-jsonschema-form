<template>
  <v-app>
    <v-navigation-drawer permanent app dark>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="title">
            vjsf
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list dense>
        <v-list-item to="/about">
          <v-list-item-content>
            <v-list-item-title>
              About
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/getting-started">
          <v-list-item-content>
            <v-list-item-title>
              Getting started
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/options">
          <v-list-item-content>
            <v-list-item-title>
              Options / annotations
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense shaped class="mb-6">
        <v-subheader>EXAMPLES</v-subheader>
        <v-list-item v-for="example in examples" :key="example.id" :to="{name: 'examples', hash: '#' + example.id}">
          <v-list-item-content>
            <v-list-item-title>{{ example.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-footer absolute>
        <v-spacer />
        <span class="caption">Maintained by&nbsp;<a href="https://koumoul.com">Koumoul</a></span>
      </v-footer>
    </v-navigation-drawer>
    <v-content>
      <v-btn fab absolute small href="https://github.com/koumoul-dev/vuetify-jsonschema-form" style="top: 6px; right: 6px;" color="primary">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>

import { examples } from '~/examples'

export default {
  data: () => ({ examples })
}

</script>

<style>
</style>
