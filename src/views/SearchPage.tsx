import React from "react";
import { useAppSelector } from "../store/hooks";
import ContainerList from "../components/containers/ContainerList";
import Loader from "../components/Loader";
import { Redirect } from "react-router";
import { Typography } from "@material-ui/core";

const SearchPage = () => {
  const { searchedGames, isLoading, searchGameErrorMsg } = useAppSelector(
    (state) => state.games
  );

  if (searchedGames.length === 0 && isLoading === false && !searchGameErrorMsg)
    return <Redirect to="/" />;

  //TODO aggiungere come titolo la stringa cercata
  return (
    <div>
      {isLoading ? (
        <Loader height={400} width={400} />
      ) : (
        <>
          {searchGameErrorMsg ? (
            <Typography variant="h2" color="textPrimary">
              {searchGameErrorMsg}
            </Typography>
          ) : (
            <ContainerList
              title="Results"
              itemTypeError={null}
              type="grid"
              items={searchedGames}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
