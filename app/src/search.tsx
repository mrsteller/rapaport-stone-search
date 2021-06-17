import React, { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Picture from "./diamond.svg";
//import { StonesList } from "./stone-list";
import stoneData from "./stones.json";
import { Stone, shape, clarity, color } from "./models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    cardWrapper: {},
    card: { position: "relative" }, //margin: theme.spacing(2) },
    avatar: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
      opacity: "0.5",
    },
    clarity: {
      position: "absolute",
      bottom: theme.spacing(3),
      right: theme.spacing(1),
    },
  })
);

const stoneTypes = ["Diamond", "Ruby", "Sapphire"];

export const Search = () => {
  const classes = useStyles();
  const [stones, setStones] = useState<Array<Stone>>([]);
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<Array<string>>([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setStones(stoneData);
  }, []);

  useEffect(() => {
    const filterShape = stoneData.filter((s) =>
      s.shape.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );
    const filterColor = stoneData.filter((s) =>
      s.color?.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );
    const filterClarity = stoneData.filter((s) =>
      s.clarity.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );

    setStones(filterShape.concat(filterColor).concat(filterClarity));

    const shapeOptions = shape.filter((s) =>
      s.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );

    const clarityOptions = clarity.filter((s) =>
      s.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );
    const colorOptions = color.filter((s) =>
      s.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );
    setOptions(shapeOptions.concat(clarityOptions).concat(colorOptions));
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

  const onChangeSearch = (e: any) => setSearch(e.target.value);
  const onClickItem = (o: any) => {
    console.log(o.type);
  };

  return (
    <div>
      <Container>
        <Box>
          <TextField
            variant="outlined"
            name="search"
            label="Search"
            fullWidth
            value={search}
            onChange={onChangeSearch}
            defaultValue={selectedOption}
          />
          <Menu open={false}>
            {options.map((o) => (
              <MenuItem button onClick={() => onClickItem(o)}>
                {o}
              </MenuItem>
            ))}
          </Menu>
          {/* <Autocomplete
            id="stone-search"
            fullWidth
            inputValue={search}
            onInputChange={(e, value) => setSearch(value)}
            options={stones}
            getOptionLabel={getLabel}
            renderInput={(params) => (
              <TextField {...params} label="Search" variant="outlined" />
            )}
          /> */}
        </Box>
        <Box py={4}>
          {/* <StonesList stones={stones} /> */}
          <Grid spacing={2} container>
            {stones.map((s, i) => (
              <Grid item xs={3}>
                <Card key={i} className={classes.card}>
                  <CardMedia />
                  <CardContent>
                    <Tooltip title="Clarity">
                      <Avatar sizes="small" className={classes.avatar}>
                        <Typography variant="body2">{s.clarity}</Typography>
                      </Avatar>
                    </Tooltip>
                  </CardContent>
                  <CardContent>
                    <Typography variant="overline">{s.shape}</Typography>
                    <Typography variant="h5">{s.type}</Typography>
                    {s.color && (
                      <Typography variant="body2">Color: {s.color}</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Search;
