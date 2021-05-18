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
  const user = useAppSelector((state) => state.auth.user);
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
      setIsSaved(true);
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
          //TODO toast per l'errore
          alert("Non è stato possibile salvare l'articolo");
          setIsSaved(false);
        });
    }
  };

  //delete data from firebase firestore
  const deleteData = () => {
    if (item) {
      try {
        setIsSaved(false);
        firestore
          .collection("games")
          .doc(`${item.id} user id: ${user.uid}`)
          .delete();
      } catch (error) {
        //TODO toast per l'errore
        setIsSaved(true);
      }
    }
  };

  const toggleArticle = async () => {
    dispatch(toggleFavoriteGame(item));

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
