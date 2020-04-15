export const defaultOptions = {
  locale: 'en',
  rootDisplay: '',
  objectContainerClass: '',
  sectionsClass: 'pl-2 pt-2',
  sectionsTitlesClasses: ['title', 'subtitle-1', 'subtitle-2'],
  childrenClass: 'pr-2',
  fieldProps: {},
  selectProps: {},
  tabsProps: { grow: true },
  expansionPanelsProps: { mandatory: true },
  dialogProps: { maxWidth: 500 },
  colorPickerProps: {},
  removeAdditionalProperties: true,
  disableAll: false,
  hideReadOnly: false,
  deleteReadOnly: false,
  filesAsDataUrl: false,
  context: {}
}

export const localizedMessages = {
  en: {
    required: 'This information is required',
    noData: 'No matching value found',
    search: 'Search...',
    minimum: 'Value must be more than {minimum}',
    maximum: 'Value must be less than {maximum}',
    minLength: '{minLength} characters minimum',
    maxLength: '{maxLength} characters maximum',
    minItems: 'No less than {minItems} items',
    maxItems: 'No more than {maxItems} items',
    regExp: 'The text does not match the regular expression',
  },
  fr: {
    required: 'Cette information est obligatoire',
    noData: 'Aucun élément correspondant',
    search: 'Recherchez...',
    minimum: 'La valeur doit être supérieure à {minimum}',
    maximum: 'La valeur doit être inférieure à {maximum}',
    minLength: '{minLength} caractères minimum',
    maxLength: '{maxLength} caractères maximum',
    minItems: 'Au moins {minItems} éléments',
    maxItems: 'Au plus {maxItems} éléments',
    regExp: "Le texte ne correspond pas à l'expression régulière",
  },
  es: {
    required: 'Esta información es requerida',
    noData: 'No se encontraron valores coincidentes',
    search: 'Buscar...',
    minimum: 'El valor debe ser mayor que {minimum}',
    maximum: 'El valor debe ser inferior a {maximum}',
    minLength: '{minLength} caracteres mínimo',
    maxLength: '{maxLength} caractères máximo',
    minItems: 'Al menos {minItems} articulos',
    maxItems: 'Hasta {maxItems} articulos',
    regExp: 'El texto no coincide con la expresión regular',
  },
  de: {
    required: 'Diese Informationen sind erforderlich',
    noData: 'Keine passenden Artikel',
    search: 'Suche...',
    minimum: 'Der Wert muss größer als {minimum} sein',
    maximum: 'Der Wert muss kleiner als {maximum} sein',
    minLength: 'Mindestens {minLength} Zeichen',
    maxLength: 'Maximal {maxLength} Zeichen',
    minItems: 'Mindestens {minItems} Elemente',
    maxItems: 'Bis zu {maxItems} Artikel',
    regExp: 'Der Text stimmt nicht mit dem regulären Ausdruck überein',
  }
}

export const formats = {
  time: (time, locale) => {
    const date = new Date(`${new Date().toISOString().split('T')[0]}T${time}`)
    return new Date(date.getTime() + (date.getTimezoneOffset() * 60000)).toLocaleTimeString(locale)
  },
  date: (dateStr, locale) => {
    const date = new Date(dateStr)
    return new Date(date.getTime() + (date.getTimezoneOffset() * 60000)).toLocaleDateString(locale)
  },
  'date-time': (dateTime, locale) => {
    return new Date(dateTime).toLocaleString(locale)
  }
}

export const iconSets = {
  mdi: {
    calendar: 'mdi-calendar',
    clock: 'mdi-clock',
    info: 'mdi-information',
    add: 'mdi-plus',
    edit: 'mdi-pencil',
    delete: 'mdi-delete'
  },
  md: {
    calendar: 'event',
    clock: 'clock',
    info: 'info',
    add: 'add',
    edit: 'create',
    delete: 'delete'
  },
  fa: {
    calendar: 'fa-calendar',
    clock: 'fa-clock',
    info: 'fa-info',
    add: 'fa-plus',
    edit: 'fa-edit',
    delete: 'fa-trash'
  }
}
