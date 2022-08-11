import React, { useRef, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Link from "../src/Link";
import Head from "next/head";

import FullCalendar from "@fullcalendar/react"; //
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useRecoilState, useRecoilValue } from "recoil";

import { currentEvent } from "../src/atoms/currentEvents";
import { currentClick } from "../src/atoms/currentClick";
import { userCookie } from "../src/atoms/userCookies";
import RenderList from "../src/Components/RenderList";

export default function CalendarView() {
  const userCookies = useRecoilValue(userCookie);
  const [seedEvents, setSeedEvents] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const [calendarEvents, setCalendarEvents] = useRecoilState(currentEvent);
  const [drawerClick, setDrawerClick] = useRecoilState(currentClick);

  const calendarRef = useRef();

  // ============================================
  // ============================================
  // Read initial list of events from server
  // ============Not as useful or displayed. Uncomments events = seedEvents in full Calendar to reveal
  // ============================================

  const fetchEvents = async (url, config) => {
    try {
      const url = "http://localhost:5001/events/allEvents";
      const config = {
        method: "GET",
        "Content-type": "application/json",
      };
      const res = await fetch(url, config);
      const data = await res.json();

      setSeedEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================================
  // ============================================
  // Check if user has calendarId cookie already, if yes, load calendar, else, create new calendarId in cookie
  // ============================================
  // ============================================

  const fetchCalendarId = async (url, config) => {
    try {
      const calendarData = {
        calId: userCookies.cookie_value,
      };

      // Go to internal /api/calendarID first to verify if cookie exists
      const url = "http://localhost:5001/calendars/newCalendarId";
      const config = {
        method: "POST",
        body: JSON.stringify(calendarData),
        headers: { "content-type": "application/json" },
      };
      const res = await fetch(url, config);
      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================================
  // ============================================
  // Load events that are stored within the user's calendar
  // ============================================
  // ============================================
  const getEventsForCal = async (url, config) => {
    try {
      const data = {
        calId: userCookies.cookie_value,
      };
      const url = "http://localhost:5001/calendars/getEventsForCal";
      const config = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      };
      const res = await fetch(url, config);
      const eventData = await res.json();

      if (eventData) {
        eventData.forEach((event) => {
          calendarRef.current.getApi().addEvent(event);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCalendarId();
    fetchEvents();
    getEventsForCal();
  }, []);

  // ============================================
  // ============================================
  // Toggle Drawer Open
  // ============================================
  // ============================================
  const toggleDrawer = (event) => {
    setDrawer(!drawer);
    if (!drawer) {
      // Trigger on drawer open
      setDrawerClick(event); // Date Object https://fullcalendar.io/docs/date-object
    }
  };

  // ============FUNCTION END=====================================================
  // -------------------

  return (
    <>
      <Head>
        <title>Calendar</title>
      </Head>
      <Container maxWidth="xl">
        <Box sx={{ my: 2, mx: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/" color="primary">
            Back to homepage
          </Link>
          <br></br>
          <br></br>
          {/* ============================================
          ===========Full Calendar Component
          ============================================ */}
          <FullCalendar
            ref={calendarRef}
            timeZone="local"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prevYear,prev,next,nextYear",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            footerToolbar={{ center: "today" }}
            buttonText={{
              today: "Return to Today",
              dayGridMonth: "Monthly",
              timeGridWeek: "Weekly",
              timeGridDay: "Daily",
            }}
            selectable={true}
            editable={true}
            selectMirror={true}
            initialView="dayGridMonth"
            dayMaxEvents={true}
            fixedWeekCount={false}
            select={toggleDrawer}
          ></FullCalendar>
          {/* ============================================
          ===========Full Calendar Component
          ============================================ */}

          <Drawer anchor="right" open={drawer} onClose={toggleDrawer}>
            <RenderList calendarRef={calendarRef} />
          </Drawer>
        </Box>
      </Container>
    </>
  );
}
