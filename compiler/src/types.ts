import type { CompileOptions } from '@json-layout/core'

export type VjsfCompilerOptions = Partial<CompileOptions> & {
  pluginsImports: string[]
}
export type PartialVjsfCompilerOptions = Partial<VjsfCompilerOptions>
