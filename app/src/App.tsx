import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import {
  makeStyles,
  createStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { theme } from "./theme";
import { Search } from "./search";
import "@fontsource/shippori-mincho";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { padding: "4em 1em" },
  })
);

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Container maxWidth="md" className={classes.root}>
          <Box textAlign="center" p={4}>
            <Typography variant="h3" color="primary">
              Rapaport Stone Listings
            </Typography>
          </Box>
          <Search />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
