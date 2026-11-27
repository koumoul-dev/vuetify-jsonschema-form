import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// The layout-keyword schema file is not exposed by @json-layout/vocabulary's
// exports map, so read it from disk next to the package's resolved entry.
export function readLayoutKeywordSchema (): string {
  // import.meta.resolve honors the package's ESM-only exports map (CJS resolve throws)
  const indexPath = fileURLToPath(import.meta.resolve('@json-layout/vocabulary'))
  return readFileSync(resolve(dirname(indexPath), 'layout-keyword/schema.json'), 'utf8')
}
