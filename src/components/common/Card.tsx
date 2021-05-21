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
import MyButton from "./MyButton";
import { Link } from "react-router-dom";

interface MyCardProps {
  buttonTitle: string;
  likeButton: boolean;
  buttonPath: string;
  title: string;
  urlImg: string;
  isSaved?: boolean;
  toggleLike?: () => void;
}

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
    marginRight: 20,
    textDecoration: "none",
  },
  media: {
    maxHeight: "100%",
    paddingTop: "56.25%",
  },
  title: {
    //TODO da sistemare
    overflowY: "hidden",
    maxHeight: 100,
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
        <Link className={classes.linkButton} to={buttonPath}>
          <MyButton name={buttonTitle} />
        </Link>
      </CardActions>
    </Card>
  );
};

export default MyCard;
