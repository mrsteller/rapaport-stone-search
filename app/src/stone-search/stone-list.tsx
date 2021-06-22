import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ReactComponent as Picture } from "../assets/diamond.svg";
import { StoneCard } from "./stone-card";

import { Stone } from "./models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

type StoneListProps = { stones: Stone[] };

export const StoneList = ({ stones }: StoneListProps) => {
  const classes = useStyles();
  return (
    <>
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
            <StoneCard stone={s} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
