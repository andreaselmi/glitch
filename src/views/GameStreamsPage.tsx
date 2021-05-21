import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Container } from "@material-ui/core";

//store
import { useAppDispatch, useAppSelector } from "../store/hooks";

//my components
import Loader from "../components/Loader";
import ContainerList from "../components/containers/ContainerList";
import ErrorTitle from "../components/DisplayError";

//store
import { gamesEndRequest, gamesRequested } from "../store/games";

//api
import { helix } from "../config/api";

//types
import { Games, Streams } from "../types/interfaces";
interface ParamTypes {
  game_id: string;
}

const GameStreamsPage = () => {
  const [game, setGame] = useState<Games>();
  const [streams, setStreams] = useState<Streams[]>([]);
  const history = useHistory();

  const { isLoading } = useAppSelector((state) => state.games);

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
          {streams?.length === 0 && !isLoading && (
            <ErrorTitle
              onClick={() => history.goBack()}
              retryButtonText="Back"
              error={true}
              text="There are no streams to view"
            />
          )}

          {streams && game && streams.length > 0 && (
            <ContainerList
              title={`${game.name} live streams`}
              itemTypeError={null}
              type="grid"
              items={streams}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default GameStreamsPage;
