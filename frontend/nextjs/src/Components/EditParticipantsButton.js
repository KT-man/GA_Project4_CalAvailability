import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { useRecoilValue } from "recoil";

const EditParticipantsButton = (props) => {
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
      </Button>
    </>
  );
};

export default EditParticipantsButton;
