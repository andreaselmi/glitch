import React from "react";
import { Redirect } from "react-router";

//material ui
import { Container, makeStyles, Typography } from "@material-ui/core";

//components
import SearchGameHandler from "../components/SearchGameHandler";
import ContainerList from "../components/containers/ContainerList";
import Loader from "../components/Loader";
import DisplayError from "../components/DisplayError";

//store
import { useAppSelector } from "../store/hooks";

const useStyles = makeStyles((theme) => ({
  containerSearch: {
    marginTop: 20,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
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
            <DisplayError
              showRetryButton={false}
              text={
                searchGameErrorMsg === "No Results"
                  ? `No results for "${searchValue}"`
                  : "Error Try Again"
              }
            />
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
