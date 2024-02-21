<script setup>
// @ts-nocheck

import { StatefulLayout } from '@json-layout/core'
import { ref, shallowRef, getCurrentInstance, useSlots, computed } from 'vue'
import { useElementSize } from '@vueuse/core'

import { defaultOptions } from '@koumoul/vjsf/components/options.js'
import Tree from '@koumoul/vjsf/components/tree.vue'
import { useVjsf, emits } from '@koumoul/vjsf/composables/use-vjsf.js'
import '@koumoul/vjsf/styles/vjsf.css'


import sectionNode from '@koumoul/vjsf/components/nodes/section.vue'

import textfieldNode from '@koumoul/vjsf/components/nodes/text-field.vue'

import datepickerNode from '@koumoul/vjsf/components/nodes/date-picker.vue'


import localizeErrors from "ajv-i18n/localize/en/index.js";
import { fullFormats } from "ajv-formats/dist/formats.js";

const schema28 = {"$id":"export0","$ref":"_jl#"};
const schema27 = {"type":"object","title":"A simple person definition","properties":{"firstName":{"type":"string","title":"First name","errorMessage":{}},"lastName":{"type":"string","title":"Last name","errorMessage":{}},"birthday":{"type":"string","title":"Birthday","format":"date","errorMessage":{}}},"$id":"_jl","errorMessage":{}};
const formats0 = fullFormats.date;

function validate23(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="export0" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate23.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.firstName !== undefined){
if(typeof data.firstName !== "string"){
const err0 = {instancePath:instancePath+"/firstName",schemaPath:"_jl#/properties/firstName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(errors > 0){
const emErrs0 = [];
for(const err1 of vErrors){
if(!err1.emUsed){
emErrs0.push(err1);
}
}
vErrors = emErrs0;
errors = emErrs0.length;
}
}
if(data.lastName !== undefined){
if(typeof data.lastName !== "string"){
const err2 = {instancePath:instancePath+"/lastName",schemaPath:"_jl#/properties/lastName/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(errors > 0){
const emErrs1 = [];
for(const err3 of vErrors){
if(!err3.emUsed){
emErrs1.push(err3);
}
}
vErrors = emErrs1;
errors = emErrs1.length;
}
}
if(data.birthday !== undefined){
let data2 = data.birthday;
if(typeof data2 === "string"){
if(!(formats0.validate(data2))){
const err4 = {instancePath:instancePath+"/birthday",schemaPath:"_jl#/properties/birthday/format",keyword:"format",params:{format: "date"},message:"must match format \""+"date"+"\""};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
else {
const err5 = {instancePath:instancePath+"/birthday",schemaPath:"_jl#/properties/birthday/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(errors > 0){
const emErrs2 = [];
for(const err6 of vErrors){
if(!err6.emUsed){
emErrs2.push(err6);
}
}
vErrors = emErrs2;
errors = emErrs2.length;
}
}
}
else {
const err7 = {instancePath,schemaPath:"_jl#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(errors > 0){
const emErrs3 = [];
for(const err8 of vErrors){
if(!err8.emUsed){
emErrs3.push(err8);
}
}
vErrors = emErrs3;
errors = emErrs3.length;
}
validate23.errors = vErrors;
return errors === 0;
}
validate23.evaluated = {"props":{"firstName":true,"lastName":true,"birthday":true},"dynamicProps":false,"dynamicItems":false};

function expression0(data, options, context, display, layout) {
return (layout.defaultData)
}

const compiledLayout = {
  skeletonTree: {
    title: "main",

    root: {
      key: "",
      pointer: "_jl#",
      parentPointer: null,
      pure: true,
      propertyKeys: ["firstName", "lastName", "birthday"],

      children: [{
        key: "firstName",
        pointer: "_jl#/properties/firstName",
        parentPointer: "_jl#",
        pure: true,
        propertyKeys: []
      }, {
        key: "lastName",
        pointer: "_jl#/properties/lastName",
        parentPointer: "_jl#",
        pure: true,
        propertyKeys: []
      }, {
        key: "birthday",
        pointer: "_jl#/properties/birthday",
        parentPointer: "_jl#",
        pure: true,
        propertyKeys: []
      }]
    }
  },

  normalizedLayouts: {
    "_jl#": {
      comp: "section",
      title: "A simple person definition",

      children: [{
        key: "firstName"
      }, {
        key: "lastName"
      }, {
        key: "birthday"
      }],

      defaultData: {},

      getDefaultData: {
        type: "js-eval",
        expr: "layout.defaultData",
        pure: true,
        ref: 0
      }
    },

    "_jl#/properties/firstName": {
      comp: "text-field",
      label: "First name"
    },

    "_jl#/properties/lastName": {
      comp: "text-field",
      label: "Last name"
    },

    "_jl#/properties/birthday": {
      comp: "date-picker",
      label: "Birthday",
      format: "date"
    }
  },

  validates: {
    "_jl#": validate23
  },

  validationErrors: {},
  expressions: [expression0],
  locale: "en",

  messages: {
    errorOneOf: "chose one",
    errorRequired: "required information",
    addItem: "Add item",
    delete: "Delete",
    edit: "Edit",
    duplicate: "Duplicate",
    sort: "Sort",
    up: "Move up",
    down: "Move down",
    showHelp: "Show a help message",
    mdeLink1: "[Link title",
    mdeLink2: "](link url)",
    mdeImg1: "![](",
    mdeImg2: "image url)",
    mdeTable1: "",
    mdeTable2: "\n\n| Column 1 | Column 2 | ColoColumnnne 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n",
    bold: "Bold",
    italic: "Italic",
    heading: "Title",
    quote: "Quote",
    unorderedList: "Unordered list",
    orderedList: "Ordered list",
    createLink: "Create a link",
    insertImage: "Insert an image",
    createTable: "Create a table",
    preview: "Aperçu du rendu",
    mdeGuide: "Documentation de la syntaxe",
    undo: "Undo",
    redo: "Redo"
  },

  localizeErrors: localizeErrors
};

const nodeComponents = {
  
  "section": sectionNode,
  
  "text-field": textfieldNode,
  
  "date-picker": datepickerNode,
    
}

const props = defineProps({
  modelValue: {
    type: null,
    default: null
  },
  options: {
    /** @type import('vue').PropType<import('@koumoul/vjsf/types.js').PartialVjsfOptions | null> */
    type: Object,
    default: null
  }
})

const emit = defineEmits(emits)

const { el, statefulLayout, stateTree } = useVjsf(
  null,
  computed(() => props.modelValue),
  computed(() => props.options),
  nodeComponents,
  emit,
  null,
  computed(() => compiledLayout)
)
</script>

<template>
  <div
    ref="el"
    class="vjsf"
  >
    <tree
      v-if="statefulLayout && stateTree"
      :model-value="stateTree"
      :stateful-layout="statefulLayout"
    />
  </div>
</template>