import { marked } from 'marked'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      markdown: marked.parse.bind(marked),
    },
  }
})
