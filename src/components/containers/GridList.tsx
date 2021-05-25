import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useAppSelector } from "../../store/hooks";
import { Games, ListProps, Streams } from "../../types/interfaces";
import GameCard from "./GameCard";
import StreamCard from "../StreamCard";

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "10px 0px",
    "& .MuiCard-root": {
      miHeight: 350,
    },
    "& p": {
      fontSize: "1rem",
    },
  },
  cardContainer: {
    height: "100%",
    maxHeight: 400,
    "& div .MuiCardMedia-root": {
      minHeight: 250,
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-start",
    },
  },
  streamCardContainer: {
    maxHeight: 400,
    [theme.breakpoints.down("xs")]: {
      minWidth: 200,
    },
    "& div .MuiCardMedia-root": {
      minHeight: 250,
    },
  },

  title: {
    margin: "20px 0 0 20px",
  },
}));

interface GridListProps extends ListProps {
  placeholder: string;
  notAvailable: string;
  title?: string;
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
              <Grid
                key={item.id}
                className={classes.grid}
                item
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <div className={classes.cardContainer}>
                  <GameCard
                    redirectTo="internal"
                    savedItem={item}
                    likeButton={true}
                    buttonTitle="View Lives"
                    key={item.id}
                    urlImg={item.box_art_url || placeholder}
                    title={item.name || notAvailable}
                    buttonPath={`/game/${item.id}`}
                    savedItemsList={favoriteGames}
                  />
                </div>
              </Grid>
            ))}
        </>
      );
    } else if ("thumbnail_url" in items[0]) {
      return (
        <>
          {items &&
            items.map((item: any) => (
              <Grid
                className={classes.grid}
                key={item.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <StreamCard
                  isLive={item.type === "live"}
                  viewerCount={item.viewer_count}
                  userName={item.user_name}
                  redirectTo="external"
                  buttonTitle="View Channel"
                  key={item.id}
                  urlImg={item.thumbnail_url || placeholder}
                  title={item.title || notAvailable}
                  buttonPath={`https://www.twitch.tv/${item.user_login}`}
                />
              </Grid>
            ))}
        </>
      );
    } else return null;
  };

  return (
    <>
      {title && (
        <Typography
          className={classes.title}
          variant="h5"
          color="textSecondary"
        >
          {title}
        </Typography>
      )}
      <Grid className={classes.gridContainer} container>
        {items && items.length > 0 ? renderItems(items) : null}
      </Grid>
    </>
  );
};

export default GridList;
