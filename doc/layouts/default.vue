<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :temporary="temporary"
      :permanent="!temporary"
      app
      class="main-drawer"
      theme="dark"
    >
      <v-list class="py-0">
        <v-list-item
          to="/"
          class="text-primary py-2"
        >
          <v-list-item-title class="text-h6 font-weight-bold">
            VJSF
          </v-list-item-title>
          <v-list-item-subtitle class="font-weight-bold">
            {{ version }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-list
        class="pt-0"
        color="primary"
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
        <v-list-item to="/2to3">
          <v-list-item-title>
            2.x to 3.x
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/configuration">
          <v-list-item-title>
            Configuration
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/expressions">
          <v-list-item-title>
            Expressions
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/editor">
          <v-list-item-title>
            Editor
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list
        density="compact"
        nav
      >
        <v-list-subheader>Examples</v-list-subheader>
        <v-list-item
          v-for="examplesCategory of examples"
          :key="examplesCategory.id"
          :to="`/${examplesCategory.id}`"
          class="mb-0"
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
      density="comfortable"
      :color="theme.global.name.value === 'dark' ? '#121212' : '#FFFFFF'"
      scroll-behavior="elevate"
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
        icon
        color="primary"
        @click="toggleTheme"
      >
        <v-icon
          v-if="theme.global.name.value === 'light'"
          icon="mdi-weather-night"
        />
        <v-icon
          v-else
          icon="mdi-weather-sunny"
        />
      </v-btn>
      <v-btn
        href="https://github.com/sponsors/koumoul-dev"
        variant="outlined"
        rounded
        color="primary"
        style="text-transform: none;"
        class="mx-2"
      >
        <template #prepend>
          <v-icon
            color="pink-accent-3"
            size="large"
            icon="mdi-heart"
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
        :color="theme.global.name.value === 'light' ? 'black' : 'white'"
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

<script setup>
// import SearchWidget from '@koumoul/data-fair-search-widget/src/components/search-widget.vue'
import { watch, ref, computed, onMounted } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import examples from '~/examples/'
import { version } from '~/../lib/package.json'

const theme = useTheme()
const display = useDisplay()

onMounted(() => {
  const storedTheme = window.localStorage.getItem('theme')
  if (storedTheme) theme.global.name.value = storedTheme
})

const toggleTheme = () => {
  if (theme.global.name.value === 'dark') theme.global.name.value = 'light'
  else theme.global.name.value = 'dark'
  localStorage.setItem('theme', theme.global.name.value)
}

const drawer = ref(false)

// eslint-disable-next-line no-undef
const route = useRoute()
const temporary = computed(() => ['categoryId-id', 'editor'].includes(/** @type string */(route.name)) || /** @type string */(route.name).startsWith('compiled-') || display.smAndDown.value)

watch(temporary, (newValue) => {
  drawer.value = !newValue
}, { immediate: true })
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
