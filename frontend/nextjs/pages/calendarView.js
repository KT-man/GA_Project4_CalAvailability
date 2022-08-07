import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DrawerMenu from "../src/Components/DrawerMenu";
import Drawer from "@mui/material/Drawer";

import Link from "../src/Link";
import Head from "next/head";

import FullCalendar from "@fullcalendar/react"; //
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { initialevents, createEventId } from "../initialevents";

import { useRecoilState } from "recoil";
import { drawerState } from "../src/atoms/toggleDrawer";

export default function CalendarView() {
  const [drawer, setDrawer] = useRecoilState(drawerState);

  // ============================================
  // ============================================
  // Toggle Drawer Open
  // ============================================
  // ============================================
  const toggleDrawer = (event) => {
    //Need to change anchor to selectedDay

    // Curried function
    // First function takes in parameteres anchor and open
    // Second function takes in event parameter

    console.log("Open Close");
    console.log(event.startStr);
    console.log(drawer);
    setDrawer(!drawer);
  };

  // ============FUNCTION END=====================================================
  // -------------------

  // ============================================
  // ============================================
  // Creating new event
  // ============================================
  // ============================================

  const handleDateSelect = (selectedDay) => {
    console.log("This is selected Day ");
    console.log(selectedDay);
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectedDay.view.calendar;

    console.log(calendarApi);

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectedDay.startStr,
        end: selectedDay.endStr,
        extendedProps: {
          description: "This is a event created for testing purposes ",
          attendees: [
            { email: "123@email.com", isAttending: true },
            { email: "456@hotmail.com", isAttending: false },
            { email: "789@email.com", isAttending: true },
          ],
        },
      });
    }

    console.log(calendarApi.currentDataManager.data.eventStore.defs);
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
      console.log(clickedEvent);
      clickedEvent.event.remove();
    }
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

          <FullCalendar
            timeZone="UTC"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prevYear,prev,next,nextYear",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            footerToolbar={{ left: "today", center: "today" }}
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
            eventAdd={function () {}}
            // select={handleDateSelect}
            select={toggleDrawer}
            eventClick={handleEventClick}
          ></FullCalendar>
          <DrawerMenu></DrawerMenu>
        </Box>
      </Container>
    </>
  );
}
