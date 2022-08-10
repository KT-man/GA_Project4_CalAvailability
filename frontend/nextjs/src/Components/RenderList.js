import React, { useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentEvent } from "../atoms/currentEvents";
import { currentClick } from "../atoms/currentClick";
import { userCookie } from "../atoms/userCookies";
import { v4 as uuidv4 } from "uuid";

import NewEventDialog from "./NewEventDialog";

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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventDetailsDialog from "./EventDetailsDialog";

const RenderList = (props) => {
  const userCookies = useRecoilValue(userCookie);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showEventDetailsModal, setEventDetailsModal] = useState(false);
  const [showParticipantsModal, setParticipantsModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);

  const [currentEvents, setCurrentEvents] = useRecoilState(currentEvent);
  const [dailyEvents, setDailyEvents] = useState([]);

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

  // =======================createNewEvent will create a event in the event database
  const createNewEvent = async () => {
    const data = {
      id: uuidv4(),
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

    const resJson = await res.json();

    // Create new event on Calendar
    // Seems that if dates are input wrongly it will default to a 1h slot
    if (resJson.status === "error") {
      alert("Error occurred! Please try adding event again");
      return;
    } else {
      // Link event to current calendar if it has been successfully created in backend
      const data2 = { calId: userCookies.cookie_value, id: data.id };
      const res2 = await fetch(
        "http://localhost:5001/calendars/addEventToCal",
        {
          method: "PATCH",
          body: JSON.stringify(data2),
          headers: { "content-type": "application/json" },
        }
      );
      const resJson2 = await res2.json();
      console.log(resJson2);

      props.calendarRef.current.getApi().addEvent(data);
    }
  };

  // ============FUNCTION END=====================================================

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
    setDailyEvents(eventsOnDay);
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
        <NewEventDialog
          handleNewEventClick={handleNewEventClick}
          showNewEventModal={showNewEventModal}
          createNewEvent={createNewEvent}
          calendarRef={props.calendarRef}
          titleRef={titleRef}
          startRef={startRef}
          endRef={endRef}
          descRef={descRef}
        ></NewEventDialog>
        {/* End of First Button  */}
        {/* End of First Button  */}
        {/* ======================================================================= */}
        {/* Start of Second Button */}
        {/* Start of Second Button */}
        <EventDetailsDialog
          handleEventDetails={handleEventDetails}
          showDetailsOfEvents={showDetailsOfEvents}
          showEventDetailsModal={showEventDetailsModal}
          calendarRef={props.calendarRef}
        ></EventDetailsDialog>

        {/* <ListItem disablePadding>
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
            <DialogTitle>
              Calendar Details for {drawerClick.startStr}
            </DialogTitle>
            <DialogContent>
              <AccordionSummary></AccordionSummary>
              <AccordionDetails></AccordionDetails>
              <Accordion disabled>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  {dailyEvents.length > 0
                    ? `Event Details`
                    : `You have no events available, maybe create one?`}
                </AccordionSummary>
              </Accordion>
              {dailyEvents.map((event) => {
                return (
                  <Accordion key={event.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {`Title: ${event.title}`}
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem></ListItem>
                        <ListItemText
                          primary="Event Start Time"
                          secondary={event.startStr}
                        ></ListItemText>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleEventDetails();
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </ListItem> */}
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
