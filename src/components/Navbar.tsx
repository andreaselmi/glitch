import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

import logo from "../assets/images/logoWhite.png";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  navList: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navbarDisplay: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  title: {
    flexGrow: 1,
    alignSelf: "center",
  },
}));

interface NavbarProps {
  links: { name: string; path: string }[];
}

const Navbar = ({ links }: NavbarProps) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Container className={classes.navbarDisplay}>
          <div className={classes.imgContainer}>
            <img src={logo} width="75" />
          </div>
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
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
