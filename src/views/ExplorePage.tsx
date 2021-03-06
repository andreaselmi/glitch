import React, { useEffect } from "react";

//material ui
import { Container, makeStyles } from "@material-ui/core";

//mycomponents
import Loader from "../components/Loader";
import ContainerList from "../components/containers/ContainerList";
import SearchGameHandler from "../components/SearchGameHandler";
import DisplayError from "../components/DisplayError";

//store
import { loadTopGames, loadTopStreams } from "../store/games";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const useStyles = makeStyles((theme) => ({
  containerSearch: {
    marginTop: 20,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
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
            <DisplayError
              onClick={() => dispatch(loadTopGames())}
              showRetryButton={true}
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
            <DisplayError
              onClick={() => dispatch(loadTopStreams())}
              showRetryButton={true}
              text="No Top Streams to display"
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
