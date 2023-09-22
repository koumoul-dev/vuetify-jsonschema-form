export default {
  data() {
    return {
      tooltip: {
        maxWidth: 200
      }
    }
  },
  computed: {
    isUrl() {
      let url
      try {
        url = new URL(this.fullSchema.description)
      } catch (_) {
        return false
      }
      return url.protocol === 'http:' || url.protocol === 'https:'
    }
  },
  mounted() {
    if (!this.htmlDescription) return
    if (this.$el && this.$el.getBoundingClientRect) this.tooltip.maxWidth = this.$el.getBoundingClientRect().left - 80
  },
  methods: {
    renderTooltip(h, slot) {
      if (this.fullOptions.hideTooltips) return
      if (this.fullOptions.hideReadOnlyTooltips && (this.fullSchema.readOnly || this.fullOptions.readOnlyArrayItem)) return
      if (!this.htmlDescription) return
      if (this.fullOptions.linkTooltipsIfAvailable && this.isUrl) {
        return h('v-btn', {
          slot,
          attrs: {
            'aria-label': 'description'
          },
          props: {
            icon: true,
            retainFocusOnClick: true,
            href: this.fullSchema.description,
            target: '_blank',
            ...this.fullOptions.tooltipProps },
          style: 'pointer-events: auto' // necessary or the tooltip is disabled on readOnly props
        }, [h('v-icon', { }, this.fullOptions.icons.info)])
      }

      return h('v-tooltip', {
        slot,
        props: { contentClass: 'vjsf-tooltip', ...this.fullOptions.tooltipProps },
        scopedSlots: {
          activator: ({ on, attrs }) => {
            // openOnClick doesn't work well
            // cf https://stackoverflow.com/questions/60322211/vuetify-vtooltip-trigger-only-on-activator-click/60333126#60333126
            if (this.fullOptions.tooltipProps.openOnClick) {
              delete on.focus
            }
            return h('v-btn', {
              on,
              attrs: {
                'aria-label': 'description',
                ...attrs
              },
              props: { icon: true, retainFocusOnClick: true },
              style: 'pointer-events: auto' // necessary or the tooltip is disabled on readOnly props
            }, [h('v-icon', { }, this.fullOptions.icons.info)])
          }
        }
      }, [
        h('div', { style: `max-width: ${this.tooltip.maxWidth}px`, domProps: { innerHTML: this.htmlDescription }, attrs: { 'aria-live': 'assertive' } })
      ])
    }
  }
}
