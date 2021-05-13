import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//components
import logo from "../assets/images/logoWhite.png";
import MyDrawer from "./MyDrawer";
import MyModal from "./MyModal";
import UserAuthTabs from "./containers/UserAuthTabs";

//interface
import { NavbarProps } from "../types/interfaces";

//store
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { auth } from "../config/firebase";
import { setNoUser } from "../store/user";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    height: 35,
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
        <div className={classes.imgContainer}>
          <img src={logo} width="75" />
        </div>
        {mobileView ? (
          <MyDrawer openModal={toggleModal} links={links} />
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
            {user && user.uid ? (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={toggleModal}
              >
                Sign in
              </Button>
            )}
          </List>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
