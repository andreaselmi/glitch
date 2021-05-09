import { createMuiTheme } from "@material-ui/core/styles";
import { deepPurple, teal } from "@material-ui/core/colors";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: deepPurple["A200"],
    },
    secondary: {
      main: teal["A200"],
    },
  },
});

export default darkTheme;
