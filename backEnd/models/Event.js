const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },

    extendedProps: {
      description: { type: String },
      attendees: [
        {
          email: { type: String },
          isAttending: { type: Boolean },
        },
      ],
    },
  },
  { collection: "events" }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
