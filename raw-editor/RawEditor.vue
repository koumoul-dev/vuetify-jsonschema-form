<template lang="html">
  <v-app>
    <v-content>
      <v-container fluid grid-list-md>
        <v-layout row>
          <v-flex xs6>
            <v-textarea v-model="schemaStr" :rows="20" outlined @input="applySchema" />
          </v-flex>
          <v-flex xs6>
            <v-form ref="myForm" v-model="formValid">
              <v-jsonschema-form
                v-if="schema"
                :schema="schema"
                :model="dataObject"
              />
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import VJsonschemaForm from '../lib/index.vue'
import YAML from 'yaml'

export default {
  components: { VJsonschemaForm },
  data: function() {
    return {
      window,
      schema: null,
      schemaStr: `type: object
required: []
properties:
  firstname:
    type: string
    title: First name
  lastname:
    type: string
    title: Last name
`,
      schemaError: null,
      dataObject: {},
      formValid: false
    }
  },
  mounted() {
    this.applySchema()
    this.$nextTick().then(() => {
      this.$refs.myForm.validate()
    })
  },
  methods: {
    applySchema() {
      try {
        this.schema = YAML.parse(this.schemaStr)
        this.schemaError = null
      } catch (err) {
        console.error(err)
        this.schemaError = err
      }
    }
  }
}
</script>

<style lang="css">
</style>
