<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div class="df-search-files">
    <v-menu
      v-model="menu"
      :offset="8"
      :max-width="width"
      max-height="500"
      :close-on-content-click="false"
    >
      <template #activator="{ props }">
        <v-text-field
          v-model="search"
          autocomplete="off"
          name="search"
          placeholder="search"
          hide-details
          density="compact"
          variant="outlined"
          rounded
          class="ml-4"
          color="primary"
          base-color="primary"
          width="250"
          v-bind="props"
          :loading="linesFetch.pending.value"
          @click="handleClick"
        >
          <template #append-inner>
            <v-icon
              color="primary"
              icon="mdi-magnify"
            />
          </template>
        </v-text-field>
      </template>
      <v-card
        v-if="lines"
        class="border-sm border-primary"
        tile
      >
        <template v-if="lines.length">
          <v-list
            lines="three"
            class="py-0"
          >
            <v-list-item
              v-for="line in lines"
              :key="line._id"
              :href="line.url"
            >
              <v-list-item-title class="text-primary">
                <v-chip
                  v-for="tag in line.tags"
                  :key="tag"
                  x-small
                  density="compact"
                  color="primary"
                  class="mb-1"
                >
                  {{ tag }}
                </v-chip>
            &nbsp;
                {{ line.title }}
              </v-list-item-title>
              <v-list-item-subtitle
                v-if="line.text"
                class="v-list-item-subtitle"
                v-html="line.text"
              />
            </v-list-item>
          </v-list>
          <v-list
            v-if="size === initialSize && (linesFetch.data.value?.total ?? 0) > initialSize"
            class="py-0"
          >
            <v-list-item
              class="text-center"
              dense
              @click="size = 20; linesFetch.refresh()"
            >
              <span class="text-primary text-subtitle-2">
                Show more results
              </span>
            </v-list-item>
          </v-list>
        </template>
        <v-list
          v-else
          class="py-0"
        >
          <v-list-item>
            No result
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VMenu, VTextField, VList, VListItem, VListItemTitle, VChip } from 'vuetify/components'

const props = defineProps({
  dfUrl: { type: String, default: 'https://staging-koumoul.com/data-fair' },
  datasetId: { type: String, default: '50dhg5ozin8klujew0zh-kxk' },
  textKey: { type: String, default: null },
})
const menu = ref(false)
const search = ref('')
const initialSize = 4
const size = ref(initialSize)
const width = 500

const linesQuery = computed(() => ({
  q: search.value,
  size: size.value,
  q_mode: 'complete',
  highlight: '_file.content',
  select: 'title,description,url,tags',
  arrays: true,
}))
const linesFetch = useFetch<{ results: any[], total: number }>(`${props.dfUrl}/api/v1/datasets/${props.datasetId}/lines`, { query: linesQuery, immediate: false, watch: false })
watch(search, () => {
  if (search.value.length > 2) {
    linesFetch.refresh()
    menu.value = true
  }
})
const lines = computed(() => {
  if (search.value.length <= 2 || !linesFetch.data.value) return null
  return linesFetch.data.value.results.map((result) => {
    const line = {
      _id: result._id,
      title: result.title,
      url: result.url,
      text: result._highlight?.['_file.content']?.join('... ').replace(/class="highlighted"/, 'class="text-primary"') || result.description,
      tags: result.tags,
    }
    return line
  })
})

const handleClick = () => {
  if (search.value?.length) {
    menu.value = true
  }
}
</script>

<style>
.df-search-files em.highlighted {
  color: #1e88e5;
}
</style>
