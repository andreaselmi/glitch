import React, { useEffect } from "react";
//mycomponents
import Loader from "../components/Loader";
//material ui
import { Container, makeStyles } from "@material-ui/core";
//types
import { loadTopGames, loadTopStreams } from "../store/games";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ContainerList from "../components/containers/ContainerList";
import SearchGameHandler from "../components/SearchGameHandler";
import ErrorTitle from "../components/DisplayError";

const useStyles = makeStyles((theme) => ({
  containerSearch: {
    marginTop: 20,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionTitleContainer: {
    padding: "20px",
  },
}));

const ExplorePage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const {
    topGames,
    topStreams,
    topGamesErrorMsg,
    topStreamsErrorMsg,
    isLoading,
  } = useAppSelector((state) => state.games);

  useEffect(() => {
    if (topGames.length === 0) dispatch(loadTopGames());
    if (topStreams.length === 0) dispatch(loadTopStreams());
  }, []);

  return (
    <div>
      <Container
        style={{ color: "white" }}
        maxWidth="xs"
        className={classes.containerSearch}
      >
        <SearchGameHandler />
      </Container>
      {isLoading ? (
        <Loader height={400} width={400} />
      ) : (
        <>
          {!isLoading && topGames.length === 0 && (
            <ErrorTitle
              onClick={() => dispatch(loadTopGames())}
              error={Boolean(topGamesErrorMsg)}
              text="No Top Games to display"
            />
          )}

          {topGames && topGames.length > 0 && (
            <ContainerList
              title="Top Games"
              itemTypeError={topGamesErrorMsg}
              type="horizontal"
              items={topGames}
            />
          )}

          {!isLoading && topStreams.length === 0 && (
            <ErrorTitle
              onClick={() => dispatch(loadTopStreams())}
              error={Boolean(topStreamsErrorMsg)}
              text="No topStreams to display"
            />
          )}

          {topStreams && topStreams.length > 0 && (
            <ContainerList
              title="Top Streams"
              itemTypeError={topStreamsErrorMsg}
              type="horizontal"
              items={topStreams}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ExplorePage;
