<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :temporary="$vuetify.display.smAndDown"
      :permanent="$vuetify.display.mdAndUp"
      app
      class="main-drawer"
    >
      <v-list class="py-0">
        <v-list-item to="/" class="text-primary">
          <v-list-item-title class="text-h6 font-weight-bold">
            vjsf
          </v-list-item-title>
          <v-list-item-subtitle class="font-weight-bold">
            {{ version }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-list
        dense
        class="pt-0"
      >
        <v-list-item to="/about">
          <v-list-item-title>
            About
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/getting-started">
          <v-list-item-title>
            Getting started
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/configuration">
          <v-list-item-title>
            Configuration
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/0to1">
          <v-list-item-title>
            0.x to 1.x
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/1to2">
          <v-list-item-title>
            1.x to 2.x
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider />

      {{ examples }}

      <!--
      <v-list
        dense
        shaped
        class="mb-6 pr-0"
      >
        <v-subheader>EXAMPLES</v-subheader>
        <v-expansion-panels
          id="examples-panels"
          accordion
          flat
        >
          <v-expansion-panel
            v-for="(examplesGroup, i) in examples.filter(eg => eg.title !== 'Development' || nodeEnv === 'development')"
            :key="i"
          >
            <v-expansion-panel-header
              class="px-3"
              :color="examplesGroup.color || ''"
            >
              {{ examplesGroup.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item
                v-for="example in examplesGroup.examples"
                :key="example.id"
                :to="{name: 'examples', hash: '#' + example.id}"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ example.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list>
      -->
      <template #append>
        <v-footer>
          <v-spacer />
          <span class="caption">Maintained by&nbsp;<a href="https://koumoul.com" class="text-primary text-decoration-none font-weight-medium">Koumoul</a></span>
        </v-footer>
      </template>
    </v-navigation-drawer>
    <!--<v-app-bar app :color="$vuetify.display.smAndDown ? 'white' : 'transparent'" dense flat>-->
    <v-app-bar
      app
      flat
      density="comfortable"
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click.stop="drawer = !drawer"
      />
      <!--<search-widget
        df-url="https://koumoul.com/data-fair"
        dataset-id="vjsf-doc"
        :menu-props="{'nudge-left': $vuetify.display.smAndDown ? 20 : 0}"
        :replace-url="{'https://koumoul-dev.github.io/vuetify-jsonschema-form/latest': ''}"
        :to-links="true"
      />-->
      <v-spacer />
      <v-btn
        href="https://github.com/sponsors/koumoul-dev"
        variant="outlined"
        rounded
        color="primary"
        style="text-transform: none;"
        prepend-icon=""
      >
        <template #prepend>
          <v-icon color="pink" size="large">
            <icon-heart-outline />
          </v-icon>
        </template>
        Sponsor
      </v-btn>
      <!--<v-btn
        fab
        small
        href="https://gitter.im/koumoul-dev/vjsf"
        color="primary"
        class="ml-2"
        title="chat on gitter"
      >
        <v-icon>mdi-chat</v-icon>
      </v-btn>-->
      <v-btn
        icon
        href="https://github.com/koumoul-dev/vuetify-jsonschema-form"
        color="primary"
        class="ml-2"
        size="x-large"
        density="compact"
        title="repository on github"
      >
        <v-icon><icon-github /></v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>
// import SearchWidget from '@koumoul/data-fair-search-widget/src/components/search-widget.vue'
import { examples } from '@json-layout/examples'
import { version } from '~/../package.json'
import IconHeartOutline from '~icons/mdi/heart-outline'
import IconGithub from '~icons/mdi/github'

export default {
  components: {IconHeartOutline, IconGithub },
  data: () => ({
    version,
    drawer: true,
    nodeEnv: process.env.NODE_ENV,
    examples
  })
}

</script>

<style>
#examples-panels .v-expansion-panel {
  background-color: transparent
}
#examples-panels .v-expansion-panel-content__wrap {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
