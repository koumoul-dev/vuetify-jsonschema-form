<template>
  <v-container>
    <h1 class="display-1 mb-4">
      0.x to 1.x
    </h1>
    <p>
      The old demo page for v0 is still available <a href="https://koumoul-dev.github.io/vuetify-jsonschema-form/0.x/">here</a>.
    </p>
    <p>
      The 1.x branch is not a complete rewrite, but it is a major refactor. The motivation was to :
    </p>
    <p>
      <ul>
        <li>reduce code redundancy mostly by replacing vue templates with render functions</li>
        <li>improve overall architecture</li>
        <li>improve extensibility with more powerful slots, props, etc.</li>
        <li>improve validity of the output against the given JSON schemas</li>
        <li>drop some third party dependencies</li>
        <li>document everything and clean options while doing so</li>
        <li>better respect vuejs conventions</li>
      </ul>
    </p>
    <p>
      The scope of these modifications implied some breaking changes.
      These are mostly on the code+configuration side of things and much less on the schemas+annotations side.
      Basically you will have to change your code, that is certain, but your schemas should still work.
      Still, transitioning must be done with extensive testing of all your forms.
    </p>

    <p>
      Most notable breaking changes :
    </p>
    <p>
      <ul>
        <li>npm module is switched from @koumoul/vuetify-jsonschema-form to @koumoul/vjsf</li>
        <li>recommended component name is VJsf (so tag name is v-jsf)</li>
        <li>support for Vuetify 1 is dropped</li>
        <li>model is replaced by v-model</li>
        <li>slots are renamed</li>
        <li>some options are dropped or renamed</li>
        <li>some people used the Property internal component, it is gone. VJsf itself is the only component and is recursive to render children properties</li>
      </ul>
    </p>
  </v-container>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
</style>
