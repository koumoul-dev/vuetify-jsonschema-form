<template>
  <div>
    <v-input
      :value="value"
      :name="fullKey"
      :label="label"
      :disabled="disabled"
      :rules="rules"
      :required="required"
      class="vjsf-table"
    >
      <v-icon
        v-if="!disabled && !required && !!value"
        style="position: absolute; right: 0"
        @click="on.input(null)"
      >
        mdi-close
      </v-icon>
      <v-row>
        <v-file-input
          v-if="!disabled"
          v-model="file"
          type="file"
          class="pt-2"
          accept="application/json"
          label="Upload JSON file"
          truncate-length="50"
          @change="change"
        />
        <v-icon
          v-if="tableSrc"
          @click="downloadFile"
        >
          mdi-download-outline
        </v-icon>
        <v-icon
          v-if="tableSrc"
          @click="viewFile"
        >
          mdi-open-in-new
        </v-icon>
      </v-row>
    </v-input>
    <v-container
      v-if="displayTableError !== null && displayTableError.length >= 1"
      fluid
      class="pa-0 ma-0"
    >
      <v-chip
        color="#9b0000"
        outlined
        style="width: 100%;"
      >
        <v-icon color="yellow darken-2">
          mdi-alert
        </v-icon>
        <span style="font-weight:bold;display:flex;width:100%;align-content:end;">
          Error parsing: {{ shorten(displayTableError) }}
        </span>
      </v-chip>
      <div style="width:80%;">
        Error parsing: {{ displayTableError }}
      </div>
    </v-container>
    <v-row
      v-if="tableSrc"
      justify="center"
    >
      <v-data-table
        dense
        :headers="headers"
        :items="tableContents"
        :items-per-page="-1"
        class="elevation-1"
      >
        <template
          v-if="fullSchema.validation === null || fullSchema.validation === undefined"
          #[`item.value`]="{ item }"
        >
          <v-chip
            :color="getColor(item)"
            class="ma-2"
            outlined
          >
            <span style="font-weight: bold">{{ item.value }}</span>
          </v-chip>
        </template> -->
      </v-data-table>
    </v-row>
  </div>
</template>

<script>

/** getObjectValue(object:Object, data_path:string):any|undefined
 * Returns the value from a nested object defined by a dot notation style string
 * @remarks
 * Recursive value look-up.
 *
 * @param obj - The input object
 * @param path - The value path definition e.g.: "prop1.prop2"
 * @param separator - The property separator in path definition
 *
 * @returns The value defined path in obj or undefined
 */
function getObjectValue (obj, path, separator = '.') {
  if (path.startsWith(separator)) {
    // cut off leading separator if exists
    path = path.substring(1)
  }
  if (path.includes(separator)) {
    // if there are more nested elements
    path = path.split(separator)
    const currentPart = path.splice(0, 1)
    path = path.join(separator)
    if (Object.prototype.hasOwnProperty.call(obj, currentPart)) {
      return getObjectValue(obj[currentPart], path)
    } else {
      console.warn('Undefined: ', currentPart)
      return undefined
    }
  } else {
    // final path element
    return obj[path]
  }
}

export default {
  props: {
    value: { type: String, default: '' },
    options: { type: Object, required: true },
    schema: { type: Object, required: true },
    fullSchema: { type: Object, required: true },
    fullKey: { type: String, required: true },
    label: { type: String, default: '' },
    htmlDescription: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    rules: { type: Array, required: true },
    on: { type: Object, required: true }
  },
  data: () => ({
    file: null,
    tableSrc: null,
    tableContents: [],
    headers: [
      {
        text: 'Property name',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Minimum', value: 'min' },
      { text: 'Stock', value: 'value' },
      { text: 'Maximum', value: 'max' },
      { text: 'Details', value: 'details' }
    ],
    measurementErrors: [],
    displayTableError: []
  }),
  watch: {
    file () {
      if (this.fullSchema.displayTable === null ||
      this.fullSchema.displayTable === undefined ||
      !Object.prototype.hasOwnProperty.call(this.fullSchema.displayTable, 'validation')) {
        return []
      }
      if (this.tableSrc === null) {
        return []
      }
      this.createTableData()
    }
  },
  created () {
    this.tableSrc = JSON.parse(this.value)
    this.createTableData()
  },
  methods: {
    createTableData () {
      // Array of of a single row
      const tArr = []
      this.displayTableError = []
      for (const entry in this.fullSchema.displayTable.validation) {
        const currentSchemaEntry = this.fullSchema.displayTable.validation[entry]
        const currentDataPath = currentSchemaEntry.path
        var precision = currentSchemaEntry.rules.precision
        if (precision === undefined || precision === null) {
          precision = 5
        }
        let currentValue = getObjectValue(this.tableSrc, currentDataPath)
        if (typeof currentValue === 'number') {
          currentValue = currentValue.toFixed(precision)
        }
        try {
          tArr.push({
            name: entry,
            min: currentSchemaEntry.rules.minimum,
            max: currentSchemaEntry.rules.maximum,
            value: currentValue
          })
        } catch (e) {
          this.displayTableError = entry + ' ' + currentSchemaEntry.path
        }
      }
      this.tableContents = tArr
    },
    change () {
      if (!this.file) {
        this.tableSrc = null
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          this.tableSrc = JSON.parse(event.target.result)
        } catch (e) {
          this.displayTableError = e.message
          this.tableSrc = null
        }
      }

      reader.readAsText(this.file)
      this.displayTableError = null
    },
    downloadFile (event) {
      const durl = window.URL.createObjectURL(new Blob([JSON.stringify(this.tableSrc)]))
      const link = document.createElement('a')
      link.href = durl
      link.setAttribute('download', 'report_' + this.fullKey + '.json') // or any other extension
      document.body.appendChild(link)
      link.click()
    },
    getColor (tableRecord) {
      if (tableRecord.value > tableRecord.max || tableRecord.value < tableRecord.min) {
        return 'red'
      } else {
        return '#81c784'
      }
    },
    shorten (inText, maxLength = 50) {
      if (inText.length > maxLength) {
        return inText.substring(0, maxLength) + '...'
      } else {
        return inText
      }
    },
    viewFile (event) {
      var tab = window.open('data:text/json,' + encodeURIComponent(JSON.stringify(this.tableSrc)), '_blank')
      // finish loading the page
      tab.document.close()
    }
  }
}
</script>

<style scoped lang="css">
.vjsf-table > .v-input__control > .v-input__slot {
  display: block;
  padding: 50px;
  width: 90%;
}
.vjsf-table {
  padding-top: 20px;
}

</style>
