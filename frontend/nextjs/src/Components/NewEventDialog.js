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

const NewEventDialog = (props) => {
  const [drawerClick, setDrawerClick] = useRecoilState(currentClick);
  const clickedDate = new Date(drawerClick.startStr);
  console.log(clickedDate.toISOString());
  const currentDate = new Date();
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={props.handleNewEventClick}>
          <ListItemIcon>Blank</ListItemIcon>
          <ListItemText primary="Create New Event" />
        </ListItemButton>
        <Dialog
          open={props.showNewEventModal}
          onClose={props.handleNewEventClick}
        >
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
              inputRef={props.titleRef}
            />
            <TextField
              sx={{ m: 1 }}
              id="starttime"
              type="datetime-local"
              label="Start Time"
              inputRef={props.startRef}
              defaultValue={clickedDate
                .toISOString()
                .replace(/..\d.\d+Z$/g, "")}
            />
            <TextField
              sx={{ m: 1 }}
              label="End Time"
              id="endtime"
              type="datetime-local"
              inputRef={props.endRef}
              defaultValue={clickedDate
                .toISOString()
                .replace(/..\d.\d+Z$/g, "")}
            />
            <TextField
              sx={{ m: 1 }}
              id="EventDescription"
              label="Event Description"
              type="text"
              fullWidth
              inputRef={props.descRef}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleNewEventClick}>Close</Button>
            <Button
              onClick={() => {
                props.handleNewEventClick(); // Close Dialog
                props.createNewEvent(); // Create New Event
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    </>
  );
};

export default NewEventDialog;
