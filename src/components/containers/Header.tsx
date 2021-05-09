import React from "react";
//material ui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

//My components
import Navbar from "../Navbar";
import bgImage from "../../assets/images/headerBg.jpg";

interface Links {
  name: string;
  path: string;
}

const Header = () => {
  const theme = useTheme();

  const useStyles = makeStyles({
    button: {
      maxWidth: 150,
    },
    container: {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
    },
    expandContainer: {
      marginTop: 30,
      marginBottom: 30,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    expandIcon: {
      fontSize: "2rem",
      color: "#fff",
      "&:hover": {
        position: "absolute",
        marginTop: 10,
        transition: "all .5s ease",
      },
    },
    headerContainer: {
      alignItems: "center",
      background: `url(${bgImage})no-repeat fixed center`,
      backgroundSize: "cover",
      display: "flex",
      height: "100%",
      position: "relative",
      zIndex: 1,
    },
    headerTextContainer: {
      justifyContent: "space-around",
      paddingLeft: "5vw",
      height: "30vh",
    },
    overlay: {
      zIndex: -1,
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundImage:
        "linear-gradient(30deg, rgba(0,0,0,0.9) 85%, rgba(255,255,255,0) 93%);",
      opacity: 0.5,
    },
  });

  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const links: Links[] = [
    { name: "HOME", path: "/" },
    { name: "SEARCH", path: "/" },
  ];

  return (
    <div className={classes.container}>
      <Navbar links={links} />
      <div className={classes.headerContainer}>
        <div className={classes.overlay}></div>
        <Grid
          className={classes.headerTextContainer}
          container
          direction="column"
          xs={6}
        >
          <Typography variant={mobile ? "h4" : "h3"} color="textPrimary">
            Discover around your favorite videogames.
          </Typography>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
          >
            EXPLORE
          </Button>
        </Grid>
      </div>
      <Container className={classes.expandContainer}>
        <Typography variant={mobile ? "h5" : "h4"} color="textPrimary">
          All your favorite streams in one place
        </Typography>
        <Icon>
          <ExpandMore className={classes.expandIcon} />
        </Icon>
      </Container>
    </div>
  );
};

export default Header;
