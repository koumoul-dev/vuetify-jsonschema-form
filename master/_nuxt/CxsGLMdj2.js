import{Ct as e,H as t,Wt as n,b as r,f as i,it as a,p as o,x as s}from"./DAU6Le7d.js";import{n as c}from"./pcmOeemA.js";import{t as l}from"./C7QhYIeT.js";import{t as u}from"./DzI9DZhV2.js";var d=`Plugins`,f={__name:`plugins`,setup(f){return c({title:`VJSF - Plugins`,meta:[{name:`description`,content:`The plugin system of VJSF for powerful extensibility`}]}),(c,f)=>{let p=u;return t(),o(e(l),{class:`doc-content-page`},{default:a(()=>[i(`h1`,{class:`text-display-medium mb-8`},n(d)),f[4]||=i(`p`,null,`All components that are quite light and that mostly use Vuetify components are included directly into vjsf. But other components that use more specific dependencies are externalized into plugins.`,-1),f[5]||=i(`h2`,{class:`text-headline-large my-6`},` Using a plugin `,-1),f[6]||=i(`p`,null,`Install it:`,-1),s(p,{language:`bash`},{default:a(()=>[...f[0]||=[r(` npm install @koumoul/vjsf-markdown `,-1)]]),_:1}),f[7]||=i(`p`,null,`When using compilation at build time, installing the plugin is sufficient and the necessary imports will be taken care of automatically.`,-1),f[8]||=i(`p`,null,[r(`When using compilation at runtime, you should import the plugin and provide it to vjsf using the `),i(`code`,null,`plugins`),r(` option:`)],-1),f[9]||=i(`p`,null,[r(`Plugins can use specific options defined in the `),i(`code`,null,`pluginsOptions`),r(` options.`)],-1),s(p,null,{default:a(()=>[...f[1]||=[i(`pre`,null,`import Vjsf from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'

const options = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {...}
  }
}
`,-1)]]),_:1}),f[10]||=i(`h2`,{class:`text-headline-large my-6`},` Known plugins `,-1),f[11]||=i(`h3`,{class:`test-h6 my-4`},` @koumoul/vjsf-markdown `,-1),f[12]||=i(`p`,null,[r(`This plugin provides a rich markdown editor based on `),i(`a`,{href:`https://github.com/Ionaru/easy-markdown-editor`},`EasyMDE`),r(`. You can customize EasyMDE configuration like so:`)],-1),s(p,null,{default:a(()=>[...f[2]||=[i(`pre`,null,`const vjsfOptions = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: {
      easyMDEOptions: { minHeight: '300px', maxHeight: '300px' }
    }
  }
}`,-1)]]),_:1}),f[13]||=i(`p`,null,[r(`This plugins uses `),i(`a`,{href:`https://github.com/Ionaru/easy-markdown-editor`},`EasyMDE`),r(` which is a CommonJS dependency. You might need to declare it to your build system. For example with Vite:`)],-1),s(p,null,{default:a(()=>[...f[3]||=[i(`pre`,null,`optimizeDeps: {
  include: ['easymde']
}
`,-1)]]),_:1}),f[14]||=i(`h2`,{class:`text-headline-large my-6`},` Writing a custom plugin `,-1),f[15]||=i(`p`,null,[r(` A plugin is the recommended way to extend the capabilities of Vjsf with custom components. The alternative way of simply using the `),i(`code`,null,`component`),r(` slot is very limited. `)],-1),f[16]||=i(`p`,null,[r(`You will have to provide a combination of a Vue component with standard `),i(`code`,null,`props`),r(` and some metadata to guide the integration of this component in the form. For the time being, the most efficient way to go about it is to have a look at `),i(`a`,{href:`https://github.com/koumoul-dev/vuetify-jsonschema-form/tree/master/plugins/markdown/src`},`the markdown plugin source code`),r(`.`)],-1)]),_:1})}}};export{f as default};