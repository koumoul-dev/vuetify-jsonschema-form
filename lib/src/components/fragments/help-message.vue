<template>
  <div :class="`vjsf-help-message vjsf-help-message-${node.options.density}`">
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
      :class="`vjsf-help-message-toggle vjsf-help-message-toggle-${node.options.density}`"
      :icon="show ? 'mdi-close' : 'mdi-information-symbol'"
      :border="0"
      :elevation="show ? 0 : 2"
      density="compact"
      :size="node.options.density === 'default' ? 28 : 24"
      :title="show ? '' : node.messages.showHelp"
      @click="show = !show"
    />
  </div>
</template>

<script setup>
import { VSlideXReverseTransition } from 'vuetify/components/transitions'
import { VAlert } from 'vuetify/components/VAlert'
import { VBtn } from 'vuetify/components/VBtn'
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
}
.vjsf-help-message-compact {
  margin-top: 2px;
  margin-bottom: 2px;
  min-height:24px;
}
.vjsf-help-message-comfortable {
  margin-top: 4px;
  margin-bottom: 4px;
  min-height:24px;
}
.vjsf-help-message-default {
  margin-top: 6px;
  margin-bottom: 6px;
  min-height:28px;
}
.vjsf-help-message-toggle {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
}
.vjsf-help-message .v-alert {
  padding-right: 22px;
}
.vjsf-help-message-default .v-alert {
  padding-right: 26px;
}

</style>
