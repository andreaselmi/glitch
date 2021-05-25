import React from "react";
import { Link } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";

//my components
import MyButton from "./common/MyButton";

//types
import { StreamCardProps } from "../types/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  cardActionsContainer: {
    justifyContent: "space-between",
    marginTop: "auto",
  },
  //TODO sistemare
  card: {
    minWidth: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0 20px",
  },
  linkButton: {
    textDecoration: "none",
  },
  media: {
    maxHeight: "100%",
    paddingTop: "56.25%",
  },
  title: {
    overflowY: "hidden",
    maxHeight: "2.4em",
    lineHeight: "1.2em",
  },
}));

const StreamCard = ({
  buttonTitle,
  buttonPath,
  urlImg,
  title,
  redirectTo,
  viewerCount,
  type,
  userName,
}: StreamCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={urlImg} title={title} />
      <CardContent>
        <Typography
          className={classes.title}
          variant="h5"
          color="textSecondary"
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActionsContainer}>
        {redirectTo === "internal" && (
          <Link className={classes.linkButton} to={buttonPath}>
            <MyButton name={buttonTitle} />
          </Link>
        )}
        {redirectTo === "external" && (
          <a className={classes.linkButton} href={buttonPath}>
            <MyButton name={buttonTitle} />
          </a>
        )}
      </CardActions>
    </Card>
  );
};

export default StreamCard;
