const id = 'localization'

const title = 'Localization'

const description = `Localization is managed at three levels:
  - the \`locale\` option is passed to the components that can use it (notably the date-picker)
  - the \`messages\` option is initialized with localized contents in one of the supported languages
  - the \`formats\` option is initialized with formatting methods (date, etc.) that receive a locale as second parameter

Internationalization of the contents of the schemas (titles and descriptions) falls mostly outside the scope of this library.
You should probably use some preprocessing on the schema before passing it to Vjsf.
A possible solution is to use json refs that point to a dynamically modified section of the schema based on current locale.
As a convenience Vjsf replaces the string \`~$locale~\` with the current locale in all the refs it resolves, so that you can use something like this \`"title": {"$ref": "#/i18n/~$locale~/mytitle"}\` which is a limited solution to the problem.`

const schema = {
  type: 'object',
  required: ['selectAjaxWithQuery'],
  properties: {
    dateProp: {
      type: 'string',
      title: { $ref: '#/i18n/~$locale~/datePropTitle' },
      format: 'date'
    },
    selectAjaxWithQuery: {
      type: 'object',
      title: { $ref: '#/i18n/~$locale~/selectAjaxWithQueryTitle' },
      'x-fromUrl': 'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&q={q}&owner=user:notARealUser',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href',
      properties: {
        href: { type: 'string' },
        title: { type: 'string' }
      }
    }
  },
  i18n: {
    en: {
      datePropTitle: 'I`m a date without FR title',
      selectAjaxWithQueryTitle: 'I`m a search field'
    },
    fr: {
      selectAjaxWithQueryTitle: 'Je suis un champ de recherche'
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

const httpMocks = {
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&q=&owner=user:notARealUser': { results: [] }
}

export default { id, title, description, schema, model, options, httpMocks }
