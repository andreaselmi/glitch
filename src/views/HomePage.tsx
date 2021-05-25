import React from "react";

//My components
import Header from "../components/containers/Header";
import HomeSection from "../components/HomeSection";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import ExploreIcon from "@material-ui/icons/Explore";

const useStyle = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
    fontSize: "20rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "10rem",
    },
  },
}));

const HomePage = () => {
  const classes = useStyle();

  return (
    <>
      <Header />
      <HomeSection
        title="Join us to search and follow your favorite games"
        subtitle="You will have access from any device and can add or remove favorite games to your list"
      >
        <SportsEsportsIcon className={classes.icon} />
      </HomeSection>
      <HomeSection
        title="Join other gamers in the best live streams of the moment"
        subtitle="In the tab of your favorite games you will be able to see the live streams"
      >
        <ViewStreamIcon className={classes.icon} />
      </HomeSection>

      <HomeSection
        title="Are you looking for inspiration ?"
        subtitle="You will always have the ranking of the 20 most followed games and streams"
      >
        <ExploreIcon className={classes.icon} />
      </HomeSection>
    </>
  );
};

export default HomePage;
