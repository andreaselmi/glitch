import React from "react";
import {
  Typography,
  makeStyles,
  useMediaQuery,
  Grid,
  Divider,
  Container,
  useTheme,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

//mycomponents
import HorizontalList from "../components/containers/HorizontalList";
import cardImg from "../assets/images/ff.jpg";
import placeholder from "../assets/images/account.png";

//types
import { Games } from "../types/interfaces";
import { useAppSelector } from "../store/hooks";

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
  sectionTitleContainer: {
    padding: "20px",
  },
  uploadCameraIcon: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.text.disabled,
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: "50%",
    position: "absolute",
    bottom: 20,
    right: 35,
  },
}));

const AccountPage = () => {
  const user = useAppSelector((state) => state.currentUser);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
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
            <img src={user.userImg || placeholder} />
          </Grid>
          <PhotoCameraIcon className={classes.uploadCameraIcon} />
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
