import { v4 as uuidv4 } from "uuid";

export const initialevents = [
  {
    id: createEventId(),
    title: "testEvent1",
    start: "2022-08-06",
    end: "2022-08-08",
    allDay: true,
    extendedProps: {
      description: "This is a event created for testing purposes ",
      attendees: [
        { email: "123@email.com", isAttending: true },
        { email: "456@hotmail.com", isAttending: false },
        { email: "789@email.com", isAttending: true },
      ],
    },
  },
  {
    id: createEventId(),
    title: "testEvent2",
    start: "2022-08-10T12:00:00",
    end: "2022-08-10T14:00:00",
    allDay: false,
    extendedProps: {
      description: "This is a event created for testing purposes ",
      attendees: [],
    },
  },
  {
    id: createEventId(),
    title: "testEvent34",
    start: "2022-08-15T15:00:00",
    end: "2022-08-16T15:30:00",
    extendedProps: {
      description: "This is a event created for testing purposes ",
      attendees: [
        { email: "123@email.com", isAttending: true },
        { email: "456@hotmail.com", isAttending: false },
        { email: "789@email.com", isAttending: true },
      ],
    },
  },
];

export function createEventId() {
  return uuidv4();
}
