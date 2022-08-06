import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Link from "../src/Link";

import Head from "next/head";

import FullCalendar from "@fullcalendar/react"; //
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarView() {
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
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prevYear,prev,next,nextYear",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            footerToolbar={{ center: "today" }}
            titleFormat={{ month: "short", year: "numeric" }}
            buttonText={{
              today: "Return to Today",
              dayGridMonth: "Monthly",
              timeGridWeek: "Weekly",
              timeGridDay: "Daily",
            }}
            editable={true}
            selectMirror={true}
            initialView="dayGridMonth"
            selectable="true"
            dayMaxEvents={true}
          ></FullCalendar>
        </Box>
      </Container>
    </>
  );
}
