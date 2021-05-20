import React, { useState, useEffect } from "react";

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
import { Games, Streams } from "../types/interfaces";

import { toggleFavoriteGame } from "../store/games";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { firestore } from "../config/firebase";
import { Link } from "react-router-dom";

interface MyCardProps {
  buttonTitle: string;
  likeButton: boolean;
  buttonPath: string;
  title: string;
  urlImg: string;
  savedItemsList?: Games[];
  savedItem?: Games;
}

const useStyles = makeStyles((theme: Theme) => ({
  cardActionsContainer: {
    justifyContent: "space-between",
    marginTop: "auto",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    minWidth: 250,
    margin: "0 20px",
  },
  livesButton: {
    marginRight: 20,
  },
  media: {
    height: 200,
    paddingTop: "56.25%",
  },
  title: {
    overflow: "scroll",
    maxHeight: 100,
  },
}));

const MyCard = ({
  buttonTitle,
  buttonPath,
  likeButton,
  urlImg,
  title,
  savedItemsList = [],
  savedItem,
}: MyCardProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (savedItemsList.length > 0 && savedItem) {
      const alreadySaved = savedItemsList.findIndex(
        (game) => game["id"] === savedItem.id
      );
      if (alreadySaved === -1) {
        setIsSaved(false);
      } else setIsSaved(true);
    }
  }, [savedItemsList]);

  //save data on firebase firestore
  const storeData = () => {
    if (savedItem) {
      setIsSaved(true);
      firestore
        .collection("games")
        .doc(`${savedItem.id} user id: ${user.uid}`)
        .set({
          name: savedItem.name,
          box_art_url: savedItem.box_art_url,
          id: savedItem.id,
          userId: user.uid,
        })
        .catch((error) => {
          //TODO toast per l'errore
          alert("Non è stato possibile salvare l'articolo");
          setIsSaved(false);
        });
    }
  };

  //delete data from firebase firestore
  const deleteData = () => {
    if (savedItem) {
      try {
        setIsSaved(false);
        firestore
          .collection("games")
          .doc(`${savedItem.id} user id: ${user.uid}`)
          .delete();
      } catch (error) {
        //TODO toast per l'errore
        setIsSaved(true);
      }
    }
  };

  const toggleArticle = async () => {
    dispatch(toggleFavoriteGame(savedItem));

    if (!isSaved) {
      storeData();
    }
    if (isSaved) {
      deleteData();
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={urlImg} title={title} />
      <CardContent>
        <Typography
          className={classes.title}
          variant="h5"
          color="textSecondary"
          component="p"
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActionsContainer}>
        <div>
          {likeButton && (
            <IconButton onClick={toggleArticle} aria-label="add to favorites">
              {isSaved ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          )}
        </div>
        <Link to={buttonPath}>
          <MyButton className={classes.livesButton} name={buttonTitle} />
        </Link>
      </CardActions>
    </Card>
  );
};

export default MyCard;
