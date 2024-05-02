import{_ as a}from"./code-block.B6welQfz.js";import{u as l}from"./vue.f36acd1f.B7b45st3.js";import{F as u,A as o,G as p,t as c,x as n,y as r,z as e,B as t}from"./entry.goduRlUh.js";import{V as d}from"./VContainer.DXQ7Pxbr.js";import"./prismeditor.min.CBYaCUPY.js";/* empty css              */import"./tag.C3xCeWAC.js";const m=n("p",null,"All components that are quite light and that mostly use Vuetify components are included directly into vjsf. But other components that use more specific dependencies are externalized into plugins.",-1),h=n("h2",{class:"text-h4 my-6"}," Using a plugin ",-1),_=n("p",null,"Install it:",-1),f=n("p",null,"When using compilation at build time, installing the plugin is sufficient and the necessary imports will be taken care of automatically.",-1),g=n("p",null,[t("When using compilation at runtime, you should import the plugin and provide it to vjsf using the "),n("code",null,"plugins"),t(" option:")],-1),y=n("p",null,[t("Plugins can use specific options defined in the "),n("code",null,"pluginsOptions"),t(" options.")],-1),k=n("pre",null,`import Vjsf from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'

const options = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {...}
  }
}
`,-1),w=n("h2",{class:"text-h4 my-6"}," Known plugins ",-1),x=n("h3",{class:"test-h6 my-4"}," @koumoul/vjsf-markdown ",-1),V=n("p",null,[t("This plugin provides a rich markdown editor based on "),n("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),t(". You can customize EasyMDE configuration like so:")],-1),j=n("pre",null,`const vjsfOptions = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {
      easyMDEOptions: { minHeight: '300px', maxHeight: '300px' }
    }
  }
}`,-1),b=n("p",null,[t("Please note that this plugins uses "),n("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),t(" which is a CommonJS dependency. You might need to declare it to your build system. For example with Vite:")],-1),v=n("pre",null,`optimizeDeps: {
  include: ['easymde']
}
`,-1),i="Plugins",N={__name:"plugins",setup(E){return l({title:"VJSF - "+i}),(M,D)=>{const s=a;return c(),u(p(d),{class:"doc-content-page"},{default:o(()=>[n("h1",{class:"text-h2 mb-8"},r(i)),m,h,_,e(s,{language:"bash"},{default:o(()=>[t(" npm install @koumoul/vjsf-markdown ")]),_:1}),f,g,y,e(s,null,{default:o(()=>[k]),_:1}),w,x,V,e(s,null,{default:o(()=>[j]),_:1}),b,e(s,null,{default:o(()=>[v]),_:1})]),_:1})}}};export{N as default};
