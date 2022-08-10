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

const EventDetailsDialog = (props) => {
  const [drawerClick, setDrawerClick] = useRecoilState(currentClick);
  const [dailyEvents, setDailyEvents] = useState([]);

  const showDetailsOfEvents = () => {
    // Filter out for events in clicked month first
    console.log(drawerClick.startStr);
    const allEvents = props.calendarRef.current.getApi().getEvents();

    const eventsOnDay = allEvents.filter((event) => {
      return event.startStr.split("T")[0] === drawerClick.startStr;
    });
    setDailyEvents(eventsOnDay);
  };
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            props.handleEventDetails();
            showDetailsOfEvents();
          }}
        >
          <ListItemIcon>Blank</ListItemIcon>
          <ListItemText primary="Show Event Details for Today!" />
        </ListItemButton>
        <Dialog
          open={props.showEventDetailsModal}
          onClose={props.handleEventDetails}
        >
          <DialogTitle>Calendar Details for {drawerClick.startStr}</DialogTitle>
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
                props.handleEventDetails();
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    </>
  );
};

export default EventDetailsDialog;
