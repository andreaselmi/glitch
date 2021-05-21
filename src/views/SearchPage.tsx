import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import ContainerList from "../components/containers/ContainerList";
import Loader from "../components/Loader";
import { Redirect } from "react-router";
import { Container, makeStyles, Typography } from "@material-ui/core";
import SearchGameHandler from "../components/SearchGameHandler";

const useStyles = makeStyles((theme) => ({
  containerSearch: {
    marginTop: 20,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  errorTitle: {
    textAlign: "center",
    marginTop: 30,
  },
  searchTitle: {
    padding: "20px 0 0 20px",
  },
}));

const SearchPage = () => {
  const { searchedGames, isLoading, searchGameErrorMsg, searchValue } =
    useAppSelector((state) => state.games);
  const classes = useStyles();

  if (searchedGames.length === 0 && isLoading === false && !searchGameErrorMsg)
    return <Redirect to="/" />;

  //TODO aggiungere come titolo la stringa cercata
  return (
    <div>
      <Container
        style={{ color: "white" }}
        maxWidth="xs"
        className={classes.containerSearch}
      >
        <SearchGameHandler />
      </Container>
      {isLoading ? (
        <Loader height={400} width={400} />
      ) : (
        <>
          {searchGameErrorMsg ? (
            <Typography
              className={classes.errorTitle}
              variant="h5"
              color="textSecondary"
            >
              {searchGameErrorMsg === "No Results"
                ? `No results for "${searchValue}"`
                : "Error Try Again Later"}
            </Typography>
          ) : (
            <>
              <Typography
                className={classes.searchTitle}
                variant="h6"
                color="textSecondary"
              >
                Results for "{searchValue}" ({searchedGames.length})
              </Typography>
              <ContainerList
                title=""
                itemTypeError={null}
                type="grid"
                items={searchedGames}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
