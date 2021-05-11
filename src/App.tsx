import React from "react";
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

function App() {
  return (
    <Router>
      <CssBaseline>
        <ThemeProvider theme={darkTheme}>
          <Element name="top" />
          <Navbar links={links} />
          <Switch>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/explore">
              <ExplorePage />
            </Route>
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
