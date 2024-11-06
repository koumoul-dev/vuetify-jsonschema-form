<script setup>
// @ts-nocheck

import { StatefulLayout } from '@json-layout/core'
import { ref, shallowRef, getCurrentInstance, useSlots, computed } from 'vue'
import { useElementSize } from '@vueuse/core'

import Tree from '@koumoul/vjsf/components/tree.vue'
import { useVjsf, emits } from '@koumoul/vjsf/composables/use-vjsf.js'
import '@koumoul/vjsf/styles/vjsf.css'


import sectionNode from '@koumoul/vjsf/components/nodes/section.vue'

import textfieldNode from '@koumoul/vjsf/components/nodes/text-field.vue'

import datepickerNode from '@koumoul/vjsf/components/nodes/date-picker.vue'

import listNode from '@koumoul/vjsf/components/nodes/list.vue'

import sliderNode from '@koumoul/vjsf/components/nodes/slider.vue'

import markdownNode from '@koumoul/vjsf-markdown/node.vue'


import localizeErrors from "ajv-i18n/localize/en/index.js";
import { fullFormats } from "ajv-formats/dist/formats.js";

const schema31 = {"$id":"export0","$ref":"_jl#/properties/hobbies/items"};
const schema28 = {"type":"object","properties":{"name":{"type":"string","title":"Name","__pointer":"_jl#/properties/hobbies/items/properties/name","errorMessage":{}},"weight":{"type":"integer","title":"Weight","min":"0","max":"5","layout":"slider","__pointer":"_jl#/properties/hobbies/items/properties/weight","errorMessage":{}}},"__pointer":"_jl#/properties/hobbies/items","errorMessage":{}};

function validate25(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="export0" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate25.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.name !== undefined){
let data0 = data.name;
if(typeof data0 !== "string"){
const err0 = {instancePath:instancePath+"/name",schemaPath:"_jl#/properties/hobbies/items/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string",schema:schema28.properties.name.type,parentSchema:schema28.properties.name,data:data0};
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
if(data.weight !== undefined){
let data1 = data.weight;
if(!((typeof data1 == "number") && (!(data1 % 1) && !isNaN(data1)))){
const err2 = {instancePath:instancePath+"/weight",schemaPath:"_jl#/properties/hobbies/items/properties/weight/type",keyword:"type",params:{type: "integer"},message:"must be integer",schema:schema28.properties.weight.type,parentSchema:schema28.properties.weight,data:data1};
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
}
else {
const err4 = {instancePath,schemaPath:"_jl#/properties/hobbies/items/type",keyword:"type",params:{type: "object"},message:"must be object",schema:schema28.type,parentSchema:schema28,data};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(errors > 0){
const emErrs2 = [];
for(const err5 of vErrors){
if(!err5.emUsed){
emErrs2.push(err5);
}
}
vErrors = emErrs2;
errors = emErrs2.length;
}
validate25.errors = vErrors;
return errors === 0;
}
validate25.evaluated = {"props":{"name":true,"weight":true},"dynamicProps":false,"dynamicItems":false};

const schema33 = {"$id":"export1","$ref":"_jl#"};
const schema27 = {"type":"object","title":"A simple person definition","properties":{"firstName":{"type":"string","title":"First name","__pointer":"_jl#/properties/firstName","errorMessage":{}},"lastName":{"type":"string","title":"Last name","__pointer":"_jl#/properties/lastName","errorMessage":{}},"birthday":{"type":"string","title":"Birthday","format":"date","__pointer":"_jl#/properties/birthday","errorMessage":{}},"hobbies":{"type":"array","title":"Hobbies","items":{"type":"object","properties":{"name":{"type":"string","title":"Name","__pointer":"_jl#/properties/hobbies/items/properties/name","errorMessage":{}},"weight":{"type":"integer","title":"Weight","min":"0","max":"5","layout":"slider","__pointer":"_jl#/properties/hobbies/items/properties/weight","errorMessage":{}}},"__pointer":"_jl#/properties/hobbies/items","errorMessage":{}},"__pointer":"_jl#/properties/hobbies","errorMessage":{}},"presentation":{"type":"string","title":"Presentation","layout":"markdown","__pointer":"_jl#/properties/presentation","errorMessage":{}}},"$id":"_jl","__pointer":"_jl#","errorMessage":{}};
const formats0 = fullFormats.date;

function validate26(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="export1" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate26.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.firstName !== undefined){
let data0 = data.firstName;
if(typeof data0 !== "string"){
const err0 = {instancePath:instancePath+"/firstName",schemaPath:"_jl#/properties/firstName/type",keyword:"type",params:{type: "string"},message:"must be string",schema:schema27.properties.firstName.type,parentSchema:schema27.properties.firstName,data:data0};
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
let data1 = data.lastName;
if(typeof data1 !== "string"){
const err2 = {instancePath:instancePath+"/lastName",schemaPath:"_jl#/properties/lastName/type",keyword:"type",params:{type: "string"},message:"must be string",schema:schema27.properties.lastName.type,parentSchema:schema27.properties.lastName,data:data1};
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
const err4 = {instancePath:instancePath+"/birthday",schemaPath:"_jl#/properties/birthday/format",keyword:"format",params:{format: "date"},message:"must match format \""+"date"+"\"",schema:"date",parentSchema:schema27.properties.birthday,data:data2};
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
const err5 = {instancePath:instancePath+"/birthday",schemaPath:"_jl#/properties/birthday/type",keyword:"type",params:{type: "string"},message:"must be string",schema:schema27.properties.birthday.type,parentSchema:schema27.properties.birthday,data:data2};
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
if(data.hobbies !== undefined){
let data3 = data.hobbies;
if(Array.isArray(data3)){
const len0 = data3.length;
for(let i0=0; i0<len0; i0++){
let data4 = data3[i0];
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
if(data4.name !== undefined){
let data5 = data4.name;
if(typeof data5 !== "string"){
const err7 = {instancePath:instancePath+"/hobbies/" + i0+"/name",schemaPath:"_jl#/properties/hobbies/items/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string",schema:schema27.properties.hobbies.items.properties.name.type,parentSchema:schema27.properties.hobbies.items.properties.name,data:data5};
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
}
if(data4.weight !== undefined){
let data6 = data4.weight;
if(!((typeof data6 == "number") && (!(data6 % 1) && !isNaN(data6)))){
const err9 = {instancePath:instancePath+"/hobbies/" + i0+"/weight",schemaPath:"_jl#/properties/hobbies/items/properties/weight/type",keyword:"type",params:{type: "integer"},message:"must be integer",schema:schema27.properties.hobbies.items.properties.weight.type,parentSchema:schema27.properties.hobbies.items.properties.weight,data:data6};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(errors > 0){
const emErrs4 = [];
for(const err10 of vErrors){
if(!err10.emUsed){
emErrs4.push(err10);
}
}
vErrors = emErrs4;
errors = emErrs4.length;
}
}
}
else {
const err11 = {instancePath:instancePath+"/hobbies/" + i0,schemaPath:"_jl#/properties/hobbies/items/type",keyword:"type",params:{type: "object"},message:"must be object",schema:schema27.properties.hobbies.items.type,parentSchema:schema27.properties.hobbies.items,data:data4};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(errors > 0){
const emErrs5 = [];
for(const err12 of vErrors){
if(!err12.emUsed){
emErrs5.push(err12);
}
}
vErrors = emErrs5;
errors = emErrs5.length;
}
}
}
else {
const err13 = {instancePath:instancePath+"/hobbies",schemaPath:"_jl#/properties/hobbies/type",keyword:"type",params:{type: "array"},message:"must be array",schema:schema27.properties.hobbies.type,parentSchema:schema27.properties.hobbies,data:data3};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(errors > 0){
const emErrs6 = [];
for(const err14 of vErrors){
if(!err14.emUsed){
emErrs6.push(err14);
}
}
vErrors = emErrs6;
errors = emErrs6.length;
}
}
if(data.presentation !== undefined){
let data7 = data.presentation;
if(typeof data7 !== "string"){
const err15 = {instancePath:instancePath+"/presentation",schemaPath:"_jl#/properties/presentation/type",keyword:"type",params:{type: "string"},message:"must be string",schema:schema27.properties.presentation.type,parentSchema:schema27.properties.presentation,data:data7};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(errors > 0){
const emErrs7 = [];
for(const err16 of vErrors){
if(!err16.emUsed){
emErrs7.push(err16);
}
}
vErrors = emErrs7;
errors = emErrs7.length;
}
}
}
else {
const err17 = {instancePath,schemaPath:"_jl#/type",keyword:"type",params:{type: "object"},message:"must be object",schema:schema27.type,parentSchema:schema27,data};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(errors > 0){
const emErrs8 = [];
for(const err18 of vErrors){
if(!err18.emUsed){
emErrs8.push(err18);
}
}
vErrors = emErrs8;
errors = emErrs8.length;
}
validate26.errors = vErrors;
return errors === 0;
}
validate26.evaluated = {"props":{"firstName":true,"lastName":true,"birthday":true,"hobbies":true,"presentation":true},"dynamicProps":false,"dynamicItems":false};
function expression0(data,value,options,context,display,layout,validates
) {
return (layout.defaultData)
}

const compiledLayout = {
  mainTree: "_jl#",

  skeletonTrees: {
    "_jl#": {
      title: "main",
      root: "_jl#"
    },

    "_jl#/properties/hobbies/items": {
      title: undefined,
      root: "_jl#/properties/hobbies/items"
    }
  },

  skeletonNodes: {
    "_jl#": {
      key: "",
      pointer: "_jl#",
      refPointer: "_jl#",
      pure: true,
      propertyKeys: ["firstName", "lastName", "birthday", "hobbies", "presentation"],
      roPropertyKeys: [],
      nullable: false,
      required: true,
      children: ["_jl#/properties/firstName", "_jl#/properties/lastName", "_jl#/properties/birthday", "_jl#/properties/hobbies", "_jl#/properties/presentation"]
    },

    "_jl#/properties/firstName": {
      key: "firstName",
      pointer: "_jl#/properties/firstName",
      refPointer: "_jl#/properties/firstName",
      pure: true,
      propertyKeys: [],
      roPropertyKeys: [],
      nullable: false,
      required: undefined
    },

    "_jl#/properties/lastName": {
      key: "lastName",
      pointer: "_jl#/properties/lastName",
      refPointer: "_jl#/properties/lastName",
      pure: true,
      propertyKeys: [],
      roPropertyKeys: [],
      nullable: false,
      required: undefined
    },

    "_jl#/properties/birthday": {
      key: "birthday",
      pointer: "_jl#/properties/birthday",
      refPointer: "_jl#/properties/birthday",
      pure: true,
      propertyKeys: [],
      roPropertyKeys: [],
      nullable: false,
      required: undefined
    },

    "_jl#/properties/hobbies": {
      key: "hobbies",
      pointer: "_jl#/properties/hobbies",
      refPointer: "_jl#/properties/hobbies",
      pure: true,
      propertyKeys: [],
      roPropertyKeys: [],
      nullable: false,
      required: undefined,
      childrenTrees: ["_jl#/properties/hobbies/items"]
    },

    "_jl#/properties/hobbies/items": {
      key: "",
      pointer: "_jl#/properties/hobbies/items",
      refPointer: "_jl#/properties/hobbies/items",
      pure: true,
      propertyKeys: ["name", "weight"],
      roPropertyKeys: [],
      nullable: false,
      required: true,
      children: ["_jl#/properties/hobbies/items/properties/name", "_jl#/properties/hobbies/items/properties/weight"]
    },

    "_jl#/properties/hobbies/items/properties/name": {
      key: "name",
      pointer: "_jl#/properties/hobbies/items/properties/name",
      refPointer: "_jl#/properties/hobbies/items/properties/name",
      pure: true,
      propertyKeys: [],
      roPropertyKeys: [],
      nullable: false,
      required: undefined
    },

    "_jl#/properties/hobbies/items/properties/weight": {
      key: "weight",
      pointer: "_jl#/properties/hobbies/items/properties/weight",
      refPointer: "_jl#/properties/hobbies/items/properties/weight",
      pure: true,
      propertyKeys: [],
      roPropertyKeys: [],
      nullable: false,
      required: undefined
    },

    "_jl#/properties/presentation": {
      key: "presentation",
      pointer: "_jl#/properties/presentation",
      refPointer: "_jl#/properties/presentation",
      pure: true,
      propertyKeys: [],
      roPropertyKeys: [],
      nullable: false,
      required: undefined
    }
  },

  normalizedLayouts: {
    "_jl#": {
      comp: "section",

      children: [{
        key: "firstName"
      }, {
        key: "lastName"
      }, {
        key: "birthday"
      }, {
        key: "hobbies"
      }, {
        key: "presentation"
      }],

      title: "A simple person definition",
      defaultData: {},

      getDefaultData: {
        type: "js-eval",
        expr: "layout.defaultData",
        pure: true,
        dataAlias: "value",
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
    },

    "_jl#/properties/hobbies": {
      comp: "list",
      title: "Hobbies",
      listEditMode: "inline-single",
      listActions: ["add", "edit", "delete", "duplicate", "sort"]
    },

    "_jl#/properties/hobbies/items": {
      comp: "section",

      children: [{
        key: "name"
      }, {
        key: "weight"
      }],

      title: null,
      defaultData: {},

      getDefaultData: {
        type: "js-eval",
        expr: "layout.defaultData",
        pure: true,
        dataAlias: "value",
        ref: 0
      },

      nullable: true
    },

    "_jl#/properties/hobbies/items/properties/name": {
      comp: "text-field",
      label: "Name"
    },

    "_jl#/properties/hobbies/items/properties/weight": {
      comp: "slider",
      label: "Weight",
      step: 1
    },

    "_jl#/properties/presentation": {
      comp: "markdown",
      label: "Presentation"
    }
  },

  validates: {
    "_jl#/properties/hobbies/items": validate25,
    "_jl#": validate26
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
    close: "Close",
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

  components: {
    section: {
      name: "section",
      composite: true
    },

    "text-field": {
      name: "text-field",
      shouldDebounce: true,
      focusable: true,
      emitsBlur: true
    },

    "date-picker": {
      name: "date-picker"
    },

    list: {
      name: "list"
    },

    slider: {
      name: "slider"
    },

    markdown: {
      name: "markdown",
      shouldDebounce: true,
      emitsBlur: true,
      focusable: true
    }
  },

  localizeErrors: localizeErrors
};

const nodeComponents = {
  
  "section": sectionNode,
  
  "text-field": textfieldNode,
  
  "date-picker": datepickerNode,
  
  "list": listNode,
  
  "slider": sliderNode,
  
  "markdown": markdownNode,
    
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
  computed(() => ({...props.options, components: {"markdown":{"name":"markdown","shouldDebounce":true,"emitsBlur":true,"focusable":true}}})),
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