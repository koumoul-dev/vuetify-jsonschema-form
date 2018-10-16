<template lang="html">
  <div class="vjsf-property">
    <!-- Hide const ? Or make a readonly field -->
    <div v-if="schema.const !== undefined" />

    <!-- Date picker -->
    <v-menu v-else-if="schema.type === 'string' && ['date', 'date-time'].includes(schema.format)" ref="menu" :close-on-content-click="false" v-model="menu"
            :nudge-right="40"
            :return-value.sync="modelWrapper[modelKey]"
            :disabled="disabled"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="modelWrapper[modelKey]"
        :label="label"
        :name="fullKey"
        :hint="schema.description"
        :required="required"
        :rules="rules"
        prepend-icon="event"
        readonly
      />
      <v-date-picker v-model="modelWrapper[modelKey]" no-title scrollable>
        <v-spacer/>
        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.menu.save(modelWrapper[modelKey])">OK</v-btn>
      </v-date-picker>
    </v-menu>

    <!-- Color picking -->
    <v-input v-else-if="schema.format === 'hexcolor'"
             :name="fullKey"
             :label="label"
             :hint="schema.description"
             :required="required"
             :rules="rules"
             :disabled="disabled">
      &nbsp;&nbsp;<swatches v-model="modelWrapper[modelKey]" :disabled="disabled" :colors="options.colors" :trigger-style="{width:'36px', height:'36px'}" shapes="circles" />
    </v-input>

    <!-- Select field based on an enum -->
    <v-select v-else-if="schema.enum"
              :items="schema.enum"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :hint="schema.description"
              :required="required"
              :rules="rules"
              :disabled="disabled"
    />

    <!-- Select field based on a oneOf on a simple type -->
    <!-- cf https://github.com/mozilla-services/react-jsonschema-form/issues/532 -->
    <v-select v-else-if="['string', 'integer', 'number'].includes(schema.type) && schema.oneOf"
              :items="schema.oneOf.map(item => ({value: item.const || (item.enum && item.enum[0]), text: item.title}))"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :hint="schema.description"
              :required="required"
              :disabled="disabled"
              :rules="rules"
    />

    <!-- Select field on an ajax response -->
    <v-select v-else-if="fromUrl || schema['x-fromData']"
              :items="selectItems"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :hint="schema.description"
              :disabled="disabled"
              :required="required"
              :rules="rules"
              :item-text="itemTitle"
              :item-value="itemKey"
              :return-object="schema.type === 'object'"
    />

    <!-- auto-complete field on an ajax response with query -->
    <v-autocomplete v-else-if="fromUrlWithQuery"
                    :items="selectItems"
                    :search-input.sync="q"
                    v-model="modelWrapper[modelKey]"
                    :name="fullKey"
                    :label="label"
                    :hint="schema.description"
                    :disabled="disabled"
                    :required="required"
                    :rules="rules"
                    :item-text="itemTitle"
                    :item-value="itemKey"
                    :return-object="schema.type === 'object'"
                    placeholder="Search..."
    />

    <!-- Simple text field -->
    <v-text-field v-else-if="schema.type === 'string'"
                  v-model="modelWrapper[modelKey]"
                  :name="fullKey"
                  :label="label"
                  :hint="schema.description"
                  :disabled="disabled"
                  :required="required"
                  :rules="rules"
    />

    <!-- Simple number fields -->
    <v-text-field v-else-if="schema.type === 'number' || schema.type === 'integer'"
                  v-model.number="modelWrapper[modelKey]"
                  :name="fullKey"
                  :label="label"
                  :hint="schema.description"
                  :min="schema.minimum"
                  :max="schema.maximum"
                  :step="schema.type === 'integer' ? 1 : 0.01"
                  :disabled="disabled"
                  :required="required"
                  :rules="rules"
                  type="number"/>

    <!-- Simple boolean field -->
    <v-checkbox v-else-if="schema.type === 'boolean'"
                v-model="modelWrapper[modelKey]"
                :label="label"
                :name="fullKey"
                :hint="schema.description"
                :disabled="disabled"
                :required="required"
                :rules="rules"
    />

    <!-- Object sub container with a choice of schema base on oneOf -->
    <div v-else-if="schema.type === 'object' && schema.oneOf">
      <v-subheader v-if="schema.title" class="mt-4">{{ schema.title }}</v-subheader>
      <v-select
        :items="schema.oneOf"
        v-model="currentOneOf"
        :disabled="disabled"
        item-value="title"
        item-text="title"
        return-object
      />
      <div v-if="currentOneOf">
        <property
          :schema="Object.assign({}, currentOneOf, {title: null})"
          :model-wrapper="modelWrapper"
          :model-root="modelRoot"
          :model-key="modelKey"
          :parent-key="parentKey"
          :options="options"
          @error="e => $emit('error', e)"
        />
      </div>
    </div>

    <!-- Simple object sub container -->
    <div v-else-if="schema.type === 'object' && schema.properties">
      <v-subheader v-if="schema.title" class="mt-4">{{ schema.title }}</v-subheader>
      <property v-for="childKey in Object.keys(schema.properties)" :key="childKey"
                :schema="schema.properties[childKey]"
                :model-wrapper="modelWrapper[modelKey]"
                :model-root="modelRoot"
                :model-key="childKey"
                :parent-key="fullKey + '.'"
                :required="!!(schema.required && schema.required.includes(childKey))"
                :options="options"
                @error="e => $emit('error', e)"
      />
    </div>

    <!-- Tuples array sub container -->
    <div v-else-if="schema.type === 'array' && Array.isArray(schema.items)">
      <v-subheader v-if="schema.title" class="mt-4">{{ schema.title }}</v-subheader>
      <property v-for="(child, i) in schema.items" :key="i"
                :schema="child"
                :model-wrapper="modelWrapper[modelKey]"
                :model-root="modelRoot"
                :model-key="i"
                :parent-key="fullKey + '.'"
                :options="options"
                @error="e => $emit('error', e)"
      />
    </div>

    <!-- Dynamic size array sub container -->
    <div v-else-if="schema.type === 'array'">
      <v-layout row class="mt-4">
        <v-subheader>{{ label }}</v-subheader>
        <v-btn v-if="!disabled" icon color="primary" @click="modelWrapper[modelKey].push(schema.items.default || defaultValue(schema.items.type))">
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>

      <v-container v-if="modelWrapper[modelKey] && modelWrapper[modelKey].length" grid-list-md>
        <v-layout row wrap>
          <draggable v-model="modelWrapper[modelKey]" :options="{handle:'.handle'}" style="width: 100%;">
            <v-flex v-for="(itemModel, i) in modelWrapper[modelKey]" :key="i" xs12>
              <v-card class="array-card">
                <v-card-text>
                  <property :schema="schema.items"
                            :model-wrapper="modelWrapper[modelKey]"
                            :model-root="modelRoot"
                            :model-key="i"
                            :parent-key="`${fullKey}.${i}.`"
                            :options="options"
                            @error="e => $emit('error', e)"/>
                </v-card-text>
                <v-card-actions v-if="!disabled">
                  <v-btn flat icon class="handle">
                    <v-icon>drag_handle</v-icon>
                  </v-btn>
                  <v-spacer/>
                  <v-btn flat icon color="warning" @click="modelWrapper[modelKey].splice(i, 1)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </draggable>
        </v-layout>
      </v-container>

    </div>

    <p v-else-if="options.debug">Unsupported type "{{ schema.type }}"</p>
  </div>
</template>

<script>
const matchAll = require('match-all')

export default {
  name: 'Property',
  props: ['schema', 'modelWrapper', 'modelRoot', 'modelKey', 'parentKey', 'required', 'options'],
  data() {
    return {ready: false, menu: false, rawSelectItems: null, q: '', currentOneOf: null, fromUrlParams: {}}
  },
  computed: {
    fullKey() { return (this.parentKey + this.modelKey).replace('root.', '') },
    label() { return this.schema.title || (typeof this.modelKey === 'string' ? this.modelKey : '') },
    rules() {
      const rules = []
      if (this.required) rules.push((val) => (val !== undefined && val !== null && val) !== '' || '')
      return rules
    },
    fromUrl() {
      return !!(this.schema['x-fromUrl'] && this.schema['x-fromUrl'].indexOf('{q}') === -1)
    },
    fromUrlWithQuery() {
      return !!(this.schema['x-fromUrl'] && this.schema['x-fromUrl'].indexOf('{q}') !== -1)
    },
    fromUrlKeys() {
      // Look for variable parts in the URL used to fetch data
      if (!this.schema['x-fromUrl']) return null
      return matchAll(this.schema['x-fromUrl'], /\{(.*?)\}/g).toArray().filter(key => key !== 'q')
    },
    selectItems() {
      if (!this.rawSelectItems) return []
      if (this.schema.type === 'object' && this.schema.properties) {
        const keys = Object.keys(this.schema.properties)
        return this.rawSelectItems.map(item => {
          const filteredItem = {}
          keys.forEach(key => {
            if (item[key] !== undefined) filteredItem[key] = item[key]
          })
          return filteredItem
        })
      } else {
        return this.rawSelectItems
      }
    },
    itemKey() {
      return this.schema['x-itemKey'] || 'key'
    },
    itemTitle() {
      return this.schema['x-itemTitle'] || 'title'
    },
    disabled() {
      return this.options.disableAll
    }
  },
  watch: {
    q() {
      // This line prevents reloading the list just after selecting an item in an auto-complete
      if (this.modelWrapper[this.modelKey] && this.modelWrapper[this.modelKey][this.itemTitle] === this.q) return
      this.getSelectItems()
    },
    schema() {
      this.initFromSchema()
    }
  },
  created() {
    this.initFromSchema()
  },
  methods: {
    defaultValue(type) {
      if (type === 'object') return {}
      if (type === 'array') return []
      return null
    },
    getSelectItems() {
      if (!this.options.httpLib) return this.$emit('error', 'No http lib found to perform ajax request')
      let url = this.schema['x-fromUrl'].replace('{q}', this.q)
      for (let key of this.fromUrlKeys) {
        // URL parameters are incomplete
        if (this.fromUrlParams[key] === undefined) return
        else url = url.replace(`{${key}}`, this.fromUrlParams[key])
      }
      this.options.httpLib.get(url).then(res => {
        const body = res.data || res.body
        const items = this.schema['x-itemsProp'] ? body[this.schema['x-itemsProp']] : body
        if (!Array.isArray(items)) throw new Error(`Result of http fetch ${url} is not an array`)
        this.rawSelectItems = items
      }).catch(err => this.$emit('error', err.message))
    },
    initFromSchema() {
      // Manage default values
      if (this.modelWrapper[this.modelKey] === undefined) {
        let def = this.defaultValue(this.schema.type)
        if (this.schema.default !== undefined) def = this.schema.default
        this.$set(this.modelWrapper, this.modelKey, def)
      }
      // const always wins
      if (this.schema.const !== undefined) this.$set(this.modelWrapper, this.modelKey, this.schema.const)
      // cleanup extra properties
      if (this.schema.type === 'object' && this.schema.properties) {
        Object.keys(this.modelWrapper[this.modelKey]).forEach(key => {
          if (!this.schema.properties[key]) delete this.modelWrapper[this.modelKey][key]
        })
      }

      this.ready = true

      // Case of a select based on ajax query
      if (this.fromUrl) this.getSelectItems()
      // Case of a select based on an array somewhere in the data
      if (this.schema['x-fromData']) {
        this.$watch('modelRoot.' + this.schema['x-fromData'], (val) => {
          this.rawSelectItems = val
        }, {immediate: true})
      }
      // Watch the dynamic parts of the URL used to fill the select field
      if (this.fromUrlKeys) {
        this.fromUrlKeys.forEach(key => {
          this.$watch('modelRoot.' + key, (val) => {
            this.fromUrlParams[key] = val
            if (this.fromUrl) this.getSelectItems()
          }, {immediate: true})
        })
      }
      // Case of an auto-complete field already defined
      if (this.fromUrlWithQuery && this.modelWrapper[this.modelKey] && this.modelWrapper[this.modelKey][this.itemTitle] !== undefined) {
        this.rawSelectItems = [this.modelWrapper[this.modelKey]]
        this.q = this.modelWrapper[this.modelKey][this.itemTitle]
      }
      // Fill oneOf items with shared elements
      if (this.schema.oneOf) {
        this.schema.oneOf.forEach(item => {
          item.title = item.title || this.schema.title
          item.type = item.type || this.schema.type
          if (item.properties || this.schema.properties) {
            item.properties = {...this.schema.properties, ...item.properties}
          }
        })
      }
      // Case of a sub type selection based on a oneOf
      if (this.schema.type === 'object' && this.schema.oneOf) {
        if (this.modelWrapper[this.modelKey] && this.modelWrapper[this.modelKey][this.itemKey]) {
          this.currentOneOf = this.schema.oneOf.find(item => item.properties[this.itemKey].const === this.modelWrapper[this.modelKey][this.itemKey])
        } else {
          this.currentOneOf = this.schema.oneOf[0]
        }
      }
    }
  }
}

</script>

<style lang="less">
.vjsf-property{
  .array-card {
    .v-card__text {
      padding: 6px 16px 0 16px;
    }
    .v-card__actions {
      padding: 0 16px 6px 16px;
    }
  }

  .v-input--selection-controls {
    margin-top: 0;
  }
}
</style>
