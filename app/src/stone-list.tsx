import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import { ReactComponent as Picture } from "./diamond.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    // height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

type Stone = {
  id: number;
  type: string;
  shape: string;
  clarity: string;
  color?: string;
};

export const StonesList = ({ stones }: { stones: Stone[] }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {stones.map((stone, i) => (
          <GridListTile key={i}>
            <Picture />
            <GridListTileBar
              title={stone.type}
              subtitle={<span>{stone.shape}</span>}
              actionIcon={
                <IconButton
                  aria-label={`Clarity ${stone.type}`}
                  className={classes.icon}
                >
                  {stone.clarity}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
