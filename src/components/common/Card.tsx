/*
A card with an image at the top, a title and a section of actions to like or navigate to the detail of the content
*/

import React from "react";
import { Link } from "react-router-dom";

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
import MyButton from "./MyButton";

import { MyCardProps } from "../../types/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  cardActionsContainer: {
    justifyContent: "space-between",
    marginTop: "auto",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0 20px",
  },
  linkButton: {
    textDecoration: "none",
  },
  media: {
    maxHeight: "100%",
    paddingTop: "56.25%",
  },
  title: {
    overflowY: "hidden",
    maxHeight: "2.4em",
    lineHeight: "1.2em",
  },
}));

const MyCard = ({
  buttonTitle,
  buttonPath,
  likeButton,
  isSaved,
  toggleLike,
  urlImg,
  title,
  redirectTo,
}: MyCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={urlImg} title={title} />
      <CardContent>
        <Typography
          className={classes.title}
          variant="h5"
          color="textSecondary"
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActionsContainer}>
        <div>
          {likeButton && (
            <IconButton onClick={toggleLike} aria-label="add to favorites">
              {isSaved ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          )}
        </div>
        {redirectTo === "internal" && (
          <Link className={classes.linkButton} to={buttonPath}>
            <MyButton name={buttonTitle} />
          </Link>
        )}
        {redirectTo === "external" && (
          <a className={classes.linkButton} href={buttonPath}>
            <MyButton name={buttonTitle} />
          </a>
        )}
      </CardActions>
    </Card>
  );
};

export default MyCard;
