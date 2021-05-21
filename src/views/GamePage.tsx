import React, { useEffect, useState } from "react";
import {
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

//mycomponents
import placeholder from "../assets/images/account.png";

//store
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserImg } from "../store/auth";

//config
import { firestore, storage } from "../config/firebase";
import Loader from "../components/Loader";
import ContainerList from "../components/containers/ContainerList";
import { useParams } from "react-router";
import { helix } from "../config/api";
import { Games, Streams } from "../types/interfaces";
import { gamesEndRequest, gamesRequested } from "../store/games";
import { toast, ToastContainer } from "react-toastify";
import CardContainer from "../components/containers/CardContainer";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: "30px 0",
  },
  headerContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
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

interface ParamTypes {
  game_id: string;
}

const GamePage = () => {
  const [game, setGame] = useState<Games>();
  const [streams, setStreams] = useState<Streams[]>();

  const { favoriteGames, isLoading } = useAppSelector((state) => state.games);

  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const dispatch = useAppDispatch();

  const fetchGameDetails = async () => {
    dispatch(gamesRequested());
    try {
      const { data } = await helix.get(`/games?id=${params.game_id}`);
      setGame(data.data[0]);
      dispatch(gamesEndRequest());
    } catch (error) {
      toast.error("Unable to retrieve data. Try again later.");
      dispatch(gamesEndRequest());
    }
  };
  const fetchStreams = async () => {
    dispatch(gamesRequested());
    try {
      const { data } = await helix.get(`/streams?game_id=${params.game_id}`);
      setStreams(data.data);
      dispatch(gamesEndRequest());
    } catch (error) {
      toast.error("Unable to retrieve data. Try again later.");
      dispatch(gamesEndRequest());
    }
  };

  useEffect(() => {
    fetchGameDetails();
    fetchStreams();
  }, []);

  return (
    <Container maxWidth="xl">
      <ToastContainer />
      {isLoading ? (
        <Loader width={400} height={400} />
      ) : (
        <>
          {streams && game && streams.length > 0 && (
            <ContainerList
              //TODO da sistemare
              title={`${game.name} live streams`}
              itemTypeError={null}
              type="horizontal"
              items={streams}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default GamePage;
