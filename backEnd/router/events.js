require("dotenv").config();

const express = require("express");
const Event = require("../models/Event");
const router = express.Router();
const seedEvents = require("./seedEvent");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        description: req.body.extendedProps.description,
        attendees: req.body.extendedProps.attendees,
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

//==================
//================== Add participants email to event
//==================

router.patch("/addEmailToEvent", (req, res) => {
  const editedParticipantsPromises = req.body.email.map((email) => {
    return Event.findOneAndUpdate(
      { id: req.body.id },
      { $push: { "extendedProps.attendees": [{ email }] } }
    );
  });

  Promise.all(editedParticipantsPromises).then((values) => {
    return res.json(values);
  });
});

//==================
//================== Add participants email to event
//==================
router.post("/sendEmailToParticipants", async (req, res) => {
  const eventToSend = await Event.findOne({
    id: req.body.id,
  });

  console.log(eventToSend);
  const emailArray = [];
  eventToSend.extendedProps.attendees.map((attendee) => {
    return emailArray.push(attendee.email);
  });
  console.log(emailArray);

  const msg = {
    to: emailArray, // Change to your recipient
    from: process.env.SENDGRID_EMAIL, // Change to your verified sender
    subject: `Invite to ${eventToSend.title}`,
    html: `
    <html>
      <body>
        <div>
          <h1>You've been invited to the following event: ${
            eventToSend.title
          }</h1>
        </div>
        <div>
          <h2>Event Details</h2>
          <h3>Start Time: ${eventToSend.start.replace("T", " ")}</h3>
          <h3>End Time:${eventToSend.end.replace("T", " ")} </h3>
          <h3>Event Description: ${eventToSend.extendedProps.description} </h3>
        </div>
        <div>
          Please confirm your attendance!
          <span>
            <button>I am Attending!</button>
            <button onclick = alert("Please come...")>I am a social recluse</button>
          </span>
        </div>
      </body>
    </html>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.json({ status: "ok", message: `email sent!` });
    })
    .catch((error) => {
      console.error(error);
      res.json({ status: "error" });
    });
});

module.exports = router;
