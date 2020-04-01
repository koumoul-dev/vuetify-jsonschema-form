export default {
  data() {
    return {
      tooltip: {
        show: false,
        maxWidth: 200
      }
    }
  },
  mounted() {
    if (!this.htmlDescription) return
    this.tooltip.maxWidth = this.$el.getBoundingClientRect().left - 80
  },
  methods: {
    renderTooltip(h, slot) {
      if (!this.htmlDescription) return
      return h('v-tooltip', {
        slot,
        props: { value: this.tooltip.show, left: true, openOnHover: false, openOnClick: false, contentClass: 'vjsf-tooltip' },
        scopedSlots: {
          activator: () => h('v-icon', { on: { click: () => { this.tooltip.show = !this.tooltip.show } } }, this.fullOptions.icons.info)
        }
      }, [
        h('div', { style: `max-width: ${this.tooltip.maxWidth}px`, domProps: { innerHTML: this.htmlDescription } })
      ])
    }
  }
}
