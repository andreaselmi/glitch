import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "../Card";
import { Games } from "../../types/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  gamesListContainer: {
    display: "flex",
    marginBottom: 50,
    overflowY: "scroll",
    width: "100%",
  },
}));

interface HorizontalListProps {
  items: Games[];
}

const HorizontalList = ({ items }: HorizontalListProps) => {
  const classes = useStyles();
  const [games, setGames] = useState<Games[]>();

  const replaceImgDimentions = () => {
    if (items && items.length > 0) {
      const newItems = items.map((item) => ({
        ...item,
        box_art_url: item.box_art_url.replace(/{width}|{height}/g, "300"),
      }));
      setGames(newItems);
    }
  };

  useEffect(() => replaceImgDimentions(), []);
  return (
    <div className={classes.gamesListContainer}>
      {games &&
        games.map((item) => (
          <Card
            key={item.id}
            urlImg={item.box_art_url}
            title={item.name}
            onClick={() => console.log(item.id)}
            saved={false}
          />
        ))}
    </div>
  );
};

export default HorizontalList;
