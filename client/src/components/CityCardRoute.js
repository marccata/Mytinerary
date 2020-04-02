import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom';


const useStyles = {
  root: {
    maxWidth: 345,
    flexGrow: 1,
    height: '100%',
    width: '100%',
    display: 'flex',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '12px !important'
  },
};


class CityCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container item xs={12}  className="cityCard">
        <RouterLink to={"/itineraries/" + this.props.city._id}>
          <Card className={classes.root} style={{ backgroundImage: `url(${this.props.city.img})` }}  >
            <CardActionArea>
              <h3 className="cardTitle">{this.props.city.name}</h3>
            </CardActionArea>
          </Card>
        </RouterLink>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(CityCard);