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
        :required="required"
        :rules="rules"
        :clearable="!required"
        prepend-icon="event"
        readonly >
        <v-tooltip v-if="fullSchema.description" slot="append-outer" left>
          <v-icon slot="activator">info</v-icon>
          <div class="vjsf-tooltip" v-html="htmlDescription" />
        </v-tooltip>
      </v-text-field>
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
             :required="required"
             :rules="rules"
             :disabled="disabled">
      <v-tooltip v-if="fullSchema.description" slot="append" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
      &nbsp;&nbsp;
      <swatches
        v-model="modelWrapper[modelKey]"
        :disabled="disabled"
        :colors="options.colors"
        :trigger-style="{width:'36px', height:'36px'}"
        shapes="circles" />
    </v-input>

    <!-- Select field based on an enum (array or simple value) -->
    <v-select v-else-if="(fullSchema.type === 'array' && fullSchema.items.enum) || fullSchema.enum"
              :items="fullSchema.type === 'array' ? fullSchema.items.enum : fullSchema.enum"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :required="required"
              :rules="rules"
              :disabled="disabled"
              :clearable="!required"
              :multiple="fullSchema.type === 'array'" >
      <v-tooltip v-if="fullSchema.description" slot="append-outer" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
    </v-select>

    <!-- Select field based on a oneOf on a simple type (array or simple value) -->
    <!-- cf https://github.com/mozilla-services/react-jsonfullSchema-form/issues/532 -->
    <v-select v-else-if="(fullSchema.type === 'array' && ['string', 'integer', 'number'].includes(fullSchema.items.type) && fullSchema.items.oneOf) || (['string', 'integer', 'number'].includes(fullSchema.type) && fullSchema.oneOf)"
              :items="(fullSchema.type === 'array' ? fullSchema.items : fullSchema).oneOf.map(item => ({value: item.const || (item.enum && item.enum[0]), text: item.title}))"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :required="required"
              :disabled="disabled"
              :rules="rules"
              :clearable="!required"
              :multiple="fullSchema.type === 'array'" >
      <v-tooltip v-if="fullSchema.description" slot="append-outer" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
    </v-select>

    <!-- Select field on an ajax response or from an array in another part of the data -->
    <v-select v-else-if="fromUrl || fullSchema['x-fromData']"
              :items="selectItems"
              v-model="modelWrapper[modelKey]"
              :name="fullKey"
              :label="label"
              :no-data-text="options.noDataMessage"
              :disabled="disabled"
              :required="required"
              :rules="rules"
              :item-text="itemTitle"
              :item-value="itemKey"
              :return-object="(fullSchema.type === 'array' && fullSchema.items.type === 'object') || fullSchema.type === 'object'"
              :clearable="!required"
              :loading="loading"
              :multiple="fullSchema.type === 'array'">
      <v-tooltip v-if="fullSchema.description" slot="append-outer" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
    </v-select>

    <!-- auto-complete field on an ajax response with query -->
    <v-autocomplete v-else-if="fromUrlWithQuery"
                    :items="selectItems"
                    :search-input.sync="q"
                    v-model="modelWrapper[modelKey]"
                    :name="fullKey"
                    :label="label"
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
                    :multiple="fullSchema.type === 'array'" >
      <v-tooltip v-if="fullSchema.description" slot="append-outer" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
    </v-autocomplete>

    <!-- Long text field in a textarea -->
    <v-textarea v-else-if="fullSchema.type === 'string' && (fullSchema.maxLength && fullSchema.maxLength > 1000 && fullSchema['x-display'] !== 'single-line')"
                v-model="modelWrapper[modelKey]"
                :name="fullKey"
                :label="label"
                :disabled="disabled"
                :required="required"
                :rules="rules"
                box
    >
      <v-tooltip v-if="fullSchema.description" slot="append-outer" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
    </v-textarea>

    <!-- Simple text field -->
    <v-text-field v-else-if="fullSchema.type === 'string'"
                  v-model="modelWrapper[modelKey]"
                  :name="fullKey"
                  :label="label"
                  :disabled="disabled"
                  :required="required"
                  :rules="rules"
    >
      <v-tooltip v-if="fullSchema.description" slot="append-outer" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
    </v-text-field>

    <!-- Simple number fields -->
    <v-text-field v-else-if="fullSchema.type === 'number' || fullSchema.type === 'integer'"
                  v-model.number="modelWrapper[modelKey]"
                  :name="fullKey"
                  :label="label"
                  :min="fullSchema.minimum"
                  :max="fullSchema.maximum"
                  :step="fullSchema.type === 'integer' ? 1 : 0.01"
                  :disabled="disabled"
                  :required="required"
                  :rules="rules"
                  type="number">
      <v-tooltip v-if="fullSchema.description" slot="append-outer" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
    </v-text-field>

    <!-- Simple boolean field -->
    <v-checkbox v-else-if="fullSchema.type === 'boolean'"
                v-model="modelWrapper[modelKey]"
                :label="label"
                :name="fullKey"
                :disabled="disabled"
                :required="required"
                :rules="rules" >
      <v-tooltip v-if="fullSchema.description" slot="append" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
    </v-checkbox>

    <!-- Simple strings array -->
    <v-combobox
      v-else-if="fullSchema.type === 'array' && fullSchema.items.type === 'string'"
      v-model="modelWrapper[modelKey]"
      :name="fullKey"
      :label="label"
      :required="required"
      :rules="rules"
      :disabled="disabled"
      chips
      multiple
      append-icon=""
    >
      <v-tooltip v-if="fullSchema.description" slot="append-outer" left>
        <v-icon slot="activator">info</v-icon>
        <div class="vjsf-tooltip" v-html="htmlDescription" />
      </v-tooltip>
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
          <template v-if="fullSchema.allOf && fullSchema.allOf.length">
            <template v-if="!parentKey && fullSchema.allOf[0].title">
              <!-- Accordion / expansion panets at root level -->
              <v-expansion-panel :inset="options.accordionMode === 'inset'" :popout="options.accordionMode === 'popout'" focusable>
                <v-expansion-panel-content v-for="(currentAllOf, i) in fullSchema.allOf" :key="i">
                  <span slot="header" style="font-weight:bold">{{ currentAllOf.title }}</span>
                  <v-card>
                    <v-card-text >
                      <property
                        :schema="Object.assign({}, currentAllOf, {type: 'object', title: null})"
                        :model-wrapper="subModels"
                        :model-root="modelRoot"
                        :model-key="'allOf-' + i"
                        :parent-key="parentKey"
                        :options="options"
                        @error="e => $emit('error', e)"
                      />
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </template>
            <template v-else>
              <!-- simple objects if we are at first level -->
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
            </template>
          </template>

          <!-- Sub container with a select for oneOfs -->
          <v-select
            v-if="fullSchema.oneOf"
            :items="fullSchema.oneOf"
            v-model="currentOneOf"
            :disabled="disabled"
            :item-value="item => {return oneOfConstProp ? item.properties[oneOfConstProp.key].const : item.title}"
            :label="oneOfConstProp ? (oneOfConstProp.title || oneOfConstProp.key) : 'Type'"
            :required="oneOfRequired"
            :clearable="!oneOfRequired"
            :rules="oneOfRules"
            item-text="title"
            return-object>
            <v-tooltip v-if="oneOfConstProp && oneOfConstProp.description" slot="append-outer" left>
              <v-icon slot="activator">info</v-icon>
              <div class="vjsf-tooltip" v-html="oneOfConstProp.htmlDescription"/>
            </v-tooltip>
          </v-select>
          <!--{{ currentOneOf }}-->
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
      <v-layout row class="mt-2 mb-1 pr-1">
        <v-subheader>{{ label }}</v-subheader>
        <v-btn v-if="!disabled" icon color="primary" @click="modelWrapper[modelKey].push(fullSchema.items.default || defaultValue(fullSchema.items))">
          <v-icon>add</v-icon>
        </v-btn>
        <v-spacer/>
        <v-tooltip v-if="fullSchema.description" left>
          <v-icon slot="activator">info</v-icon>
          <div class="vjsf-tooltip" v-html="htmlDescription"/>
        </v-tooltip>
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
const md = require('markdown-it')()

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
      // console.log('Re process full schema')
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
          if ([null, undefined, false].includes(val)) return
          if (Array.isArray(val) && val.length === 0) return
          if (typeof val === 'object' && Object.keys(val).length === 0) return
          // dependency applies
          fullSchema.required = fullSchema.required.concat(dep.required || [])
          fullSchema.properties = fullSchema.properties.concat(this.objectToArray(dep.properties))
          // fullSchema.extraProperties = []
          if (dep.oneOf) fullSchema.oneOf = (fullSchema.oneOf || []).concat(dep.oneOf)
          if (dep.allOf) fullSchema.allOf = (fullSchema.allOf || []).concat(dep.allOf)
        })
      }
      // console.log('Full schema', fullSchema)
      return fullSchema
    },
    htmlDescription() {
      if (this.fullSchema && this.fullSchema.description) return md.render(this.fullSchema.description)
    },
    fullKey() { return (this.parentKey + this.modelKey).replace('root.', '') },
    label() { return this.fullSchema.title || (typeof this.modelKey === 'string' ? this.modelKey : '') },
    rules() {
      const rules = []
      if (this.required) {
        rules.push((val) => (val !== undefined && val !== null && val !== '') || this.options.requiredMessage)
      }
      if (this.fullSchema.type === 'array' && this.fullSchema.minItems !== undefined) {
        rules.push((val) => (!val || val.length >= this.fullSchema.minItems) || '')
      }
      if (this.fullSchema.type === 'array' && this.fullSchema.maxItems !== undefined) {
        rules.push((val) => (!val || val.length <= this.fullSchema.maxItems) || '')
      }
      if (this.fullSchema.type === 'string' && this.fullSchema.minLength !== undefined) {
        rules.push((val) => (val === undefined || val.length >= this.fullSchema.minLength) || '')
      }
      if (this.fullSchema.type === 'string' && this.fullSchema.maxLength !== undefined) {
        rules.push((val) => (val === undefined || val.length <= this.fullSchema.maxLength) || '')
      }
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
      return {...props[key], key, htmlDescription: md.render(props[key].description || '')}
    },
    oneOfRequired() {
      return !!(this.oneOfConstProp && this.fullSchema && this.fullSchema.required && this.fullSchema.required.find(r => r === this.oneOfConstProp.key))
    },
    oneOfRules() {
      const rules = []
      if (this.oneOfRequired) rules.push((val) => (val !== undefined && val !== null && val !== '') || this.options.requiredMessage)
      return rules
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
        if (this.fullSchema && JSON.stringify(this.fullSchema) !== this.lastFullSchema) {
          this.lastFullSchema = JSON.stringify(this.fullSchema)
          // console.log('Schema changed', JSON.stringify(this.fullSchema))
          this.initFromSchema()
          this.cleanUpExtraProperties()
          this.applySubModels()
          this.ready = true
        }
      },
      immediate: true
    },
    currentOneOf(newVal, oldVal) {
      if (!this.currentOneOf) this.$set(this.subModels, 'currentOneOf', {})
      this.cleanUpExtraProperties()
    },
    subModels: {
      handler() {
        this.cleanUpExtraProperties()
        this.applySubModels()
      },
      deep: true
    }
  },
  methods: {
    getDeepKey(obj, key) {
      const keys = key.split('.')
      for (let i = 0; i < keys.length; i++) {
        if ([null, undefined].includes(obj)) break
        obj = obj[keys[i]]
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
    cleanUpExtraProperties() {
      // console.log('Cleanup extra properties')
      // cleanup extra properties
      if (this.fullSchema.type === 'object' && this.fullSchema.properties && Object.keys(this.fullSchema.properties).length && this.modelWrapper[this.modelKey]) {
        Object.keys(this.modelWrapper[this.modelKey]).forEach(key => {
          if (!this.fullSchema.properties.find(p => p.key === key)) {
            // console.log(`Remove key ${this.modelKey}.${key}`)
            delete this.modelWrapper[this.modelKey][key]
          }
        })
      }
    },
    applySubModels() {
      // console.log('Apply sub models')
      Object.keys(this.subModels).forEach(subModel => {
        Object.keys(this.subModels[subModel]).forEach(key => {
          if (this.modelWrapper[this.modelKey][key] !== this.subModels[subModel][key]) {
            // console.log(`Apply submodel ${this.modelKey}.${key}`, JSON.stringify(this.subModels[subModel][key]))
            this.$set(this.modelWrapper[this.modelKey], key, this.subModels[subModel][key])
          }
        })
      })
    },
    initFromSchema() {
      // console.log('Init from schema')
      let model = this.modelWrapper[this.modelKey]

      // Manage default values
      if (model === undefined) {
        model = this.defaultValue(this.fullSchema)
        if (this.fullSchema.default !== undefined) model = JSON.parse(JSON.stringify(this.fullSchema.default))
      }
      // const always wins
      if (this.fullSchema.const !== undefined) model = this.fullSchema.const

      // Case of a select based on ajax query
      if (this.fromUrl) this.getSelectItems()
      // Case of an auto-complete field already defined
      if (this.fromUrlWithQuery && model && model[this.itemTitle] !== undefined) {
        this.rawSelectItems = [model]
        this.q = model[this.itemTitle]
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

      // Init subModels for allOf subschemas
      if (this.fullSchema.type === 'object' && this.fullSchema.allOf) {
        this.fullSchema.allOf.forEach((allOf, i) => {
          this.$set(this.subModels, 'allOf-' + i, JSON.parse(JSON.stringify(model)))
        })
      }

      // Case of a sub type selection based on a oneOf
      this.currentOneOf = null
      if (this.fullSchema.type === 'object' && this.fullSchema.oneOf && !this.currentOneOf && this.oneOfConstProp) {
        if (model && model[this.oneOfConstProp.key]) {
          this.currentOneOf = this.fullSchema.oneOf.find(item => item.properties[this.oneOfConstProp.key].const === model[this.oneOfConstProp.key])
        } else if (this.fullSchema.default) {
          this.currentOneOf = this.fullSchema.oneOf.find(item => item.properties[this.oneOfConstProp.key].const === this.fullSchema.default[this.oneOfConstProp.key])
        }
      }

      // Init subModel for current oneOf
      if (this.currentOneOf) {
        this.$set(this.subModels, 'currentOneOf', JSON.parse(JSON.stringify(model)))
      } else {
        this.$set(this.subModels, 'currentOneOf', {})
      }

      this.$set(this.modelWrapper, this.modelKey, model)
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

.vjsf-tooltip p:last-child {
  margin-bottom: 0;
}

</style>
