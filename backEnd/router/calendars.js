require("dotenv").config();

const express = require("express");
const Calendar = require("../models/Calendar");
const jwt = require("jsonwebtoken");
const { v4: uuid4 } = require("uuid");
const auth = require("../middleware/auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const seedCalendars = require("./seedCalendar");

const app = express();
const { body, validationResult } = require("express-validator");

//==================
//==================Seeding Data
//==================
router.get("/seed", async (req, res) => {
  await Calendar.deleteMany();

  await Calendar.create(seedCalendars, (err, data) => {
    if (err) {
      console.log("GET /seed error: " + err.message);
      res
        .status(400)
        .json({ status: "error", message: "seeding error occurred" });
    } else {
      res.json({ status: "ok", message: "seeded successfully" });
    }
  });
});

//==================
//================== Show Event Details
//==================

router.post("/showEvents", async (req, res) => {
  try {
    const allCalEvents = await Calendar.aggregate([
      { $match: { id: "req.body.id" } },
      //   {
      //     $lookup: {
      //       from: "events",
      //       localField: "events",
      //       foreignField: "id",
      //       as: "calendarEvents",
      //     },
      //   },
    ]);

    const filteredEvents = allCalEvents.filter((event) => {
      return event.calendarEvents.length > 0;
    });

    return res.json(allCalEvents);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
