import React, { useState, useEffect } from "react";
import { Container, Box, TextField } from "@material-ui/core";
//import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import stoneList from "./stones.json";

type SearchProps = {};

type Stone = {
  id: number;
  type: string;
  shape: string;
  clarity: string;
  color?: string;
};

export const Search = (props: SearchProps) => {
  const [stones, setStones] = useState<Array<Stone>>([]);

  useEffect(() => {
    setStones(stoneList);
  }, []);

  const getLabel = (stone: Stone) => {
    return `${stone.shape} in ${stone.type}`;
  };

  return (
    <div>
      <Container>
        <Box>
          <Autocomplete
            id="stone-search"
            fullWidth
            options={stones}
            getOptionLabel={getLabel}
            renderInput={(params) => (
              <TextField {...params} label="Search" variant="outlined" />
            )}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Search;
