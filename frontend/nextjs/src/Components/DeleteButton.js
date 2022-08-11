import React from "react";
import Button from "@mui/material/Button";
import { useRecoilValue } from "recoil";
import { userCookie } from "../atoms/userCookies";

const DeleteButton = (props) => {
  const userCookies = useRecoilValue(userCookie);
  // ============================================
  // ============================================
  // Delete Button(Within Event Details Dialog)
  // ============================================
  // ============================================
  const deleteFunction = async () => {
    if (
      confirm(
        `Are you sure you wish to delete ${props.title}? This action cannot be undone.`
      )
    ) {
      const data = {
        calId: userCookies.cookie_value,
        id: props.id,
      };

      const url = "http://localhost:5001/calendars/delEventFromCal";
      const config = {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      };

      const res = await fetch(url, config);
      const returnedCalendar = await res.json();

      props.calendarRef.current.getApi().getEventById(props.id).remove();
      props.handleEventDetails();
    }
  };
  return (
    <>
      <Button color="error" variant="contained" onClick={deleteFunction}>
        Delete
      </Button>
    </>
  );
};

export default DeleteButton;
