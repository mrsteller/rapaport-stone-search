import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { Search } from "./search";

function App() {
  return (
    <Container maxWidth="md">
      <Box textAlign="center">
        <Typography variant="h1">Precious Stones</Typography>
      </Box>

      <Search />
    </Container>
  );
}

export default App;
