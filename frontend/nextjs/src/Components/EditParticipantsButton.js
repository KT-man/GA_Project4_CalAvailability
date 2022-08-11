import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { useRecoilValue } from "recoil";
import { userCookie } from "../atoms/userCookies";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EditParticipantsButton = (props) => {
  const userCookies = useRecoilValue(userCookie);
  const emailRef = useRef([]);
  const [showParticipantEmailInput, setShowParticipantEmailInput] =
    useState(false);

  const handleParticipantEmail = () => {
    setShowParticipantEmailInput(!showParticipantEmailInput);
  };

  // ============================================
  // ============================================
  // Edit Participants
  // ============================================
  // ============================================

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          props.handleParticipantEmail();
        }}
      >
        Edit Participants
        {/* <Dialog
          open={showParticipantEmailInput}
          onClose={() => {
            console.log("do Nothing");
          }}
        >
          <DialogTitle>Invite Participants</DialogTitle>
          <DialogContent sx={{ m: 2 }}>
            <DialogContentText>
              Enter participant emails below, each separated by a comma (",")
            </DialogContentText>
            <TextField
              id="Email Input"
              label="Participant Emails"
              type="text"
              fullWidth
              inputRef={emailRef}
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button>Close</Button>
            <Button>Submit</Button>
          </DialogActions>
        </Dialog> */}
      </Button>
    </>
  );
};

export default EditParticipantsButton;
