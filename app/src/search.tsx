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
import stoneData from "./stones.json";
import { Stone, shape, clarity, color } from "./models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    searchBar: {}, //position: "fixed" },
    dropdown: {
      width: theme.breakpoints.values.sm,
      maxHeight: 300,
    },
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
    initialiseOptions();
  }, []);

  const initialiseOptions = () => {
    const allShapes = stoneTypes
      .map((t) => shape.map((s) => `Shape: ${s} in ${t}`))
      .flat();
    const allColors = color.map((s) => `Color: ${s} in Diamond`);
    const allClarity = stoneTypes
      .map((t) => clarity.map((s) => `Clarity: ${s} in ${t}`))
      .flat();
    setOptions(allShapes.concat(allColors).concat(allClarity));
  };

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

    // const shapeOptions = shape.filter((s) =>
    //   s.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    // );
    // const clarityOptions = clarity.filter((s) =>
    //   s.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    // );
    // const colorOptions = color.filter((s) =>
    //   s.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    // );
    //setOptions(shapeOptions.concat(clarityOptions).concat(colorOptions));
  }, [search]);

  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLInputElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchor(null);
  };
  const onClickItem = (item: any) => {
    setSelectedOption(item);
    console.log(item);
  };

  const onChangeSearch = (e: any) => setSearch(e.target.value);

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
            onChange={onChangeSearch}
            defaultValue={selectedOption}
            onClick={openMenu}
          />
          <Menu
            className={classes.dropdown}
            id="search-dropdown"
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              className: classes.dropdown,
            }}
          >
            {options.map((o, i) => (
              <MenuItem key={i} button onClick={() => onClickItem(o)}>
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
