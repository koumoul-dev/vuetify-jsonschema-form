<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :temporary="temporary"
      :permanent="!temporary"
      app
      class="main-drawer"
    >
      <v-list class="py-0">
        <v-list-item
          to="/"
          class="text-primary"
        >
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
        color="primary"
        nav
        density="compact"
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
        <v-list-item to="/2to3">
          <v-list-item-title>
            2.x to 3.x
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="examplesCategory of examples"
          :key="examplesCategory.id"
          :to="`/${examplesCategory.id}`"
        >
          <v-list-item-title>{{ examplesCategory.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <template #append>
        <v-footer>
          <v-spacer />
          <span class="text-caption">Maintained by&nbsp;<a
            href="https://koumoul.com"
            class="text-primary text-decoration-none font-weight-medium"
          >Koumoul</a></span>
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
        v-if="temporary"
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
      >
        <template #prepend>
          <v-icon
            color="pink"
            size="large"
            icon="mdi-heart-outline"
          />
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
        <v-icon icon="mdi-github" />
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>
// import SearchWidget from '@koumoul/data-fair-search-widget/src/components/search-widget.vue'
import examples from '~/examples/'
import { version } from '~/../package.json'

export default {
  components: { },
  data: () => ({
    version,
    drawer: false,
    nodeEnv: process.env.NODE_ENV,
    examples
  }),
  computed: {
    temporary () {
      return this.$route.name === 'categoryId-id' || this.$vuetify.display.smAndDown
    }
  },
  watch: {
    temporary: {
      handler (newValue) {
        this.drawer = !newValue
      },
      immediate: true
    }
  }
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
