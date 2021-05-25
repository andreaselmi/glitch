import React from "react";
import { Link } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
} from "@material-ui/core";

//my components
import MyButton from "./common/MyButton";

//types
import { StreamCardProps } from "../types/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  cardActionsContainer: {
    justifyContent: "flex-end",
    marginTop: "auto",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0 20px",
  },
  cardHeader: {
    "& div": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    "& .MuiTypography-root:first-child": {
      overflow: "hidden",
    },
  },
  linkButton: {
    textDecoration: "none",
  },
  liveBadge: {
    position: "absolute",
    top: -40,
    left: 10,
    backgroundColor: theme.palette.error.dark,
    padding: "5px 10px",
    borderRadius: 5,
    fontWeight: "bold",
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
  isLive,
  userName,
}: StreamCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={userName}
        subheader={`${viewerCount} viewers`}
      />
      <CardMedia className={classes.media} image={urlImg} title={title} />
      <CardContent style={{ position: "relative" }}>
        {isLive && <span className={classes.liveBadge}>LIVE</span>}
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
            <MyButton variant="text" name={buttonTitle} />
          </Link>
        )}
        {redirectTo === "external" && (
          <a className={classes.linkButton} href={buttonPath}>
            <MyButton variant="text" name={buttonTitle} />
          </a>
        )}
      </CardActions>
    </Card>
  );
};

export default StreamCard;
