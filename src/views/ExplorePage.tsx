import React, { useEffect, useState } from "react";
//my components

//material ui
import HorizontalList from "../components/containers/HorizontalList";
import { Container, Typography, makeStyles } from "@material-ui/core";

//types
import { Games, Streams } from "../types/interfaces";
import { helix } from "../config/api";

const useStyles = makeStyles({
  sectionTitleContainer: {
    padding: "20px",
  },
});

const ExplorePage = () => {
  const classes = useStyles();

  const [topGames, setTopGames] = useState<Games[]>();
  const [topStreams, setTopStreams] = useState<Streams[]>();

  const fetchTopGames = async () => {
    const { data } = await helix.get("/games/top");
    setTopGames(data.data);
  };
  const fetchTopStreams = async () => {
    const { data } = await helix.get("/streams");
    setTopStreams(data.data);
    console.log(data);
  };

  //TODO SALVARE NELLO STORE REDUX PER EVITARE REFETCH
  useEffect(() => {
    fetchTopGames();
    fetchTopStreams();
  }, []);

  //TODO hide scrollbar

  return (
    <div>
      {/* <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Favorite topGames ({topGames && topGames.length})
        </Typography>
      </Container>
      {topGames && topGames.length > 0 && (
        <HorizontalList items={favoriteGames} />
      )} */}
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Top Games ({topGames && topGames.length})
        </Typography>
      </Container>
      {topGames && topGames.length > 0 && <HorizontalList items={topGames} />}
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Top Streams ({topGames && topGames.length})
        </Typography>
      </Container>
      {topStreams && topStreams.length > 0 && (
        <HorizontalList items={topStreams} />
      )}
    </div>
  );
};

export default ExplorePage;
