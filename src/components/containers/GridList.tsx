import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useAppSelector } from "../../store/hooks";
import { Games, ListProps, Streams } from "../../types/interfaces";
import Card from "../Card";

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "10px 20px 20px 10px",
    maxWidth: 300,
    "& .MuiCard-root": {
      miHeight: 350,
    },
    "& p": {
      fontSize: "1rem",
    },
  },
}));

interface GridListProps extends ListProps {
  placeholder: string;
  notAvailable: string;
  title: string;
}

const GridList = ({
  items,
  placeholder,
  notAvailable,
  title,
}: GridListProps) => {
  const favoriteGames = useAppSelector((state) => state.games.favoriteGames);
  const classes = useStyles();

  const renderItems = (items: Games[] | Streams[]) => {
    if ("box_art_url" in items[0]) {
      return (
        <>
          {items &&
            items.map((item: any) => (
              <Grid key={item.id} className={classes.grid} item xs>
                <Card
                  savedItem={item}
                  likeButton={true}
                  buttonTitle="View Lives"
                  key={item.id}
                  urlImg={item.box_art_url || placeholder}
                  title={item.name || notAvailable}
                  buttonPath={`/game/${item.id}`}
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
              <Grid key={item.id} item xs>
                <Card
                  likeButton={false}
                  buttonTitle="View Channel"
                  key={item.id}
                  urlImg={item.thumbnail_url || placeholder}
                  title={item.title || notAvailable}
                  buttonPath={""}
                />
              </Grid>
            ))}
        </>
      );
    } else return null;
  };

  return (
    <Grid justify="center" container style={{ margin: "30px 0" }}>
      {items && items.length > 0 ? renderItems(items) : null}
    </Grid>
  );
};

export default GridList;

//TODO da implementare title
