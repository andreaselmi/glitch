import React from "react";
//my components
import cardImg from "../assets/images/ff.jpg";

//material ui
import HorizontalList from "../components/containers/HorizontalList";
import { Container, Typography, makeStyles } from "@material-ui/core";

//types
import { Games } from "../types/interfaces";

const games: Games[] = [
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
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 8,
  },
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 9,
  },
  {
    title: "FinalFantasy",
    urlImg: cardImg,
    id: 10,
  },
];

const useStyles = makeStyles({
  sectionTitleContainer: {
    padding: "20px",
  },
});

const ExplorePage = () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Top Games ({games.length})
        </Typography>
      </Container>
      <HorizontalList items={games} />
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Favorite games ({games.length})
        </Typography>
      </Container>
      <HorizontalList items={games} />
      <Container maxWidth="xl" className={classes.sectionTitleContainer}>
        <Typography variant="h4" color="textSecondary">
          Top Streams ({games.length})
        </Typography>
      </Container>
      <HorizontalList items={games} />
    </div>
  );
};

export default ExplorePage;
