<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container class="doc-content-page">
    <h1 class="text-h2 mb-8">
      {{ title }}
    </h1>

    <v-alert
      type="warning"
      variant="outlined"
      class="mb-8"
    >
      Expressions are pieces of imperative code dispersed in a declarative JSON schema. You must consider schemas interpreted by VJSF as part of the code source of your application and you cannot safely use schemas provided by an untrusted source.
    </v-alert>

    <p>Expressions are used throughout VJSF to provide dynamic functionalities like conditional rendering, fetching items of a select component, etc.</p>

    <p>There are 3 types of expressions supported for the time being : "js-fn", "js-eval" and "js-tpl". All of them are compiled to Javascript functions that accept the same parameters.</p>

    <h2 class="text-h4 mt-8 mb-6">
      Parameters
    </h2>

    <ul>
      <li><b>data</b> - it varies depending on the expression you are using, it can be the data from the current node, an item in a select component, etc.</li>
      <li><b>options</b> - the options object passed to VJSF then merged with contextual options from all parent nodes.</li>
      <li><b>context</b> - shortcut for "options.context".</li>
      <li><b>display</b> - the display object used to manage responsive layouts.</li>
      <li><b>layout</b> - normalized layout information of the current component.</li>
      <li><b>readOnly</b> - shortcut for "options.readOnly".</li>
      <li><b>summary</b> - shortcut for "options.summary".</li>
    </ul>

    Content of the display parameter:

    <code-block>
      <pre>
{
  width: number // the width of the parent container
  xs: boolean,
  sm: boolean,
  smAndDown: boolean,
  smAndUp: boolean,
  md: boolean,
  mdAndDown: boolean,
  mobile: boolean, // alias for mdAndDown
  mdAndUp: boolean,
  lg: boolean,
  lgAndDown: boolean,
  lgAndUp: boolean,
  xl: boolean,
  xlAndDown: boolean,
  xlAndUp: boolean,
  xxl: boolean
}</pre>
    </code-block>

    <h2 class="text-h4 mt-8 mb-6">
      Pure/impure expressions
    </h2>

    <p>Expressions are considered as pure by default. It means that they should only use their input parameters, and no global variable. This allows for caching optimizations. It is possible to declare that an expression is not pure like this:</p>

    <code-block>
      <pre>
{
  expr: '!!window.myVar',
  pure: false
}</pre>
    </code-block>

    <p>This kind of expression has access to some extra parameters:</p>

    <ul>
      <li><b>rootData</b> - the root data of this vjsf instance.</li>
      <li><b>parent</b> - wrapper to access data from the parent node (use parent.data or go higher in the hierarchy with parent.parent).</li>
    </ul>

    <h2 class="text-h4 mt-8 mb-6">
      Type <code>js-eval</code>
    </h2>

    <p>This type of expression lets you write a single JS statement that will be evaluated and returned. It is compiled like this :</p>

    <code-block>
      new Function(...params, 'return (' + expression + ')')
    </code-block>

    <p>This is the default type when the expected result of the expression is a boolean or a complex object (like the <code>if</code> property).</p>

    <h2 class="text-h4 mt-8 mb-6">
      Type <code>js-tpl</code>
    </h2>

    <p>This type of expression lets you write a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">JS template literal</a> that will be evaluated and returned. It is compiled like this :</p>

    <code-block>
      new Function(...params, 'return `' + expression + '`')
    </code-block>

    <p>This is the default type when the expected result of the expression is a string (like the <code>url</code> property in a <code>fetch</code> instruction).</p>

    <h2 class="text-h4 mt-8 mb-6">
      Type <code>js-fn</code>
    </h2>

    <p>This type of expression lets you write the full body of a JS function including its return statement. It is compiled like this :</p>

    <code-block>
      new Function(...params, expression)
    </code-block>
  </v-container>
</template>

<script setup>
import { VContainer, VAlert } from 'vuetify/components'

const title = 'Expressions'

useHead({
  title: 'VJSF - ' + title
})
</script>
