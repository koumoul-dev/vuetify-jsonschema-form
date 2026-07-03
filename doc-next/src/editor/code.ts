import YAML from 'yaml'
import JSON5 from 'json5'

export type CodeLanguage = 'json' | 'yaml'

/**
 * Tolerant input parsing: json mode accepts JSON5 (unquoted keys, trailing
 * commas, comments) so JS-style objects can be pasted as-is. Blank input is
 * an empty object (clearing the editor yields an empty form instead of a
 * frozen preview — the sandbox's isRenderMessage guard rejects `undefined`).
 * Throws on invalid input.
 */
export function parseCode (text: string, language: CodeLanguage): unknown {
  if (!text.trim()) return {}
  return language === 'yaml' ? YAML.parse(text) : JSON5.parse(text)
}

/** Strict, canonical output: real JSON (2-space indent) or yaml.stringify. */
export function formatCode (value: unknown, language: CodeLanguage): string {
  const v = value === undefined ? null : value
  return language === 'yaml' ? YAML.stringify(v) : JSON.stringify(v, null, 2)
}
