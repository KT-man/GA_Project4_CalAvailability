import { atom } from "recoil";

export const eventStore = atom({
  key: "eventStore",
  default: [],
});

// {
//     id: null,
//     title: null,
//     start: null,
//     end: null,
//     extendedprops: { description: null, attendees: [null] },
//   },

// {
//     id: createEventId(),
//     title,
//     start: selectedDay.startStr,
//     end: selectedDay.endStr,
//     extendedProps: {
//       description: "This is a event created for testing purposes ",
//       attendees: [
//         { email: "123@email.com", isAttending: true },
//         { email: "456@hotmail.com", isAttending: false },
//         { email: "789@email.com", isAttending: true },
//       ],
//     },
//   }
