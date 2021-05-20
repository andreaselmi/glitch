import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Games, ListProps, Streams } from "../../types/interfaces";
import Card from "../Card";

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "10px 20px 20px 10px",
    "& .MuiCard-root": {
      miHeight: 350,
    },
    "& p": {
      fontSize: "1rem",
    },
  },
}));

const GridList = ({ items }: ListProps) => {
  const favoriteGames = useAppSelector((state) => state.games.favoriteGames);
  const classes = useStyles();

  const renderItems = (items: Games[] | Streams[]) => {
    if ("box_art_url" in items[0]) {
      return (
        <>
          {items &&
            items.map((item: any) => (
              <Grid className={classes.grid} item xs>
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
              </Grid>
            ))}
        </>
      );
    } else if ("thumbnail_url" in items[0]) {
      return (
        <>
          {items &&
            items.map((item: any) => (
              <Grid item xs>
                <Card
                  likeButton={false}
                  buttonTitle="View Channel"
                  key={item.id}
                  urlImg={item.thumbnail_url}
                  title={item.title}
                  onClick={() => console.log(item.id)}
                />
              </Grid>
            ))}
        </>
      );
    } else return null;
  };

  return (
    <Grid container style={{ margin: "30px 0" }}>
      {items && items.length > 0 ? renderItems(items) : null}
    </Grid>
  );
};

export default GridList;
