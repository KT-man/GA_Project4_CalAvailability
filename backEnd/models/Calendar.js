const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    email: { type: String, unique: true },
    events: [{ type: String }],
  },

  { collection: "calendars" }
);

const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;
