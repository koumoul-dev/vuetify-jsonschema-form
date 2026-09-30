// TODO: parts of this can probably be replaced by https://vuetifyjs.com/en/features/dates/

// 1 => 01, 12 => 12
export const padNumber = (/** @type number */val, size = 2) => {
  const s = '' + val
  return s.padStart(size, '0')
}

// storing ISO times with the user's timezone offset is more dense in information that always storing the base ISO date
// this way the application can either use the localized time or the ISO time by chosing to interpret or not the offset part
// cf https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes
// 2020-04-03T19:07:43.152Z => 2020-04-03T21:07:43+02:00
export const getDateTimeWithOffset = (/** @type Date */date) => {
  const offsetMinutes = date.getTimezoneOffset()
  const offsetAbs = `${padNumber(Math.abs(offsetMinutes / 60))}:${padNumber(Math.abs(offsetMinutes % 60))}`
  let offset
  if (offsetMinutes < 0) offset = `+${offsetAbs}`
  else if (offsetMinutes > 0) offset = `-${offsetAbs}`
  else offset = 'Z'
  return `${padNumber(date.getFullYear(), 4)}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}T${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}${offset}`
}

// get the the date and short time components expected by date-time picker from a full date
// 2020-04-03T21:07:43+02:00 => ['2020-04-03', '21:07']
export const getDateTimeParts = (/** @type Date */date) => {
  return [`${padNumber(date.getFullYear(), 4)}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`, `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`]
}

// get a full date-time from the date and time parts edited by date-time picker
// ['2020-04-03', '19:07'] => 2020-04-03T21:07:43+02:00
export const getDateTime = (/** @type [string, string] */parts) => {
  const dateParts = parts[0].split('-')
  const timeParts = parts[1].split(':')
  const date = localDate(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]))
  date.setHours(Number(timeParts[0] || '00'), Number(timeParts[1] || '00'), 0, 0)
  return getDateTimeWithOffset(date)
}

// Year, month and day set in one call: set one at a time on today's date, a month shorter
// than today's day number overflowed (on the 30th, February 18th became March 18th).
// setFullYear rather than the Date constructor, which maps years 0-99 to 1900-1999.
const localDate = (/** @type number */year, /** @type number */monthIndex, /** @type number */day) => {
  const date = new Date(0)
  date.setFullYear(year, monthIndex, day)
  date.setHours(0, 0, 0, 0)
  return date
}

// get the short time representation expected by vuetify from a longer ISO time
export const getShortTime = (/** @type string | undefined */time) => {
  if (!time) return ''
  return time.slice(0, 5)
}

export const getLongTime = (/** @type string */time) => {
  return time + ':00Z'
}

const applyDateParts = (/** @type {string} */year, /** @type {string} */month, /** @type {string} */day) => {
  if (!year || !month || !day) return null
  const y = Number(year)
  if (isNaN(y)) return null
  const m = Number(month)
  if (isNaN(m)) return null
  if (m < 1 || m > 12) return null
  const d = Number(day)
  if (isNaN(d)) return null
  if (d < 1 || d > 31) return null

  const date = localDate(y, m - 1, d)
  // a day the month does not have (31/02) would roll over into the next month
  if (isNaN(date.getTime()) || date.getMonth() !== m - 1) return null
  return date
}

/** @type {Record<string, {format: (date: Date) => string, parse: (formateDate: string) => Date | null}>} */
const localeKeyboardFormats = {}
export const localeKeyboardFormat = (/** @type string */ locale) => {
  // cf https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/composables/date/adapters/vuetify.ts#L239
  const format = new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit' })
  const parts = format.formatToParts(new Date())
  const fns = {
    format: (/** @type Date */ date) => format.format(date),
    parse: (/** @type string */ formattedDate) => {
      let remainingStr = formattedDate
      let year = ''
      let month = ''
      let day = ''
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        if (part.type !== 'literal') {
          const nextSep = parts[i + 1]
          if (nextSep && nextSep.type !== 'literal') {
            console.error('failed to work on keyboard date format', parts)
            throw new Error('failed to work on keyboard date format')
          }
          let matchValue = remainingStr
          if (nextSep?.type === 'literal') {
            const nextSepPos = remainingStr.indexOf(nextSep.value)
            matchValue = remainingStr.substring(0, nextSepPos)
            remainingStr = remainingStr.substring(nextSepPos + nextSep.value.length)
          }
          if (part.type === 'year') year = matchValue
          if (part.type === 'month') month = matchValue
          if (part.type === 'day') day = matchValue
        }
      }
      const date = applyDateParts(year, month, day)
      if (date) return date

      // also try iso format
      const [y, m, d] = formattedDate.split('-')
      return applyDateParts(y, m, d)
    }
  }
  if (!localeKeyboardFormats[locale]) localeKeyboardFormats[locale] = fns
  return fns
}
