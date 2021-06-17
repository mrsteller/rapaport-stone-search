import React, { useState, useEffect } from "react";
import { Container, Box, TextField } from "@material-ui/core";
//import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import stoneList from "./stones.json";

const shapeList = [
  "Round",
  "‌Princess",
  "‌Emerald",
  "‌Asscher",
  "‌Radiant",
  "‌Square‌",
  "‌Radiant",
  "‌Pear",
  "‌Oval‌",
];
const colorList = [
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];

const clarityList = [
  "FL",
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "SI3",
  "I1",
  "I2",
  "I3",
];

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
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setStones(stoneList);
  }, []);

  useEffect(() => {
    const filterShape = stoneList.filter((s) =>
      s.shape.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );
    const filterColor = stoneList.filter((s) =>
      s.color?.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );
    const filterClarity = stoneList.filter((s) =>
      s.clarity.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );

    setStones(filterShape.concat(filterColor).concat(filterClarity));
  }, [search]);

  const getLabel = (stone: Stone) => {
    const shapeLabel = `Shape: ${stone.shape} in ${stone.type}`;
    const clarityLabel = `Clarity: ${stone.clarity} in ${stone.type}`;
    const colorLabel = `Color: ${stone.color} in ${stone.type}`;

    const result = stone.shape
      .toLocaleLowerCase()
      .startsWith(search.toLocaleLowerCase())
      ? shapeLabel
      : stone.clarity.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
      ? clarityLabel
      : stone.color &&
        stone.color.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
      ? colorLabel
      : "";

    return result;
  };

  return (
    <div>
      <Container>
        <Box>
          <Autocomplete
            id="stone-search"
            fullWidth
            inputValue={search}
            onInputChange={(e, value) => setSearch(value)}
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
