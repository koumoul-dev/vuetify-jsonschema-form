export type VjsfMarkdownIcons = {
  formatBold: string,
  formatItalic: string,
  formatTitle: string,
  formatQuoteOpen: string,
  formatListBulleted: string,
  formatListNumbered: string,
  link: string,
  image: string,
  table: string,
  eye: string,
  undo: string,
  redo: string,
  helpCircle: string
}

export type VjsfPluginMarkdownOptions = {
  easyMDEOptions?: Record<string, any>, 
  icons?: Partial<VjsfMarkdownIcons>,
  cspNonce?: string
}
