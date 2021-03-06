import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

//material ui
import {
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

//mycomponents
import placeholder from "../assets/images/account.png";
import Loader from "../components/Loader";
import ContainerList from "../components/containers/ContainerList";

//store
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserImg } from "../store/auth";

//config
import { firestore, storage } from "../config/firebase";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: "30px 0",
  },
  headerContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  imageContainer: {
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
  userImgButton: {
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
  const user = useAppSelector((state) => state.auth.user);
  const favoriteGames = useAppSelector((state) => state.games.favoriteGames);
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return null;

    setFile(fileList[0]);
    setImage(URL.createObjectURL(fileList[0]));
  };

  const uploadImage = async () => {
    if (file == null) {
      return null;
    }

    setIsLoading(true);

    const storageRef = storage().ref(`photos/${user.uid}`);
    const task = storageRef.put(file);

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e) {
      return null;
    }
  };

  const storedImg = async () => {
    let url = await uploadImage();
    if (url) {
      dispatch(
        setUserImg({
          userImg: url,
        })
      );
      await firestore.collection("users").doc(user.uid).update({
        userImg: url,
      });
    } else {
      toast.error("error loading image. Try again");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (image) storedImg();
  }, [image]);

  return (
    <Container maxWidth="xl">
      <ToastContainer />
      <Grid container className={classes.headerContainer}>
        <div style={{ position: "relative" }}>
          <Grid md={6} item className={classes.imageContainer}>
            <img
              style={{ objectFit: "cover" }}
              alt="User"
              src={user.userImg || image || placeholder}
            />
          </Grid>

          {user.provider === "google.com" ? null : (
            <>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e) => handleImageChange(e)}
                disabled={isLoading}
              />
              <label htmlFor="icon-button-file">
                {isLoading ? (
                  <Loader
                    height={70}
                    width={70}
                    style={{
                      width: 50,
                      height: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className={classes.userImgButton}
                  />
                ) : (
                  <IconButton
                    className={classes.userImgButton}
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                )}
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
      {favoriteGames.length === 0 ? (
        <Typography variant="h4" color="textSecondary">
          Your favorite games list is empty, add some!
        </Typography>
      ) : (
        <>
          <ContainerList
            title="Your favorite Games"
            itemTypeError={null}
            type="horizontal"
            items={favoriteGames}
          />
        </>
      )}
    </Container>
  );
};

export default AccountPage;
