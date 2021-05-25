import React from "react";
import { useHistory, useLocation } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";

//material ui imports
import { makeStyles, InputBase, fade, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

//store
import { useAppDispatch } from "../store/hooks";
import { loadSearchedGames, setSearchValue } from "../store/games";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    overflow: "hidden",
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 999,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: 300,
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #353535 inset",
      WebkitTextFillColor: "white",
      "&:hover": {
        WebkitBoxShadow: "0 0 0 1000px #4D4D4D inset",
      },
    },
    "&:-webkit-autofill::first-line": {
      fontSize: "1rem",
    },
  },
}));

const validationSchema = yup.object({
  search: yup.string().required(),
});

const SearchGameHandler = ({ ...restProps }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ search }) => {
      dispatch(setSearchValue(search));
      dispatch(loadSearchedGames(search));

      if (location.pathname !== "/search") history.push("/search");
    },
  });

  return (
    <div {...restProps}>
      <div className={classes.search}>
        <IconButton
          onClick={() => formik.handleSubmit()}
          className={classes.searchIcon}
        >
          <SearchIcon />
        </IconButton>
        <form onSubmit={formik.handleSubmit}>
          <InputBase
            style={{}}
            id="search"
            name="search"
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={formik.values.search}
            onChange={formik.handleChange}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchGameHandler;
