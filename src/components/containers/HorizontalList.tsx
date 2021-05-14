import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "../Card";
import { Games } from "../../types/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  gamesListContainer: {
    display: "flex",
    marginBottom: 50,
    overflowY: "scroll",
    width: "100%",
  },
}));

interface HorizontalListProps {
  items: Games[];
  sectionTitle: string;
}

const HorizontalList = ({ items, sectionTitle }: HorizontalListProps) => {
  const classes = useStyles();

  return (
    <div className={classes.gamesListContainer}>
      {items.map((item) => (
        <Card
          key={item.id}
          urlImg={item.urlImg}
          title={item.title}
          onClick={() => console.log(item.id)}
          saved={false}
        />
      ))}
    </div>
  );
};

export default HorizontalList;
