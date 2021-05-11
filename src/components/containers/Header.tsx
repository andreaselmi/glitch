import React from "react";
import { Element } from "react-scroll";

//material ui
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//My components
import Scroller from "../Scroller";
import Jumbotron from "../Jumbotron";

const Header = () => {
  const theme = useTheme();

  const useStyles = makeStyles((theme) => ({
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

  return (
    <div className={classes.container}>
      <Jumbotron />
      <Element name="entry-section" />
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
