<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :temporary="$vuetify.breakpoint.smAndDown" :permanent="$vuetify.breakpoint.mdAndUp" app dark>
      <v-list class="py-0">
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title class="title primary--text">
              vjsf
            </v-list-item-title>
            <v-list-item-subtitle class="primary--text">
              {{ version }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense class="pt-0">
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
        <v-list-item to="/configuration">
          <v-list-item-content>
            <v-list-item-title>
              Configuration
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/0to1">
          <v-list-item-content>
            <v-list-item-title>
              0.x to 1.x
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense shaped class="mb-6">
        <v-subheader>EXAMPLES</v-subheader>
        <v-list-item v-for="example in examples.filter(e => !e.id.startsWith('_'))" :key="example.id" :to="{name: 'examples', hash: '#' + example.id}">
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
    <!--<v-app-bar app :color="$vuetify.breakpoint.smAndDown ? 'white' : 'transparent'" dense flat>-->
    <v-app-bar app flat>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="drawer = !drawer" />
      <search-widget
        df-url="https://koumoul.com/s/data-fair"
        dataset-id="vjsf-1"
        :menu-props="{'nudge-left': $vuetify.breakpoint.smAndDown ? 20 : 0}"
        :replace-url="{'https://koumoul-dev.github.io/vuetify-jsonschema-form/latest': ''}"
        :to-links="true"
      />
      <v-spacer />
      <v-btn href="https://github.com/sponsors/koumoul-dev" outlined rounded class="ml-2 pl-3" color="primary" style="text-transform: none;">
        <v-icon color="pink">
          mdi-heart-outline
        </v-icon>&nbsp;&nbsp;Sponsor
      </v-btn>
      <v-btn fab small href="https://github.com/koumoul-dev/vuetify-jsonschema-form" color="primary" class="ml-2">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import SearchWidget from '@koumoul/data-fair-search-widget/src/components/search-widget.vue'
import { examples } from '~/examples'
import { version } from '~/../package.json'

export default {
  components: { SearchWidget },
  data: () => ({ examples, version, drawer: false })
}

</script>

<style>
</style>
