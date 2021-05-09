import React, { useState } from "react";

//material-ui imports
import IconButton from "@material-ui/core/IconButton";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

//interfaces
import { NavbarProps } from "../types/interfaces";

const useStyles = makeStyles({
  drawerContainer: {
    width: "10rem",
  },
});

const MyDrawer = ({ links }: NavbarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
      >
        <div
          className={classes.drawerContainer}
          tabIndex={0}
          role="button"
          onClick={() => {
            setOpen(false);
          }}
          onKeyDown={() => {
            setOpen(false);
          }}
        >
          <List>
            {links.map((link, index) => (
              <ListItem key={index} button divider>
                <ListItemText>{link.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default MyDrawer;
