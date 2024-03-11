<template>
  <v-container class="doc-content-page">
    <h1 class="text-h2 mb-8">
      {{ title }}
    </h1>
    <v-dialog width="auto">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          color="primary"
        >
          Open dialog
        </v-btn>
      </template>
      <v-card>
        <v-form>
          Hello
          <vjsf
            v-model="model"
            :schema="schema"
          />
        </v-form>
      </v-card>
    </v-dialog>

    <!--<v-form>
      <vjsf
        v-model="model"
        :schema="schema"
      />
    </v-form>
    -->
  </v-container>
</template>

<script setup>
// cf https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/430

import { ref } from 'vue'
import Vjsf from '@koumoul/vjsf'
import { VContainer, VDialog, VBtn, VForm, VCard } from 'vuetify/components'

const title = 'dev - dialog integration'

const model = ref({})

const schema = {
  type: 'object',
  properties: {
    array1: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          string1: {
            type: 'string'
          },
          string2: {
            type: 'string'
          }
        }
      }
    }
  }
}

useHead({
  title: 'VJSF - ' + title
})
</script>

<style lang="css" scoped>
</style>
