<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, toRaw, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { EditorState, type Extension } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLine, hoverTooltip } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { bracketMatching, indentOnInput } from '@codemirror/language'
import { autocompletion, closeBrackets, completionKeymap } from '@codemirror/autocomplete'
import { linter, lintGutter, type Diagnostic } from '@codemirror/lint'
import { oneDark } from '@codemirror/theme-one-dark'
import { json5, json5ParseLinter, json5Language } from 'codemirror-json5'
import { yaml, yamlLanguage } from '@codemirror/lang-yaml'
import YAML from 'yaml'
import { stateExtensions, handleRefresh, updateSchema } from 'codemirror-json-schema'
import { json5SchemaLinter, json5SchemaHover, json5Completion } from 'codemirror-json-schema/json5'
import { yamlSchemaLinter, yamlSchemaHover, yamlCompletion } from 'codemirror-json-schema/yaml'
import { disableErrorLogging } from 'best-effort-json-parser'
import { parseCode, formatCode, type CodeLanguage } from '../editor/code'

// codemirror-json-schema's json/json5 support parses through
// best-effort-json-parser, which defaults to logging every transiently-
// invalid buffer to console.error (e.g. while the user is mid-keystroke).
// Real diagnostics for the user come from the CM linters below, not this
// logger, so silence it globally once at module load.
disableErrorLogging()

const props = defineProps<{
  modelValue: unknown
  // JSON Schema driving completion/lint/hover (meta-schema for the Schema
  // tab, the user's current schema for the Data tab). Optional: without it
  // the editor still highlights, lints syntax and autocompletes nothing.
  schema?: Record<string, unknown>
}>()
const emit = defineEmits<{ 'update:modelValue': [v: unknown] }>()
const language = defineModel<CodeLanguage>('language', { required: true })

const host = ref<HTMLElement | null>(null)
let view: EditorView | null = null

// Tracks the *content* (not reference) of the value we last emitted.
// `props.modelValue` never comes back `===` what we just sent: a parent
// `ref()` re-wraps assigned objects in a reactive Proxy, and a value that
// made a round trip through EditorSandbox's postMessage protocol gets
// structurally cloned. Comparing serialized content is what actually tells
// us "this is just our own edit echoing back" vs. "something else changed
// this value" (e.g. typing in the live form).
let lastEmitted = JSON.stringify(props.modelValue)

// @codemirror/lang-yaml has no parse linter (unlike codemirror-json5), so
// build one from the yaml package's own error positions (offsets into the
// doc, exactly what Diagnostic wants).
function yamlParseLinter () {
  return (v: EditorView): Diagnostic[] => YAML.parseDocument(v.state.doc.toString()).errors.map(e => ({
    from: e.pos?.[0] ?? 0, to: e.pos?.[1] ?? 0, severity: 'error' as const, message: e.message,
  }))
}

// codemirror-json-schema APIs take the schema by reference and hold it in a
// StateField; hand them the raw object, not a Vue reactive proxy.
function rawSchema (): Record<string, unknown> | undefined {
  return props.schema ? toRaw(props.schema) : undefined
}

function languageExtensions (lang: CodeLanguage): Extension[] {
  if (lang === 'yaml') {
    return [
      yaml(),
      linter(yamlParseLinter(), { delay: 250 }),
      linter(yamlSchemaLinter(), { needsRefresh: handleRefresh }),
      yamlLanguage.data.of({ autocomplete: yamlCompletion() }),
      hoverTooltip(yamlSchemaHover()),
    ]
  }
  return [
    json5(),
    linter(json5ParseLinter(), { delay: 250 }),
    linter(json5SchemaLinter(), { needsRefresh: handleRefresh }),
    json5Language.data.of({ autocomplete: json5Completion() }),
    hoverTooltip(json5SchemaHover()),
  ]
}

const apply = useDebounceFn(() => {
  if (!view) return
  try {
    const parsed = parseCode(view.state.doc.toString(), language.value)
    lastEmitted = JSON.stringify(parsed)
    emit('update:modelValue', parsed)
  } catch {
    // Invalid buffer: the parse linter shows the error inline; keep the last
    // valid value upstream so the preview stays on the last working form.
  }
}, 200)

function createState (doc: string, lang: CodeLanguage): EditorState {
  return EditorState.create({
    doc,
    extensions: [
      lineNumbers(),
      lintGutter(),
      history(),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      highlightActiveLine(),
      keymap.of([...defaultKeymap, ...historyKeymap, ...completionKeymap, indentWithTab]),
      oneDark,
      ...languageExtensions(lang),
      // json5Schema()/yamlSchema() bundles are not used so the language and
      // schema parts stay independently swappable; stateExtensions is the
      // shared schema StateField both linter+completion read.
      stateExtensions(rawSchema() as never),
      EditorView.updateListener.of(u => { if (u.docChanged) apply() }),
    ],
  })
}

function setDoc (text: string) {
  if (!view) return
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } })
}

onMounted(() => {
  view = new EditorView({
    state: createState(formatCode(props.modelValue, language.value), language.value),
    parent: host.value!,
  })
})
onBeforeUnmount(() => { view?.destroy(); view = null })

// Language toggle: convert the buffer. If the buffer is currently invalid,
// fall back to the last valid value instead of losing the content to a
// parse error. Full state re-creation (rather than a Compartment) keeps the
// per-language linter/completion/hover sets consistent in one place; the
// toggle is a rare user action, the cost is irrelevant.
watch(language, (lang, prevLang) => {
  if (!view) return
  let value: unknown
  try {
    value = parseCode(view.state.doc.toString(), prevLang)
  } catch {
    value = toRaw(props.modelValue)
  }
  view.setState(createState(formatCode(value, lang), lang))
})

// Keep the buffer in sync with modelValue changes that originate elsewhere
// (e.g. typing in the live form echoes into the Data tab) — but skip
// re-formatting our own just-emitted value, or every keystroke would bounce
// back through formatting and reset the cursor out from under the user.
watch(() => props.modelValue, (v) => {
  const json = JSON.stringify(v)
  if (json === lastEmitted) return
  lastEmitted = json
  setDoc(formatCode(v, language.value))
})

// The Data tab's driving schema changes live as the user edits the Schema
// tab; codemirror-json-schema supports per-instance dynamic schema updates.
watch(() => props.schema, () => { if (view) updateSchema(view, rawSchema() as never) }, { deep: true })

// Reformat the current buffer in place (e.g. pasted JS object -> strict
// JSON). No-op while the buffer doesn't parse.
function format () {
  if (!view) return
  try {
    setDoc(formatCode(parseCode(view.state.doc.toString(), language.value), language.value))
  } catch { /* parse error already shown inline */ }
}
defineExpose({ format })
</script>

<template>
  <div ref="host" class="code-editor" />
</template>

<style scoped>
.code-editor {
  height: 100%;
  font-size: 0.85rem;
}
.code-editor :deep(.cm-editor) {
  height: 100%;
}
.code-editor :deep(.cm-scroller) {
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
</style>
