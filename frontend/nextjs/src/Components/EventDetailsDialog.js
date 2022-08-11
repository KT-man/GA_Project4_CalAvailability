import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { currentClick } from "../atoms/currentClick";
import DeleteButton from "./DeleteButton";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const EventDetailsDialog = (props) => {
  const drawerClick = useRecoilValue(currentClick);
  const [dailyEvents, setDailyEvents] = useState([]);

  // ============================================
  // ============================================
  // Get chosen day event details
  // ============================================
  // ============================================

  const getDetailsOfEventsOnDay = () => {
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
            getDetailsOfEventsOnDay();
          }}
        >
          <ListItemIcon>Blank</ListItemIcon>
          <ListItemText primary="Show Event Details" />
        </ListItemButton>
        <Dialog
          open={props.showEventDetailsModal}
          onClose={props.handleEventDetails}
        >
          <DialogTitle>Calendar Details for {drawerClick.startStr}</DialogTitle>
          <DialogContent>
            {dailyEvents.length > 0
              ? ``
              : `You have no events available, maybe create some?`}

            {dailyEvents.map((event) => {
              return (
                <>
                  Event Details for <strong>{event.title}</strong>
                  <Accordion key={event.id} expanded="false">
                    <AccordionSummary>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Start Time</TableCell>
                            <TableCell align="center">End Time</TableCell>
                            <TableCell align="justify">
                              Event Description
                            </TableCell>
                            <TableCell>Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow></TableRow>
                          <TableCell>
                            {event.startStr.split("T")[1].slice(0, 5)}
                          </TableCell>
                          <TableCell>
                            {event.endStr.split("T")[1].slice(0, 5)}
                          </TableCell>
                          <TableCell width={300} align="justify">
                            {event.extendedProps.description}
                          </TableCell>
                          <TableCell>
                            <DeleteButton
                              id={event.id}
                              title={event.title}
                              calendarRef={props.calendarRef}
                              handleEventDetails={props.handleEventDetails}
                            ></DeleteButton>
                          </TableCell>
                        </TableBody>
                      </Table>
                    </AccordionSummary>
                  </Accordion>
                </>
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
