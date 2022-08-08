import * as React from "react";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import { useRecoilValue } from "recoil";
import { newEventState } from "../atoms/newEventSet";

import { createEventId } from "../../initialevents";

const RenderList = (props) => {
  // props.calendarRef.current.getApi()
  // Most important line. This line accesses the calendar manager, which then allows direct modifications to the calendar object

  const eventToSet = useRecoilValue(newEventState);

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

  const testerFunction = () => {
    console.log("this is tester function");

    // console.log(
    //   props.calendarRef.current.getApi().addEvent({
    //     id: createEventId(),
    //     title: "NewTester",
    //     start: "2022-08-12",
    //     end: "2022-08-12",
    //   })
    // );

    const getEvent = props.calendarRef.current
      .getApi()
      .getEventById("96f21aae-1da9-44bd-a04c-8d2d2c4b584a");

    console.log(getEvent);
  };

  // ============================================
  // ============================================
  // Deleting Event
  // ============================================
  // ============================================

  const handleDeleteEvent = (clickedEvent) => {
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
    <Box
      sx={{ width: 350 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleDateSelect(eventToSet);
            }}
          >
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="New Event" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => testerFunction()}>
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="Show Event Details" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => console.log("button3")}>
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="Invite Participants" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => console.log("button4")}>
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="Delete Event" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default RenderList;
