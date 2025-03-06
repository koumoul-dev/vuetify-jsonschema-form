<template>
  <div :class="`vjsf-help-message vjsf-help-message-${node.options.density}`">
    <v-menu
      v-model="show"
      :class="`vjsf-help-message-tooltip vjsf-help-message-tooltip-${node.options.density}`"
      location="top end"
      offset="4"
      :close-on-content-click="false"
    >
      <template #activator="{ props }">
        <v-btn
          :color="node.layout.warning ? 'warning' : 'info'"
          :class="`vjsf-help-message-toggle`"
          :icon="node.layout.warning ? node.options.icons.alert : node.options.icons.infoSymbol"
          density="compact"
          :variant="node.layout.warning ? 'text' : 'flat'"
          :size="node.options.density === 'default' ? 28 : 24"
          :title="show ? '' : node.messages.showHelp"
          v-bind="props"
        />
      </template>
      <v-alert
        :color="node.layout.warning ? 'warning' : 'info'"
        :density="node.options.density"
      >
        <p
          v-if="node.layout.warning"
          class="mb-2"
          v-html="node.layout.warning"
        />
        <div
          v-if="node.layout.help"
          v-html="node.layout.help"
        />
      </v-alert>
    </v-menu>
  </div>
</template>

<script setup>
import { VAlert } from 'vuetify/components/VAlert'
import { VMenu } from 'vuetify/components/VMenu'
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
  height: 0;
  position: relative;
  width: 100%;
}
.vjsf-help-message .vjsf-help-message-toggle {
  position: absolute;
  top: 0px;
  right: -26px;
  z-index: 1;
}

.vjsf-help-message.vjsf-help-message-default .vjsf-help-message-toggle {
  right: -30px;
}

</style>
