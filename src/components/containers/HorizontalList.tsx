import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "../Card";
import { Games, Streams } from "../../types/interfaces";
import { Typography } from "@material-ui/core";
import { useAppSelector } from "../../store/hooks";

const useStyles = makeStyles((theme: Theme) => ({
  gamesListContainer: {
    display: "flex",
    marginBottom: 50,
    overflowY: "scroll",
    width: "100%" /* IE and Edge */,
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

interface HorizontalListProps {
  items: Games[] | Streams[];
}

const HorizontalList = ({ items }: HorizontalListProps) => {
  const [data, setData] = useState<Games[] | Streams[]>();
  const favoriteGames = useAppSelector((state) => state.games.favoriteGames);
  const classes = useStyles();

  //function that replaces width and height with dimensions
  const replaceImgDimensions = () => {
    if (items && items.length > 0) {
      if ("box_art_url" in items[0]) {
        const games = items.map((game: any) => ({
          ...game,
          box_art_url: game.box_art_url.replace(/{width}|{height}/g, "500"),
        }));
        setData(games);
      } else if ("thumbnail_url" in items[0]) {
        const streams = items.map((stream: any) => ({
          ...stream,
          thumbnail_url: stream.thumbnail_url.replace(
            /{width}|{height}/g,
            "500"
          ),
        }));
        setData(streams);
      }
    }
  };

  //render item depending on whether it is games or stream
  const renderItems = (data: Games[] | Streams[]) => {
    if ("box_art_url" in data[0]) {
      return (
        <div className={classes.gamesListContainer}>
          {data &&
            data.map((item: any) => (
              <Card
                item={item}
                likeButton={true}
                buttonTitle="View Lives"
                key={item.id}
                urlImg={item.box_art_url}
                title={item.name}
                onClick={() => console.log(item.id)}
                savedItems={favoriteGames}
              />
            ))}
        </div>
      );
    } else if ("thumbnail_url" in data[0]) {
      return (
        <div className={classes.gamesListContainer}>
          {data &&
            data.map((item: any) => (
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

  useEffect(() => replaceImgDimensions(), []);

  useEffect(() => {
    replaceImgDimensions();
  }, [favoriteGames]);

  return (
    <div>
      {!data && (
        <Typography variant="h5" color="textPrimary">
          Non ci sono elementi da mostrare
        </Typography>
      )}
      {data && data.length > 0 && renderItems(data)}
    </div>
  );
};

export default HorizontalList;
