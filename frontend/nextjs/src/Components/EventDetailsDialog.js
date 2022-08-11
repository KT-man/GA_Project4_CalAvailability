import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentClick } from "../atoms/currentClick";
import DeleteButton from "./DeleteButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const EventDetailsDialog = (props) => {
  const [drawerClick, setDrawerClick] = useRecoilState(currentClick);
  const [dailyEvents, setDailyEvents] = useState([]);

  // ============================================
  // ============================================
  // Showing Event Details (Button 2)
  // ============================================
  // ============================================

  const showDetailsOfEvents = () => {
    console.log(drawerClick.start);
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
            {dailyEvents.length > 0
              ? `Event Details`
              : `You have no events available, maybe create some?`}

            {dailyEvents.map((event) => {
              return (
                <>
                  <Accordion disabled>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {dailyEvents.length > 0
                        ? "Wass"
                        : `You have no events available, maybe create one?`}
                    </AccordionSummary>
                  </Accordion>
                  <Accordion key={event.id} expanded="false">
                    <AccordionSummary>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Event Description</TableCell>
                            <TableCell>Attendees</TableCell>
                            <TableCell>Delete?</TableCell>
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
                          <TableCell>what</TableCell>
                          <TableCell>Attend</TableCell>
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
