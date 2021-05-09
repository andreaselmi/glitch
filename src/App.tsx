import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "./config/theme";
import { Button } from "@material-ui/core";
import Header from "./components/containers/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./components/Footer";

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <Button color="primary" variant="contained">
          Hello
        </Button>
        <Button color="secondary" variant="contained">
          Hello
        </Button>
        <Footer />
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
