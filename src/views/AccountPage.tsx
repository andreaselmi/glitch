import React from "react";
import {
  Typography,
  makeStyles,
  Grid,
  Divider,
  Container,
} from "@material-ui/core";

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

const useStyles = makeStyles({
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
      width: "100%",
      height: "100%",
    },
  },
  sectionTitleContainer: {
    padding: "20px",
  },
});

const AccountPage = () => {
  const user = useAppSelector((state) => state.currentUser);
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Grid container className={classes.headerContainer}>
        <Grid md={6} item className={classes.imageContainer}>
          <img src={user.userImg || placeholder} />
        </Grid>

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
