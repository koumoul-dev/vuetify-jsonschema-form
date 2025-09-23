import { describe, it, assert, beforeEach, afterEach, vi } from 'vitest'
import * as dates from '../src/utils/dates'

const paris = 'Europe/Paris'
const saoPaulo = 'America/Sao_Paulo'

describe('date utils', () => {
  it('should separate date and time in a date object', () => {
    if (process.env.TZ === paris) {
      assert.deepEqual(dates.getDateTimeParts(new Date('2020-04-03T21:07:43+02:00')), ['2020-04-03', '21:07'])
    }
    if (process.env.TZ === saoPaulo) {
      assert.deepEqual(dates.getDateTimeParts(new Date('2020-04-03T03:00:00.000Z')), ['2020-04-03', '00:00'])
    }
  })

  it('should extract only date part of start of day dates', () => {
    if (process.env.TZ === paris) {
      assert.deepEqual(dates.getDateTimeParts(new Date('2020-04-03T00:00:00')), ['2020-04-03', '00:00'])
    }
    if (process.env.TZ === saoPaulo) {
      assert.deepEqual(dates.getDateTimeParts(new Date('2020-04-03T00:00:00')), ['2020-04-03', '00:00'])
    }
  })

  it('should apply separate date and time and get a date object', () => {
    if (process.env.TZ === paris) {
      assert.equal(dates.getDateTime(['2020-04-03', '21:07']), '2020-04-03T21:07:00+02:00')
    }
    if (process.env.TZ === saoPaulo) {
      assert.equal(dates.getDateTime(['2020-04-03', '21:07']), '2020-04-03T21:07:00-03:00')
    }
  })

  it('should apply current timezone offset to a UTC date', () => {
    if (process.env.TZ === paris) {
      assert.equal(dates.getDateTimeWithOffset(new Date('2020-04-03T19:07:43.152Z')), '2020-04-03T21:07:43+02:00')
    }
    if (process.env.TZ === saoPaulo) {
      assert.equal(dates.getDateTimeWithOffset(new Date('2020-04-03T19:07:43.152Z')), '2020-04-03T16:07:43-03:00')
    }
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