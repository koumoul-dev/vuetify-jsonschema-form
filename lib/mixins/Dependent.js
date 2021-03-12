// duplicate of this code from vuetify:
// https://github.com/vuetifyjs/vuetify/blob/06d828ee754417f48d966c3a1f8c2027921206d1/packages/vuetify/src/mixins/dependent/index.ts#L62

function searchChildren(children) {
  const results = []

  for (let index = 0; index < children.length; index++) {
    const child = children[index]

    if (child.isActive && child.isDependent) {
      results.push(child)
    } else {
      results.push(...searchChildren(child.$children))
    }
  }

  return results
}
/* @vue/component */

export default {
  name: 'dependent',

  data() {
    return {
      closeDependents: true,
      isActive: false,
      isDependent: true
    }
  },

  watch: {
    isActive(val) {
      if (val) return
      const openDependents = this.getOpenDependents()

      for (let index = 0; index < openDependents.length; index++) {
        openDependents[index].isActive = false
      }
    }

  },
  methods: {
    getOpenDependents() {
      if (this.closeDependents) return searchChildren(this.$children)
      return []
    },

    getOpenDependentElements() {
      const result = []
      const openDependents = this.getOpenDependents()

      for (let index = 0; index < openDependents.length; index++) {
        result.push(...openDependents[index].getClickableDependentElements())
      }

      return result
    },

    getClickableDependentElements() {
      const result = [this.$el]
      if (this.$refs.content) result.push(this.$refs.content)
      if (this.overlay) result.push(this.overlay.$el)
      result.push(...this.getOpenDependentElements())
      return result
    }

  }
}
