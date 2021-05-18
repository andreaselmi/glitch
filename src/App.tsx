import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Element } from "react-scroll";
//material ui
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

//my components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

//config
import darkTheme from "./config/theme";
import { navLinks } from "./config/routes";

import RoutesRender from "./views/RoutesRender";

//store
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { loadGamesFromFirestore } from "./store/games";

//auth
import { auth } from "./config/firebase";
import { authStateChanged } from "./config/auth";

//my components
import Loader from "./components/Loader";

//config
import { setAccessToken } from "./config/api";

function App() {
  const { user, initializing } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authStateChanged);
    setAccessToken();
  }, []);

  useEffect(() => {
    if (user.uid) dispatch(loadGamesFromFirestore(user));
  }, [user]);

  if (initializing) return <Loader />;

  return (
    <Router>
      <CssBaseline>
        <ThemeProvider theme={darkTheme}>
          <Element name="top" />
          <Navbar links={navLinks} />
          <RoutesRender />
          <Footer />
        </ThemeProvider>
      </CssBaseline>
    </Router>
  );
}

export default App;
