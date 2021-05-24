import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//material ui
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button, Grid, Typography } from "@material-ui/core";
//background home header image
import bgImage from "../assets/images/headerBg.jpg";
//my components
import MyModal from "./MyModal";
import UserAuthTabs from "./containers/UserAuthTabs";
//store
import { useAppSelector } from "../store/hooks";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 200,
    marginTop: 20,
  },
  headerContainer: {
    alignItems: "center",
    background: `url(${bgImage})no-repeat center`,
    backgroundSize: "cover",
    display: "flex",
    height: "75vh",
    position: "relative",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      height: "70vh",
    },
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

//TODO valutare un sottotitolo

const Jumbotron = () => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const theme = useTheme();

  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (user.uid) setOpen(false);
  }, [user.uid]);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.headerContainer}>
      <MyModal
        open={open}
        onClose={toggleModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <UserAuthTabs />
      </MyModal>
      <div className={classes.overlay}></div>
      <Grid
        className={classes.headerTextContainer}
        container
        direction="column"
      >
        <Grid item xs={8} sm={6} lg={5}>
          <Typography
            style={{ fontWeight: "bolder" }}
            variant={mobile ? "h5" : "h3"}
            color="textPrimary"
          >
            Discover around your favorite videogames.
          </Typography>

          {user.uid ? (
            <Link style={{ textDecoration: "none" }} to="/explore">
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
              >
                EXPLORE
              </Button>
            </Link>
          ) : (
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={toggleModal}
            >
              EXPLORE
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Jumbotron;
