const { v4: uuidv4 } = require("uuid");

const seedEvents = [
  {
    id: uuidv4(),
    title: "testEvent1",
    start: "2022-08-01",
    end: "2022-08-01",
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
    id: uuidv4(),
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
    id: uuidv4(),
    title: "testEvent34",
    start: "2022-08-15T15:00:00",
    end: "2022-08-15T15:30:00",
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

module.exports = seedEvents;
