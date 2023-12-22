import{_ as l}from"./code-block.bd392ce6.js";import{u as a}from"./vue.f36acd1f.bd280f57.js";import{E as r,A as o,M as u,t as c,x as t,y as m,z as s,B as e}from"./entry.7a28d242.js";import{V as p}from"./VContainer.ddac67c8.js";import"./prism.a56ee833.js";import"./VGrid.c7d929ae.js";const d=t("p",null,"All components that are quite light and that mostly use Vuetify components are included directly into vjsf. But other components that use more specific dependencies are externalized into plugins.",-1),_=t("h2",{class:"text-h4 my-6"}," Known plugins ",-1),h=t("ul",null,[t("li",null,[t("b",null,"@koumoul/vjsf-markdown"),e(" - provides a rich markdown editor based on "),t("a",{href:"https://github.com/Ionaru/easy-markdown-editor"},"EasyMDE"),e(".")])],-1),f=t("h2",{class:"text-h4 my-6"}," Using a plugin ",-1),g=t("p",null,"Install it:",-1),k=t("p",null,"When using compilation at build time, installing the plugin is sufficient and the necessary imports will be taken care of automatically.",-1),y=t("p",null,"When using compilation at runtime, you should import the plugin for it to register its component(s) with vjsf:",-1),w=t("pre",null,`import Vjsf from '@koumoul/vjsf'
import '@koumoul/vjsf-markdown'
      `,-1),i="Plugins",A={__name:"plugins",setup(x){return a({title:"VJSF - "+i}),(V,b)=>{const n=l;return c(),r(u(p),{class:"doc-content-page"},{default:o(()=>[t("h1",{class:"text-h2 mb-8"},m(i)),d,_,h,f,g,s(n,null,{default:o(()=>[e(" npm install @koumoul/vjsf-markdown ")]),_:1}),k,y,s(n,null,{default:o(()=>[w]),_:1})]),_:1})}}};export{A as default};