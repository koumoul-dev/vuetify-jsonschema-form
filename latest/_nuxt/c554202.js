(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1002:function(t,e,o){"use strict";o(667)},1003:function(t,e,o){var r=o(16)(!1);r.push([t.i,".vjsf-editor .ace-vibrant-ink .ace_keyword,.vjsf-editor .ace-vibrant-ink .ace_meta{color:#00bcd4}",""]),t.exports=r},1038:function(t,e,o){"use strict";o.r(e);var r=o(26),n=(o(76),o(542),o(552)),c=(o(555),o(577)),l=o(578),f=o(579),d=o(969),m=o.n(d),v=o(997);o(998),o(1e3);var h="ace/theme/vibrant_ink";o(1001);var y={showLineNumbers:!1,fontSize:14,tabSize:2},j={layout:"void",components:{VJsf:n.a,VJsfTiptap:c.a,VJsfToastUiEditor:l.a,VJsfCropImg:f.a},data:function(){return{title:"editor",format:"yaml",valid:!0,schema:{"x-options":{editMode:"inline"},type:"object",properties:{title:{title:"Title",type:"string"}}},model:{}}},head:function(){return{title:"vjsf - "+this.title}},watch:{format:function(){this.openEditor(this.editors[this.format])}},mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$nextTick();case 2:t.editors={},(o=t.editors.json=v.edit("json-editor")).setOptions(y),o.getSession().setMode("ace/mode/json"),o.setTheme(h),o.setValue(JSON.stringify(t.schema)),(r=t.editors.yaml=v.edit("yaml-editor")).setOptions(y),r.getSession().setMode("ace/mode/yaml"),r.setTheme(h),r.setValue(m.a.stringify(t.schema)),o.session.on("change",(function(){if("json"===t.format){try{t.schema=JSON.parse(o.getValue())||{}}catch(t){return}var e=m.a.stringify(t.schema);e!==r.getValue()&&r.setValue(e)}})),r.session.on("change",(function(){if("yaml"===t.format){try{t.schema=m.a.parse(r.getValue())||{}}catch(t){return}var e=JSON.stringify(t.schema,null,2);e!==o.getValue()&&o.setValue(e)}}));case 15:case"end":return e.stop()}}),e)})))()},methods:{openEditor:function(t){t.focus(),t.gotoLine(0)}}},w=j,V=(o(1002),o(75)),_=o(108),k=o.n(_),x=o(89),S=o(104),C=o(80),J=o(276),O=o(511),T=o(1030),N=o(275),M=o(213),component=Object(V.a)(w,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",{staticClass:"px-0 py-0 vjsf-editor",staticStyle:{height:"100%"},attrs:{fluid:""}},[o("v-row",{staticClass:"ma-0",staticStyle:{height:"100%"}},[o("v-col",{staticClass:"pa-0",attrs:{cols:"4"}},[o("v-card",{staticStyle:{height:"100%"},attrs:{dark:"",tile:"",flat:""}},[o("v-card-text",{staticClass:"px-0 pb-0",staticStyle:{height:"100%"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:"json"===t.format,expression:"format === 'json'"}],staticStyle:{height:"100%"},attrs:{id:"json-editor"}}),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:"yaml"===t.format,expression:"format === 'yaml'"}],staticStyle:{height:"100%"},attrs:{id:"yaml-editor"}})])],1)],1),t._v(" "),o("v-col",{attrs:{cols:"8"}},[o("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[o("v-jsf",{attrs:{schema:t.schema},scopedSlots:t._u([{key:"custom-tiptap",fn:function(e){return[o("v-jsf-tiptap",t._b({},"v-jsf-tiptap",e,!1))]}},{key:"custom-toast-ui-editor",fn:function(e){return[o("v-jsf-toast-ui-editor",t._b({},"v-jsf-toast-ui-editor",e,!1))]}},{key:"custom-avatar",fn:function(e){return[o("v-jsf-crop-img",t._b({},"v-jsf-crop-img",e,!1))]}}]),model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1),t._v(" "),o("v-row",{staticClass:"mt-2"},[o("v-spacer"),t._v(" "),o("v-btn",{attrs:{color:t.valid?"primary":"warning"},on:{click:function(e){return t.$refs.form.validate()}}},[t._v("\n          validate\n        ")]),t._v(" "),o("v-spacer")],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;k()(component,{VBtn:x.a,VCard:S.a,VCardText:C.b,VCol:J.a,VContainer:O.a,VForm:T.a,VRow:N.a,VSpacer:M.a})},667:function(t,e,o){var content=o(1003);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("76a074fa",content,!0,{sourceMap:!1})}}]);