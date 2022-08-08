import React, { useRef } from "react";
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

import { initialevents } from "../initialevents";

import { useRecoilState } from "recoil";
import { drawerState } from "../src/atoms/toggleDrawer";
import { newEventState } from "../src/atoms/newEventSet";
import { eventStore } from "../src/atoms/eventStore";
import RenderList from "../src/Components/RenderList";

export default function CalendarView() {
  const [drawer, setDrawer] = useRecoilState(drawerState);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const [currentEvents, setCurrentEvents] = useRecoilState(eventStore);
  const calendarRef = useRef();

  // console.log(calendarRef.current);

  // ============================================
  // ============================================
  // Toggle Drawer Open
  // ============================================
  // ============================================
  const toggleDrawer = (event) => {
    // Curried function
    // First function takes in parameteres anchor and open
    // Second function takes in event parameter

    setDrawer(!drawer);
    if (!drawer) {
      setNewEvent(event);
    }
  };

  // ============FUNCTION END=====================================================
  // -------------------

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
      // console.log(clickedEvent.event.id);
      // console.log(clickedEvent);
      clickedEvent.event.remove();
    }
  };

  // ============FUNCTION END=====================================================
  // -------------------

  function showEventContent(eventInfo) {
    // console.log(eventInfo);
    // console.log(eventInfo);
    // console.log(eventInfo.event._def);
    // console.log(eventInfo.event._instance.range.start);
    // console.log(eventInfo.event._instance.range.end);
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
        <title>Your Calendar</title>
      </Head>
      <Container maxWidth="xl">
        <Box sx={{ my: 2, mx: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/" color="secondary">
            Back to the homepage
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
            events={initialevents}
            eventsSet={handleEvents}
            // select={handleDateSelect}
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
          {currentEvents.map((event) => {
            return (
              <li key={event.id}>
                <b>
                  {formatDate(event.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </b>
                <i>{event.title} - </i>
                <i>{event.id}</i>
              </li>
            );
          })}
        </Box>
      </Container>
    </>
  );
}
