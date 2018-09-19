<template lang="html">
  <div>
    <!-- Date picker -->
    <v-menu v-if="schema.type === 'string' && ['date', 'date-time'].includes(schema.format)" ref="menu" :close-on-content-click="false" v-model="menu"
            :nudge-right="40"
            :return-value.sync="modelWrapper[modelKey]"
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

    <!-- Select field based on an enum -->
    <v-select v-else-if="schema.enum"
              :items="schema.enum"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :hint="schema.description"
              :required="required"
              :rules="rules"
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
              :rules="rules"
    />

    <!-- Select field on an ajax response -->
    <v-select v-else-if="fromUrl || schema['x-fromData']"
              :items="selectItems"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :hint="schema.description"
              :required="required"
              :rules="rules"
              :item-text="schema['x-itemTitle'] || 'title'"
              :item-value="schema['x-itemKey'] || 'value'"
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
                    :required="required"
                    :rules="rules"
                    :item-text="schema['x-itemTitle'] || 'title'"
                    :item-value="schema['x-itemKey'] || 'value'"
                    :return-object="schema.type === 'object'"
    />

    <!-- Simple text field -->
    <v-text-field v-else-if="schema.type === 'string'"
                  v-model="modelWrapper[modelKey]"
                  :name="fullKey"
                  :label="label"
                  :hint="schema.description"
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
                  :required="required"
                  :rules="rules"
                  type="number"/>

    <!-- Simple boolean field -->
    <v-checkbox v-else-if="schema.type === 'boolean'"
                v-model="modelWrapper[modelKey]"
                :label="label"
                :name="fullKey"
                :hint="schema.description"
                :required="required"
                :rules="rules"
    />

    <!-- Object sub container -->
    <div v-else-if="schema.type === 'object'">
      <v-subheader v-if="schema.title">{{ schema.title }}</v-subheader>
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

    <!-- Array sub container -->
    <div v-else-if="schema.type === 'array'">
      <v-layout row>
        <v-subheader>{{ label }}</v-subheader>
        <v-btn icon color="primary" @click="modelWrapper[modelKey].push(schema.items.default || defaultValue(schema.items.type))">
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>

      <v-container grid-list-md>
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
                <v-card-actions>
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
import Draggable from 'vuedraggable'

export default {
  name: 'Property',
  components: {Draggable},
  props: ['schema', 'modelWrapper', 'modelRoot', 'modelKey', 'parentKey', 'required', 'options'],
  data() {
    return {ready: false, menu: false, rawSelectItems: null, q: ''}
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
    }
  },
  watch: {
    q() {
      this.getSelectItems()
    }
  },
  created() {
    // this.modelWrapper[this.modelKey] = this.modelWrapper[this.modelKey] || null
    if (this.modelWrapper[this.modelKey] === undefined) {
      this.$set(this.modelWrapper, this.modelKey, this.schema.default || this.defaultValue(this.schema.type))
    }
    this.ready = true
    // Case of a select based on ajax query
    if (this.fromUrl) this.getSelectItems()
    // Case of a select based on an array somewhere in the data
    if (this.schema['x-fromData']) {
      console.log('BOUL', 'modelRoot.' + this.schema['x-fromData'])
      this.$watch('modelRoot.' + this.schema['x-fromData'], (val) => {
        console.log('VAL', val)
        this.rawSelectItems = val
      }, {immediate: true})
    }
  },
  methods: {
    defaultValue(type) {
      if (type === 'object') return {}
      if (type === 'array') return []
      return null
    },
    getSelectItems() {
      if (!this.options.httpLib) return this.$emit('error', 'No http lib found to perform ajax request')
      const url = this.schema['x-fromUrl'].replace('{q}', this.q)
      this.options.httpLib.get(url).then(res => {
        const body = res.data || res.body
        const items = this.schema['x-itemsProp'] ? body[this.schema['x-itemsProp']] : body
        if (!Array.isArray(items)) throw new Error(`Result of http fetch ${url} is not an array`)
        this.rawSelectItems = items
      }).catch(err => this.$emit('error', err.message))
    }
  }
}

</script>

<style lang="less">
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
</style>
