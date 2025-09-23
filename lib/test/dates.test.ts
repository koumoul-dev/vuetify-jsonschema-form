import { describe, it, assert } from 'vitest'
import * as dates from '../src/utils/dates'

describe('date utils', () => {
  it('should separate date and time in a date object', () => {
	const date = new Date(2020, 3, 3, 21, 7, 43) 
    assert.deepEqual(dates.getDateTimeParts(date), ['2020-04-03', '21:07'])
  })

  it('should apply separate date and time and get a date object', () => {

	const expectedDate = new Date(2020, 3, 3, 21, 7, 0)
    const expected = dates.getDateTimeWithOffset(expectedDate)
    const result = dates.getDateTime(['2020-04-03', '21:07'])
    assert.equal(result, expected)
  })

  it('should convert UTC time to local time with offset', () => {
    const utcDate = new Date('2020-04-03T19:07:43.152Z')
    const result = dates.getDateTimeWithOffset(utcDate)
  
    // Calculate what we expect based on current timezone
    const expectedHours = utcDate.getHours() // This will be local time
    const expectedMinutes = utcDate.getMinutes()
    const offsetMinutes = utcDate.getTimezoneOffset()
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60))
    const offsetMins = Math.abs(offsetMinutes % 60)
    const offsetSign = offsetMinutes < 0 ? '+' : '-'
    const offsetStr = `${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMins.toString().padStart(2, '0')}`
  
    const expected = `2020-04-03T${expectedHours.toString().padStart(2, '0')}:${expectedMinutes.toString().padStart(2, '0')}:43${offsetStr}`
  
    assert.equal(result, expected)
  })

  it('should manage keyboard date formatting', () => {
    assert.equal(dates.localeKeyboardFormat('fr').format(new Date('2020-04-03T19:07:43.152Z')), '03/04/2020')
    assert.equal(dates.localeKeyboardFormat('en').format(new Date('2020-04-03T19:07:43.152Z')), '04/03/2020')
    let parsed = dates.localeKeyboardFormat('fr').parse('03/04/2020')
    assert.deepEqual(parsed && dates.getDateTimeParts(parsed), ['2020-04-03', '00:00'])

    parsed = dates.localeKeyboardFormat('en').parse('03/04/2020')
    assert.deepEqual(parsed && dates.getDateTimeParts(parsed), ['2020-03-04', '00:00'])

    parsed = dates.localeKeyboardFormat('fr').parse('3/12/2020')
    assert.deepEqual(parsed && dates.getDateTimeParts(parsed), ['2020-12-03', '00:00'])

    // reject incomplete or invalid date
    assert.equal(dates.localeKeyboardFormat('fr').parse('3/12'), null)
    assert.equal(dates.localeKeyboardFormat('fr').parse('3/20/2020'), null)
    assert.equal(dates.localeKeyboardFormat('fr').parse('3/0/2020'), null)

    // also accept ISO input
    parsed = dates.localeKeyboardFormat('fr').parse('2020-12-03')
    assert.deepEqual(parsed && dates.getDateTimeParts(parsed), ['2020-12-03', '00:00'])
  })
})