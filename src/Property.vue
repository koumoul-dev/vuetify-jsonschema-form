<template lang="html">
  <div>
    <!-- Simple fields -->
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
        prepend-icon="event"
        readonly
      />
      <v-date-picker v-model="modelWrapper[modelKey]" no-title scrollable>
        <v-spacer/>
        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.menu.save(modelWrapper[modelKey])">OK</v-btn>
      </v-date-picker>
    </v-menu>

    <v-text-field v-else-if="schema.type === 'string'"
                  v-model="modelWrapper[modelKey]"
                  :name="fullKey"
                  :label="label"
                  :hint="schema.description"/>

    <v-text-field v-else-if="schema.type === 'number' || schema.type === 'integer'"
                  v-model.number="modelWrapper[modelKey]"
                  :name="fullKey"
                  :label="label"
                  :hint="schema.description"
                  :min="schema.minimum"
                  :max="schema.maximum"
                  :step="schema.type === 'integer' ? 1 : 0.01"
                  type="number"/>

    <v-checkbox v-else-if="schema.type === 'boolean'"
                v-model="modelWrapper[modelKey]"
                :label="label"
                :name="fullKey"
                :hint="schema.description"/>

    <!-- Sub containers -->

    <div v-else-if="schema.type === 'object'">
      <v-subheader v-if="schema.title">{{ schema.title }}</v-subheader>
      <property v-for="childKey in Object.keys(schema.properties)" :key="childKey"
                :schema="schema.properties[childKey]"
                :model-wrapper="modelWrapper[modelKey]"
                :model-key="childKey"
                :parent-key="fullKey + '.'" />
    </div>

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
                            :model-key="i"
                            :parent-key="`${fullKey}.${i}.`" />
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

    <p v-else-if="debug">Unsupported type "{{ schema.type }}"</p>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  name: 'Property',
  components: {Draggable},
  props: ['schema', 'modelWrapper', 'modelKey', 'debug', 'parentKey'],
  data() {
    return {ready: false, menu: false}
  },
  computed: {
    fullKey() { return (this.parentKey + this.modelKey).replace('root.', '') },
    label() { return this.schema.title || (typeof this.modelKey === 'string' ? this.modelKey : '') }
  },
  created() {
    // this.modelWrapper[this.modelKey] = this.modelWrapper[this.modelKey] || null
    if (this.modelWrapper[this.modelKey] === undefined) {
      this.$set(this.modelWrapper, this.modelKey, this.schema.default || this.defaultValue(this.schema.type))
    }
    this.ready = true
  },
  methods: {
    defaultValue(type) {
      if (type === 'object') return {}
      if (type === 'array') return []
      return null
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
