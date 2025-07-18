import{_ as u}from"./DCzMmCPE.js";import{u as p}from"./DQfGdnQb.js";import{D as r,A as s,E as a,v as m,x as t,z as l,y as d,B as o}from"./CmImXJHT.js";import{V as f}from"./CXMlfako.js";import"./CN5uW8HJ.js";import"./BosuxZz1.js";/* empty css        */import"./CtjjkG5G.js";const e="Plugins",E={__name:"plugins",setup(g){return p({title:"VJSF - "+e}),(y,n)=>{const i=u;return m(),r(a(f),{class:"doc-content-page"},{default:s(()=>[t("h1",{class:"text-h2 mb-8"},d(e)),n[4]||(n[4]=t("p",null,"All components that are quite light and that mostly use Vuetify components are included directly into vjsf. But other components that use more specific dependencies are externalized into plugins.",-1)),n[5]||(n[5]=t("h2",{class:"text-h4 my-6"}," Using a plugin ",-1)),n[6]||(n[6]=t("p",null,"Install it:",-1)),l(i,{language:"bash"},{default:s(()=>n[0]||(n[0]=[o(" npm install @koumoul/vjsf-markdown ")])),_:1}),n[7]||(n[7]=t("p",null,"When using compilation at build time, installing the plugin is sufficient and the necessary imports will be taken care of automatically.",-1)),n[8]||(n[8]=t("p",null,[o("When using compilation at runtime, you should import the plugin and provide it to vjsf using the "),t("code",null,"plugins"),o(" option:")],-1)),n[9]||(n[9]=t("p",null,[o("Plugins can use specific options defined in the "),t("code",null,"pluginsOptions"),o(" options.")],-1)),l(i,null,{default:s(()=>n[1]||(n[1]=[t("pre",null,`import Vjsf from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'

const options = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {...}
  }
}
`,-1)])),_:1}),n[10]||(n[10]=t("h2",{class:"text-h4 my-6"}," Known plugins ",-1)),n[11]||(n[11]=t("h3",{class:"test-h6 my-4"}," @koumoul/vjsf-markdown ",-1)),n[12]||(n[12]=t("p",null,[o("This plugin provides a rich markdown editor based on "),t("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),o(". You can customize EasyMDE configuration like so:")],-1)),l(i,null,{default:s(()=>n[2]||(n[2]=[t("pre",null,`const vjsfOptions = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {
      easyMDEOptions: { minHeight: '300px', maxHeight: '300px' }
    }
  }
}`,-1)])),_:1}),n[13]||(n[13]=t("p",null,[o("This plugins uses "),t("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),o(" which is a CommonJS dependency. You might need to declare it to your build system. For example with Vite:")],-1)),l(i,null,{default:s(()=>n[3]||(n[3]=[t("pre",null,`optimizeDeps: {
  include: ['easymde']
}
`,-1)])),_:1})]),_:1})}}};export{E as default};
