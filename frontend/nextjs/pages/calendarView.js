import React, { useRef, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Link from "../src/Link";
import Head from "next/head";

import FullCalendar, { formatDate } from "@fullcalendar/react"; //
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useRecoilState } from "recoil";
import { newEventState } from "../src/atoms/newEventSet";
import { currentEvent } from "../src/atoms/currentEvents";
import { currentClick } from "../src/atoms/currentClick";
import RenderList from "../src/Components/RenderList";

export default function CalendarView() {
  const [seedEvents, setSeedEvents] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const [currentEvents, setCurrentEvents] = useRecoilState(currentEvent);
  const [drawerClick, setDrawerClick] = useRecoilState(currentClick);

  const calendarRef = useRef();

  // ============================================
  // ============================================
  // Read initial list of events from server
  // =================Loaded in with useEffect below
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
  // ==============Cookies are not being stored on localhost:3000? Can't find the cookie
  // ============================================

  const fetchCalendarId = async (url, config) => {
    try {
      const url = "http://localhost:5001/calendars/newCalendarId";
      const config = {
        method: "POST",
      };
      const res = await fetch(url, config);
      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCalendarId();
    fetchEvents();
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
      console.log(event);
      setDrawerClick(event); // Might be a date Object. Use <obj>.startStr to get start date https://fullcalendar.io/docs/date-object
      // setCurrentEvents(calendarRef.current.getApi().getEvents()); // Get all EVENT Objects in the current calendar, place in atom
      // calendarRef.current
      //   .getApi()
      //   .getEvents()
      //   .map((event) => console.log(event));
      console.log(calendarRef.current.getApi().getEvents());
      console.log(seedEvents);
    }
  };

  // Have to compare strings for dates, and then to figure out how to display more data

  // ============================================
  // ============================================
  // Deleting Event
  // ============================================
  // ============================================

  const handleEventClick = (clickedEvent) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickedEvent.event.title}'`
      )
    ) {
      console.log(clickedEvent.event.id);
      // console.log(clickedEvent);
      clickedEvent.event.remove();
    }
  };

  // ============FUNCTION END=====================================================
  // -------------------

  function showEventContent(eventInfo) {
    // console.log(eventInfo);
  }

  // ============FUNCTION END=====================================================
  // -------------------
  const handleEvents = (events) => {
    // console.log(events);
    // console.log(events[1].start);

    setCurrentEvents(events);
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
            events={seedEvents} // ======= Change this first to read from server
            eventsSet={handleEvents}
            select={toggleDrawer}
            eventClick={handleEventClick}
            eventContent={showEventContent}
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
