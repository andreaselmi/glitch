import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Element } from "react-scroll";
//material ui
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

//my components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RoutesRender from "./views/RoutesRender";
import Loader from "./components/Loader";

//config
import darkTheme from "./config/theme";
import { navLinks } from "./config/routes";
import { auth } from "./config/firebase";
import { authStateChanged } from "./config/auth";
import { setAccessToken } from "./config/api";

//store
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { loadGamesFromFirestore } from "./store/games";

const App = () => {
  const { user, initializing } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authStateChanged);
    setAccessToken();
  }, []);

  useEffect(() => {
    if (user.uid) dispatch(loadGamesFromFirestore(user));
  }, [user]);

  if (initializing) return <Loader height={400} width={400} />;

  //TODO provare ad implementare sentry.io

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
};

export default App;
