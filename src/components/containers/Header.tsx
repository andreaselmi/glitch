import React from "react";
//material ui
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//My components
import Navbar from "../Navbar";

import bgImage from "../../assets/images/headerBg.jpg";

interface Links {
  name: string;
  path: string;
}

const useStyles = makeStyles({
  headerContainer: {
    minHeight: 500,
    background: `url(${bgImage})no-repeat fixed center`,
    backgroundSize: "cover",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(30deg, rgba(0,0,0,0.9) 85%, rgba(255,255,255,0) 93%);",
    opacity: 0.5,
  },
});

const Header = () => {
  const classes = useStyles();

  const links: Links[] = [
    { name: "HOME", path: "/" },
    { name: "SEARCH", path: "/" },
  ];

  return (
    <>
      <Navbar links={links} />
      <div className={classes.headerContainer}>
        <div className={classes.overlay}></div>
        <Container>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            quas cumque placeat dolorum, tempora earum! Magnam, accusamus eius
            nulla in accusantium, nisi recusandae molestiae fuga ad corrupti
            architecto odio dicta.
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default Header;
