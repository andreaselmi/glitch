import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { makeStyles, useTheme } from "@material-ui/core/styles";

//components
import logo from "../assets/images/logoWhite.png";
import MyDrawer from "./MyDrawer";
import MyModal from "./MyModal";
import UserAuthTabs from "./containers/UserAuthTabs";

//interface
import { NavbarProps } from "../types/interfaces";

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

  const toggleModal = () => {
    setOpen(!open);
  };

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
            {links.map(({ name, path }) => (
              <a className={classes.linkText} href={path} key={name}>
                <ListItem button>
                  <ListItemText primary={name} />
                </ListItem>
              </a>
            ))}
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={toggleModal}
            >
              Sign in
            </Button>
          </List>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
