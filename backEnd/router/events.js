require("dotenv").config();

const express = require("express");
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");
const { v4: uuid4 } = require("uuid");
const auth = require("../middleware/auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const seedEvents = require("./seedEvent");

const app = express();
const { body, validationResult } = require("express-validator");

//==================
//==================Seeding Data into database
//==================
router.get("/seed", async (req, res) => {
  await Event.deleteMany();

  await Event.create(seedEvents, (err, data) => {
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
//==================Get all events from database
//==================
router.get("/allEvents", async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.json(allEvents);
  } catch (error) {
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

//==================
//==================Create new event
//==================
router.patch("/createEvent", async (req, res) => {
  try {
    const createdEvent = await Event.create({
      id: req.body.id,
      title: req.body.title,
      start: req.body.start, // Example Format = YYYY-MM-DDThh:mm:ss
      end: req.body.end, // Example Format = YYYY-MM-DDThh:mm:ss
      extendedProps: {
        description: req.body.description,
        attendees: req.body.attendees,
      },
    });

    console.log(`Event created! : ${createdEvent}`);
    res.json({
      status: "ok",
      message: `event ${createdEvent} created`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "error", message: "error encountered", error: error });
  }
});

//==================
//================== Delete Event
//==================

router.delete("/deleteEvent", async (req, res) => {
  try {
    const findEvent = await Event.findOne({
      id: req.body.id,
    });

    if (!findEvent) {
      return res
        .status(400)
        .json({ status: "error", message: "event not found" });
    }

    const deleteEvent = await Event.findOneAndDelete({
      id: req.body.id,
    });

    res.json({ status: "ok", message: `event has been deleted` });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "error encountered, event not deleted",
      error: error,
    });
  }
});

module.exports = router;
