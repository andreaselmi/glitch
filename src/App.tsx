import React from "react";
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

import Routes from "./views/Routes";

function App() {
  return (
    <Router>
      <CssBaseline>
        <ThemeProvider theme={darkTheme}>
          <Element name="top" />
          <Navbar links={navLinks} />
          <Routes />
          <Footer />
        </ThemeProvider>
      </CssBaseline>
    </Router>
  );
}

export default App;
