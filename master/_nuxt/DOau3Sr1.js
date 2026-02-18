import{_ as u}from"./B6_CMLur.js";import{u as a}from"./dPkjHlQK.js";import{E as p,C as i,F as r,y as m,z as n,B as s,A as d,D as o}from"./C7EvCYq6.js";import{V as f}from"./D8uLA20o.js";import"./DaF-pQcE.js";import"./CE1G-McA.js";/* empty css        */import"./wiFSfROe.js";const l="Plugins",E={__name:"plugins",setup(g){return a({title:"VJSF - "+l,meta:[{name:"description",content:"The plugin system of VJSF for powerful extensibility"}]}),(y,t)=>{const e=u;return m(),p(r(f),{class:"doc-content-page"},{default:i(()=>[n("h1",{class:"text-h2 mb-8"},d(l)),t[4]||(t[4]=n("p",null,"All components that are quite light and that mostly use Vuetify components are included directly into vjsf. But other components that use more specific dependencies are externalized into plugins.",-1)),t[5]||(t[5]=n("h2",{class:"text-h4 my-6"}," Using a plugin ",-1)),t[6]||(t[6]=n("p",null,"Install it:",-1)),s(e,{language:"bash"},{default:i(()=>[...t[0]||(t[0]=[o(" npm install @koumoul/vjsf-markdown ",-1)])]),_:1}),t[7]||(t[7]=n("p",null,"When using compilation at build time, installing the plugin is sufficient and the necessary imports will be taken care of automatically.",-1)),t[8]||(t[8]=n("p",null,[o("When using compilation at runtime, you should import the plugin and provide it to vjsf using the "),n("code",null,"plugins"),o(" option:")],-1)),t[9]||(t[9]=n("p",null,[o("Plugins can use specific options defined in the "),n("code",null,"pluginsOptions"),o(" options.")],-1)),s(e,null,{default:i(()=>[...t[1]||(t[1]=[n("pre",null,`import Vjsf from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'

const options = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {...}
  }
}
`,-1)])]),_:1}),t[10]||(t[10]=n("h2",{class:"text-h4 my-6"}," Known plugins ",-1)),t[11]||(t[11]=n("h3",{class:"test-h6 my-4"}," @koumoul/vjsf-markdown ",-1)),t[12]||(t[12]=n("p",null,[o("This plugin provides a rich markdown editor based on "),n("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),o(". You can customize EasyMDE configuration like so:")],-1)),s(e,null,{default:i(()=>[...t[2]||(t[2]=[n("pre",null,`const vjsfOptions = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {
      easyMDEOptions: { minHeight: '300px', maxHeight: '300px' }
    }
  }
}`,-1)])]),_:1}),t[13]||(t[13]=n("p",null,[o("This plugins uses "),n("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),o(" which is a CommonJS dependency. You might need to declare it to your build system. For example with Vite:")],-1)),s(e,null,{default:i(()=>[...t[3]||(t[3]=[n("pre",null,`optimizeDeps: {
  include: ['easymde']
}
`,-1)])]),_:1}),t[14]||(t[14]=n("h2",{class:"text-h4 my-6"}," Writing a custom plugin ",-1)),t[15]||(t[15]=n("p",null,[o(" A plugin is the recommended way to extend the capabilities of Vjsf with custom components. The alternative way of simply using the "),n("code",null,"component"),o(" slot is very limited. ")],-1)),t[16]||(t[16]=n("p",null,[o("You will have to provide a combination of a Vue component with standard "),n("code",null,"props"),o(" and some metadata to guide the integration of this component in the form. For the time being, the most efficient way to go about it is to have a look at "),n("a",{href:"https://github.com/koumoul-dev/vuetify-jsonschema-form/tree/master/plugins/markdown/src"},"the markdown plugin source code"),o(".")],-1))]),_:1})}}};export{E as default};
