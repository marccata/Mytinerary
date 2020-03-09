import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { withStyles } from "@material-ui/core/styles";


const useStyles = {
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 130,
  },
};


class CityCard extends React.Component {
render() {
  const { classes } = this.props;

  return (
    <Grid container item xs={12}  className="cityCard">
      <Card className={classes.root} className="cityCardInner" style={{ backgroundImage: `url(${this.props.city.img})` }} >
        <CardActionArea>
        <div className="cardTitle">
        {this.props.city.name}
        </div>
        </CardActionArea>
        
      </Card>
    </Grid>
  );
}
}

export default withStyles(useStyles)(CityCard);