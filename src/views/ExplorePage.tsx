import React, { useEffect, useState } from "react";
//my components
import cardImg from "../assets/images/ff.jpg";

//material ui
import HorizontalList from "../components/containers/HorizontalList";
import { Container, Typography, makeStyles } from "@material-ui/core";

//types
import { Games } from "../types/interfaces";
import { helix } from "../config/api";

const useStyles = makeStyles({
  sectionTitleContainer: {
    padding: "20px",
  },
});

const ExplorePage = () => {
  const classes = useStyles();

  const [topGames, setTopGames] = useState<Games[]>();

  const fetchTopGames = async () => {
    const { data } = await helix.get("/games/top");
    setTopGames(data.data);
  };

  useEffect(() => {
    fetchTopGames();
  });

  return (
    <div>
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Top Games ({topGames && topGames.length})
        </Typography>
      </Container>
      {topGames && topGames.length > 0 && <HorizontalList items={topGames} />}
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Favorite topGames ({topGames && topGames.length})
        </Typography>
      </Container>
      {topGames && topGames.length > 0 && <HorizontalList items={topGames} />}
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Top Streams ({topGames && topGames.length})
        </Typography>
      </Container>
      {topGames && topGames.length > 0 && <HorizontalList items={topGames} />}
    </div>
  );
};

export default ExplorePage;
