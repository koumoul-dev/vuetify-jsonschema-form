import colors from './colors'

export const defaultOptions = {
  debug: false,
  disableAll: false,
  colors,
  autoFoldObjects: false,
  allOfTabs: false,
  tabsMode: 'grow',
  locale: 'en',
  removeAdditionalProperties: true,
  maxDialogWidth: 500,
  objectContainerClass: '',
  sectionsClass: 'pl-2 pt-2',
  sectionsTitlesClasses: ['title', 'subtitle-1', 'subtitle-2'],
  childrenClass: 'pr-2',
  hideReadOnly: false,
  deleteReadOnly: false,
  filesAsDataUrl: false
}

export const localizedMessages = {
  en: {
    required: 'This information is required',
    noData: 'No matching value found',
    search: 'Search...'
  },
  fr: {
    required: 'Cette information est requise',
    noData: 'Aucun élément correspondant',
    search: 'Recherchez...'
  },
  es: {
    required: 'Esta información es requerida',
    noData: 'No se encontraron valores coincidentes',
    search: 'Buscar...'
  }
}

export const formats = {
  time: (time, locale) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString(locale)
  },
  date: (date, locale) => {
    return new Date(date).toLocaleDateString(locale)
  },
  'date-time': (dateTime, locale) => {
    return new Date(dateTime).toLocaleString(locale)
  }
}

export const iconSets = {
  md: {
    calendar: 'event',
    clock: 'clock',
    info: 'info',
    dropdown: 'arrow_drop_down',
    dropup: 'arrow_drop_up',
    add: 'add',
    edit: 'create',
    reorder: 'reorder',
    delete: 'delete'
  },
  mdi: {
    calendar: 'mdi-calendar',
    clock: 'mdi-clock',
    info: 'mdi-information',
    dropdown: 'mdi-menu-down',
    dropup: 'mdi-menu-up',
    add: 'mdi-plus',
    edit: 'mdi-pencil',
    reorder: 'mdi-reorder-horizontal',
    delete: 'mdi-delete'
  }
}
