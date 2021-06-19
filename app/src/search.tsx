import React, { useState, useEffect } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  //  CardMedia,
  Container,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import stoneData from "./stones.json";
import { Stone, stoneTypes, shape, clarity, color } from "./models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    searchBar: {},
    dropdown: {
      width: theme.breakpoints.values.sm,
      maxHeight: 300,
      marginLeft: "-8em",
    },
    cardWrapper: {},
    card: { position: "relative" },
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

//styles - fixed bar and header
type Option = { label: string; type: string; value: string };

export const Search = () => {
  const classes = useStyles();
  const [stones, setStones] = useState<Array<Stone>>([]);
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<Array<any>>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    setStones(stoneData);
    initialiseOptions();
  }, []);

  const initialiseOptions = () => {
    const allShapes = stoneTypes
      .map((t) =>
        shape.map((s) => {
          return { value: s, type: t, label: `Shape: ${s} in ${t}` };
        })
      )
      .flat();
    const allColors = color.map((s) => {
      return { value: s, type: "Diamond", label: `Color: ${s} in Diamond` };
    });
    const allClarity = stoneTypes
      .map((t) =>
        clarity.map((s) => {
          return { value: s, type: t, label: `Clarity: ${s} in ${t}` };
        })
      )
      .flat();
    setOptions(allShapes.concat(allColors).concat(allClarity));
  };

  useEffect(() => {
    console.log(selectedOption);
    if (selectedOption) {
      const filteredStones = stoneData.filter(
        (s) => s.type === selectedOption.type
      );
      setStones(filteredStones);
    } else {
      setStones(stoneData);
    }
  }, [selectedOption]);

  return (
    <div>
      <Container>
        <Box>
          <Autocomplete
            filterOptions={createFilterOptions({
              matchFrom: "start",
              stringify: (option) => option.value,
            })}
            id="stone-search"
            fullWidth
            inputValue={search}
            onInputChange={(e, value) => {
              setSearch(value);
            }}
            value={selectedOption}
            onChange={(e, v) => setSelectedOption(v)}
            options={options ?? []}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Search" variant="outlined" />
            )}
          />
        </Box>
        <Box py={4}>
          <Grid spacing={2} container>
            {stones.map((s, i) => (
              <Grid item xs={3} key={i}>
                <Card key={i} className={classes.card}>
                  {/* <CardMedia image={Picture} /> */}
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
