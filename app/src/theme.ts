import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6E0D42",
      contrastText: "#ECD8FF",
    },
    secondary: {
      main: "#0F3E40",
    },
  },
  typography: {
    fontFamily: ["Shippori Mincho", "Serif"].join(","),
  },
});

export default theme;
