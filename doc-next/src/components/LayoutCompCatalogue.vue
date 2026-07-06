<template>
  <v-card variant="flat">
    <v-list :lines="false">
      <v-divider />
      <template v-for="comp in components" :key="comp.name">
        <v-list-item
          :id="`comp-${comp.name}`"
          class="my-2 px-2 reference-anchor"
        >
          <v-list-item-title class="d-flex align-center flex-wrap ga-2">
            <code class="font-weight-bold">{{ comp.name }}</code>
            <v-chip
              v-for="characteristic in comp.characteristics"
              :key="characteristic"
              size="small"
              variant="tonal"
            >
              {{ characteristic }}
            </v-chip>
            <v-chip v-if="!comp.description" size="small" variant="tonal" color="warning">
              not documented yet
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="comp.description || comp.page"
            class="my-2"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="comp.description" />
            <template v-if="comp.page">
              Documented on the <router-link :to="comp.page.to">{{ comp.page.label }}</router-link> page.
            </template>
          </v-list-item-subtitle>
          <div
            v-if="comp.props.length"
            class="pl-4 mb-1"
          >
            <div
              v-for="prop in comp.props"
              :key="prop.name"
              class="my-1 text-body-2"
            >
              <code>{{ prop.name }}</code>
              <v-chip size="x-small" variant="tonal" class="mx-2">
                {{ prop.type }}
              </v-chip>
              <v-chip v-if="prop.computed" size="x-small" variant="tonal" color="secondary" class="me-2">
                computed
              </v-chip>
              <v-chip v-if="!prop.description" size="x-small" variant="tonal" color="warning" class="me-2">
                not documented yet
              </v-chip>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="prop.description" />
              <template v-if="prop.see">
                See <router-link :to="prop.see.to">{{ prop.see.label }}</router-link>.
              </template>
            </div>
          </div>
        </v-list-item>
        <v-divider />
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import layoutVocabulary from 'virtual:layout-vocabulary'

const components = layoutVocabulary.components
</script>
