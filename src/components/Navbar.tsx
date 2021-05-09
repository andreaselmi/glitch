import React from "react";
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

//interface
import { NavbarProps } from "../types/interfaces";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
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
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.navbarDisplay}>
        <div className={classes.imgContainer}>
          <img src={logo} width="75" />
        </div>
        {mobileView ? (
          <MyDrawer links={links} />
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
