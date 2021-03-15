export default {
  data() {
    return {
      tooltip: {
        maxWidth: 200
      }
    }
  },
  mounted() {
    if (!this.htmlDescription) return
    if (this.$el && this.$el.getBoundingClientRect) this.tooltip.maxWidth = this.$el.getBoundingClientRect().left - 80
  },
  methods: {
    renderTooltip(h, slot) {
      if (!this.htmlDescription) return
      if (this.fullOptions.hideTooltips) return
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
              attrs,
              props: { icon: true, retainFocusOnClick: true },
              style: 'pointer-events: auto' // necessary or the tooltip is disabled on readOnly props
            }, [h('v-icon', { }, this.fullOptions.icons.info)])
          }
        }
      }, [
        h('div', { style: `max-width: ${this.tooltip.maxWidth}px`, domProps: { innerHTML: this.htmlDescription } })
      ])
    }
  }
}
