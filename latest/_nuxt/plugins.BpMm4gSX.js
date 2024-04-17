import{_ as a}from"./code-block.Df26ioPC.js";import{u as l}from"./vue.f36acd1f.DP9qr15i.js";import{F as u,A as n,G as r,t as c,x as t,y as d,z as s,B as o}from"./entry.DLmFTb3L.js";import{V as m}from"./VContainer.b156fO6-.js";import"./prismeditor.min.BO1F-l62.js";/* empty css              */import"./tag.C0AZ4mT7.js";const p=t("p",null,"All components that are quite light and that mostly use Vuetify components are included directly into vjsf. But other components that use more specific dependencies are externalized into plugins.",-1),h=t("h2",{class:"text-h4 my-6"}," Known plugins ",-1),_=t("h3",{class:"test-h6 my-4"}," @koumoul/vjsf-markdown ",-1),f=t("p",null,[o("This plugin provides a rich markdown editor based on "),t("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),o(". You can customize EasyMDE configuration like so:")],-1),g=t("pre",null,`const vjsfOptions = {
  ...
  plugins: {
    markdown: {
      easyMDEOptions: { minHeight: '300px', maxHeight: '300px' }
    }
  }
}`,-1),y=t("p",null,[o("Please note that this plugins uses "),t("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),o(" which is a CommonJS dependency. You might need to declare it to your build system. For example with Vite:")],-1),k=t("pre",null,`optimizeDeps: {
  include: ['easymde']
}
`,-1),w=t("h2",{class:"text-h4 my-6"}," Using a plugin ",-1),x=t("p",null,"Install it:",-1),V=t("p",null,"When using compilation at build time, installing the plugin is sufficient and the necessary imports will be taken care of automatically.",-1),j=t("p",null,"When using compilation at runtime, you should import the plugin and provide it to vjsf using the nodeComponents option:",-1),b=t("pre",null,`import Vjsf from '@koumoul/vjsf'
import VjsfNodeMarkdown from '@koumoul/vjsf-markdown'

const options = {
  nodeComponents: {
    markdown: VjsfNodeMarkdown
  }
}
`,-1),i="Plugins",I={__name:"plugins",setup(v){return l({title:"VJSF - "+i}),(E,D)=>{const e=a;return c(),u(r(m),{class:"doc-content-page"},{default:n(()=>[t("h1",{class:"text-h2 mb-8"},d(i)),p,h,_,f,s(e,null,{default:n(()=>[g]),_:1}),y,s(e,null,{default:n(()=>[k]),_:1}),w,x,s(e,{language:"bash"},{default:n(()=>[o(" npm install @koumoul/vjsf-markdown ")]),_:1}),V,j,s(e,null,{default:n(()=>[b]),_:1})]),_:1})}}};export{I as default};
