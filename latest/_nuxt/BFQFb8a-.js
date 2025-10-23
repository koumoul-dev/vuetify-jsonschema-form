import{_ as u}from"./il6u8OfU.js";import{u as a}from"./BbnFGYIp.js";import{D as p,A as i,E as r,v as m,x as t,z as e,y as d,B as o}from"./Cv0UnELm.js";import{V as f}from"./LL1zUGcG.js";import"./CN5uW8HJ.js";import"./BosuxZz1.js";/* empty css        */import"./3_ZcXSA6.js";const l="Plugins",E={__name:"plugins",setup(g){return a({title:"VJSF - "+l}),(y,n)=>{const s=u;return m(),p(r(f),{class:"doc-content-page"},{default:i(()=>[t("h1",{class:"text-h2 mb-8"},d(l)),n[4]||(n[4]=t("p",null,"All components that are quite light and that mostly use Vuetify components are included directly into vjsf. But other components that use more specific dependencies are externalized into plugins.",-1)),n[5]||(n[5]=t("h2",{class:"text-h4 my-6"}," Using a plugin ",-1)),n[6]||(n[6]=t("p",null,"Install it:",-1)),e(s,{language:"bash"},{default:i(()=>n[0]||(n[0]=[o(" npm install @koumoul/vjsf-markdown ")])),_:1}),n[7]||(n[7]=t("p",null,"When using compilation at build time, installing the plugin is sufficient and the necessary imports will be taken care of automatically.",-1)),n[8]||(n[8]=t("p",null,[o("When using compilation at runtime, you should import the plugin and provide it to vjsf using the "),t("code",null,"plugins"),o(" option:")],-1)),n[9]||(n[9]=t("p",null,[o("Plugins can use specific options defined in the "),t("code",null,"pluginsOptions"),o(" options.")],-1)),e(s,null,{default:i(()=>n[1]||(n[1]=[t("pre",null,`import Vjsf from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'

const options = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {...}
  }
}
`,-1)])),_:1}),n[10]||(n[10]=t("h2",{class:"text-h4 my-6"}," Known plugins ",-1)),n[11]||(n[11]=t("h3",{class:"test-h6 my-4"}," @koumoul/vjsf-markdown ",-1)),n[12]||(n[12]=t("p",null,[o("This plugin provides a rich markdown editor based on "),t("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),o(". You can customize EasyMDE configuration like so:")],-1)),e(s,null,{default:i(()=>n[2]||(n[2]=[t("pre",null,`const vjsfOptions = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {
      easyMDEOptions: { minHeight: '300px', maxHeight: '300px' }
    }
  }
}`,-1)])),_:1}),n[13]||(n[13]=t("p",null,[o("This plugins uses "),t("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),o(" which is a CommonJS dependency. You might need to declare it to your build system. For example with Vite:")],-1)),e(s,null,{default:i(()=>n[3]||(n[3]=[t("pre",null,`optimizeDeps: {
  include: ['easymde']
}
`,-1)])),_:1}),n[14]||(n[14]=t("h2",{class:"text-h4 my-6"}," Writing a custom plugin ",-1)),n[15]||(n[15]=t("p",null,[o(" A plugin is the recommended way to extend the capabilities of Vjsf with custom components. The alternative way of simply using the "),t("code",null,"component"),o(" slot is very limited. ")],-1)),n[16]||(n[16]=t("p",null,[o("You will have to provide a combination of a Vue component with standard "),t("code",null,"props"),o(" and some metadata to guide the integration of this component in the form. For the time being, the most efficient way to go about it is to have a look at "),t("a",{href:"https://github.com/koumoul-dev/vuetify-jsonschema-form/tree/master/plugins/markdown/src"},"the markdown plugin source code"),o(".")],-1))]),_:1})}}};export{E as default};
