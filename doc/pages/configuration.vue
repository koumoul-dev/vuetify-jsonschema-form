<template>
  <v-container>
    <h1 class="display-1 mb-4">
      {{ title }}
    </h1>

    <h2 id="options" class="headline my-4">
      <v-btn color="primary" icon text :to="{name: 'configuration', hash: '#options'}" class="mr-1">
        <v-icon>
          mdi-link
        </v-icon>
      </v-btn>
      Options
    </h2>
    <p>
      Options can be passed to vjsf using the options prop or can be defined more locally on a specific property using the "x-options" annotation.
      Children properties will inherit from the options defined in their parents.
    </p>
    <v-simple-table dense dark class="mb-6">
      <thead>
        <tr>
          <th class="text-left">
            Key
          </th>
          <th class="text-left">
            Default
          </th>
          <th class="text-left">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="optionKey in Object.keys(defaultOptions)" :key="optionKey">
          <td>{{ optionKey }}</td>
          <td>{{ JSON.stringify(defaultOptions[optionKey], null, 2) }}</td>
          <td v-html="descriptions[optionKey]" />
        </tr>
        <tr>
          <td>markdown</td>
          <td>window.markdownit().render if markdownit is available, identity function otherwise</td>
          <td>a function that takes a markdown text and returns HTML, used for descriptions and slots</td>
        </tr>
        <tr>
          <td>httpLib</td>
          <td>this.axios or this.$http or this.$axios or window.axios</td>
          <td>a simple HTTP client used to fetch select options from HTTP requests</td>
        </tr>
      </tbody>
    </v-simple-table>

    <h2 id="messages" class="headline my-4">
      <v-btn color="primary" icon text :to="{name: 'configuration', hash: '#messages'}" class="mr-1">
        <v-icon>
          mdi-link
        </v-icon>
      </v-btn>
      Messages
    </h2>
    <p>
      You can define a special "messages" option to overwrite the default localized messages.
    </p>
    <v-row>
      <v-col cols="2">
        <v-select v-model="locale" :items="Object.keys(localizedMessages)" label="Locale" hide-details dense />
      </v-col>
    </v-row>
    <v-simple-table dense dark class="mb-6">
      <thead>
        <tr>
          <th class="text-left">
            Message key
          </th>
          <th class="text-left">
            Default
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="messageKey in Object.keys(localizedMessages[locale])" :key="messageKey">
          <td>{{ messageKey }}</td>
          <td>{{ localizedMessages[locale][messageKey] }}</td>
        </tr>
      </tbody>
    </v-simple-table>

    <h2 id="icons" class="headline my-4">
      <v-btn color="primary" icon text :to="{name: 'configuration', hash: '#icons'}" class="mr-1">
        <v-icon>
          mdi-link
        </v-icon>
      </v-btn>
      Icons
    </h2>
    <p>
      You can define a special "icons" option to overwrite the default icons. Default icons are initialized based on current iconfont configured on your Vuetify instance.
    </p>
    <v-row>
      <v-col cols="2">
        <v-select v-model="iconSet" :items="Object.keys(iconSets)" label="Icon set" hide-details dense />
      </v-col>
    </v-row>
    <v-simple-table dense dark class="mb-6">
      <thead>
        <tr>
          <th class="text-left">
            Icon key
          </th>
          <th class="text-left">
            Default
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="iconKey in Object.keys(iconSets[iconSet])" :key="iconKey">
          <td>{{ iconKey }}</td>
          <td>{{ iconSets[iconSet][iconKey] }}</td>
        </tr>
      </tbody>
    </v-simple-table>

    <h2 id="formatting" class="headline my-4">
      <v-btn color="primary" icon text :to="{name: 'configuration', hash: '#formatting'}" class="mr-1">
        <v-icon>
          mdi-link
        </v-icon>
      </v-btn>
      Formatting functions
    </h2>
    <p>
      You can define a special "formats" option to overwrite the default formatting functions that are used to display some field values.
    </p>
    <v-simple-table dense dark class="mb-6">
      <thead>
        <tr>
          <th class="text-left">
            Message key
          </th>
          <th class="text-left">
            Default
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="formatKey in Object.keys(formats)" :key="formatKey">
          <td>{{ formatKey }}</td>
          <td>{{ formats[formatKey] }}</td>
        </tr>
      </tbody>
    </v-simple-table>

    <h2 id="annotations" class="headline my-4">
      <v-btn color="primary" icon text :to="{name: 'configuration', hash: '#annotations'}" class="mr-1">
        <v-icon>
          mdi-link
        </v-icon>
      </v-btn>
      Annotations
    </h2>
    <p>
      Annotation is the name we give to special attributes defined on properties in your schema.
      These attributes are prefixed by "x-" to signify that they are not part of the standard JSON schema syntax.
      They should be ignored by validators and other tools.
    </p>
    <p>
      Disclaimer: the following list contains only very brief explanations. The real documentation is in the examples.
    </p>
    <p />
    <v-simple-table dense dark class="mb-6">
      <thead>
        <tr>
          <th class="text-left" style="min-width:250px">
            Annotation key
          </th>
          <th class="text-left">
            Usage
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>x-options</td>
          <td>Overwrite some of the options for this property and its children.</td>
        </tr>
        <tr>
          <td>x-display</td>
          <td>Used to switch the rendering mode of a property. We try to use as little of these as possible and rely on indications from the standard JSON schema syntax itself to render the form, but sometimes some ambiguity has to be resolved this way. For example this is used to force rendering sections as tabs or expansion panels.</td>
        </tr>
        <tr>
          <td>x-fromUrl / x-fromData</td>
          <td>Used to populate selects from the results of HTTP requests or some other part of the model. See the <a href="configuration#expressions">Expressions section</a> for possibilities of x-fromData.</td>
        </tr>
        <tr>
          <td>x-itemKey / x-itemTitle / x-itemIcon</td>
          <td>Used to configure rendering of options in selects.</td>
        </tr>
        <tr>
          <td>x-props</td>
          <td>An object of props to pass directly to the underlying Vuetify component.</td>
        </tr>
        <tr>
          <td>x-cols</td>
          <td>The width of the v-col component wrapping the property (default is 12). You can use the fieldColProps option for further layout customization.</td>
        </tr>
        <tr>
          <td>x-slots</td>
          <td>An object of textual contents to be displayed before and after the property or to be passed as slots to the underlying vuetify component.</td>
        </tr>
        <tr>
          <td>x-rules</td>
          <td>Some custom rule functions for validating this property.</td>
        </tr>
        <tr>
          <td>x-rules</td>
          <td>Some custom rule functions for validating this property.</td>
        </tr>
      </tbody>
    </v-simple-table>

    <h2 id="expressions" class="headline my-4">
      <v-btn color="primary" icon text :to="{name: 'configuration', hash: '#expressions'}" class="mr-1">
        <v-icon>
          mdi-link
        </v-icon>
      </v-btn>
      Expressions
    </h2>
    <p>
      Some functionalities require expressions given in the JSON schema and evaluated using contextual data.
      For example the x-if and fromData annotations use these expressions.
      The method used to evaluate the expressions can be changed with the evalMethod option, possible values are:
    </p>
    <v-simple-table dense dark class="mb-6">
      <thead>
        <tr>
          <th class="text-left" style="min-width:250px">
            Value of evalMethod
          </th>
          <th class="text-left">
            Explanation
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>propertyExpr (default)</td>
          <td>Based on the <a href="https://www.npmjs.com/package/property-expr">property-expr module</a>. Expressions are simple deep getters into the contextual data.</td>
        </tr>
        <tr>
          <td>newFunction</td>
          <td>
            Based on <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Function">dynamically created JS functions</a>. Expressions are complete JS expressions.
            <br>
            <b>WARNING ! </b> This method implies that you trust the source of the JSON schema as much as you trust your own source code.
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <p><b>Call for help:</b> if someone knows of a better solution for this problem, for example a library with rich expression evaluation but without the security liability of using new Function, please submit a ticket or a pull request !</p>
    <p>The expressions are given some contextual data as input, here are its members:</p>
    <v-simple-table dense dark class="mb-6">
      <thead>
        <tr>
          <th class="text-left" style="min-width:250px">
            Data
          </th>
          <th class="text-left">
            Explanation
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>root</td>
          <td>The main complete model being handled by vjsf.</td>
        </tr>
        <tr>
          <td>model</td>
          <td>The model being handled by vjsf at this level in the schema definition.</td>
        </tr>
        <tr>
          <td>context</td>
          <td>The options.context object.</td>
        </tr>
      </tbody>
    </v-simple-table>

    <h2 id="validator" class="headline my-4">
      <v-btn color="primary" icon text :to="{name: 'configuration', hash: '#validator'}" class="mr-1">
        <v-icon>
          mdi-link
        </v-icon>
      </v-btn>
      JSON schema validator
    </h2>
    <p>
      Some functionalities require that you provide a JSON schema validator.
      This is the case for the if/then/else syntax and for the useValidator option.
      You can provide the validator using different methods:
    </p>
    <ul>
      <li>If you load third-party.js <a href="https://github.com/ajv-validator/ajv">Ajv</a> will be used along with ajv-formats and ajv-i18n.</li>
      <li>You can provide Ajv, ajvAddFormats and ajvLocalize as global variables or as options and an ajv instance will be created.</li>
      <li>You can provide an ajv instance in the ajv option.</li>
      <li>You can provide a validator function as an option. This function must accept a schema and return a function that will take a model and return either null (no error) or an error message as a string.</li>
    </ul>
  </v-container>
</template>

<script>
import { defaultOptions, formats, localizedMessages, iconSets } from '../../lib/utils/options'
import { scrollToHash } from '~/app/router.scrollBehavior.js'

export default {
  data() {
    return {
      title: 'Configuration',
      defaultOptions,
      formats,
      localizedMessages,
      descriptions: {
        locale: 'See the <a href="configuration#messages">Messages section</a>',
        rootDisplay: 'equivalent of x-display annotation on the root object of the schema, can be "tabs" or "expansion-panels"',
        fieldProps: 'props passed to the underlying components for simple fields (v-text-field, v-select, etc.)',
        fieldColProps: 'props passed to the v-col component that wraps any field. Use "cols", "xs", "md", etc. to customize your form layout.',
        textFieldProps: 'props passed to the underlying v-text-field components',
        textareaProps: 'props passed to the underlying v-textarea components',
        numberProps: 'props passed to the underlying v-text-field components with type="number"',
        sliderProps: 'props passed to the underlying v-slider components',
        checkboxProps: 'props passed to the underlying v-checkbox components',
        switchProps: 'props passed to the underlying v-switch components',
        comboboxProps: 'props passed to the underlying v-combobox components',
        selectProps: 'props passed to the underlying components for select fields',
        fileInputProps: 'props passed to the underlying v-file-input components',
        radioGroupProps: 'props passed to the underlying v-radio-group components',
        radioItemProps: 'props passed to the underlying v-radio-item components',
        tabsProps: 'props passed to the underlying v-tabs component when relevant',
        expansionPanelsProps: 'props passed to the underlying v-expansion-panels component when relevant',
        dialogProps: 'props passed to the underlying v-dialog component when relevant',
        dialogCardProps: 'props passed to the v-card component inside a v-dialog component when relevant',
        colorPickerProps: 'props passed to the underlying v-color-picker component when relevant',
        timePickerProps: 'props passed to the underlying v-time-picker component when relevant',
        datePickerProps: 'props passed to the underlying v-date-picker component when relevant',
        arrayItemColProps: 'props passed to the underlying v-col component of each item of an editable array',
        arrayItemCardProps: 'props passed to the underlying v-card component of each item of an editable array',
        removeAdditionalProperties: 'force the removal of properties found in the model but not defined in the schema',
        disableAll: 'force disabling all fields ignoring the readOnly attributes',
        hideReadOnly: 'by default read-only properties are rendered as disabled fields, set this to true to hide them entirely',
        deleteReadOnly: 'set this to true to not only hide read-only properties, but also remove them from the model',
        hideTooltips: 'by default descriptions are rendered as help tooltip on properties, set this to true to disable this functionality',
        disableSorting: 'by default editable array are sortable, set this to true to disable this functionality',
        context: 'an optional contextual information object, properties from here can be used as variables in URL templates',
        rules: 'some custom rule functions that can be referenced by the x-rules annotation on properties',
        initialValidation: 'configure display of properties validation errors at initial rendering of the form ("all" to show validation errors of all properties, "defined" to show validation errors of the properties with pre-existing content, "none" to wait for user interactions of explicit call of the validate method)',
        idPrefix: 'a prefix applied to generated ids if you want to prevent potential conflicts',
        markdownit: 'options given to markdownit if you leave the markdown option to its default value',
        editMode: 'change the way editable arrays are rendered. Use "dialog" to edit items in separate dialogs, use "inline" to edit items in place.',
        autofocus: 'attempt to give focus to the first simple field rendered.',
        autoFixArrayItems: 'modify the items of arrays existing in the model (set default values, set const values, remove additional properties), you can try disabling this if you run into performance issues',
        useValidator: 'See the <a href="configuration#validator">JSON schema validator section</a>. Activate using the validator to display validation errors as a complement to the validation rules managed by vjsf directly.',
        evalMethod: 'See the <a href="configuration#expressions">Expressions section</a>. For security reasons this option can only be changed in the main options object given to vjsf, not in x-options annotations inside the schema.'
      },
      locale: 'en',
      iconSets,
      iconSet: 'mdi'
    }
  },
  head() {
    return {
      title: 'vjsf - ' + this.title
    }
  },
  mounted() {
    if (this.$route.hash) {
      location.hash = this.$route.hash
      scrollToHash(this.$route.hash, false)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
