import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { currentEvent } from "../atoms/currentEvents";
import { currentClick } from "../atoms/currentClick";

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

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RenderList = (props) => {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showEventDetailsModal, setEventDetailsModal] = useState(false);
  const [showParticipantsModal, setParticipantsModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);

  const [currentEvents, setCurrentEvents] = useRecoilState(currentEvent);

  const [drawerClick, setDrawerClick] = useRecoilState(currentClick);

  // calendarRef.current
  //   .getApi()
  //   .getEvents()
  //   .forEach((item) => {
  //     console.log(item.startStr);
  //   });
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
  // Creating new event (Button 1)
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

    // Create new event in backend
    const res = await fetch("http://localhost:5001/events/createEvent", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    const resMessage = await res.json();

    // Create new event on Calendar
    // Seems that if dates are input wrongly it will default to a 1h slot
    if (resMessage.status === "error") {
      alert("Error occurred! Please try adding event again");
      return;
    } else {
      props.calendarRef.current.getApi().addEvent(data);
    }
  };

  // ============FUNCTION END=====================================================
  // -------------------

  // ============================================
  // ============================================
  // Showing details of events in month (Button 2)
  // ============================================
  // ============================================

  const showDetailsOfEvents = () => {
    // Filter out for events in clicked month first
    console.log(drawerClick.startStr);
    const allEvents = props.calendarRef.current.getApi().getEvents();

    const eventsOnDay = allEvents.filter((event) => {
      return event.startStr.split("T")[0] === drawerClick.startStr;
    });
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
    <Box sx={{ width: 350 }} role="presentation">
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
        {/* End of First Button  */}
        {/* End of First Button  */}
        {/* ======================================================================= */}
        {/* Start of Second Button */}
        {/* Start of Second Button */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleEventDetails();
              showDetailsOfEvents();
            }}
          >
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="Show Event Details for Today!" />
          </ListItemButton>
          <Dialog open={showEventDetailsModal} onClose={handleEventDetails}>
            <DialogTitle>Event Details for "Day"</DialogTitle>
            <DialogContent>
              <Accordion>
                <AccordionSummary></AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleNewEventClick}>Cancel</Button>
              <Button
                onClick={() => {
                  handleEventDetails();
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </ListItem>
        {/* End of Second Button */}
        {/* End of Second Button */}
        {/* ======================================================================= */}
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
