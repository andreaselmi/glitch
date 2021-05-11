import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "./config/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Element } from "react-scroll";

import HomePage from "./views/HomePage";
import Navbar from "./components/Navbar";

interface Links {
  name: string;
  path: string;
}

function App() {
  const links: Links[] = [
    { name: "HOME", path: "/" },
    { name: "SEARCH", path: "/" },
  ];
  return (
    <CssBaseline>
      <ThemeProvider theme={darkTheme}>
        <Element name="top" />
        <Navbar links={links} />
        <HomePage />
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
