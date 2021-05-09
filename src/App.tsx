import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import darkTheme from "./config/theme";
import { Button, Typography } from "@material-ui/core";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Button color="primary" variant="contained">
        Hello
      </Button>
      <Button color="secondary" variant="contained">
        Hello
      </Button>
    </ThemeProvider>
  );
}

export default App;
