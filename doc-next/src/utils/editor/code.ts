import YAML from 'yaml'
import JSON5 from 'json5'

export type CodeLanguage = 'json' | 'js' | 'yaml'

/**
 * Tolerant input parsing: json and js modes both accept JSON5 (unquoted keys,
 * trailing commas, comments) so JS-style objects can be pasted as-is. Blank
 * input is an empty object (clearing the editor yields an empty form instead
 * of a frozen preview — the sandbox's isRenderMessage guard rejects
 * `undefined`). Throws on invalid input.
 */
export function parseCode (text: string, language: CodeLanguage): unknown {
  if (!text.trim()) return {}
  return language === 'yaml' ? YAML.parse(text) : JSON5.parse(text)
}

/**
 * Canonical output per mode: strict JSON (2-space indent), JS-style JSON5
 * (unquoted identifier keys, single quotes — ready to paste into JS source),
 * or yaml.stringify. json and js only differ here; they parse identically.
 *
 * The js mode strips the trailing commas JSON5.stringify emits, matching our
 * eslint `comma-dangle: never` style. A comma directly before a newline is
 * always structural: JSON5 puts each closing bracket on its own line and
 * escapes real newlines inside strings, so `,\n` never occurs within a value.
 */
export function formatCode (value: unknown, language: CodeLanguage): string {
  const v = value === undefined ? null : value
  if (language === 'yaml') return YAML.stringify(v)
  if (language === 'js') return JSON5.stringify(v, null, 2).replace(/,(\n\s*[}\]])/g, '$1')
  return JSON.stringify(v, null, 2)
}
