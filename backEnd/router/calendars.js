require("dotenv").config();

const express = require("express");
const Calendar = require("../models/Calendar");
const jwt = require("jsonwebtoken");
const { v4: uuid4 } = require("uuid");
const auth = require("../middleware/auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const seedCalendars = require("./seedCalendar");
const dayjs = require("dayjs");

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
//==================Seeding Events to current calendar
//==================
router.get("/seedEvents", async (req, res) => {
  await Calendar.findOneAndUpdate({ calId: req.cookies.calendarId }, {});
});

//==================
//================== Adding cookie to users navigating into calendarView
//==================

router.get("/newCalendarId", async (req, res) => {
  return res.json(req.cookies);
});

// router.post("/newCalendarId", auth, async (req, res) => {
//   try {
//     // Check if there are cookies. If (!undefined = false), create new cookie
//     if (!req.cookies.calendarId) {
//       const calendarUUID = uuid4();

//       const newCalendarId = { calId: calendarUUID };
//       console.log(newCalendarId);

//       return await Calendar.create(newCalendarId, (err, data) => {
//         if (err) {
//           console.log("Error creating new user" + err.message);
//           res
//             .status(400)
//             .json({ status: "error", message: "error encountered" });
//         } else {
//           return res.json({
//             status: "success",
//             message: `new calendar created`,
//           });
//         }
//       });
//     }

//     const existingCalendar = await Calendar.findOne({
//       calId: req.cookies.calendarId,
//     });

//     console.log(existingCalendar);

//     if (existingCalendar) {
//       res.cookie("calendarId", existingCalendar.calId, {
//         secure: false,
//         httpOnly: true,
//         expires: dayjs().add(30, "days").toDate(),
//       });
//       return res.json({
//         status: "error",
//         message: "Calendar already exists, loading calendarID...",
//       });
//     }

//     await Calendar.create(newCalendarId, (err, data) => {
//       if (err) {
//         console.log("Error creating new user" + err.message);
//         return res
//           .status(400)
//           .json({ status: "error", message: "error encountered" });
//       } else {
//         return res.json({
//           status: "success",
//           message: `new calendar created`,
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       status: "error",
//       message: "an error has occurred",
//       error: error,
//     });
//   }
// });

//==================
//================== Show EventIds belonging to a Calendar ID
//================== CalendarID will be stored in user cookies

router.post("/getEventsForCal", auth, async (req, res) => {
  try {
    const allCalEvents = await Calendar.aggregate([
      { $match: { calId: req.body.calId } },
      {
        $lookup: {
          from: "events",
          localField: "events",
          foreignField: "id",
          as: "calendarEvents",
        },
      },
      //   { $unwind: "$calendarEvents" },
      { $project: { events: 1 } },
    ]);
    console.log(allCalEvents);
    if (!allCalEvents) {
      return res.json({
        status: "error",
        message: "no such event or calendar found",
      });
    }

    return res.json(allCalEvents);
  } catch (error) {
    console.log(error);
  }
});

//==================
//================== Add event to calendar
//==================
router.patch("/addEventToCal", async (req, res) => {
  try {
    const eventExists = await Calendar.findOne({
      calId: req.body.calId,
      events: { $elemMatch: { $eq: req.body.id } },
    });

    if (eventExists) {
      return res.status(400).json({
        status: "error",
        message: `event ${eventExists} already exists!`,
      });
    }

    // Need to check that eventId is input correctly
    const newEvent = await Calendar.findOneAndUpdate(
      { calId: req.body.calId },
      { $push: { events: req.body.id } },
      { new: true }
    );

    if (!newEvent) {
      return res.json({
        status: "error",
        message: "calendar or event id not correct",
      });
    }
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
    calId: req.body.calId,
    events: { $elemMatch: { $eq: req.body.id } },
  });

  if (!eventExists) {
    return res.status(400).json({
      status: "error",
      message: "Please ensure event is selected correctly",
    });
  }

  const deleteEvent = await Calendar.findOneAndUpdate(
    {
      calId: req.body.calId,
    },
    { $pull: { events: { $eq: req.body.id } } },
    { new: true }
  );

  res.json(deleteEvent);
});

//==================
//================== Delete user cookies and calendar
//==================

router.delete("/delCalendar", async (req, res) => {
  const deleteCal = await Calendar.findOneAndDelete(
    {
      calId: req.cookies.calendarId,
    },
    { new: true }
  );

  res.clearCookie("calendarId");
  console.log(req.cookies);
  // res.json(req.cookies);
  res.json(deleteCal);
});

//==================
//==================  FOR OWN USE. CLEAR COOKIES
//==================

router.delete("/clearcookies", async (req, res) => {
  console.log(req.cookies);
  res.clearCookie("calendarId");
  res.json(req.cookies);
});

//==================
//==================  FOR OWN USE. ADD COOKIES
//==================

router.post("/addcookies", async (req, res) => {
  console.log(req.cookies);
  res.cookie("calendarId", "aa11a9ac-db58-42e7-90db-91ab01705d25", {
    secure: false,
    httpOnly: true,
    expires: dayjs().add(30, "days").toDate(),
  });
  res.json(req.cookies);
});

module.exports = router;
