import React, { useState, useRef } from "react";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const RenderList = (props) => {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showEventDetailsModal, setEventDetailsModal] = useState(false);
  const [showParticipantsModal, setParticipantsModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);

  // props.calendarRef.current.getApi()
  // Most important line. This line accesses the calendar manager, which then allows direct modifications to the calendar object

  // ============================================
  // ============================================
  // Toggling of Modals
  // ============================================
  // ============================================
  const handleNewEventClick = () => {
    setShowNewEventModal(!showNewEventModal);
  };

  const handleEventDetails = () => {
    setEventDetailsModal(!showEventDetailsModal);
  };

  const handleParticipantsModal = () => {
    setParticipantsModal(!showParticipantsModal);
  };

  const handleDeleteModal = () => {
    setDeleteModal(!showDeleteModal);
  };

  // ============================================
  // ============================================
  // Creating new event
  // ============================================
  // ============================================

  const currentDate = new Date();

  const titleRef = useRef(null);
  const startRef = useRef(currentDate.toISOString().replace(/..\d.\d+Z$/g, ""));
  const endRef = useRef(currentDate.toISOString().split("T")[0]);
  const descRef = useRef(null);

  const formSubmit = async () => {
    const data = {
      title: titleRef.current.value,
      start: startRef.current.value,
      end: endRef.current.value,
      extendedProps: { description: descRef.current.value },
    };

    // Create new event on Calendar
    props.calendarRef.current.getApi().addEvent(data);

    // Create new event in backend
    const res = await fetch("http://localhost:5001/events/createEvent", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    const resMessage = res.json();
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

    const getEvent = props.calendarRef.current.getApi();

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
      // console.log(clickedEvent);
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
          <ListItemButton onClick={handleNewEventClick}>
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="New Event" />
          </ListItemButton>
          <Dialog open={showNewEventModal} onClose={handleNewEventClick}>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your event details below!
              </DialogContentText>
              <TextField
                sx={{ m: 1 }}
                id="EventTitle"
                label="Event Title"
                type="text"
                fullWidth
                inputRef={titleRef}
              />
              <TextField
                sx={{ m: 1 }}
                id="starttime"
                type="datetime-local"
                label="Start Time"
                inputRef={startRef}
                defaultValue={currentDate
                  .toISOString()
                  .replace(/..\d.\d+Z$/g, "")}
              />
              <TextField
                sx={{ m: 1 }}
                label="End Time"
                id="endtime"
                type="datetime-local"
                inputRef={endRef}
              />
              <TextField
                sx={{ m: 1 }}
                id="EventDescription"
                label="Event Description"
                type="text"
                fullWidth
                inputRef={descRef}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleNewEventClick}>Cancel</Button>
              <Button
                onClick={() => {
                  handleNewEventClick();
                  formSubmit();
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
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
