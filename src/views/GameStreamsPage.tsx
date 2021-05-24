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
import MyButton from "../components/common/MyButton";
interface ParamTypes {
  game_id: string;
}

const GameStreamsPage = () => {
  const [game, setGame] = useState<Games>();
  const [streams, setStreams] = useState<Streams[]>([]);
  const [pagination, setPagination] = useState<string>("");
  const [countPagination, setCountPagination] = useState<number>(0);
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

  const fetchStreams = async (option?: "before" | "after", cursor = "") => {
    dispatch(gamesRequested());
    try {
      const { data } = cursor
        ? await helix.get(
            `/streams?game_id=${params.game_id}&${option}=${cursor}`
          )
        : await helix.get(`/streams?game_id=${params.game_id}`);

      if (cursor !== "" && option === "after")
        setCountPagination(countPagination + 1);
      if (cursor !== "" && option === "before" && countPagination > 0)
        setCountPagination(countPagination - 1);

      setPagination(data.pagination.cursor);
      setStreams(data.data);
      dispatch(gamesEndRequest());
      console.log(data);
    } catch (error) {
      toast.error("Unable to retrieve data. Try again later.");
      dispatch(gamesEndRequest());
    }
  };

  useEffect(() => {
    fetchGameDetails();
    fetchStreams();
  }, []);

  //TODO evitare che si intraveda il retry prima del caricamento

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
              title={`${game.name} live streams (${streams.length})`}
              itemTypeError={null}
              type="grid"
              items={streams}
            />
          )}
        </>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <MyButton
          name="before"
          disabled={countPagination === 0}
          onClick={() => fetchStreams("before", pagination)}
        />
        <MyButton
          name="after"
          disabled={streams.length < 20}
          onClick={() => fetchStreams("after", pagination)}
        />
      </div>
    </Container>
  );
};

export default GameStreamsPage;
