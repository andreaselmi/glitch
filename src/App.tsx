import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "./config/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Element } from "react-scroll";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./views/HomePage";
import Navbar from "./components/Navbar";
import links from "./config/routes";
import SearchPage from "./views/SearchPage";
import ExplorePage from "./views/ExplorePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { auth } from "./config/firebase";
import { useAppDispatch } from "./store/hooks";
import { setCurrentUser } from "./store/user";

function App() {
  const [user, setUser] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setCurrentUser({
            fullName: "Andrea",
            email: user.email,
            userImg: "",
            uid: user.uid,
            provider: user.providerData[0]?.providerId,
          })
        );
      } else {
        console.log("user out");
      }
    });
  }, []);

  return (
    <Router>
      <CssBaseline>
        <ThemeProvider theme={darkTheme}>
          <Element name="top" />
          <Navbar links={links} />
          <Switch>
            <ProtectedRoute
              redirectPath="/"
              isAuthenticated={user}
              path="/search"
            >
              <SearchPage />
            </ProtectedRoute>
            <ProtectedRoute
              redirectPath="/"
              isAuthenticated={user}
              path="/explore"
            >
              <ExplorePage />
            </ProtectedRoute>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </ThemeProvider>
      </CssBaseline>
    </Router>
  );
}

export default App;
