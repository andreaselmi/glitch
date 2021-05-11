import React from "react";
import { Element } from "react-scroll";

//material ui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//My components
import Navbar from "../Navbar";
import bgImage from "../../assets/images/headerBg.jpg";
import Scroller from "../Scroller";

interface Links {
  name: string;
  path: string;
}

const Header = () => {
  const theme = useTheme();

  const useStyles = makeStyles((theme) => ({
    button: {
      maxWidth: 150,
      marginTop: 20,
    },
    container: {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
    },
    expandContainer: {
      marginTop: 20,
      marginBottom: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
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
      backgroundImage:
        "linear-gradient(30deg, rgba(0,0,0,0.9) 85%, rgba(255,255,255,0) 93%);",
      height: "100%",
      position: "absolute",
      opacity: 0.5,
      width: "100%",
      zIndex: -1,
    },
    //animated bottom icon
    bounce: {
      alignItems: "center",
      animation: `$myEffect 2000ms `,
      animationIterationCount: "infinite",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      height: 50,
      justifyContent: "center",
      width: 50,
    },
    "@keyframes myEffect": {
      "0%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
      "100% ": { transform: "translateY(0)" },
    },
  }));

  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const links: Links[] = [
    { name: "HOME", path: "/" },
    { name: "SEARCH", path: "/" },
  ];

  return (
    <div className={classes.container}>
      <Element name="top" />
      <Navbar links={links} />
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
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
            >
              EXPLORE
            </Button>
          </Grid>
        </Grid>
      </div>
      <Container className={classes.expandContainer}>
        <Typography variant={mobile ? "h6" : "h4"} color="textPrimary">
          All your favorite streams in one place
        </Typography>
        <Icon className={classes.bounce}>
          <Scroller
            path="entry-section"
            spy={true}
            smooth={true}
            duration={500}
          >
            <ExpandMore />
          </Scroller>
        </Icon>
      </Container>
    </div>
  );
};

export default Header;
