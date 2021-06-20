import React, { useState, useEffect } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ReactComponent as Picture } from "./assets/diamond.svg";
import diamond from "./assets/diamond-side.jpg";
import ruby from "./assets/ruby-dark.jpg";
import sapphire from "./assets/sapphire-blue.jpg";

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
    card: {
      position: "relative",
    },
    media: {
      height: 140,
      backgroundPosition: "unset",
    },
    cardContent: { minHeight: 83 },
    avatar: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
      opacity: "0.75",
    },
    clarity: {
      position: "absolute",
      bottom: theme.spacing(3),
      right: theme.spacing(1),
    },
    noStones: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
    noStonesPic: {
      maxHeight: "30vh",
      opacity: "50%",
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
    const allShapes = shape
      .map((s) =>
        stoneTypes.map((t) => {
          return { value: s, type: t, label: `Shape: ${s} in ${t}` };
        })
      )
      .flat();
    const allColors = color.map((c) => {
      return { value: c, type: "Diamond", label: `Color: ${c} in Diamond` };
    });
    const allClarity = clarity
      .map((c) =>
        stoneTypes.map((t) => {
          return { value: c, type: t, label: `Clarity: ${c} in ${t}` };
        })
      )
      .flat();
    setOptions(allShapes.concat(allColors).concat(allClarity));
  };

  useEffect(() => {
    console.log("selected", selectedOption);
    if (selectedOption) {
      let filteredStones = stoneData.filter(
        (s) => s.type === selectedOption.type
      );
      if (selectedOption.label.startsWith("Shape")) {
        filteredStones = filteredStones.filter(
          (s) => s.shape === selectedOption.value
        );
      } else if (selectedOption.label.startsWith("Color")) {
        filteredStones = filteredStones.filter(
          (s) => s.color === selectedOption.value
        );
      } else if (selectedOption.label.startsWith("Clarity")) {
        filteredStones = filteredStones.filter(
          (s) => s.clarity === selectedOption.value
        );
      }
      setStones(filteredStones);
    } else {
      setStones(stoneData);
    }
  }, [selectedOption]);

  useEffect(() => {
    const filteredShapes = shape
      .filter((s) =>
        s.toLocaleLowerCase().substr(0, 2).includes(search.toLocaleLowerCase())
      )
      .map((s) =>
        stoneTypes.map((t) => {
          return { value: s, type: t, label: `Shape: ${s} in ${t}` };
        })
      )
      .flat();
    const filteredColors = color
      .filter((c) =>
        c.toLocaleLowerCase().substr(0, 2).includes(search.toLocaleLowerCase())
      )
      .map((c) => {
        return { value: c, type: "Diamond", label: `Color: ${c} in Diamond` };
      });
    const filteredClarity = clarity
      .filter((c) =>
        c.toLocaleLowerCase().substr(0, 2).includes(search.toLocaleLowerCase())
      )
      .map((c) =>
        stoneTypes.map((t) => {
          return { value: c, type: t, label: `Clarity: ${c} in ${t}` };
        })
      )
      .flat();
    if (search.length === 1)
      setOptions(filteredShapes.concat(filteredColors).concat(filteredClarity));

    //setOptions()
  }, [search]);

  return (
    <div>
      <Container>
        <Box>
          <Box textAlign="center" p={4}>
            <Typography variant="h3" color="primary">
              Rapaport Stone Listings
            </Typography>
          </Box>

          <Autocomplete
            autoHighlight
            filterOptions={createFilterOptions({
              // matchFrom: "start",
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
        <Box py={4} className={classes.cardWrapper}>
          {stones.length === 0 && (
            <>
              <Box textAlign="center" className={classes.noStones}>
                <Picture width={"50%"} className={classes.noStonesPic} />

                <Typography>No stones...</Typography>
              </Box>
            </>
          )}
          <Grid spacing={2} container>
            {stones.map((s, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card key={i} className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={
                      s.type === "Sapphire"
                        ? sapphire
                        : s.type === "Ruby"
                        ? ruby
                        : diamond
                    }
                    title={`${s.shape} ${s.type}`}
                  />
                  <Tooltip title="Clarity">
                    <Avatar sizes="small" className={classes.avatar}>
                      <Typography variant="body2">{s.clarity}</Typography>
                    </Avatar>
                  </Tooltip>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="overline">{s.shape}</Typography>
                    <Typography variant="h5" color="secondary">
                      {s.type}
                    </Typography>
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
