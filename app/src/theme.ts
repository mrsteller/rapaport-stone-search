import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#052300" },
    secondary: {
      main: "#6E0D42",
      contrastText: "#fff1f8",
    },
  },
  typography: {
    fontFamily: ["Shippori Mincho", "Serif"].join(","),
  },
});

export default theme;
