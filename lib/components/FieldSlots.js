export default {
  functional: true,
  render: (h, { props }) => {
    console.log('PROPS', props)
    const prependOuter = h('template', { slot: 'prepend' }, [
      h('slot', { name: `prepend-outer-${props.slotName}`, ...props.slotAttrs })
    ])
    const prependInner = h('template', { slot: 'prepend-inner' }, [
      h('slot', { name: `prepend-inner-${props.slotName}`, ...props.slotAttrs })
    ])

    return [prependOuter, prependInner]
  }
}

/*

<template slot="prepend">
  <slot :name="`prepend-outer-${slotName}`" :fullKey="fullKey" :fullSchema="fullSchema" :modelWrapper="modelWrapper" :modelKey="modelKey" :model="modelWrapper[modelKey]" :required="required" :disabled="disabled" :rule="rules" :htmlDescription="htmlDescription" />
</template>
<template slot="prepend-inner">
  <slot :name="`prepend-inner-${slotName}`" :fullKey="fullKey" :fullSchema="fullSchema" :modelWrapper="modelWrapper" :modelKey="modelKey" :model="modelWrapper[modelKey]" :required="required" :disabled="disabled" :rule="rules" :htmlDescription="htmlDescription" />
</template>
<template slot="append">
  <slot :name="`append-inner-${slotName}`" :fullKey="fullKey" :fullSchema="fullSchema" :modelWrapper="modelWrapper" :modelKey="modelKey" :model="modelWrapper[modelKey]" :required="required" :disabled="disabled" :rule="rules" :htmlDescription="htmlDescription" />
</template>
<template slot="append-outer">
  <slot :name="`append-outer-${slotName}`" :fullKey="fullKey" :fullSchema="fullSchema" :modelWrapper="modelWrapper" :modelKey="modelKey" :model="modelWrapper[modelKey]" :required="required" :disabled="disabled" :rule="rules" :htmlDescription="htmlDescription">
    <tooltip :options="options" :html-description="htmlDescription" />
  </slot>
</template>
*/
