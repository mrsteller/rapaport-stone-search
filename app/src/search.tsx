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
  Icon,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Picture from "./diamond.svg";
//import { StonesList } from "./stone-list";
import stoneData from "./stones.json";

type Stone = {
  id: number;
  type: string;
  shape: string;
  clarity: string;
  color?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    cardWrapper: {},
    card: { position: "relative" }, //margin: theme.spacing(2) },
    avatar: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
    clarity: {
      position: "absolute",
      bottom: theme.spacing(3),
      right: theme.spacing(1),
    },
  })
);

export const Search = () => {
  const classes = useStyles();
  const [stones, setStones] = useState<Array<Stone>>([]);
  const [search, setSearch] = useState<string>("");

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
        <Box py={4}>
          {/* <StonesList stones={stones} /> */}
          <Grid spacing={2} container>
            {stones.map((s, i) => (
              <Grid item xs={3}>
                <Card key={i} className={classes.card}>
                  <CardMedia />
                  <CardContent>
                    {s.color && (
                      <Avatar sizes="small" className={classes.avatar}>
                        <Typography variant="body2">{s.color}</Typography>
                      </Avatar>
                    )}
                  </CardContent>
                  <CardContent>
                    <Typography variant="overline">{s.shape}</Typography>
                    <Typography variant="h5">{s.type}</Typography>
                    <IconButton size="small" className={classes.clarity}>
                      {s.clarity}
                    </IconButton>
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
