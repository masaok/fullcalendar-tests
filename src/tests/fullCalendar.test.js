import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

describe('Calendar::addEvent()', () => {
  it('should add an event to the calendar', () => {
    const calendar = new Calendar(document.createElement('div'), {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
    })
    expect(calendar.getEvents().length).toBe(0)

    const dateStr = '2020-01-01'
    const date = new Date(dateStr + 'T00:00:00') // will be in local time

    const event = calendar.addEvent({
      title: 'test event',
      start: date, // required, even though the docs say otherwise
    })
    expect(event).toBeTruthy()
    expect(calendar.getEvents().length).toBe(1)
  })
})
