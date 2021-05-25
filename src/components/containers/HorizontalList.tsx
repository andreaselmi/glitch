import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Games, ListProps, Streams } from "../../types/interfaces";
import { Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import HorizontalListHeader from "../HorizontalListHeader";
import { loadTopStreams } from "../../store/games";
import GameCard from "./GameCard";
import StreamCard from "../StreamCard";

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
              <div
                key={item.id}
                className={`${classes.cardContainer} ${classes.gameCardContainer}`}
              >
                <GameCard
                  redirectTo="internal"
                  buttonPath={`/game/${item.id}`}
                  savedItem={item}
                  likeButton={true}
                  buttonTitle="View Lives"
                  urlImg={item.box_art_url || placeholder}
                  title={item.name || notAvailable}
                  savedItemsList={favoriteGames}
                />
              </div>
            ))}
        </div>
      );
    } else if ("thumbnail_url" in items[0]) {
      return (
        <div className={classes.gamesListContainer}>
          {items &&
            items.map((item: any) => (
              <div key={item.id} className={`${classes.cardContainer}`}>
                <StreamCard
                  isLive={item.type === "live"}
                  viewerCount={item.viewer_count}
                  userName={item.user_name}
                  redirectTo="external"
                  buttonPath={`https://www.twitch.tv/${item.user_login}`}
                  buttonTitle="View Channel"
                  urlImg={item.thumbnail_url || placeholder}
                  title={item.title || notAvailable}
                />
              </div>
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
      {items.length === 0 && (
        <Typography variant="h5" color="textPrimary">
          There are no elements to show.
        </Typography>
      )}
      {items && items.length > 0 && renderItems(items)}
    </div>
  );
};

export default HorizontalList;
