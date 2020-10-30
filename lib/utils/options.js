import { mdiCalendar, mdiClock, mdiInformation, mdiPlus, mdiPencil, mdiDelete } from '@mdi/js'

export const defaultOptions = {
  locale: 'en',
  rootDisplay: '',
  objectContainerClass: '',
  sectionsClass: 'pl-2 pt-2',
  sectionsTitlesClasses: ['title', 'subtitle-1', 'subtitle-2'],
  childrenClass: 'pr-2',
  fieldProps: {},
  fieldColProps: { cols: 12 },
  textFieldProps: {},
  textareaProps: { filled: true },
  numberProps: {},
  sliderProps: {},
  checkboxProps: {},
  switchProps: {},
  comboboxProps: {},
  selectProps: {},
  fileInputProps: {},
  radioGroupProps: {},
  radioItemProps: {},
  tabsProps: { grow: true },
  expansionPanelsProps: { mandatory: true },
  dialogProps: { maxWidth: 500 },
  colorPickerProps: {},
  timePickerProps: {},
  datePickerProps: { scrollable: true },
  arrayItemCardProps: { tile: true },
  arrayItemColProps: { cols: 12 },
  removeAdditionalProperties: true,
  disableAll: false,
  hideReadOnly: false,
  deleteReadOnly: false,
  filesAsDataUrl: false,
  hideTooltips: false,
  disableSorting: false,
  context: {},
  rules: {},
  initialValidation: 'defined',
  idPrefix: '',
  markdownit: {}
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
    pattern: 'The expected pattern is not satisfied'
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
    pattern: `Le format attendu n'est pas respecté`
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
    pattern: 'El formato esperado no se respeta'
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
    pattern: 'Das erwartete Format wird nicht eingehalten'
  },
  ar: {
    required: 'هذه المعلومة مطلوبة',
    noData: 'لم يتم العثور على قيمة',
    search: 'جاري البحث...',
    minimum: '{minimum} القيمة يجب أن تكون أكبر من',
    maximum: '{maximum} القيمة يجب أن تكون أقل من',
    minLength: '{minLength} الحد الأدنى للحروف المطلوبة هو',
    maxLength: '{maxLength} الحد الأقصى للحروف المطلوبة هو',
    minItems: 'قطع {minItems} لا يمكن اختيار أقل من ',
    maxItems: 'قطع {maxItems} لا يمكن اختيار أكثر من ',
    pattern: 'لا يوجد تشابه مع النموذج المطلوب'
  },
  tr: {
    required: 'Zorunlu alan',
    noData: 'Bilgi yok',
    search: 'Arıyor...',
    minimum: 'Değer {minimum} dan büyük olmalı',
    maximum: 'Değer {maximum} dan küçük olmalı',
    minLength: '{minLength} asgari karakter sayısı',
    maxLength: '{maxLength} azami  karakter sayısı',
    minItems: 'En az seçenek sayısı {minItems}',
    maxItems: 'En çok seçenek sayısı {maxItems}',
    pattern: 'İstenilen paten tutmuyor'
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
  mdiSvg: {
    calendar: mdiCalendar,
    clock: mdiClock,
    info: mdiInformation,
    add: mdiPlus,
    edit: mdiPencil,
    delete: mdiDelete
  },
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
