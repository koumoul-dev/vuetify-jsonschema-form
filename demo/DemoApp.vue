<template lang="html">
  <v-app>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-title>vuetify-jsonschema-form demo</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-md>
        <v-layout row>
          <v-flex xs6>
            <h2 class="title my-4">Schema:</h2>
            <v-layout row wrap>
              <v-flex xs6>
                <v-select :items="examples" v-model="example" :return-object="true" item-text="title" label="Choose an example" @change="applyExample" />
              </v-flex>
              <v-flex xs6>
                <v-container>
                  <v-layout row wrap>
                    <v-spacer/>
                    <v-btn color="primary" @click="applySchema">Apply</v-btn>
                    <v-btn @click="formatSchema">Format</v-btn>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>

            <v-textarea v-model="schemaStr" :error-messages="schemaError ? [schemaError.message] : []" :rows="20"/>
          </v-flex>
          <v-flex xs6>
            <h2 class="title my-4">
              Form
              <v-chip v-if="formValid" color="success">valid</v-chip>
              <v-chip v-else color="danger">invalid</v-chip>
            </h2>

            <v-form v-model="formValid" lazy-validation>
              <v-jsonschema-form v-if="schema" :schema="schema" :model="dataObject" :options="{debug: true, disableAll: false, context: {owner: {type: 'organization', id: '5a5dc47163ebd4a6f438589b'}}}" @error="e => window.alert(e)" />
            </v-form>
            <h2 class="title my-4">Data:</h2>
            <pre>{{ JSON.stringify(dataObject, null, 2) }}</pre>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import VJsonschemaForm from '../src/index.vue'
import examples from './examples'
import hjson from 'hjson' // more tolerant parsing of the schema for easier UX

export default {
  components: {VJsonschemaForm},
  data: function() {
    return {
      window,
      schema: null,
      schemaStr: '{}',
      schemaError: null,
      dataObject: {},
      examples,
      example: examples[0],
      formValid: false
    }
  },
  mounted() {
    this.applyExample()
  },
  methods: {
    applySchema() {
      try {
        this.schema = hjson.parse(this.schemaStr)
        this.schemaError = null
      } catch (err) {
        this.schemaError = err
      }
    },
    formatSchema() {
      try {
        const schema = hjson.parse(this.schemaStr)
        this.schemaStr = JSON.stringify(schema, null, 2)
        this.schemaError = null
      } catch (err) {
        this.schemaError = err
      }
    },
    applyExample() {
      this.schema = null
      setTimeout(() => {
        this.dataObject = JSON.parse(JSON.stringify(this.example.data || {}))
        this.schemaStr = JSON.stringify(this.example.schema, null, 2)
        this.applySchema()
      }, 1)
    }
  }
}
</script>

<style lang="css">
</style>
