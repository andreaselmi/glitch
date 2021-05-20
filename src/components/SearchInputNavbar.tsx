import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

//material ui imports
import { makeStyles, InputBase, fade, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadSearchedGames } from "../store/games";

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
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #424242 inset",
      WebkitTextFillColor: "white",
    },
    "&:-webkit-autofill::first-line": {
      fontSize: "1rem",
    },
  },
}));

const validationSchema = yup.object({
  search: yup.string().required(),
});

const SearchInputNavbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();

  //TODO svuotare il form dopo la ricerca
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loadSearchedGames(values.search));
      if (location.pathname !== "/search") history.push("/search");
    },
  });

  return (
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
  );
};

export default SearchInputNavbar;
