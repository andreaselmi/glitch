import React, { useEffect } from "react";

//Mycomponents
import Header from "../components/containers/Header";

import HomeSection from "../components/HomeSection";

//material ui Icons
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import ExploreIcon from "@material-ui/icons/Explore";
//material ui hooks
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useAppDispatch } from "../store/hooks";

const useStyle = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
    fontSize: "20rem",
  },
  mobileIcon: {
    color: theme.palette.text.primary,
    fontSize: "10rem",
  },
}));

const HomePage = () => {
  const classes = useStyle();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Header />
      <HomeSection
        title="Join us to search and follow your favorite games"
        subtitle="You will have access from any device and can add or remove favorite games to your list"
      >
        <SportsEsportsIcon
          className={desktop ? classes.icon : classes.mobileIcon}
        />
      </HomeSection>
      <HomeSection
        title="Join other gamers in the best live streams of the moment"
        subtitle="In the tab of your favorite games you will be able to see the live streams"
      >
        <ViewStreamIcon
          className={desktop ? classes.icon : classes.mobileIcon}
        />
      </HomeSection>

      <HomeSection
        title="Are you looking for inspiration ?"
        subtitle="Explore the best games and live tops of the moment"
      >
        <ExploreIcon className={desktop ? classes.icon : classes.mobileIcon} />
      </HomeSection>
    </>
  );
};

export default HomePage;
