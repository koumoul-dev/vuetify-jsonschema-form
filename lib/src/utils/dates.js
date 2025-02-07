// TODO: parts of this can probably be replaced by https://vuetifyjs.com/en/features/dates/

// 1 => 01, 12 => 12
export const padTimeComponent = (/** @type number */val) => {
  const s = '' + val
  return s.length === 1 ? '0' + s : s
}

// storing ISO times with the user's timezone offset is more dense in information that always storing the base ISO date
// this way the application can either use the localized time or the ISO time by choosing to interpret or not the offset part
// cf https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes
// 2020-04-03T19:07:43.152Z => 2020-04-03T21:07:43+02:00
export const getDateTimeWithOffset = (/** @type Date */date) => {
  const offsetMinutes = date.getTimezoneOffset()
  const offsetAbs = `${padTimeComponent(Math.abs(offsetMinutes / 60))}:${padTimeComponent(Math.abs(offsetMinutes % 60))}`
  let offset
  if (offsetMinutes < 0) offset = `+${offsetAbs}`
  else if (offsetMinutes > 0) offset = `-${offsetAbs}`
  else offset = 'Z'
  return `${date.getFullYear()}-${padTimeComponent(date.getMonth() + 1)}-${padTimeComponent(date.getDate())}T${padTimeComponent(date.getHours())}:${padTimeComponent(date.getMinutes())}:${padTimeComponent(date.getSeconds())}${offset}`
}

// get the the date and short time components expected by date-time picker from a full date
// 2020-04-03T21:07:43+02:00 => ['2020-04-03', '19:07']
export const getDateTimeParts = (/** @type Date */date) => {
  return [`${date.getFullYear()}-${padTimeComponent(date.getMonth() + 1)}-${padTimeComponent(date.getDate())}`, `${padTimeComponent(date.getHours())}:${padTimeComponent(date.getMinutes())}`]
}

// get a full date-time from the date and time parts edited by date-time picker
// ['2020-04-03', '19:07'] => 2020-04-03T21:07:43+02:00
export const getDateTime = (/** @type [string, string] */parts) => {
  const date = new Date()
  const dateParts = parts[0].split('-')
  date.setFullYear(Number(dateParts[0]))
  date.setMonth(Number(dateParts[1]) - 1)
  date.setDate(Number(dateParts[2]))
  const timeParts = parts[1].split(':')
  date.setHours(Number(timeParts[0] || '00'))
  date.setMinutes(Number(timeParts[1] || '00'))
  date.setSeconds(0)
  return getDateTimeWithOffset(date)
}

// get the short time representation expected by vuetify from a longer ISO time
export const getShortTime = (/** @type string | undefined */time) => {
  if (!time) return ''
  return time.slice(0, 5)
}

export const getLongTime = (/** @type string */time) => {
  return time + ':00Z'
}
