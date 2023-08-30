import MarkdownIt from 'markdown-it'

export default defineNuxtPlugin(() => {
  const markdownIt = new MarkdownIt()
  return {
    provide: {
      markdown: markdownIt.render.bind(markdownIt)
    }
  }
})
