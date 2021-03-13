import { mdiCalendar, mdiClock, mdiInformation, mdiPlus, mdiPencil, mdiDelete } from '@mdi/js'

export const defaultOptions = {
  locale: 'en',
  rootDisplay: '',
  objectContainerClass: '',
  sectionsClass: 'pl-2 pt-2',
  sectionsTitlesClasses: ['title', 'subtitle-1', 'subtitle-2'],
  arrayItemsTitlesClasses: ['title', 'subtitle-1', 'subtitle-2'],
  childrenClass: '',
  fieldProps: {},
  fieldColProps: { cols: 12 },
  readOnlyFieldProps: { hideDetails: true },
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
  chipGroupProps: {},
  chipItemProps: {},
  tabsProps: { grow: true },
  expansionPanelsProps: { mandatory: true },
  dialogProps: { maxWidth: 500 },
  dialogCardProps: {},
  colorPickerProps: {},
  timePickerProps: {},
  datePickerProps: { scrollable: true },
  arrayItemCardProps: {},
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
  markdownit: {},
  editMode: 'dialog',
  arrayOperations: ['create', 'update', 'delete'],
  autofocus: false,
  httpOptions: {}
}

export const localizedMessages = {
  en: {
    required: 'This information is required',
    noData: 'No matching value found',
    search: 'Search...',
    minimum: 'The value must be greater than or equal to {minimum}',
    exclusiveMinimum: 'The value must be greater than {exclusiveMinimum}',
    maximum: 'The value must be lower than or equal to {maximum}',
    exclusiveMaximum: 'The value must be lower than {exclusiveMaximum}',
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
    minimum: 'La valeur doit être supérieure ou égale à {minimum}',
    exclusiveMinimum: 'La valeur doit être supérieure {exclusiveMinimum}',
    maximum: 'La valeur doit être inférieure ou égale à {maximum}',
    exclusiveMaximum: 'La valeur doit être inférieure à {exclusiveMaximum}',
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
    minimum: 'El valor debe ser mayor o igual que {mínimo}',
    exclusiveMinimum: 'El valor debe ser mayor que {minimum}',
    maximum: 'El valor debe ser menor o igual a {maximum}',
    exclusiveMaximum: 'El valor debe ser inferior a {maximum}',
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
    minimum: 'Der Wert muss größer oder gleich {Minimum} sein',
    exclusiveMinimum: 'Der Wert muss größer als {exclusiveMinimum} sein',
    maximum: 'Der Wert muss kleiner oder gleich {Maximum} sein',
    exclusiveMaximum: 'Der Wert muss kleiner als {maximum} sein',
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
    minimum: '{exclusiveMinimum} القيمة يجب أن تكون أكبر من', // TODO, same as exclusiveMinimum waiting for a proper translation
    exclusiveMinimum: '{exclusiveMinimum} القيمة يجب أن تكون أكبر من',
    maximum: '{maximum} القيمة يجب أن تكون أقل من', // TODO, same as exclusiveMaximum waiting for a proper translation
    exclusiveMaximum: '{exclusiveMaximum} القيمة يجب أن تكون أقل من',
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
    exclusiveMinimum: 'Değer {exclusiveMinimum} dan büyük olmalı',
    maximum: 'Değer, {maximum} değerinden küçük veya ona eşit olmalıdır',
    exclusiveMaximum: 'Değer {maximum} dan küçük olmalı',
    minLength: '{minLength} asgari karakter sayısı',
    maxLength: '{maxLength} azami  karakter sayısı',
    minItems: 'En az seçenek sayısı {minItems}',
    maxItems: 'En çok seçenek sayısı {maxItems}',
    pattern: 'İstenilen paten tutmuyor'
  },
  nl: {
    required: 'Deze informatie is vereist',
    noData: 'Geen overeenkomstig resultaat gevonden',
    search: 'Zoeken...',
    minimum: 'De waarde moet groter zijn dan of gelijk zijn aan {minimum}',
    exclusiveMinimum: 'Waarde moet meer zijn dan {exclusiveMinimum}',
    maximum: 'De waarde moet lager zijn dan of gelijk zijn aan {maximum}',
    exclusiveMaximum: 'Waarde moet minder zijn dan {maximum}',
    minLength: 'Minimaal {minLength} tekens',
    maxLength: 'Maximaal {maxLength} tekens',
    minItems: 'Minimaal {minItems} antwoorden',
    maxItems: 'Maximaal {maxItems} antwoorden',
    pattern: 'Invoer voldoet niet aan verwachte patroon'
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
