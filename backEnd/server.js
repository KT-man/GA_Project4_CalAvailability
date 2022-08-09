require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const events = require("./router/events");
const calendars = require("./router/calendars");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());

connectDB(process.env.MONGODB_URI);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/events", events);
app.use("/calendars", calendars);

const PORT = process.env.PORT || 5001;

app.listen(PORT);
