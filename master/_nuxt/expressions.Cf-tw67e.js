import{_ as i}from"./code-block.DaO1c3qU.js";import{u as r}from"./vue.f36acd1f.DHQGtKV6.js";import{F as p,A as o,G as l,t as d,x as e,y as c,z as n,B as t}from"./entry.DoSmaqyO.js";import{V as u}from"./VAlert.CS8tkWQ8.js";import{V as h}from"./VContainer.ClQQlKD8.js";import"./prismeditor.min.DR_fvp5A.js";import"./index.DgUvWx0I.js";import"./tag.DfXh_3Uk.js";import"./VBtn.BEPmgFRS.js";import"./resizeObserver.I9Dxf1bR.js";/* empty css              */const m=e("p",null,"Expressions are used throughout VJSF to provide dynamic functionalities like conditional rendering, fetching items of a select component, etc.",-1),f=e("p",null,'There are 3 types of expressions supported for the time being : "js-fn", "js-eval" and "js-tpl". All of them are compiled to Javascript functions that accept the same parameters.',-1),_=e("h2",{class:"text-h4 mt-8 mb-6"}," Parameters ",-1),b=e("ul",null,[e("li",null,[e("b",null,"data"),t(" - it varies depending on the expression you are using, it can be the data from the current node, an item in a select component, etc.")]),e("li",null,[e("b",null,"options"),t(" - the options object passed to VJSF then merged with contextual options from all parent nodes.")]),e("li",null,[e("b",null,"context"),t(' - shortcut for "options.context".')]),e("li",null,[e("b",null,"display"),t(" - the display object used to manage responsive layouts.")]),e("li",null,[e("b",null,"layout"),t(" - normalized layout information of the current component.")])],-1),x=e("pre",null,`{
  width: number // the width of the parent container
  xs: boolean,
  sm: boolean,
  smAndDown: boolean,
  smAndUp: boolean,
  md: boolean,
  mdAndDown: boolean,
  mobile: boolean, // alias for mdAndDown
  mdAndUp: boolean,
  lg: boolean,
  lgAndDown: boolean,
  lgAndUp: boolean,
  xl: boolean,
  xlAndDown: boolean,
  xlAndUp: boolean,
  xxl: boolean
}`,-1),y=e("h2",{class:"text-h4 mt-8 mb-6"}," Pure/impure expressions ",-1),w=e("p",null,"Expressions are considered as pure by default. It means that they should only use their input parameters, and no global variable. This allows for caching optimizations. It is possible to declare that an expression is not pure like this:",-1),g=e("pre",null,`{
  expr: '!!window.myVar',
  pure: false
}`,-1),v=e("p",null,"This kind of expression has access to some extra parameters:",-1),T=e("ul",null,[e("li",null,[e("b",null,"parentData"),t(" - the data of the parent node where this expression is evaluated.")]),e("li",null,[e("b",null,"rootData"),t(" - the root data of this vjsf instance.")])],-1),A=e("h2",{class:"text-h4 mt-8 mb-6"},[t(" Type "),e("code",null,"js-eval")],-1),V=e("p",null,"This type of expression lets you write a single JS statement that will be evaluated and returned. It is compiled like this :",-1),k=e("p",null,[t("This is the default type when the expected result of the expression is a boolean or a complex object (like the "),e("code",null,"if"),t(" property).")],-1),S=e("h2",{class:"text-h4 mt-8 mb-6"},[t(" Type "),e("code",null,"js-tpl")],-1),j=e("p",null,[t("This type of expression lets you write a "),e("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals"},"JS template literal"),t(" that will be evaluated and returned. It is compiled like this :")],-1),J=e("p",null,[t("This is the default type when the expected result of the expression is a string (like the "),e("code",null,"url"),t(" property in a "),e("code",null,"fetch"),t(" instruction).")],-1),D=e("h2",{class:"text-h4 mt-8 mb-6"},[t(" Type "),e("code",null,"js-fn")],-1),F=e("p",null,"This type of expression lets you write the full body of a JS function including its return statement. It is compiled like this :",-1),a="Expressions",$={__name:"expressions",setup(I){return r({title:"VJSF - "+a}),(U,z)=>{const s=i;return d(),p(l(h),{class:"doc-content-page"},{default:o(()=>[e("h1",{class:"text-h2 mb-8"},c(a)),n(l(u),{type:"warning",variant:"outlined",class:"mb-8"},{default:o(()=>[t(" Expressions are pieces of imperative code dispersed in a declarative JSON schema. You must consider schemas interpreted by VJSF as part of the code source of your application and you cannot safely use schemas provided by an untrusted source. ")]),_:1}),m,f,_,b,t(" Content of the display parameter: "),n(s,null,{default:o(()=>[x]),_:1}),y,w,n(s,null,{default:o(()=>[g]),_:1}),v,T,A,V,n(s,null,{default:o(()=>[t(" new Function(...params, 'return (' + expression + ')') ")]),_:1}),k,S,j,n(s,null,{default:o(()=>[t(" new Function(...params, 'return `' + expression + '`') ")]),_:1}),J,D,F,n(s,null,{default:o(()=>[t(" new Function(...params, expression) ")]),_:1})]),_:1})}}};export{$ as default};
