import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { currentClick } from "../atoms/currentClick";

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

const AddParticipantsDialog = (props) => {
  const [drawerClick, setDrawerClick] = useRecoilState(currentClick);
  const clickedDate = new Date(drawerClick.startStr);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={props.handleParticipantsClick}>
          <ListItemIcon>Blank</ListItemIcon>
          <ListItemText primary="Add Participants" />
        </ListItemButton>
        <Dialog
          open={props.showParticipantsModal}
          onClose={props.handleParticipantsClick}
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

export default AddParticipantsDialog;
