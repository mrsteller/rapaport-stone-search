import React, { useState, useEffect } from "react";
//import { Autocomplete } from "@material-ui/lab";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  //  CardMedia,
  Container,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import stoneData from "./stones.json";
import { Stone, stoneTypes, shape, clarity, color } from "./models";
import { ArrowDropDown, Close } from "@material-ui/icons";

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

//TODO: options as objects with labels, value, type etc
//open menu on type not click, check input still works
//styles - fixed bar and header
//filter options
//configure click option
type Option = { label: string; type: string; value: string };

export const Search = () => {
  const classes = useStyles();
  const [stones, setStones] = useState<Array<Stone>>([]);
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<Array<any>>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // useEffect(() => {
  //   console.log("selected", selectedOption);
  //   if (selectedOption !== null) {
  //     const filteredStones = stones.filter(
  //       (s) => s.type === selectedOption.type
  //     );
  //     setStones(filteredStones);
  //   }
  // }, [selectedOption, stones]);

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

  // useEffect(() => {
  //   const filterShape = stoneData.filter((s) =>
  //     s.shape.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
  //   );
  //   const filterColor = stoneData.filter((s) =>
  //     s.color?.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
  //   );
  //   const filterClarity = stoneData.filter((s) =>
  //     s.clarity.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
  //   );
  //   setStones(filterShape.concat(filterColor).concat(filterClarity));

  //   if (search !== "" && options !== null) {
  //     const filterOptions = options.filter((o) =>
  //       o.value.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
  //     );
  //     setOptions(filterOptions);
  //   } else {
  //     initialiseOptions();
  //   }
  // }, [search, options]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Container>
        <Box>
          <TextField
            className={classes.searchBar} //display:fixed
            variant="outlined"
            name="search"
            label="Search"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <>
                  {search !== "" && (
                    <IconButton onClick={() => setSearch("")}>
                      <Close />
                    </IconButton>
                  )}
                  <IconButton onClick={openMenu}>
                    <ArrowDropDown />
                  </IconButton>
                </>
              ),
            }}
          />
          <Menu
            className={classes.dropdown}
            id="search-dropdown"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              className: classes.dropdown,
            }}
          >
            {options.map((o, i) => (
              <MenuItem key={i} button onClick={() => setSelectedOption(o)}>
                {o.label}
              </MenuItem>
            ))}
          </Menu>
          {/* <Autocomplete
            id="stone-search"
            fullWidth
            inputValue={search}
            onInputChange={(e, value) => {
              setSearch(value);
            }}
            onChange={(e, v) => setSelectedOption(v)}
            options={options ?? []}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Search" variant="outlined" />
            )}
          /> */}
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
