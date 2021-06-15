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

  const [shapes, setShapes] = useState<Array<string>>(shapeList);
  const [color, setColor] = useState<Array<string>>(colorList);
  const [clarity, setClarity] = useState<Array<string>>(clarityList);

  useEffect(() => {
    setStones(stoneList);
  }, []);

  useEffect(() => {
    const filterShape = stoneList.filter((s) => s.shape.includes(search));
    const filterColor = stoneList.filter((s) => s.color?.includes(search));
    const filterClarity = stoneList.filter((s) => s.clarity.includes(search));

    setStones(filterShape.concat(filterColor).concat(filterClarity));
  }, [search]);

  const getLabel = (stone: Stone) => {
    const colorLabel = `Color: ${stone.color} in ${stone.type}`;
    const shapeLabel = `Shape: ${stone.shape} in ${stone.type}`;
    const clarityLabel = `Clarity: ${stone.clarity} in ${stone.type}`;

    return `${stone.shape} in ${stone.type} ${stone.clarity} ${
      stone.color ?? ""
    }`;
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
