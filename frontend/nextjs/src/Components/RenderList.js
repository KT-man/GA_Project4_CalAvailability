import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";

import { userCookie } from "../atoms/userCookies";
import { v4 as uuidv4 } from "uuid";

import NewEventDialog from "./NewEventDialog";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import EventDetailsDialog from "./EventDetailsDialog";
import AddParticipantsDialog from "./AddParticipantsDialog";

const RenderList = (props) => {
  const userCookies = useRecoilValue(userCookie);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showEventDetailsModal, setEventDetailsModal] = useState(false);
  const [showParticipantsModal, setParticipantsModal] = useState(false);

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

  const handleParticipantsClick = () => {
    setParticipantsModal(!showParticipantsModal);
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
  const participantRef = useRef(null);

  // =======================createNewEvent will create a event in the event database
  const createNewEvent = async () => {
    const data = {
      id: uuidv4(),
      title: titleRef.current.value,
      start: startRef.current.value,
      end: endRef.current.value,
      extendedProps: { description: descRef.current.value, attendees: [] },
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

      props.calendarRef.current.getApi().addEvent(data);
    }
  };

  // ============FUNCTION END=====================================================

  return (
    <Box sx={{ width: 300 }} role="presentation">
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
          showEventDetailsModal={showEventDetailsModal}
          calendarRef={props.calendarRef}
        ></EventDetailsDialog>
        {/* End of Second Button */}
        {/* End of Second Button */}
        {/* ======================================================================= */}
        {/* Start of Third Button */}
        {/* Start of Third Button */}
        <AddParticipantsDialog
          handleParticipantsClick={handleParticipantsClick}
          showParticipantsModal={showParticipantsModal}
          calendarRef={props.calendarRef}
          participantRef={participantRef}
        />
      </List>

      <Divider />
    </Box>
  );
};

export default RenderList;
