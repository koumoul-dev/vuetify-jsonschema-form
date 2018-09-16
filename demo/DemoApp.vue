<template lang="html">
  <v-app>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-title>vuetify-jsonschema-form demo</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout row>
          <v-flex xs 6>
            <h2 class="title">Schema:</h2>
            <v-textarea v-model="schemaStr" :error-messages="schemaError ? [schemaError.message] : []"/>
            <div>
              <v-btn @click="applySchema">Apply</v-btn>
              <v-btn @click="formatSchema">Format</v-btn>
            </div>
            <h2 class="title">Data:</h2>
            <pre>{{ JSON.stringify(dataObject), null, 2 }}</pre>
          </v-flex>
          <v-flex xs 6>
            <v-jsonschema-form :schema="schema" :data="dataObject" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import VJsonschemaForm from '../src/index.vue'

export default {
  components: {VJsonschemaForm},
  data: function() {
    return {
      schema: {},
      schemaStr: '{}',
      schemaError: null,
      dataObject: {}
    }
  },
  methods: {
    applySchema() {
      try {
        this.schema = JSON.parse(this.schemaStr)
        this.schemaError = null
      } catch (err) {
        this.schemaError = err
      }
    },
    formatSchema() {
      try {
        const schema = JSON.parse(this.schemaStr)
        this.schemaStr = JSON.stringify(schema, null, 2)
        this.schemaError = null
      } catch (err) {
        this.schemaError = err
      }
    }
  }
}
</script>

<style lang="css">
</style>
