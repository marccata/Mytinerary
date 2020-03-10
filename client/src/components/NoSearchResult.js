import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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


class NoSearchResults extends React.Component {
render() {
  const { classes } = this.props;

  return (
    <Grid container item xs={12}  className="cityCard">
      <Card className={classes.root} className="cityCardInner  NoSearchResult">
        <h3 className="cardTitleSearch">Your search has no results</h3>
      </Card>
    </Grid>
  );
}
}

export default withStyles(useStyles)(NoSearchResults);