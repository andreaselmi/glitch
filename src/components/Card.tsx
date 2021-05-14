import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

//my components
import MyButton from "./common/MyButton";

interface MyCardProps {
  onClick: () => void;
  title: string;
  urlImg: string;
  saved: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  cardActionsContainer: {
    justifyContent: "space-between",
  },
  card: {
    minWidth: 300,
    margin: "0 20px",
  },
  livesButton: {
    marginRight: 20,
  },
  media: {
    minHeight: 400,
  },
}));

const MyCard = ({ urlImg, title, onClick, saved }: MyCardProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={urlImg} title={title} />
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="p">
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActionsContainer}>
        <IconButton aria-label="add to favorites">
          {saved ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <MyButton
          onClick={onClick}
          className={classes.livesButton}
          name="View Lives"
        />
      </CardActions>
    </Card>
  );
};

export default MyCard;