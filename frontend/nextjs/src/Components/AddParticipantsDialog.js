import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { currentClick } from "../atoms/currentClick";
import EditParticipantsButton from "./EditParticipantsButton";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

const AddParticipantsDialog = (props) => {
  const drawerClick = useRecoilValue(currentClick);
  const [dailyEvents, setDailyEvents] = useState([]);
  const clickedDate = new Date(drawerClick.startStr);
  const [showParticipantEmailInput, setShowParticipantEmailInput] =
    useState(false);

  const handleParticipantEmail = () => {
    setShowParticipantEmailInput(!showParticipantEmailInput);
  };

  // ============================================
  // ============================================
  // Get chosen day event details
  // ============================================
  // ============================================

  const getDetailsOfEventsOnDay = () => {
    console.log(drawerClick.start);
    const allEvents = props.calendarRef.current.getApi().getEvents();

    const eventsOnDay = allEvents.filter((event) => {
      return event.startStr.split("T")[0] === drawerClick.startStr;
    });
    setDailyEvents(eventsOnDay);
  };

  // ============================================
  // ============================================
  // Edit Participants
  // ============================================
  // ============================================

  const editParticipants = async (eventId) => {
    // Still have to fix issue of multiple edits not working
    let transformedEmails = props.participantRef.current.value;
    transformedEmails = transformedEmails.split(",");

    const data = { id: eventId, email: transformedEmails };

    const url = "http://localhost:5001/events/addEmailToEvent";
    const config = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    };

    const res = await fetch(url, config);
    const returned = await res.json();
  };

  // ============================================
  // ============================================
  // Send email to participants
  // ============================================
  // ============================================
  const sendEmailToParticipants = async (eventId) => {
    const data = { id: eventId };

    const url = "http://localhost:5001/events/sendEmailToParticipants";
    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    };
    const res = await fetch(url, config);
    const returnData = await res.json();

    console.log(eventId);
    console.log(returnData);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            props.handleParticipantsClick();
            getDetailsOfEventsOnDay();
          }}
        >
          <ListItemIcon>Blank</ListItemIcon>
          <ListItemText primary="Add Participants" />
        </ListItemButton>
        <Dialog
          open={props.showParticipantsModal}
          onClose={props.handleParticipantsClick}
        >
          <DialogTitle>
            Invite friends for events on {drawerClick.startStr}!
          </DialogTitle>
          <DialogContent>
            {dailyEvents.length > 0
              ? ``
              : `You have no events available, maybe create some first before inviting your friends?`}

            {dailyEvents.map((event) => {
              return (
                <>
                  Attendee details for <strong>{event.title}</strong>
                  <Accordion key={event.id} expanded="false">
                    <AccordionSummary>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Start Time</TableCell>
                            <TableCell align="center">End Time</TableCell>
                            <TableCell align="justify">
                              Event Participants
                            </TableCell>
                            <TableCell>Invite Partcipants</TableCell>
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
                          {/* Show this if user has not clicked on "Edit Participants" */}
                          {!showParticipantEmailInput && (
                            <>
                              <TableCell width={300} align="left">
                                {event.extendedProps.attendees.length > 0
                                  ? event.extendedProps.attendees.map(
                                      (attendee) => {
                                        return <div>{attendee.email}</div>;
                                      }
                                    )
                                  : "No participants yet"}
                              </TableCell>
                              <TableCell>
                                <EditParticipantsButton
                                  handleParticipantEmail={
                                    handleParticipantEmail
                                  }
                                />
                                <Button
                                  variant="contained"
                                  color="primary"
                                  sx={{ m: 1 }}
                                  onClick={() => {
                                    sendEmailToParticipants(event.id);
                                  }}
                                >
                                  Send email to participants
                                </Button>
                              </TableCell>
                            </>
                          )}
                          {/* Show this if User wants to Edit Participants */}
                          {showParticipantEmailInput && (
                            <>
                              <TableCell width={300}>
                                <TextField
                                  id="Paricipants"
                                  label="Invite Participants"
                                  type="text"
                                  inputRef={props.participantRef}
                                ></TextField>
                              </TableCell>
                              <TableCell>
                                <Button
                                  color="primary"
                                  variant="contained"
                                  onClick={() => {
                                    editParticipants(event.id);
                                    handleParticipantEmail();
                                  }}
                                >
                                  Submit
                                </Button>
                              </TableCell>
                            </>
                          )}
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
                props.handleParticipantsClick();
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

export default AddParticipantsDialog;
