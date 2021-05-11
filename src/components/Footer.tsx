import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GitHub from "@material-ui/icons/GitHub";
import Facebook from "@material-ui/icons/Facebook";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Instagram from "@material-ui/icons/Instagram";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { Grid, Icon } from "@material-ui/core";

//my components
import Scroller from "../components/Scroller";

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
          <GitHub />
        </Icon>
        <Icon>
          <Facebook />
        </Icon>
        <Icon>
          <LinkedIn />
        </Icon>
        <Icon>
          <Instagram />
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
