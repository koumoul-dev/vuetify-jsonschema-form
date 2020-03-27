const id = 'localization'

const title = 'Localization'

const description = `Localization is managed at three levels:
  - the \`locale\` option is passed to the components that can use it (notably the date-picker)
  - the \`messages\` option is initialized with localized contents in one of the supported languages
  - the \`formats\` option is initialized with formatting methods (date, etc.) that receive a locale as second parameter
`

const schema = {
  type: 'object',
  required: ['selectAjaxWithQuery'],
  properties: {
    dateProp: { type: 'string', title: 'Je suis une date', format: 'date' },
    selectAjaxWithQuery: {
      type: 'object',
      title: `Je suis un champ de recherche`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&q={q}&owner=notARealOwner',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href',
      properties: {
        href: { type: 'string' },
        title: { type: 'string' }
      }
    }
  }
}

const model = {
  dateProp: '2012-12-31'
}

const options = {
  locale: 'fr',
  formats: {
    date: (date, locale) => new Date(date).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  }
}

export default { id, title, description, schema, model, options }
