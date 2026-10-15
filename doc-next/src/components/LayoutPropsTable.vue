<template>
  <v-card variant="flat">
    <p
      v-if="group.appliesTo.length"
      class="mb-2"
    >
      Applies to
      <template v-for="(name, i) in group.appliesTo" :key="name">
        <span v-if="i > 0">, </span>
        <a :href="`#comp-${name}`"><code>{{ name }}</code></a>
      </template>.
    </p>
    <v-list :lines="false">
      <v-divider />
      <template v-for="prop in group.props" :key="prop.name">
        <v-list-item
          :id="`${group.key}-${prop.name}`"
          class="my-2 px-2 reference-anchor"
        >
          <v-list-item-title class="d-flex align-center flex-wrap ga-2">
            <code class="font-weight-bold">{{ prop.name }}</code>
            <v-chip size="small" variant="tonal">
              {{ prop.type }}
            </v-chip>
            <v-chip v-if="prop.computed" size="small" variant="tonal" color="secondary">
              computed
            </v-chip>
            <v-chip v-if="!prop.description" size="small" variant="tonal" color="warning">
              not documented yet
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="prop.description || prop.see"
            class="my-2"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="prop.description" />
            <template v-if="prop.see">
              See <router-link :to="prop.see.to">{{ prop.see.label }}</router-link>.
            </template>
          </v-list-item-subtitle>
        </v-list-item>
        <v-divider />
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import layoutVocabulary from 'virtual:layout-vocabulary'

const props = defineProps<{ groupKey: string }>()

const group = computed(() => {
  const found = layoutVocabulary.groups.find(g => g.key === props.groupKey)
  if (!found) throw new Error(`unknown layout vocabulary group "${props.groupKey}"`)
  return found
})
</script>
