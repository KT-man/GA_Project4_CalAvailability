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
//================== Show EventIds belonging to a Calendar ID
//==================

router.post("/getEventsForCal", async (req, res) => {
  try {
    const allCalEvents = await Calendar.aggregate([
      { $match: { id: req.body.id } },
      {
        $lookup: {
          from: "events",
          localField: "events",
          foreignField: "eventId",
          as: "calendarEvents",
        },
      },
      //   { $unwind: "$calendarEvents" },
      { $project: { events: 1 } },
    ]);

    return res.json(allCalEvents);
  } catch (error) {
    console.log(error);
  }
});

//==================
//================== Add event to calendar
//==================
router.patch("/addEventToCal", async (req, res) => {
  const eventExists = await Calendar.findOne({
    id: req.body.id,
    events: { $elemMatch: { $eq: req.body.eventId } },
  });

  if (eventExists) {
    return res.status(400).json({
      status: "error",
      message: `event ${eventExists} already exists!`,
    });
  }
  try {
    const newEvent = await Calendar.findOneAndUpdate(
      { id: req.body.id },
      { $push: { events: req.body.eventId } },
      { new: true }
    );
    return res.json(newEvent);
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: "error encountered", error: error });
  }
});

//==================
//================== Delete event from calendar
//==================
router.delete("/delEventFromCal", async (req, res) => {
  const eventExists = await Calendar.findOne({
    id: req.body.id,
    events: { $elemMatch: { $eq: req.body.eventId } },
  });

  if (!eventExists) {
    return res.status(400).json({
      status: "error",
      message: "Please ensure event is selected correctly",
    });
  }

  const deleteEvent = await Calendar.findOneAndUpdate(
    {
      id: req.body.id,
    },
    { $pull: { events: { $eq: req.body.eventId } } },
    { new: true }
  );

  res.json(deleteEvent);
});

module.exports = router;
