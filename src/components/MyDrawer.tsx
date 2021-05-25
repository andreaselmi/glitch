import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

//material-ui imports
import {
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";

//interfaces
import { NavbarProps } from "../types/interfaces";
//components
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

//TODO implementare search su mobile

const MyDrawer = ({ links, openModal, onClickLogout }: MyModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <div>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="search-icon"
          onClick={() => history.push("/explore")}
        >
          <Search />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setOpen(!open)}
        >
          <MenuIcon />
        </IconButton>
      </div>
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
