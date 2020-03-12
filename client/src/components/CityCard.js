import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 130,
  },
});

export default function CityCard() {
  const classes = useStyles();

  return (
    <Grid container item xs={6}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="cardText">
              Barcelona
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}