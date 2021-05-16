import React, { useEffect } from "react";
//my components

//material ui
import HorizontalList from "../components/containers/HorizontalList";
import { Container, Typography, makeStyles } from "@material-ui/core";

//types
import { loadTopGames, loadTopStreams } from "../store/games";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import HorizontalListHeader from "../components/HorizontalListHeader";

const useStyles = makeStyles({
  sectionTitleContainer: {
    padding: "20px",
  },
});

const ExplorePage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { topGames, topStreams, loadTopGamesError, loadTopStreamsError } =
    useAppSelector((state) => state.games);

  //TODO SALVARE NELLO STORE REDUX PER EVITARE REFETCH
  useEffect(() => {
    if (topGames.length === 0) dispatch(loadTopGames());
    if (topStreams.length === 0) dispatch(loadTopStreams());
  }, []);

  //TODO hide scrollbar

  return (
    <div>
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <HorizontalListHeader
          error={loadTopGamesError}
          title="Top Games"
          numberOfItems={topGames.length}
          retryAction={() => dispatch(loadTopGames())}
        />
      </Container>
      {topGames && topGames.length > 0 && <HorizontalList items={topGames} />}
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <HorizontalListHeader
          error={loadTopStreamsError}
          title="Top Streams"
          numberOfItems={topStreams.length}
          retryAction={() => dispatch(loadTopStreams())}
        />
      </Container>
      {topStreams && topStreams.length > 0 && (
        <HorizontalList items={topStreams} />
      )}
    </div>
  );
};

export default ExplorePage;
