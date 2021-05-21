import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Games, ListProps, Streams } from "../../types/interfaces";
import { Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import HorizontalListHeader from "../HorizontalListHeader";
import { loadTopStreams } from "../../store/games";
import CardContainer from "./CardContainer";

const useStyles = makeStyles((theme: Theme) => ({
  gamesListContainer: {
    display: "flex",
    marginBottom: 50,
    overflowY: "scroll",
    width: "100%",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  cardContainer: {
    minHeight: 300,
    minWidth: 350,
  },
  gameCardContainer: {
    minHeight: 400,
    minWidth: 300,
    "& div .MuiCardMedia-root": {
      height: 300,
    },
  },
}));

interface HorizontalListProps extends ListProps {
  placeholder: string;
  notAvailable: string;
  itemTypeError: string | null;
  title: string;
}

const HorizontalList = ({
  items,
  itemTypeError,
  placeholder,
  notAvailable,
  title,
}: HorizontalListProps) => {
  const { favoriteGames } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  //render item depending on whether it is games or stream
  const renderItems = (items: Games[] | Streams[]) => {
    if ("box_art_url" in items[0]) {
      return (
        <div className={classes.gamesListContainer}>
          {items &&
            items.map((item: any) => (
              <CardContainer
                className={`${classes.cardContainer} ${classes.gameCardContainer}`}
                buttonPath={`/game/${item.id}`}
                savedItem={item}
                likeButton={true}
                buttonTitle="View Lives"
                key={item.id}
                urlImg={item.box_art_url || placeholder}
                title={item.name || notAvailable}
                savedItemsList={favoriteGames}
              />
            ))}
        </div>
      );
    } else if ("thumbnail_url" in items[0]) {
      return (
        <div className={classes.gamesListContainer}>
          {items &&
            items.map((item: any) => (
              <CardContainer
                className={classes.cardContainer}
                buttonPath="/explore"
                likeButton={false}
                buttonTitle="View Channel"
                key={item.id}
                urlImg={item.thumbnail_url || placeholder}
                title={item.title || notAvailable}
              />
            ))}
        </div>
      );
    } else return null;
  };

  return (
    <div>
      <HorizontalListHeader
        error={itemTypeError}
        title={title}
        numberOfItems={items.length}
        retryAction={() => dispatch(loadTopStreams())}
      />
      {!items && (
        <Typography variant="h5" color="textPrimary">
          Non ci sono elementi da mostrare
        </Typography>
      )}
      {items && items.length > 0 && renderItems(items)}
    </div>
  );
};

export default HorizontalList;
