<template lang="html">
  <property
    v-if="!!resolvedSchema"
    :value="value"
    :schema="resolvedSchema"
    :model-root="value"
    model-key="root"
    :options="fullOptions"
    parent-key=""
    :section-depth="0"
    @error="e => $emit('error', e)"
    @change="e => $emit('change', e)"
    @input="input"
  >
    <!-- propagate slots to children, see https://gist.github.com/Loilo/73c55ed04917ecf5d682ec70a2a1b8e2 -->
    <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </property>
</template>

<script>
import jrefs from './utils/json-refs'
import colors from './utils/colors'
import Property from './components/Property.js'

export default {
  name: 'VJsonschemaForm',
  components: { Property },
  props: ['schema', 'value', 'options'],
  computed: {
    resolvedSchema() {
      return jrefs.resolve(this.schema)
    },
    fullOptions() {
      const httpLib = this.axios || this.$http || this.$axios
      // we use the multi-themes functionality of vuetify2 as a clue of the version
      const vuetifyVersion = !this.$vuetify.theme.themes ? 1 : 2
      // icons font is only variable in vuetify 2
      const iconfont = vuetifyVersion === 1 ? 'md' : ((this.$vuetify.icons && this.$vuetify.icons.iconfont) || 'mdi')
      const icons = {
        md: {
          calendar: 'event',
          clock: 'clock',
          info: 'info',
          dropdown: 'arrow_drop_down',
          dropup: 'arrow_drop_up',
          add: 'add',
          edit: 'create',
          reorder: 'reorder',
          delete: 'delete'
        },
        mdi: {
          calendar: 'mdi-calendar',
          clock: 'mdi-clock',
          info: 'mdi-information',
          dropdown: 'mdi-menu-down',
          dropup: 'mdi-menu-up',
          add: 'mdi-plus',
          edit: 'mdi-pencil',
          reorder: 'mdi-reorder-horizontal',
          delete: 'mdi-delete'
        }
      }[iconfont]

      const defaultOptions = {
        debug: false,
        httpLib,
        disableAll: false,
        colors,
        autoFoldObjects: false,
        allOfTabs: false,
        requiredMessage: 'This information is required',
        noDataMessage: 'No matching value found',
        searchMessage: 'Search...',
        vuetifyVersion,
        tabsMode: 'grow',
        locale: 'en',
        removeAdditionalProperties: true
      }
      const fullOptions = Object.assign({}, defaultOptions, this.resolvedSchema['x-options'] || {}, this.options || {})
      fullOptions.icons = Object.assign(icons, fullOptions.icons || {})
      return fullOptions
    }
  },
  methods: {
    input(value) {
      // console.log('MAIN INPUT', value)
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="css">

.vjsf-property .v-input--selection-controls {
  margin-top: 0;
}

.vjsf-tooltip p:last-child {
  margin-bottom: 0;
}

.vjsf-property .color-picker-trigger {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  border: 2px solid #ccc;
}

.vjsf-property .color-picker-trigger-empty {
  background: linear-gradient(to top right,transparent 0,transparent calc(50% - 2.4px),#de080a 50%,transparent calc(50% + 2.4px),transparent);
}

.vjsf-date-time .v-picker.v-card {
  border-radius: 0;
}
</style>
