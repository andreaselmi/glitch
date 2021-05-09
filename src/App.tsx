import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "./config/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomePage from "./views/HomePage";

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={darkTheme}>
        <HomePage />
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
