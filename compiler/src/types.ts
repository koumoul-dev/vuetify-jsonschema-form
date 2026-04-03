import type { CompileOptions } from '@json-layout/core'

export type VjsfCompilerOptions = Partial<CompileOptions> & {
  pluginsImports: string[]
  webmcp: boolean
}
export type PartialVjsfCompilerOptions = Partial<VjsfCompilerOptions>
