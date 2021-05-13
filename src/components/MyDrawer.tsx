import React, { useState } from "react";
import { Link } from "react-router-dom";

//material-ui imports
import {
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

//interfaces
import { NavbarProps } from "../types/interfaces";
import MyButton from "./common/MyButton";

const useStyles = makeStyles({
  drawerContainer: {
    width: "10rem",
  },
  linkText: {
    color: `white`,
    textDecoration: `none`,
    textTransform: `uppercase`,
  },
});

interface MyModalProps extends NavbarProps {
  openModal: () => void;
  onClickLogout: () => void;
}

const MyDrawer = ({ links, openModal, onClickLogout }: MyModalProps) => {
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
              <Link className={classes.linkText} to={link.path} key={link.name}>
                <ListItem key={index} button divider>
                  <ListItemText>{link.name}</ListItemText>
                </ListItem>
              </Link>
            ))}
            <ListItem>
              <MyButton name="LOGOUT" onClick={onClickLogout} />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default MyDrawer;
