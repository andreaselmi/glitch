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
import { Games } from "../types/interfaces";

import { toggleFavoriteGame } from "../store/games";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { firestore } from "../config/firebase";

interface MyCardProps {
  buttonTitle: string;
  likeButton: boolean;
  onClick: () => void;
  title: string;
  urlImg: string;
  savedItems?: Games[];
  item?: Games;
}

const useStyles = makeStyles((theme: Theme) => ({
  cardActionsContainer: {
    justifyContent: "space-between",
    marginTop: "auto",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
    margin: "0 20px",
  },
  livesButton: {
    marginRight: 20,
  },
  media: {
    minHeight: 400,
  },
  title: {
    overflow: "scroll",
    maxHeight: 100,
  },
}));

const MyCard = ({
  buttonTitle,
  likeButton,
  urlImg,
  title,
  onClick,
  savedItems = [],
  item,
}: MyCardProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const user = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (savedItems.length > 0 && item) {
      const alreadySaved = savedItems.findIndex(
        (game) => game["id"] === item.id
      );
      if (alreadySaved === -1) {
        setIsSaved(false);
      } else setIsSaved(true);
    }
  }, [savedItems]);

  //save data on firebase firestore
  const storeData = () => {
    if (item) {
      firestore
        .collection("games")
        .doc(`${item.id} user id: ${user.uid}`)
        .set({
          name: item.name,
          box_art_url: item.box_art_url,
          id: item.id,
          userId: user.uid,
        })
        .catch((error) => {
          alert("Non è stato possibile salvare l'articolo");
        });
    }
  };

  //delete data from firebase firestore
  const deleteData = () => {
    if (item) {
      firestore
        .collection("games")
        .doc(`${item.id} user id: ${user.uid}`)
        .delete();
    }
  };

  const toggleArticle = async () => {
    dispatch(toggleFavoriteGame(item));

    //TODO spostare il setIsSave all'interno dei metodi store e delete data
    //inserirlo all'inizio, e solo in caso di errore tornare allo stato precedente

    if (!isSaved) {
      storeData();
      setIsSaved(true);
    }
    if (isSaved) {
      deleteData();
      setIsSaved(false);
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
        <MyButton
          onClick={onClick}
          className={classes.livesButton}
          name={buttonTitle}
        />
      </CardActions>
    </Card>
  );
};

export default MyCard;
