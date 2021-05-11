import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import bgImage from "../assets/images/headerBg.jpg";
const Jumbotron = () => {
  const theme = useTheme();

  const useStyles = makeStyles((theme) => ({
    button: {
      minWidth: 200,
      marginTop: 20,
    },
    headerContainer: {
      alignItems: "center",
      background: `url(${bgImage})no-repeat fixed center`,
      backgroundSize: "cover",
      display: "flex",
      height: "77vh",
      position: "relative",
      zIndex: 1,
    },
    headerTextContainer: {
      justifyContent: "space-around",
      paddingLeft: "5vw",
      height: "30vh",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,1)",
      height: "100%",
      position: "absolute",
      opacity: 0.6,
      width: "100%",
      zIndex: -1,
    },
  }));

  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.headerContainer}>
      <div className={classes.overlay}></div>
      <Grid
        className={classes.headerTextContainer}
        container
        direction="column"
      >
        <Grid item xs={6}>
          <Typography variant={mobile ? "h5" : "h3"} color="textPrimary">
            Discover around your favorite videogames.
          </Typography>
          <Link style={{ textDecoration: "none" }} to="/explore">
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
            >
              EXPLORE
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Jumbotron;
