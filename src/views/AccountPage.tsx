import React, { ReactEventHandler, useEffect, useState } from "react";
import {
  Typography,
  makeStyles,
  useMediaQuery,
  Grid,
  Divider,
  Container,
  useTheme,
  Button,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";

//mycomponents
import HorizontalList from "../components/containers/HorizontalList";
import cardImg from "../assets/images/ff.jpg";
import placeholder from "../assets/images/account.png";

//types
import { Games } from "../types/interfaces";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserImg } from "../store/user";

import { firestore, storage } from "../config/firebase";

//TODO absolutely da sistemare

const favoriteGames: Games[] = [
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 1,
  },
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 2,
  },
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 3,
  },
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 4,
  },
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 5,
  },
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 6,
  },
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 7,
  },
];

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: "30px 0",
  },
  headerContainer: {
    alignItems: "center",
    display: "flex",
  },
  imageContainer: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: "50%",
    overflow: "hidden",
    margin: "20px 30px",
    "& img": {
      width: 200,
      height: 200,
    },
  },
  input: {
    display: "none",
  },
  sectionTitleContainer: {
    padding: "20px",
  },
  uploadCameraIcon: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.text.disabled,
    height: 50,
    width: 50,
    position: "absolute",
    borderRadius: 50,
    bottom: 20,
    right: 35,
  },
}));

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.currentUser);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    const file = setFile(fileList[0]);
    setImage(URL.createObjectURL(fileList[0]));
  };
  const uploadImage = async () => {
    if (file == null) {
      return null;
    }

    const uploadUri = file;
    const storageRef = storage().ref(`photos/${user.uid}`);
    const task = storageRef.put(uploadUri);

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const storedImg = async () => {
    let url = await uploadImage();
    dispatch(
      setUserImg({
        userImg: url,
      })
    );
    await firestore.collection("users").doc(user.uid).update({
      userImg: url,
    });
    // setIsLoading(false);
  };

  useEffect(() => {
    if (image) storedImg();
  }, [image]);

  return (
    <Container maxWidth="xl">
      <Grid
        style={
          mobile
            ? { justifyContent: "center" }
            : { justifyContent: "flex-start" }
        }
        container
        className={classes.headerContainer}
      >
        <div style={{ position: "relative" }}>
          <Grid md={6} item className={classes.imageContainer}>
            <img src={user.userImg || image || placeholder} />
          </Grid>

          {user.provider === "google.com" ? null : (
            <>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  className={classes.uploadCameraIcon}
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          )}
        </div>

        <Grid md={6} item>
          <Typography variant="h3" color="textPrimary">
            {user.fullName}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {user.email}
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} light />
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Your favorite Games ({favoriteGames.length})
        </Typography>
      </Container>
      <HorizontalList items={favoriteGames} />
    </Container>
  );
};

export default AccountPage;
