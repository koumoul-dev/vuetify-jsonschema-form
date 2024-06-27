<script setup>
import { useDefaults } from 'vuetify'

useDefaults({}, 'VjsfDateTimePicker')

defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfDateTimePickerNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

</script>

<template>
  TODO date-time
</template>
