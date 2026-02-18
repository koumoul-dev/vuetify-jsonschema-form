<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div class="df-search-files">
    <v-menu
      v-model="menu"
      offset-y
      rounded="lg"
      :nudge-bottom="8"
      :max-width="width"
      max-height="500"
    >
      <template #activator="{ props }">
        <v-text-field
          v-model="search"
          autocomplete="off"
          name="search"
          placeholder="search"
          hide-details
          :outlined="theme.global.current.value.dark"
          :solo="!theme.global.current.value.dark"
          dense
          density="compact"
          variant="outlined"
          class="ml-4"
          color="primary"
          base-color="primary"
          width="250"
          v-bind="props"
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
      <v-progress-linear
        v-if="loading"
        absolute
        indeterminate
      />
      <v-list
        v-if="lines?.length"
        class="py-0 border-primary"
      >
        <v-list-item
          v-for="line in lines"
          :key="line._id"
          :href="line.url"
        >
          <template
            v-if="imageField"
            #prepend
          >
            <v-img :src="line.image" />
          </template>
          <v-list-item-title class="text-primary">
            <v-chip
              v-for="tag in line.tags"
              :key="tag"
              x-small
              rounded
              label
              color="primary"
              class="ml-2"
            >
              {{ tag }}
            </v-chip>
            &nbsp;
            {{ line.title }}
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="line.highlight"
            class="v-list-item-subtitle"
            v-html="line.highlight"
          />
        </v-list-item>
        <v-list-item
          v-if="size === 5 && (count ?? 0) > 5"
          class="justify-center"
          dense
          @click="size = 20"
        >
          <span class="text-primary text-subtitle-2">
            Show more results
          </span>
        </v-list-item>
      </v-list>
      <v-list
        v-else-if="lines"
        class="py-0"
      >
        <v-list-item>
          No result
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { VMenu, VTextField, VProgressLinear, VList, VListItem, VImg, VListItemTitle, VChip } from 'vuetify/components'

const props = defineProps({
  dfUrl: { type: String, default: 'https://staging-koumoul.com/data-fair' },
  datasetId: { type: String, default: 'ju-bxj8k8-feo09r0myfy7i5' },
  textKey: { type: String, default: null },
})

const theme = useTheme()

const menu = ref(false)
const loading = ref(false)
const search = ref('')
const count = ref(null)
const size = ref(5)
const width = 500

const datasetFetch = useFetch<any>(`${props.dfUrl}/api/v1/datasets/${props.datasetId}`)

const pathField = computed(() => {
  return datasetFetch.data.value?.schema?.find((p: any) => p['x-refersTo'] === 'http://schema.org/DigitalDocument')?.key
})

const urlField = computed(() => {
  return datasetFetch.data.value?.schema?.find((p: any) => p['x-refersTo'] === 'https://schema.org/WebPage')?.key
    || datasetFetch.data.value?.schema?.find((p: any) => p['x-refersTo'] === 'http://schema.org/image')?.key
})

const titleField = computed(() => {
  return datasetFetch.data.value?.schema?.find((p: any) => p['x-refersTo'] === 'http://www.w3.org/2000/01/rdf-schema#label')?.key
})

const descriptionField = computed(() => {
  return datasetFetch.data.value?.schema?.find((p: any) => p['x-refersTo'] === 'http://schema.org/description')?.key
})

const textField = computed(() => {
  if (props.textKey) return props.textKey
  if (pathField.value) return datasetFetch.data.value?.schema?.find((p: any) => p.key === '_file.content')?.key
  return descriptionField.value
})

const imageField = computed(() => {
  return datasetFetch.data.value?.schema?.find((p: any) => p['x-refersTo'] === 'http://schema.org/image')?.key
})

const tagsField = computed(() => {
  return datasetFetch.data.value?.schema?.find((p: any) => p['x-refersTo'] === 'https://schema.org/DefinedTermSet')?.key
})

const linesQuery = computed(() => {
  const params: Record<string, string> = { q: search.value, size: '' + size.value, q_mode: 'complete', finalizedAt: datasetFetch.data.value?.finalizedAt }
  if (textField.value) params.highlight = textField.value
  params.select = titleField.value
  if (descriptionField.value) params.select += ',' + descriptionField.value
  if (urlField.value) params.select += ',' + urlField.value
  if (imageField.value) params.select += ',' + imageField.value
  if (tagsField.value) params.select += ',' + tagsField.value
  return params
})
const linesFetch = useFetch<{ results: any[] }>(`${props.dfUrl}/api/v1/datasets/${props.datasetId}/lines`, { query: linesQuery, immediate: false, watch: false })
watch(search, () => {
  if (search.value.length > 3) {
    linesFetch.refresh()
    menu.value = true
  }
})
const lines = computed(() => {
  if (search.value.length <= 3 || !linesFetch.data.value) return null
  return linesFetch.data.value.results.map((result) => {
    const line = {
      _id: result._id,
      title: result[titleField.value],
      url: urlField.value && result[urlField.value],
      image: imageField.value && result[imageField.value],
      highlight: (textField.value && result._highlight?.[textField.value]?.join('... ')) ?? (descriptionField.value && result[descriptionField.value]),
      tags: tagsField.value && result[tagsField.value] ? result[tagsField.value].split(',') : [],
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
