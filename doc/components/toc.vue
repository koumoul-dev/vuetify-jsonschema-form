<template>
  <v-navigation-drawer
    v-if="$vuetify.display.lgAndUp"
    location="right"
    permanent
    floating
    color="transparent"
  >
    <v-list
      v-if="sections && sections.length"
      v-scroll="onScroll"
      dense
      density="compact"
    >
      <v-list-subheader>Contents</v-list-subheader>

      <v-list-item
        v-for="(section, i) in sections"
        :key="i"
        :style="itemStyle(activeSection && activeSection.id === section.id)"
        :to="{hash: `#${section.id}`}"
        :active="false"
      >
        <v-list-item-title>
          {{ section.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    sections: { type: Array, default: () => ([]) }
  },
  data: () => ({
    offsets: [],
    timeout: null,
    activeSection: null,
    activeIndex: null
  }),
  computed: {
    toc () {
      return this.sections.map(s => ({ ...s, hash: `#${s.id}` })).reverse()
    }
  },
  mounted () {
    this.onScroll()
  },
  methods: {
    itemStyle (active) {
      return `border-left: 2px solid ${active ? this.$vuetify.theme.themes.light.colors.primary : 'transparent'};`
    },
    goTo (id) {
      const e = document.getElementById(id)
      if (!e) return null
      this.$vuetify.goTo(e.offsetTop + 20)
    },
    // inspired by https://github.com/vuetifyjs/vuetify/blob/34a37a06fd49e4c70f47b17e46eaa56716250283/packages/docs/src/layouts/default/Toc.vue#L126
    setOffsets () {
      this.offsets = this.toc.map(t => {
        const e = document.getElementById(t.id)
        if (!e) return null
        return e.offsetTop
      }).filter(o => o !== null)
    },
    async findActiveIndex () {
      const currentOffset = (
        window.pageYOffset ||
          document.documentElement.offsetTop ||
          0
      )

      // if (this.offsets.length !== this.toc.length) this.setOffsets()
      this.setOffsets()

      let index = this.offsets.findIndex(offset => offset - 40 < currentOffset)
      if (index === -1) index = this.toc.length - 1
      if (currentOffset + window.innerHeight === document.documentElement.offsetHeight) {
        index = 0
      }
      this.activeIndex = this.toc.length - (index + 1)
      this.activeSection = this.toc[index]
    },
    onScroll () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.findActiveIndex, 17)
    }
  }
}
</script>

<style lang="css" scoped>
</style>