const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema(
  {
    calId: { type: String, required: true },
    email: { type: String },
    events: [{ type: String }],
  },

  { collection: "calendars" }
);

const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;
