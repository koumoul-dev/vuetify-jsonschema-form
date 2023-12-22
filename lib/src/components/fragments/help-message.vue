<template>
  <div class="vjsf-help-message">
    <v-slide-x-reverse-transition>
      <v-alert
        v-show="show"
        color="info"
      >
        <div v-html="node.layout.help" />
      </v-alert>
    </v-slide-x-reverse-transition>
    <v-btn
      color="info"
      class="vjsf-help-message-toggle"
      :icon="show ? 'mdi-close-circle' : 'mdi-information'"
      density="compact"
      :title="show ? '' : node.messages.showHelp"
      @click="show = !show"
    />
  </div>
</template>

<script setup>
import { VAlert, VBtn, VSlideXReverseTransition } from 'vuetify/components'
import { ref } from 'vue'

defineProps({
  node: {
    /** @type import('vue').PropType<import('../../types.js').VjsfNode> */
    type: Object,
    required: true
  }
})

const show = ref(false)
</script>

<style>
.vjsf-help-message {
  position: relative;
  min-height: 10px;
}
.vjsf-help-message-toggle {
  position: absolute;
  top: -10px;
  right: -4px;
  z-index: 1;
}
</style>
../../../types.js
