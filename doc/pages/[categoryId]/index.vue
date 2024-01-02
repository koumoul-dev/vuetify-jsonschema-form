<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container v-if="examplesCategory">
    <h1 class="text-h3 mb-6">
      {{ examplesCategory.title }}
    </h1>
    <markdown-block :content="examplesCategory.description" />
    <template
      v-for="example in examplesCategory.examples"
      :key="example.id"
    >
      <a
        :id="example.id"
        class="anchor"
      />
      <h2 class="text-h4 mt-8 mb-3">
        {{ example.title }}
        <v-btn
          icon="mdi-fullscreen"
          flat
          title="open example in fullscreen"
          :to="`/${examplesCategory.id}/${example.id}`"
        />
      </h2>
      <v-alert
        v-if="example.warning"
        type="warning"
        variant="outlined"
        class="mb-4"
      >
        <markdown-block :content="example.warning" />
      </v-alert>
      <markdown-block :content="example.description" />
      <example
        :example="example"
        :v2="examplesCategory.id === 'v2-compat'"
      />
    </template>

    <toc :sections="examplesCategory.examples" />
  </v-container>
  <v-alert v-else>
    No examples category found with id {{ $route.params.categoryId }}
  </v-alert>
</template>

<script setup>
import { computed } from 'vue'
import { VContainer, VBtn, VAlert } from 'vuetify/components'
import examples from '~/examples/'

const route = useRoute()

const examplesCategory = computed(() => examples.find(e => e.id === route.params.categoryId))

const title = computed(() => 'VJSF - ' + (examplesCategory.value?.title || 'Unknown category'))

useHead({ title })
</script>

<style lang="css">
a.anchor {
  display: block;
  position: relative;
  top: -60px;
  visibility: hidden;
}
</style>
