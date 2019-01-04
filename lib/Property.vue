<template lang="html">
  <div v-if="fullSchema" class="vjsf-property">
    <!-- Hide const ? Or make a readonly field -->
    <div v-if="fullSchema.const !== undefined" />

    <!-- Date picker -->
    <v-menu v-else-if="fullSchema.type === 'string' && ['date', 'date-time'].includes(fullSchema.format)" ref="menu" :close-on-content-click="false" v-model="menu"
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
        :hint="fullSchema.description"
        :required="required"
        :rules="rules"
        :clearable="!required"
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
    <v-input v-else-if="fullSchema.format === 'hexcolor'"
             :name="fullKey"
             :label="label"
             :hint="fullSchema.description"
             :required="required"
             :rules="rules"
             :disabled="disabled"
             persistent-hint>
      &nbsp;&nbsp;<swatches v-model="modelWrapper[modelKey]" :disabled="disabled" :colors="options.colors" :trigger-style="{width:'36px', height:'36px'}" shapes="circles" />
    </v-input>

    <!-- Select field based on an enum (array or simple value) -->
    <v-select v-else-if="(fullSchema.type === 'array' && fullSchema.items.enum) || fullSchema.enum"
              :items="fullSchema.type === 'array' ? fullSchema.items.enum : fullSchema.enum"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :hint="fullSchema.description"
              :persistent-hint="!modelWrapper[modelKey]"
              :required="required"
              :rules="rules"
              :disabled="disabled"
              :clearable="!required"
              :multiple="fullSchema.type === 'array'"
    />

    <!-- Select field based on a oneOf on a simple type (array or simple value) -->
    <!-- cf https://github.com/mozilla-services/react-jsonfullSchema-form/issues/532 -->
    <v-select v-else-if="(fullSchema.type === 'array' && ['string', 'integer', 'number'].includes(fullSchema.items.type) && fullSchema.items.oneOf) || (['string', 'integer', 'number'].includes(fullSchema.type) && fullSchema.oneOf)"
              :items="(fullSchema.type === 'array' ? fullSchema.items : fullSchema).oneOf.map(item => ({value: item.const || (item.enum && item.enum[0]), text: item.title}))"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :hint="fullSchema.description"
              :persistent-hint="!modelWrapper[modelKey]"
              :required="required"
              :disabled="disabled"
              :rules="rules"
              :clearable="!required"
              :multiple="fullSchema.type === 'array'"
    />

    <!-- Select field on an ajax response or from an array in another part of the data -->
    <v-select v-else-if="fromUrl || fullSchema['x-fromData']"
              :items="selectItems"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :hint="fullSchema.description"
              :persistent-hint="!modelWrapper[modelKey]"
              :no-data-text="options.noDataMessage"
              :disabled="disabled"
              :required="required"
              :rules="rules"
              :item-text="itemTitle"
              :item-value="itemKey"
              :return-object="(fullSchema.type === 'array' && fullSchema.items.type === 'object') || fullSchema.type === 'object'"
              :clearable="!required"
              :loading="loading"
              :multiple="fullSchema.type === 'array'"
    />

    <!-- auto-complete field on an ajax response with query -->
    <v-autocomplete v-else-if="fromUrlWithQuery"
                    :items="selectItems"
                    :search-input.sync="q"
                    v-model="modelWrapper[modelKey]"
                    :name="fullKey"
                    :label="label"
                    :hint="fullSchema.description"
                    :persistent-hint="!modelWrapper[modelKey]"
                    :no-data-text="options.noDataMessage"
                    :disabled="disabled"
                    :required="required"
                    :rules="rules"
                    :item-text="itemTitle"
                    :item-value="itemKey"
                    :return-object="(fullSchema.type === 'array' && fullSchema.items.type === 'object') || fullSchema.type === 'object'"
                    :clearable="!required"
                    :filter="() => true"
                    :placeholder="options.searchMessage"
                    :loading="loading"
                    :multiple="fullSchema.type === 'array'"
    />

    <!-- Long text field in a textarea -->
    <v-textarea v-else-if="fullSchema.type === 'string' && (fullSchema.maxLength && fullSchema.maxLength > 1000 && fullSchema['x-display'] !== 'single-line')"
                v-model="modelWrapper[modelKey]"
                :name="fullKey"
                :label="label"
                :hint="fullSchema.description"
                :disabled="disabled"
                :required="required"
                :rules="rules"
                box
    />

    <!-- Simple text field -->
    <v-text-field v-else-if="fullSchema.type === 'string'"
                  v-model="modelWrapper[modelKey]"
                  :name="fullKey"
                  :label="label"
                  :hint="fullSchema.description"
                  :disabled="disabled"
                  :required="required"
                  :rules="rules"
    />

    <!-- Simple number fields -->
    <v-text-field v-else-if="fullSchema.type === 'number' || fullSchema.type === 'integer'"
                  v-model.number="modelWrapper[modelKey]"
                  :name="fullKey"
                  :label="label"
                  :hint="fullSchema.description"
                  :min="fullSchema.minimum"
                  :max="fullSchema.maximum"
                  :step="fullSchema.type === 'integer' ? 1 : 0.01"
                  :disabled="disabled"
                  :required="required"
                  :rules="rules"
                  type="number"/>

    <!-- Simple boolean field -->
    <v-checkbox v-else-if="fullSchema.type === 'boolean'"
                v-model="modelWrapper[modelKey]"
                :label="label"
                :name="fullKey"
                :hint="fullSchema.description"
                :disabled="disabled"
                :required="required"
                :rules="rules"
    />

    <!-- Simple strings array -->
    <v-combobox
      v-else-if="fullSchema.type === 'array' && fullSchema.items.type === 'string'"
      v-model="modelWrapper[modelKey]"
      :name="fullKey"
      :label="label"
      :hint="fullSchema.description"
      :persistent-hint="!modelWrapper[modelKey]"
      :required="required"
      :rules="rules"
      :disabled="disabled"
      chips
      multiple
      append-icon=""
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          :selected="data.selected"
          close
          @input="modelWrapper[modelKey].splice(modelWrapper[modelKey].indexOf(data.item))"
        >
          {{ data.item }}
        </v-chip>
      </template>
    </v-combobox>

    <!-- Object sub container with properties that may include a select based on a oneOf and subparts base on a allOf -->
    <div v-else-if="fullSchema.type === 'object'">
      <v-subheader v-if="fullSchema.title" :style="foldable ? 'cursor:pointer;' :'' " class="mt-2" @click="folded = !folded">
        {{ fullSchema.title }}
        &nbsp;
        <v-icon v-if="foldable && folded">arrow_drop_down</v-icon>
        <v-icon v-if="foldable && !folded">arrow_drop_up</v-icon>
      </v-subheader>

      <v-slide-y-transition>

        <div v-show="!foldable || !folded">
          <p v-if="fullSchema.description">{{ fullSchema.description }}</p>
          <property v-for="childProp in fullSchema.properties" :key="childProp.key"
                    :schema="childProp"
                    :model-wrapper="modelWrapper[modelKey]"
                    :model-root="modelRoot"
                    :model-key="childProp.key"
                    :parent-key="fullKey + '.'"
                    :required="!!(fullSchema.required && fullSchema.required.includes(childProp.key))"
                    :options="options"
                    @error="e => $emit('error', e)"
          />

          <!-- Sub containers for allOfs -->
          <property
            v-for="(currentAllOf, i) in (fullSchema.allOf || [])" :key="i"
            :schema="Object.assign({}, currentAllOf, {type: 'object'})"
            :model-wrapper="subModels"
            :model-root="modelRoot"
            :model-key="'allOf-' + i"
            :parent-key="parentKey"
            :options="options"
            @error="e => $emit('error', e)"
          />

          <!-- Sub container with a select for oneOfs -->
          <v-select
            v-if="fullSchema.oneOf"
            :items="fullSchema.oneOf"
            v-model="currentOneOf"
            :disabled="disabled"
            :item-value="item => {return oneOfConstProp ? item.properties[oneOfConstProp.key].const : item.title}"
            :label="oneOfConstProp ? (oneOfConstProp.title || oneOfConstProp.key) : 'Type'"
            item-text="title"
            return-object
          />
          <template v-if="currentOneOf">
            <property
              :schema="Object.assign({}, currentOneOf, {title: null, type: 'object'})"
              :model-wrapper="subModels"
              :model-root="modelRoot"
              :parent-key="parentKey"
              :options="options"
              model-key="currentOneOf"
              @error="e => $emit('error', e)"
            />
          </template>
        </div>
      </v-slide-y-transition>
    </div>

    <!-- Tuples array sub container -->
    <div v-else-if="fullSchema.type === 'array' && Array.isArray(fullSchema.items)">
      <v-subheader v-if="fullSchema.title" :style="foldable ? 'cursor:pointer;' :'' " class="mt-2" @click="folded = !folded">
        {{ fullSchema.title }}
        &nbsp;
        <v-icon v-if="foldable && folded">arrow_drop_down</v-icon>
        <v-icon v-if="foldable && !folded">arrow_drop_up</v-icon>
      </v-subheader>
      <v-slide-y-transition>
        <div v-show="!foldable || !folded">
          <p v-if="fullSchema.description">{{ fullSchema.description }}</p>
          <property v-for="(child, i) in fullSchema.items" :key="i"
                    :schema="child"
                    :model-wrapper="modelWrapper[modelKey]"
                    :model-root="modelRoot"
                    :model-key="i"
                    :parent-key="fullKey + '.'"
                    :options="options"
                    @error="e => $emit('error', e)"
          />
        </div>
      </v-slide-y-transition>
    </div>

    <!-- Dynamic size array of complex types sub container -->
    <div v-else-if="fullSchema.type === 'array'">
      <v-layout row class="mt-2">
        <v-subheader>{{ label }}</v-subheader>
        <p v-if="fullSchema.description">{{ fullSchema.description }}</p>
        <v-btn v-if="!disabled" icon color="primary" @click="modelWrapper[modelKey].push(fullSchema.items.default || defaultValue(fullSchema.items))">
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>

      <v-container v-if="modelWrapper[modelKey] && modelWrapper[modelKey].length" grid-list-md class="pt-0 px-2">
        <v-layout row wrap>
          <draggable v-model="modelWrapper[modelKey]" :options="{handle:'.handle'}" style="width: 100%;">
            <v-flex v-for="(itemModel, i) in modelWrapper[modelKey]" :key="i" xs12>
              <v-card class="array-card">
                <v-card-text>
                  <property :schema="fullSchema.items"
                            :model-wrapper="modelWrapper[modelKey]"
                            :model-root="modelRoot"
                            :model-key="i"
                            :parent-key="`${fullKey}.${i}.`"
                            :options="options"
                            @error="e => $emit('error', e)"/>
                </v-card-text>
                <v-card-actions v-if="!disabled">
                  <v-btn v-if="fullSchema['x-sortable'] !== false" flat icon class="handle">
                    <v-icon>reorder</v-icon>
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

    <p v-else-if="options.debug">Unsupported type "{{ fullSchema.type }}" - {{ fullSchema }}</p>
  </div>
</template>

<script>
const matchAll = require('match-all')

export default {
  name: 'Property',
  props: ['schema', 'modelWrapper', 'modelRoot', 'modelKey', 'parentKey', 'required', 'options'],
  data() {
    return {
      ready: false,
      menu: false,
      rawSelectItems: null,
      q: '',
      currentOneOf: null,
      fromUrlParams: {},
      loading: false,
      folded: true,
      subModels: {} // a container for objects from root oneOfs and allOfs
    }
  },
  computed: {
    fullSchema() {
      const fullSchema = JSON.parse(JSON.stringify(this.schema))

      if (fullSchema.type !== 'object') return fullSchema

      // Properties as array, because order matters
      fullSchema.properties = JSON.parse(JSON.stringify(this.objectToArray(fullSchema.properties)))
      fullSchema.required = fullSchema.required || []
      fullSchema.dependencies = fullSchema.dependencies || {}

      // Extend schema based on satisfied dependencies
      if (fullSchema.dependencies) {
        Object.keys(fullSchema.dependencies).forEach(depKey => {
          const dep = fullSchema.dependencies[depKey]
          // cases where dependency does not apply
          if (!this.modelWrapper[this.modelKey]) return
          const val = this.getDeepKey(this.modelWrapper[this.modelKey], depKey)
          if ([null, undefined].includes(val)) return
          if (Array.isArray(val) && val.length === 0) return
          if (typeof val === 'object' && Object.keys(val).length === 0) return
          // dependency applies
          fullSchema.required = fullSchema.required.concat(dep.required || [])
          fullSchema.properties = fullSchema.properties.concat(this.objectToArray(dep.properties))
        })
      }

      return fullSchema
    },
    fullKey() { return (this.parentKey + this.modelKey).replace('root.', '') },
    label() { return this.fullSchema.title || (typeof this.modelKey === 'string' ? this.modelKey : '') },
    rules() {
      const rules = []
      if (this.required) rules.push((val) => (val !== undefined && val !== null && val !== '') || this.options.requiredMessage)
      return rules
    },
    fromUrl() {
      return !!(this.fullSchema['x-fromUrl'] && this.fullSchema['x-fromUrl'].indexOf('{q}') === -1)
    },
    fromUrlWithQuery() {
      return !!(this.fullSchema['x-fromUrl'] && this.fullSchema['x-fromUrl'].indexOf('{q}') !== -1)
    },
    fromUrlKeys() {
      // Look for variable parts in the URL used to fetch data
      if (!this.fullSchema['x-fromUrl']) return null
      return matchAll(this.fullSchema['x-fromUrl'], /\{(.*?)\}/g).toArray().filter(key => key !== 'q')
    },
    selectItems() {
      if (!this.rawSelectItems) return []
      if (this.fullSchema.type === 'object' && this.fullSchema.properties && Object.keys(this.fullSchema.properties).length) {
        const keys = this.fullSchema.properties.map(p => p.key)
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
      return this.fullSchema['x-itemKey'] || 'key'
    },
    itemTitle() {
      return this.fullSchema['x-itemTitle'] || 'title'
    },
    disabled() {
      return this.options.disableAll
    },
    foldable() {
      return this.options.autoFoldObjects && this.parentKey && this.fullSchema.title
    },
    oneOfConstProp() {
      if (!this.fullSchema.oneOf) return
      const props = this.fullSchema.oneOf[0].properties
      const key = Object.keys(props).find(p => !!props[p].const)
      if (!key) return
      return {...props[key], key}
    }
  },
  watch: {
    q() {
      // This line prevents reloading the list just after selecting an item in an auto-complete
      if (this.modelWrapper[this.modelKey] && this.modelWrapper[this.modelKey][this.itemTitle] === this.q) return
      this.getSelectItems()
    },
    fullSchema: {
      handler() {
        if (this.fullSchema) this.initFromSchema()
      },
      immediate: true
    },
    subModels: {
      handler() {
        if (this.fullSchema) this.initFromSchema()
        Object.keys(this.subModels).forEach(subModel => {
          Object.keys(this.subModels[subModel]).forEach(key => {
            this.$set(this.modelWrapper[this.modelKey], key, this.subModels[subModel][key])
          })
        })
      },
      deep: true
    }
  },
  methods: {
    getDeepKey(obj, key) {
      const keys = key.split('.')
      for (let i = 0; i < keys.length; i++) {
        obj = obj[keys[i]]
        if ([null, undefined].includes(obj)) break
      }
      return obj
    },
    objectToArray(obj) {
      return Object.keys(obj || {}).map(key => ({...obj[key], key}))
    },
    defaultValue(schema) {
      if (schema.type === 'object' && !schema['x-fromUrl'] && !schema['x-fromData']) return {}
      if (schema.type === 'array') return []
      return null
    },
    getSelectItems() {
      if (!this.options.httpLib) return this.$emit('error', 'No http lib found to perform ajax request')
      let url = this.fullSchema['x-fromUrl'].replace('{q}', this.q || '')
      for (let key of this.fromUrlKeys) {
        // URL parameters are incomplete
        if (this.fromUrlParams[key] === undefined) return
        else url = url.replace(`{${key}}`, this.fromUrlParams[key])
      }
      this.loading = true
      this.options.httpLib.get(url)
        .then(res => {
          const body = res.data || res.body
          const items = this.fullSchema['x-itemsProp'] ? body[this.fullSchema['x-itemsProp']] : body
          if (!Array.isArray(items)) throw new Error(`Result of http fetch ${url} is not an array`)
          this.rawSelectItems = items
          this.loading = false
        })
        .catch(err => {
          this.$emit('error', err.message)
          this.loading = false
        })
    },
    initFromSchema() {
      // Manage default values
      if (this.modelWrapper[this.modelKey] === undefined) {
        let def = this.defaultValue(this.fullSchema)
        if (this.fullSchema.default !== undefined) def = JSON.parse(JSON.stringify(this.fullSchema.default))
        this.$set(this.modelWrapper, this.modelKey, def)
      }
      // const always wins
      if (this.fullSchema.const !== undefined) this.$set(this.modelWrapper, this.modelKey, this.fullSchema.const)
      // cleanup extra properties
      if (this.fullSchema.type === 'object' && this.fullSchema.properties && Object.keys(this.fullSchema.properties).length && this.modelWrapper[this.modelKey]) {
        Object.keys(this.modelWrapper[this.modelKey]).forEach(key => {
          if (!this.fullSchema.properties.find(p => p.key === key)) delete this.modelWrapper[this.modelKey][key]
        })
      }

      this.ready = true

      // Case of a select based on ajax query
      if (this.fromUrl) this.getSelectItems()
      // Case of an auto-complete field already defined
      if (this.fromUrlWithQuery && this.modelWrapper[this.modelKey] && this.modelWrapper[this.modelKey][this.itemTitle] !== undefined) {
        this.rawSelectItems = [this.modelWrapper[this.modelKey]]
        this.q = this.modelWrapper[this.modelKey][this.itemTitle]
      }
      // Case of a select based on an array somewhere in the data
      if (this.fullSchema['x-fromData']) {
        this.$watch('modelRoot.' + this.fullSchema['x-fromData'], (val) => {
          this.rawSelectItems = val
        }, {immediate: true})
      }
      // Watch the dynamic parts of the URL used to fill the select field
      if (this.fromUrlKeys) {
        this.fromUrlKeys.forEach(key => {
          if (key.startsWith('context.')) {
            this.$watch('options.' + key, (val) => {
              this.fromUrlParams[key] = val
              this.getSelectItems()
            }, {immediate: true})
          } else {
            this.$watch('modelRoot.' + key, (val) => {
              this.fromUrlParams[key] = val
              this.getSelectItems()
            }, {immediate: true})
          }
        })
      }
    }
  }
}

</script>

<style>
.vjsf-property .array-card .v-card__text {
  padding: 6px 16px 0 16px;
}
.vjsf-property .array-card .v-card__actions {
  padding: 0 16px 6px 16px;
}

.vjsf-property .v-input--selection-controls {
  margin-top: 0;
}

</style>
