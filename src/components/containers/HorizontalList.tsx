import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "../Card";
import { Games, ListProps, Streams } from "../../types/interfaces";
import { Typography } from "@material-ui/core";
import { useAppSelector } from "../../store/hooks";

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
}));

const HorizontalList = ({ items }: ListProps) => {
  const favoriteGames = useAppSelector((state) => state.games.favoriteGames);
  const classes = useStyles();

  //render item depending on whether it is games or stream
  const renderItems = (items: Games[] | Streams[]) => {
    if ("box_art_url" in items[0]) {
      return (
        <div className={classes.gamesListContainer}>
          {items &&
            items.map((item: any) => (
              <Card
                savedItem={item}
                likeButton={true}
                buttonTitle="View Lives"
                key={item.id}
                urlImg={item.box_art_url}
                title={item.name}
                onClick={() => console.log(item.id)}
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
              <Card
                likeButton={false}
                buttonTitle="View Channel"
                key={item.id}
                urlImg={item.thumbnail_url}
                title={item.title}
                onClick={() => console.log(item.id)}
              />
            ))}
        </div>
      );
    } else return null;
  };

  return (
    <div>
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
