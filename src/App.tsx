import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "./config/theme";
import { Button } from "@material-ui/core";
import Header from "./components/containers/Header";

function App() {
  return (
    <div style={{ height: 300, backgroundColor: " #121212" }}>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <Button color="primary" variant="contained">
          Hello
        </Button>
        <Button color="secondary" variant="contained">
          Hello
        </Button>
      </ThemeProvider>
    </div>
  );
}

export default App;
