import React, { useState, useEffect } from "react";

//store
import { toggleFavoriteGame } from "../../store/games";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { firestore } from "../../config/firebase";

//mycomponents
import MyCard from "../common/Card";

//types
import { CardContainerProps } from "../../types/interfaces";

const CardContainer = ({
  buttonTitle,
  buttonPath,
  likeButton,
  redirectTo,
  urlImg,
  title,
  savedItemsList = [],
  savedItem,
  ...restProps
}: CardContainerProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

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

  const toggleGame = async () => {
    dispatch(toggleFavoriteGame(savedItem));

    if (!isSaved) {
      storeData();
    }
    if (isSaved) {
      deleteData();
    }
  };

  return (
    <div {...restProps}>
      <MyCard
        redirectTo={redirectTo}
        buttonTitle={buttonTitle}
        buttonPath={buttonPath}
        toggleLike={toggleGame}
        isSaved={isSaved}
        title={title}
        urlImg={urlImg}
        likeButton={likeButton}
      />
    </div>
  );
};

export default CardContainer;
