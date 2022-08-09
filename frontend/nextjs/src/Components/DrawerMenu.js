import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useRecoilState } from "recoil";
import { drawerState } from "../atoms/toggleDrawer";

export default function DrawerMenu() {
  const [drawer, setDrawer] = useRecoilState(drawerState);

  //   const toggleDrawer = (anchor, open) => (event) => {
  //     // Curried function
  //     // First function takes in parameteres anchor and open
  //     // Second function takes in event parameter
  //     // if (
  //     //   event.type === "keydown" &&
  //     //   (event.key === "Tab" || event.key === "Shift")
  //     // ) {
  //     //   console.log(event);
  //     //   return;
  //     // }

  //     console.log(anchor);
  //     console.log(open);
  //     console.log(drawer);
  //     setDrawer({ [anchor]: open });
  //   };

  const toggleDrawer = (event) => {
    //Need to change anchor to selectedDay

    // Curried function
    // First function takes in parameteres anchor and open
    // Second function takes in event parameter

    console.log("Open Close");
    console.log(event.startStr);
    console.log(drawer);
    setDrawer(!drawer);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => console.log("asdasdqweqweasdasd")}>
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="New Event" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => console.log("button2")}>
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="Show Event Details" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => console.log("button3")}>
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="Invite Participants" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => console.log("button4")}>
            <ListItemIcon>Blank</ListItemIcon>
            <ListItemText primary="Delete Event" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor="right"
            open={drawer[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
