import React, { useEffect } from "react";
//mycomponents
import Loader from "../components/Loader";

//material ui
import HorizontalList from "../components/containers/HorizontalList";
import { Container, makeStyles } from "@material-ui/core";

//types
import { loadTopGames, loadTopStreams } from "../store/games";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import HorizontalListHeader from "../components/HorizontalListHeader";
import ContainerList from "../components/containers/ContainerList";

const useStyles = makeStyles({
  sectionTitleContainer: {
    padding: "20px",
  },
});

const ExplorePage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const {
    topGames,
    topStreams,
    loadTopGamesError,
    loadTopStreamsError,
    isLoading,
  } = useAppSelector((state) => state.games);

  useEffect(() => {
    if (topGames.length === 0) dispatch(loadTopGames());
    if (topStreams.length === 0) dispatch(loadTopStreams());
  }, []);

  //TODO hide scrollbar

  return (
    <div>
      {isLoading ? (
        <Loader height={400} width={400} />
      ) : (
        <>
          {topGames && topGames.length > 0 && (
            <ContainerList
              title="Top Games"
              itemTypeError={loadTopGamesError}
              type="horizontal"
              items={topGames}
            />
          )}

          {topStreams && topStreams.length > 0 && (
            <ContainerList
              title="Top Streams"
              itemTypeError={loadTopStreamsError}
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
