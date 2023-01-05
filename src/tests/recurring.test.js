import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

const TEST_EVENT_ID = 123
const TEST_EVENT_TITLE = 'test event'

let calendar

beforeAll(() => {
  calendar = new Calendar(document.createElement('div'), {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
  })
})

describe('Calendar::addEvent()', () => {
  it('should add an event to the calendar', () => {
    expect(calendar.getEvents().length).toBe(0)

    const dateStr = '2020-01-01'
    const date = new Date(dateStr + 'T00:00:00') // will be in local time

    const event = calendar.addEvent({
      id: TEST_EVENT_ID,
      title: TEST_EVENT_TITLE,
      start: date, // required, even though the docs say otherwise
    })
    expect(event).toBeTruthy()
    expect(calendar.getEvents().length).toBe(1)
  })
})

describe('Calendar::getEvents()', () => {
  it('should return a list of events', () => {
    const events = calendar.getEvents()
    expect(events.length).toBe(1)
    expect(events[0].title).toBe(TEST_EVENT_TITLE)
    expect(events[0].toJSON()).toEqual({
      id: TEST_EVENT_ID.toString(),
      title: TEST_EVENT_TITLE,
      start: '2020-01-01T00:00:00-08:00',
    })
  })
})

describe('Calendar::getEventById()', () => {
  it('should return an event by ID', () => {
    const event = calendar.getEventById(TEST_EVENT_ID)
    expect(event.title).toBe(TEST_EVENT_TITLE)
    expect(event.toJSON()).toEqual({
      id: TEST_EVENT_ID.toString(),
      title: TEST_EVENT_TITLE,
      start: '2020-01-01T00:00:00-08:00',
    })
  })
})

afterAll(() => {
  calendar.destroy()
})
