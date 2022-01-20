(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1036:function(e,t,o){"use strict";o.r(t);var n={data:function(){return{title:"About"}},head:function(){return{title:"vjsf - "+this.title}}},r=o(75),l=o(108),c=o.n(l),d=o(511),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-container",[o("h1",{staticClass:"display-1 mb-4"},[e._v("\n    "+e._s(e.title)+"\n  ")]),e._v(" "),o("p",[e._v("\n    VJSF is a library to create forms for "),o("a",{attrs:{href:"https://vuejs.org/"}},[e._v("Vue.js")]),e._v(" / "),o("a",{attrs:{href:"https://vuetifyjs.com/"}},[e._v("Vuetify")]),e._v(" applications in a declarative manner using annotated "),o("a",{attrs:{href:"https://json-schema.org/"}},[e._v("JSON Schemas")]),e._v(".\n  ")]),e._v(" "),o("p",[e._v('\n    It is written primarily as a "scratch my own itch" project by '),o("a",{attrs:{href:"https://koumoul.com"}},[e._v("Koumoul")]),e._v(", and we use it extensively.\n    But it is opened to feedback and contributions on "),o("a",{attrs:{href:"https://github.com/koumoul-dev/vuetify-jsonschema-form"}},[e._v("Github")]),e._v(" and published under the very permissive MIT License.\n  ")]),e._v(" "),o("p",[e._v("\n    It might be suited for you if:\n  ")]),e._v(" "),o("p",[o("ul",[o("li",[e._v("you are tired of coding forms")]),e._v(" "),o("li",[e._v("you need declarative forms as a consequence of your software's architecture (generic admin UI, etc.)")]),e._v(" "),o("li",[e._v("you already use Vue.js + Vuetify (or if you are prepared to pull a bunch of new dependencies)")])])]),e._v(" "),o("p",[e._v("\n    We try to strike a nice balance between these qualities:\n  ")]),e._v(" "),o("p",[o("ul",[o("li",[o("b",[e._v("simplicity")]),e._v(" - feed vjsf a simple and valid JSON schema and you should get a viable form")]),e._v(" "),o("li",[o("b",[e._v("completeness")]),e._v(" - the main JSON schemas semantics should be covered as well as the most common use-cases for forms in Web applications")]),e._v(" "),o("li",[o("b",[e._v("extensibility")]),e._v(" - more specific use cases should also be supported through the use of lower level tools like slots, classes, etc.")]),e._v(" "),o("li",[o("b",[e._v("validity")]),e._v(" - the output of the form should be valid against the provided schema")]),e._v(" "),o("li",[o("b",[e._v("homogeneity")]),e._v(" - the look and feel should be consistent accross all form functionalities and inside your application as a whole")])])]),e._v(" "),o("p",[e._v("\n    While trying to strike this balance we made some debatable choices that you should be aware of:\n  ")]),e._v(" "),o("p",[o("ul",[o("li",[e._v("Structure and presentation are coupled. Meaning that the rendering of the form is derived directly from the schema (as well as a few global options) and you will need to change the schema in order to modify a label, create a section, etc.")]),e._v(" "),o("li",[e._v("Some functionalities are explicitly coupled to Vuetify. We let you use parameters that are directly mapped to Vuetify underlying components (slots, props, layout classes, etc.)")])])])])}),[],!1,null,"fd0fa270",null);t.default=component.exports;c()(component,{VContainer:d.a})},511:function(e,t,o){"use strict";o(9),o(8),o(91),o(278),o(215);var n=o(3);var r,l=o(69);t.a=(r="container",n.a.extend({name:"v-".concat(r),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,t){var o=t.props,data=t.data,n=t.children;data.staticClass="".concat(r," ").concat(data.staticClass||"").trim();var l=data.attrs;if(l){data.attrs={};var c=Object.keys(l).filter((function(e){if("slot"===e)return!1;var t=l[e];return e.startsWith("data-")?(data.attrs[e]=t,!1):t||"string"==typeof t}));c.length&&(data.staticClass+=" ".concat(c.join(" ")))}return o.id&&(data.domProps=data.domProps||{},data.domProps.id=o.id),e(o.tag,data,n)}})).extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(e,t){var o,n=t.props,data=t.data,r=t.children,c=data.attrs;return c&&(data.attrs={},o=Object.keys(c).filter((function(e){if("slot"===e)return!1;var t=c[e];return e.startsWith("data-")?(data.attrs[e]=t,!1):t||"string"==typeof t}))),n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),e(n.tag,Object(l.a)(data,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(o||[])}),r)}})}}]);