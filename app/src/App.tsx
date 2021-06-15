import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Search } from "./search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { padding: "4em 1em" },
  })
);

function App() {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="md" className={classes.root}>
        <Box textAlign="center" p={4}>
          <Typography variant="h3">Rapaport Stone Listings</Typography>
        </Box>
        <Search />
      </Container>
    </div>
  );
}

export default App;
