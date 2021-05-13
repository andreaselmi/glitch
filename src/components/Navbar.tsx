import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//material ui imports
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//components
import logo from "../assets/images/logoWhite.png";
import MyDrawer from "./MyDrawer";
import MyModal from "./MyModal";
import UserAuthTabs from "./containers/UserAuthTabs";
import MyButton from "./common/MyButton";

//interface
import { NavbarProps } from "../types/interfaces";

//store
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setNoUser } from "../store/user";

import { auth } from "../config/firebase";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginLeft: 15,
  },
  imgContainer: {
    alignItems: "center",
    display: "flex",
  },
  linkText: {
    color: `white`,
    marginLeft: 10,
    textDecoration: `none`,
    textTransform: `uppercase`,
  },
  navList: {
    alignItems: "center",
    display: `flex`,
    justifyContent: `space-between`,
  },
  navbarDisplay: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  title: {
    alignSelf: "center",
    flexGrow: 1,
  },
}));

const Navbar = ({ links }: NavbarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const user = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    setOpen(!open);
  };

  const logout = () => {
    auth.signOut();
    dispatch(setNoUser());
  };

  useEffect(() => {
    if (user.uid) setOpen(false);
  });

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.navbarDisplay}>
        <MyModal
          open={open}
          onClose={toggleModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <UserAuthTabs />
        </MyModal>
        <Link to="/">
          <div className={classes.imgContainer}>
            <img src={logo} width="75"></img>
          </div>
        </Link>
        {mobileView && user.uid ? (
          <MyDrawer
            onClickLogout={logout}
            openModal={toggleModal}
            links={links}
          />
        ) : (
          <List
            className={classes.navList}
            component="nav"
            aria-labelledby="main navigation"
          >
            {links.map((link) => {
              if (link.private && !user.uid) return null;
              return (
                <Link
                  className={classes.linkText}
                  to={link.path}
                  key={link.name}
                >
                  <ListItem button>
                    <ListItemText primary={link.name} />
                  </ListItem>
                </Link>
              );
            })}
            {user.uid ? (
              <MyButton
                className={classes.button}
                name="LOGOUT"
                onClick={logout}
              />
            ) : (
              <MyButton
                className={classes.button}
                name="SIGN IN"
                onClick={toggleModal}
              />
            )}
          </List>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
