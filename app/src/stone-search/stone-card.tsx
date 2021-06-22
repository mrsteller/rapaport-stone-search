import React from "react";
import {
  Grid,
  Zoom,
  Card,
  CardContent,
  Avatar,
  CardMedia,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import diamond from "../assets/diamond-side.jpg";
import ruby from "../assets/ruby-dark.jpg";
import sapphire from "../assets/sapphire-blue.jpg";
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
  })
);

type StoneCardProps = { stone: Stone };

export const StoneCard = ({ stone }: StoneCardProps) => {
  const classes = useStyles();
  return (
    <>
      <Zoom in={true} key={stone.id}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={
              stone.type === "Sapphire"
                ? sapphire
                : stone.type === "Ruby"
                ? ruby
                : diamond
            }
            title={`${stone.shape} ${stone.type}`}
          />
          <Tooltip title="Clarity">
            <Avatar sizes="small" className={classes.avatar}>
              <Typography variant="body2">{stone.clarity}</Typography>
            </Avatar>
          </Tooltip>
          <CardContent className={classes.cardContent}>
            <Typography variant="overline">{stone.shape}</Typography>
            <Typography variant="h5" color="secondary">
              {stone.type}
            </Typography>
            {stone.color && (
              <Typography variant="body2">Color: {stone.color}</Typography>
            )}
          </CardContent>
        </Card>
      </Zoom>
    </>
  );
};
