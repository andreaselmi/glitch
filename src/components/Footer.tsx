import React from "react";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  GitHub,
  Facebook,
  LinkedIn,
  Instagram,
  ArrowUpward,
} from "@material-ui/icons";
import { Grid, Icon, Typography } from "@material-ui/core";

//my components
import Scroller from "./common/Scroller";

const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    backToTopIcon: {
      alignItems: "center",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 50,
      color: theme.palette.text.primary,
      cursor: "pointer",
      display: "flex",
      fontSize: "3rem",
      justifyContent: "center",
      padding: 5,
      position: "absolute",
      right: 20,
      top: -60,
    },
    container: {
      alignItems: "center",
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: "auto",
      minHeight: "6rem",
      position: "relative",
    },
    socialIconContainer: {
      color: theme.palette.text.primary,
      "& a:link": {
        color: theme.palette.text.primary,
      },
      "& a:active": {
        color: theme.palette.text.primary,
      },
      "& a:visited": {
        color: theme.palette.text.primary,
      },
      "& > span": {
        margin: "0 10px",
        cursor: "pointer",
        "& :hover": {
          color: theme.palette.primary.main,
        },
      },
    },
    textContainer: {
      textAlign: "center",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.socialIconContainer}>
        <Icon>
          <a target="_blank" href="https://github.com/andreaselmi">
            <GitHub />
          </a>
        </Icon>
        <Icon>
          <a target="_blank" href="https://www.facebook.com/andryyy90">
            <Facebook />
          </a>
        </Icon>
        <Icon>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/andrea-selmi-915605161/"
          >
            <LinkedIn />
          </a>
        </Icon>
        <Icon>
          <a target="_blank" href="https://www.instagram.com/andreaselmi_/">
            <Instagram />
          </a>
        </Icon>
      </div>
      <Grid container className={classes.textContainer}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            Andrea Selmi - 2021
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            Glitch - A project for start2impact
          </Typography>
        </Grid>
      </Grid>
      <Scroller path="top" spy={true} smooth={true} duration={500}>
        <Icon className={classes.backToTopIcon}>
          <ArrowUpward />
        </Icon>
      </Scroller>
    </div>
  );
};

export default Footer;
