<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <p>Runtime compilation</p>
            <p>{{ person1 }}</p>
            <v-form>
              <vjsf
                v-model="person1"
                :schema="personSchema"
                :options="runtimeOptions"
              />
            </v-form>
          </v-col>
          <v-col>
            <p>Build-time compilation</p>
            <p>{{ person2 }}</p>
            <v-form>
              <vjsf-person
                v-model="person2"
                :options="options"
              />
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import personSchema from './schemas/person.json'
import Vjsf from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'
import VjsfPerson from './components/compiled/vjsf-person.vue'

const person1 = ref<any>(null)
const person2 = ref<any>(null)
const options = {}
const runtimeOptions = {...options, plugins: [VjsfMarkdown]}
</script>

